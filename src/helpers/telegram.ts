import { ContentType, Header } from '../constants/http';
import { StockResult } from '../base/bauhaus';
import { ApiMethods, TELEGRAM_BOT_API } from '../constants/telegram';
import { SendMessageRequest } from '../base/telegram';
import { logger } from '../log';
import axios from 'axios';

export function buildMessage(result: StockResult) {
  let message = 'Cannot say if there is stock or not';
  switch (result) {
    case 'in_shop':
    case 'online':
      message = `Wow! There is stock ${result}`;
      break;
    case 'both':
      message = `Wow! There is stock both online and in shop`;
      break;
    case 'none':
      message = 'Still no stock :(';
      break;
    case 'error':
      message = 'Oops, something is going wrong when requesting stock';
      break;
  }

  return message;
}

export function sendMessage(botId: string, chatId: string, message: string) {
  const sendMessageUrl = buildBotURL(botId, ApiMethods.SEND_MESSAGE);

  axios
    .post(
      sendMessageUrl,
      {
        chat_id: chatId,
        text: message,
      } as SendMessageRequest,
      {
        headers: {
          [Header.CONTENT_TYPE]: ContentType.APPLICATION_JSON,
        },
      },
    )
    .then((response) => {
      if (response.data.ok) {
        logger.info('Result successfully published');
      } else {
        logger.error('Oops, result unsuccessfully published');
      }
    })
    .catch((reason) => logger.error(`Error when publishing result: ${reason}`));
}

function buildBotURL(botId: string, method: string) {
  return `${TELEGRAM_BOT_API}/bot${botId}/${method}`;
}
