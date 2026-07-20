import { JsonRpcProvider } from "ethers";

const provider = new JsonRpcProvider(process.env.RPC_URL);

export async function getProvider() {
  try {
    const network = await provider.getNetwork();

    return {
      success: true,
      chainId: Number(network.chainId),
      provider
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}