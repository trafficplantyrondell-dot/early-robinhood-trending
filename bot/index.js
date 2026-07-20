import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { scanToken } from "../scanner/tokenScanner.js";

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

console.log("🚀 Hood Rich Labs Bot Online");

// --------------------
// /start
// --------------------
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
`👋 Welcome to Hood Rich Labs

I'm Richy.

AI-powered Robinhood Chain Intelligence.

Commands

🔎 /scan <contract>

/help`
  );
});

// --------------------
// /help
// --------------------
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
`📚 Hood Rich Labs

Available Commands

/start
/help
/scan <contract>

Example

/scan 0xde543192e1939Ee2538db77CCc225Aa67412bEa6`
  );
});

// --------------------
// /scan
// --------------------
bot.onText(/\/scan (.+)/, async (msg, match) => {

  const chatId = msg.chat.id;
  const address = match[1].trim();

  try {

    await bot.sendMessage(
      chatId,
      "🔎 Richy AI is scanning Robinhood Chain..."
    );

    const result = await scanToken(address);

    if (!result.success) {
      return bot.sendMessage(chatId, result.message);
    }

    await bot.sendMessage(
      chatId,
`🛡 Hood Rich Labs Scanner

🪙 ${result.name}
(${result.symbol})

📍 Contract
${result.address}

🔢 Decimals
${result.decimals}

💰 Total Supply
${result.totalSupply}

━━━━━━━━━━━━━━

💵 Price
${result.price ?? "Loading..."}

📈 Market Cap
${result.marketCap ?? "Loading..."}

💧 Liquidity
${result.liquidity ?? "Loading..."}

👥 Holders
${result.holders ?? "Loading..."}

🛡 Safety Score
${result.score ?? "Loading..."}

🤖 Richy AI

${result.summary ?? "Running blockchain analysis..."}

Powered by Hood Rich Labs`
    );

  } catch (error) {

    console.error(error);

    bot.sendMessage(
      chatId,
      "❌ Scanner failed. Please try again."
    );

  }

});

// --------------------
// Unknown Commands
// --------------------
bot.on("message", (msg) => {

  if (!msg.text) return;

  if (
    msg.text.startsWith("/start") ||
    msg.text.startsWith("/help") ||
    msg.text.startsWith("/scan")
  ) {
    return;
  }

  bot.sendMessage(
    msg.chat.id,
    "❓ Unknown command.\n\nType /help."
  );

});