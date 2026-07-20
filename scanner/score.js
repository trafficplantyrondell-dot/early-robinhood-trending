export function calculateScore(token, liquidity, security, holders) {

  let score = 50;

  if (liquidity.success) score += 10;

  if (security.success) score += 15;

  if (holders.success) score += 10;

  if (security.ownership === "Renounced") {
    score += 10;
  }

  if (score > 100) score = 100;

  let risk = "Medium";

  if (score >= 85) {
    risk = "Low";
  } else if (score <= 50) {
    risk = "High";
  }

  return {
    score,
    risk,
    confidence: "Beta"
  };
}