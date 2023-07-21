import 'dotenv/config';
import { localConfig } from './configs/local.config';
import { productionConfig } from './configs/production.config';

export type AppConfig = Config & DefaultConfig & Partial<SensibleConfig>;

export interface Config {
  logLevel: LogLevel;
  isCronEnabled: boolean;
  crontab?: string;
}

export interface DefaultConfig {
  environment: Environment;
}

export interface SensibleConfig {
  telegram: TelegramConfig;
}

export interface TelegramConfig {
  botId: string;
  chatId: string;
}

export type Environment = 'local' | 'production';

export type LogLevel = 'INFO' | 'DEBUG';

export interface ProcessVariables {
  TELEGRAM_BOT_ID: string;
  TELEGRAM_CHAT_ID: string;
  ENVIRONMENT: Environment;
  LOG_LEVEL: LogLevel;
}

function getConfig(processVariables: Partial<ProcessVariables>): AppConfig {
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
    telegram: getTelegramConfig(processVariables),
  };
}

function getTelegramConfig(
  processVariables: Partial<ProcessVariables>,
): TelegramConfig | undefined {
  const botId = processVariables.TELEGRAM_BOT_ID;
  const chatId = processVariables.TELEGRAM_CHAT_ID;

  if (!!botId && !!chatId) {
    return { botId, chatId };
  }

  return undefined;
}

export const config = getConfig(process.env as unknown as ProcessVariables);
