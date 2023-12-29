import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([
  { command: "/start", description: "Kurslar haqida ma'lumot" },
]);

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(
      chatId,
      "Assalamu Alaykum\nYou can purchase courses on this platform",
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: "Kurslarni ko'rish",
                web_app: {
                  url: "https://test-telegram-web-bot.vercel.app",
                },
              },
            ],
          ],
        },
      }
    );
  }

  if (msg.web_app_data?.data) {
    try {
      const data = JSON.parse(msg.web_app_data?.data);

      await bot.sendMessage(
        chatId,
        "Thank you for trusting us, A list of courses you have purchased:"
      );

      for (let item of data) {
        await bot.sendPhoto(chatId, item.Image);
        await bot.sendMessage(chatId, `${item.title} - ${item.quantity}x`);
      }

      await bot.sendMessage(
        chatId,
        `Total price: ${data
          .reduce((a, c) => a + c.price * c.quantity, 0)
          .toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}`
      );
    } catch (error) {
      console.log(error);
    }
  }
});
