export function richyAI(token, liquidity, security, holders, score) {

  let summary = [];

  summary.push("🧠 Richy AI Analysis");

  if (score.score >= 85) {
    summary.push("🟢 Healthy early indicators.");
  } else if (score.score >= 65) {
    summary.push("🟡 Mixed signals. Continue monitoring.");
  } else {
    summary.push("🔴 Higher risk based on completed checks.");
  }

  if (security.ownership === "Renounced") {
    summary.push("✅ Ownership appears renounced.");
  }

  if (liquidity.success) {
    summary.push("💧 Market data successfully retrieved.");
  }

  if (holders.success) {
    summary.push("👥 Holder module available.");
  }

  return summary.join("\n");
}