import { config } from './configuration/config';
import cron from 'node-cron';
import { MisconfigurationException } from './exceptions/misconfiguration';
import { logger } from './log';

export function execute(fn: () => void) {
  logger.info('Cron firing logic');
  if (!config.isCronEnabled) {
    logger.warn('In local environment, logic is executed once.');
    return fn();
  }

  if (config.crontab === undefined) {
    throw new MisconfigurationException('config.crontab not defined');
  }

  cron.schedule(config.crontab, fn);
}
