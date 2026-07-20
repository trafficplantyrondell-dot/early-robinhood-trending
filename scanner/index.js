import { validateAddress } from "./validate.js";

export async function scanToken(tokenAddress) {
  const validation = validateAddress(tokenAddress);

  if (!validation.valid) {
    return {
      success: false,
      message: validation.error
    };
  }

  return {
    success: true,
    token: validation.address,
    score: 50,
    risk: "Unknown",
    liquidity: "Coming Soon",
    holders: "Coming Soon",
    message:
`🛡 Hood Rich Labs Scanner

Token

${validation.address}

✅ Address Valid

Live Robinhood Chain scanning coming next.`
  };
}