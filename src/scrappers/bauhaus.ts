import { chromium } from 'playwright';
import { Selectors } from './bauhaus/constants';
import {
  acceptConsent,
  buildProductPageUrl,
  setSelectedStore,
  verifyStocks,
} from './bauhaus/helpers';
import { logger } from '../log';

export async function scrape(productCode: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  setSelectedStore(page);

  await page.goto(buildProductPageUrl(productCode));

  await acceptConsent(page);

  let stockResult;
  const stockTexts = await page
    .locator(Selectors.STOCK_ELEMENT)
    .allInnerTexts();

  if (stockTexts.length > 0) {
    stockResult = verifyStocks(stockTexts);
  } else {
    stockResult = 'error';
  }

  logger.info(`Stock Result: ${stockResult}`);

  await browser.close();
}
