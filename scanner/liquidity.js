const DEXSCREENER_API = "https://api.dexscreener.com/latest/dex/tokens";

export async function getLiquidity(address) {
  try {
    const response = await fetch(`${DEXSCREENER_API}/${address}`);

    if (!response.ok) {
      return {
        success: false,
        message: "Unable to retrieve market data."
      };
    }

    const data = await response.json();

    if (!data.pairs || data.pairs.length === 0) {
      return {
        success: false,
        message: "No trading pair found."
      };
    }

    // Pick the pair with the most liquidity
    const pair = data.pairs.sort(
      (a, b) =>
        (b.liquidity?.usd || 0) -
        (a.liquidity?.usd || 0)
    )[0];

    return {
      success: true,
      dex: pair.dexId,
      pairAddress: pair.pairAddress,
      priceUsd: pair.priceUsd,
      liquidityUsd: pair.liquidity?.usd || 0,
      marketCap: pair.marketCap || 0,
      volume24h: pair.volume?.h24 || 0,
      buys24h: pair.txns?.h24?.buys || 0,
      sells24h: pair.txns?.h24?.sells || 0,
      url: pair.url
    };

  } catch (err) {
    return {
      success: false,
      message: err.message
    };
  }
}