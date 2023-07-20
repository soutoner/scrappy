import { BAUHAUS_URL } from './constants';

export function buildProductPageUrl(productCode: string) {
  return `${BAUHAUS_URL}/p/${productCode}`;
}
