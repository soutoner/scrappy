import { chromium, Page } from 'playwright';
import {
  SELECTED_STORE_COOKIE,
  Selectors,
  StockResult,
  StockTexts,
} from './bauhaus/constants';
import { buildProductPageUrl } from './bauhaus/helpers';
import { logger } from '../log';

export async function scrape(productCode: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  setSelectedStore(page);

  await page.goto(buildProductPageUrl(productCode));

  await acceptConsent(page);

  let stockResult;
  try {
    const stockTexts = await page
      .locator(Selectors.STOCK_ELEMENT)
      .allInnerTexts();

    stockResult = verifyStocks(stockTexts);
  } catch (error: unknown) {
    stockResult = 'error';
  }

  logger.info(`Stock Result: ${stockResult}`);

  await browser.close();
}

function setSelectedStore(page: Page) {
  page.context().addCookies([SELECTED_STORE_COOKIE]);
}

function acceptConsent(page: Page) {
  return page.getByTestId(Selectors.ACCEPT_CONSENT).click();
}

function verifyStocks(stockTexts: string[]): StockResult {
  const isAvailableOnline = verifyOnlineStock(stockTexts[0]);
  const isAvailableInShop = verifyInShopStock(stockTexts[1]);

  if (isAvailableOnline && isAvailableInShop) {
    return 'both';
  } else if (isAvailableOnline) {
    return 'online';
  } else if (isAvailableInShop) {
    return 'in_shop';
  } else {
    return 'none';
  }
}

function verifyOnlineStock(stockText: string) {
  return (
    !stockText?.includes(StockTexts.SOON) &&
    stockText?.includes(StockTexts.AVAILABLE)
  );
}

function verifyInShopStock(stockText: string) {
  return (
    !stockText?.includes(StockTexts.CURRENTLY) &&
    stockText?.includes(StockTexts.AVAILABLE)
  );
}
