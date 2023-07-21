import { StockResult } from '../base/bauhaus';
import {
  BAUHAUS_URL,
  SELECTED_STORE_COOKIE,
  Selectors,
  StockTexts,
} from '../constants/bauhaus';
import { Page } from 'playwright';

export function buildProductPageUrl(productCode: string) {
  return `${BAUHAUS_URL}/p/${productCode}`;
}

export function setSelectedStore(page: Page) {
  page.context().addCookies([SELECTED_STORE_COOKIE]);
}

export function acceptConsent(page: Page) {
  return page.getByTestId(Selectors.ACCEPT_CONSENT).click();
}

export function verifyStocks(stockTexts: string[]): StockResult {
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
