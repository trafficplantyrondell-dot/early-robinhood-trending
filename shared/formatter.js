export function formatCurrency(value) {
  const num = Number(value);

  if (!Number.isFinite(num)) return "N/A";

  if (num >= 1_000_000_000)
    return `$${(num / 1_000_000_000).toFixed(2)}B`;

  if (num >= 1_000_000)
    return `$${(num / 1_000_000).toFixed(2)}M`;

  if (num >= 1_000)
    return `$${(num / 1_000).toFixed(2)}K`;

  if (num >= 1)
    return `$${num.toFixed(2)}`;

  return `$${num.toFixed(8)}`;
}

export function formatNumber(value) {
  const num = Number(value);

  if (!Number.isFinite(num)) return "N/A";

  if (num >= 1_000_000_000)
    return `${(num / 1_000_000_000).toFixed(2)}B`;

  if (num >= 1_000_000)
    return `${(num / 1_000_000).toFixed(2)}M`;

  if (num >= 1_000)
    return `${(num / 1_000).toFixed(2)}K`;

  return num.toLocaleString();
}

export function verdict(score) {
  const value = Number(score);

  if (value >= 90) {
    return "🟢 Richy Verdict: Strong Early Signals";
  }

  if (value >= 75) {
    return "🟡 Richy Verdict: Worth Watching";
  }

  return "🔴 Richy Verdict: Higher Risk";
}