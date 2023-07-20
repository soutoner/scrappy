import { execute } from './cron';
import { logger } from './log';
import { scrape } from './scrappers/bauhaus';
import { DESIRED_PRODUCT } from './scrappers/bauhaus/constants';

logger.info('Starting execution');

try {
  execute(() => {
    scrape(DESIRED_PRODUCT);
  });
} catch (error: unknown) {
  if (error instanceof Error) {
    logger.error(error.message);
  } else {
    logger.error('Oops, something happened');
  }
}
