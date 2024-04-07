import { getHttpEndpoint } from "@orbs-network/ton-access";
import { Address } from "@ton/core";
import { TonClient } from "@ton/ton";
import dotenvFlow from "dotenv-flow";

dotenvFlow.config({ debug: false });

export const nftCollectionAddress = Address.parse(process.env.COLL_ADDRESS);

export async function getTonClient() {
  const network = process.env.NODE_ENV === "production" ? "mainnet" : "testnet";

  console.log(`Network: ${network}`);

  return new TonClient({
    endpoint: await getHttpEndpoint({
      network,
    }),
  });
}

export async function getNextItem() {
  const client = await getTonClient();

  const { stack } = await client
    .provider(nftCollectionAddress)
    .get("get_collection_data", []);

  const nextItemIndex = stack.readBigNumber();

  return nextItemIndex;
}
