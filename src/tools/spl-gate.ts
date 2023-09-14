import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

import { Holder } from "../types";

export const isHolder = async ({
  ownerAddress,
  tokenPublicKey,
}: {
  ownerAddress: PublicKey;
  tokenPublicKey: PublicKey;
}): Promise<Holder> => {
  const connection = new Connection(clusterApiUrl("devnet"));
  const ownerPublicKey = new PublicKey(ownerAddress);
  const balance = await connection.getParsedTokenAccountsByOwner(
    ownerPublicKey,
    {
      mint: tokenPublicKey,
    }
  );
  // console.log(balance);
  if (balance.value.length == 1) {
    return Holder.Yay;
  } else if (balance.value.length == 0) {
    return Holder.Nay;
  } else {
    return Holder.Nay;
  }
};
