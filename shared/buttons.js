export function buildButtons(token = {}) {
  const buttons = [];

  // Row 1
  const row1 = [];

  if (token.chart) {
    row1.push({
      text: "📈 Chart",
      url: token.chart
    });
  }

  if (token.buy) {
    row1.push({
      text: "🛒 Buy",
      url: token.buy
    });
  }

  if (row1.length) {
    buttons.push(row1);
  }

  // Row 2
  const row2 = [];

  if (token.website) {
    row2.push({
      text: "🌐 Website",
      url: token.website
    });
  }

  if (token.telegram) {
    row2.push({
      text: "📢 Telegram",
      url: token.telegram
    });
  }

  if (token.twitter) {
    row2.push({
      text: "🐦 X",
      url: token.twitter
    });
  }

  if (row2.length) {
    buttons.push(row2);
  }

  // Row 3
  buttons.push([
    {
      text: "🔄 Refresh",
      callback_data: `refresh:${token.address}`
    },
    {
      text: "⭐ Watchlist",
      callback_data: `watch:${token.address}`
    }
  ]);

  return {
    inline_keyboard: buttons
  };
}