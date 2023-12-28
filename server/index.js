import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

const bootstrap = () => {
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        "Assalamu Alaykum...\nYou can buy any course you want from this platform "
      );
    }
  });
};

bootstrap();
