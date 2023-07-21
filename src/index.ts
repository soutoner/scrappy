import { execute } from './cron';
import { logger } from './log';
import { scrape } from './scrappers/bauhaus';
import { DESIRED_PRODUCT } from './constants/bauhaus';
import { publishResult } from './publishers/telegram';

logger.info('Starting execution');

try {
  execute(async () => {
    const stockResult = await scrape(DESIRED_PRODUCT);

    publishResult(stockResult);
  });
} catch (error: unknown) {
  if (error instanceof Error) {
    logger.error(error.message);
  } else {
    logger.error('Oops, something happened');
  }
}
