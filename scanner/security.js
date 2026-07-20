import { ethers } from "ethers";

const ERC20_ABI = [
  "function owner() view returns (address)"
];

export async function getSecurity(address) {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.ROBINHOOD_RPC);

    const code = await provider.getCode(address);

    if (code === "0x") {
      return {
        success: false,
        message: "No smart contract found."
      };
    }

    let owner = "Unknown";
    let ownership = "Unknown";

    try {
      const contract = new ethers.Contract(address, ERC20_ABI, provider);
      owner = await contract.owner();

      if (owner === "0x0000000000000000000000000000000000000000") {
        ownership = "Renounced";
      } else {
        ownership = "Active";
      }

    } catch {
      ownership = "Not Available";
    }

    return {
      success: true,
      contract: true,
      ownership,
      owner,
      verified: "Unknown",
      mintable: "Unknown",
      blacklist: "Unknown",
      proxy: "Unknown"
    };

  } catch (err) {
    return {
      success: false,
      message: err.message
    };
  }
}