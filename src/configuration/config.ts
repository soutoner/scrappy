import { localConfig } from './configs/local.config';
import { productionConfig } from './configs/production.config';

export interface Config {
  environment: Environment;
  logLevel: LogLevel;
  isCronEnabled: boolean;
  crontab?: string;
}

export type Environment = 'local' | 'production';

export type LogLevel = 'INFO' | 'DEBUG';

export interface ProcessVariables {
  ENVIRONMENT?: Environment;
  LOG_LEVEL?: LogLevel;
}

function getConfig(processVariables: ProcessVariables): Config {
  const environment = processVariables.ENVIRONMENT;
  let config;
  switch (environment) {
    case 'production':
      config = productionConfig(processVariables);
      break;
    case 'local':
    default:
      config = localConfig(processVariables);
      break;
  }

  return {
    ...config,
    environment: environment ?? 'local',
  };
}

export const config = getConfig(process.env as unknown as ProcessVariables);
