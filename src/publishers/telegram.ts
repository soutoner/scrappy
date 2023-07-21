import { MisconfigurationException } from '../exceptions/misconfiguration';
import { config } from '../configuration/config';
import { logger } from '../log';
import { StockResult } from '../base/bauhaus';
import { buildMessage, sendMessage } from '../helpers/telegram';

export function publishResult(result: StockResult) {
  if (config.telegram === undefined) {
    throw new MisconfigurationException(
      'config.telegram not configured. Not publishing results',
    );
  }

  const { botId, chatId } = config.telegram;

  logger.info(
    `Publishing stock result '${result}' to Telegram bot '${botId}' and chat '${chatId}'`,
  );

  const message = buildMessage(result);
  sendMessage(botId, chatId, message);
}
