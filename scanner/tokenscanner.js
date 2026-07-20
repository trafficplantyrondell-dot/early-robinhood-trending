import { ethers } from "ethers";
import { getLiquidity } from "./liquidity.js";
import { getSecurity } from "./security.js";
import { getHolders } from "./holders.js";
import { calculateScore } from "./score.js";
import { richyAI } from "./richyAI.js";

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)"
];

export async function scanToken(address) {
  try {
    if (!ethers.isAddress(address)) {
      return {
        success: false,
        message: "❌ Invalid contract address."
      };
    }

    const rpc = process.env.ROBINHOOD_RPC;

    if (!rpc) {
      return {
        success: false,
        message: "❌ ROBINHOOD_RPC is missing from your .env file."
      };
    }

    const provider = new ethers.JsonRpcProvider(rpc);

    const code = await provider.getCode(address);

    if (code === "0x") {
      return {
        success: false,
        message: "❌ No smart contract found."
      };
    }

    const contract = new ethers.Contract(address, ERC20_ABI, provider);

    const [
      name,
      symbol,
      decimals,
      totalSupply
    ] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.decimals(),
      contract.totalSupply()
    ]);

    // Run the other scanner modules in parallel
    const [
      liquidity,
      security,
      holders
    ] = await Promise.all([
      getLiquidity(address),
      getSecurity(address),
      getHolders(address)
    ]);

    const score = calculateScore(
      {
        name,
        symbol
      },
      liquidity,
      security,
      holders
    );

    const summary = richyAI(
      {
        name,
        symbol
      },
      liquidity,
      security,
      holders,
      score
    );

    return {
      success: true,

      address,

      name,
      symbol,
      decimals,

      totalSupply: ethers.formatUnits(
        totalSupply,
        decimals
      ),

      price: liquidity.priceUsd ?? "N/A",

      marketCap: liquidity.marketCap ?? "N/A",

      liquidity:
        liquidity.liquidityUsd ?? "N/A",

      holders:
        holders.holders ?? "Unknown",

      score:
        `${score.score}/100 (${score.risk})`,

      summary
    };

  } catch (err) {

    console.error(err);

    return {
      success: false,
      message:
        "❌ Scan failed.\n\n" + err.message
    };

  }
}