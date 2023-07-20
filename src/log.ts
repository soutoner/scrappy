import pino from 'pino';
import { config } from './configuration/config';

function loggerFactory() {
  if (config.environment === 'production') {
    return pino();
  }

  return pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  });
}

export const logger = loggerFactory();
