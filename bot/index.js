import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

console.log("🚀 Hood Rich Labs Bot Online");

// Start Command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
`👑 Welcome to Hood Rich Labs!

I'm Richy, your AI guide.

━━━━━━━━━━━━━━

🚀 Early Robinhood Trending

🤖 AI Analysis

📈 Market Intelligence

🛡️ Security Scanner

🌱 Builder Tools

━━━━━━━━━━━━━━

Type /help to see available commands.

Build. Launch. Trade. Grow.`
  );
});

// Help Command
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
`📚 Hood Rich Labs

Available Commands

/start
/help

🚀 Coming Soon

/trending
/scan
/score
/news
/community

More features are under development.`
  );
});