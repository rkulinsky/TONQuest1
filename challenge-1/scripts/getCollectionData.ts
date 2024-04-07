import { getTonClient, nftCollectionAddress } from "./utils";

export async function getCollectionData() {
  const client = await getTonClient();

  const { stack } = await client
    .provider(nftCollectionAddress)
    .get("get_collection_data", []);

  const nextItemIndex = stack.readBigNumber();
  const contentRoot = stack.readCell();
  const owner = stack.readAddress();

  console.log("Collection info, from get_collection_data() method:");
  console.log("Next item index:", nextItemIndex.toString());
  console.log("Content root cell:", contentRoot);
  console.log("Collection owner adress:", owner);

  return nextItemIndex;
}

getCollectionData();
