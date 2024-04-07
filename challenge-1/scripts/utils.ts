import { Address } from "@ton/core";
import { TonClient } from "@ton/ton";

export const toncenter = new TonClient({
  endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
});

export const nftCollectionAddress = Address.parse(
  "EQDf6HCOggN_ZGL6YsYleN6mDiclQ_NJOMY-x8G5cTRDOBW4"
);
//https://testnet.explorer.tonnft.tools/collection/EQDf6HCOggN_ZGL6YsYleN6mDiclQ_NJOMY-x8G5cTRDOBW4

export async function getNextItem() {
  const { stack } = await toncenter
    .provider(nftCollectionAddress)
    .get("get_collection_data", []);

  const nextItemIndex = stack.readBigNumber();

  return nextItemIndex;
}
