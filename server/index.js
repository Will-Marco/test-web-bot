import express from "express";
import cors from "cors";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());
app.use(cors());

bot.setMyCommands([
  { command: "/start", description: "Get started" },
  { command: "/courses", description: "All courses" },
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

  if (text === "/courses") {
    await bot.sendMessage(
      chatId,
      "Assalamu Alaykum\nYou can purchase courses on this platform",
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "All courses",
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

app.post("/web-data", async (req, res) => {
  const { products, queryID } = req.body;

  try {
    await bot.answerWebAppQuery(queryID, {
      type: "article",
      id: queryID,
      title: "You have successfully purchased",
      input_message_content: {  
        message_text: `Congratulations on your purchase, You purchased product worth ${products
          .reduce((a, b) => a + b.price * b.quantity, 0)
          .toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}\n${products.map((c) => `${c.title} ${c.quantity}X`).join(", ")}`,
      },
    });
    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({});
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server has been started on ${PORT}`);
});
