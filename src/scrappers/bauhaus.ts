import { chromium } from 'playwright';
import { Selectors } from '../constants/bauhaus';
import {
  acceptConsent,
  buildProductPageUrl,
  setSelectedStore,
  verifyStocks,
} from '../helpers/bauhaus';
import { logger } from '../log';
import { StockResult } from '../base/bauhaus';

export async function scrape(productCode: string): Promise<StockResult> {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  setSelectedStore(page);

  await page.goto(buildProductPageUrl(productCode));

  await acceptConsent(page);

  let stockResult: StockResult;
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

  return stockResult;
}
