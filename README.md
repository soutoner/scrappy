# Scrappy

Convenience scrappers

## Installation

1. Configure the .env file. You can set every ENV variable there, or provide it via command line.

```shell
$ cp .env.example .env
$ # Set the correct values
```

2. Start the project

```shell
$ npm install
$ npm run scrapper                         # local environment
$ ENVIRONMENT=production npm run scrapper  # production environment
```

3. Create and setup Telegram bot to receive updates

### Setting up telegram bot

1. Talk to @botfather to create a new bot
2. Note down the bot ID, that would be the `TELEGRAM_BOT_ID` value
3. Start a private chat with the bot
4. Create a group with all the people interested in updates, and also add the bot.
5. Call the `getUpdates` bot API endpoint and take the `chat_id` of the group chat. That would be the `TELEGRAM_CHAT_ID`.

#### Why all the fuzz?

`sendMessage` bot API can send messages only to specific chat IDs. That would mean that everyone interested in updates should open a chat with the bot. On the server, we would need to register and save all those chat IDs.

Then when we want to send updates, we should go over the stored list of chat IDs and send updates.

The above mentioned approach needs a little bit more of preparation, but is conceptually easier for the developer.
