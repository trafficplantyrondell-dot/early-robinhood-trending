export async function scanToken(tokenAddress) {
  return {
    success: true,
    token: tokenAddress,
    score: 0,
    risk: "Unknown",
    message: "Scanner coming online..."
  };
}