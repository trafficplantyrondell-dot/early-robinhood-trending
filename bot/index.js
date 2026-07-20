import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { scanToken } from "../scanner/index.js";

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

console.log("🚀 Hood Rich Labs Bot Online");

// /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
`👑 Welcome to Hood Rich Labs!

I'm Richy, your AI guide.

🚀 Early Robinhood Trending
🤖 AI Analysis
📈 Market Intelligence
🛡 Security Scanner
🌱 Builder Tools

Type /help to see all commands.

Build. Launch. Trade. Grow.`
  );
});

// /help
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
`📚 Hood Rich Labs

Available Commands

/start
/help

🚀 Scanner

/scan <token_address>

More features coming soon...`
  );
});

// /scan
bot.onText(/\/scan (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const tokenAddress = match[1];

  const result = await scanToken(tokenAddress);

  bot.sendMessage(
    chatId,
`🛡 Hood Rich Labs Scanner

Token: ${result.token}

Safety Score: ${result.score}/100

Risk: ${result.risk}

${result.message}`
  );
});