import Link from "next/link";
import Image from "next/image";

import Wallet from "../wallet/wallet.component";

import solamafm from "../../assets/img/solanafm.png";
import solscan from "../../assets/img/solscan.png";
import explorer from "../../assets/img/explorer.png";
import xray from "../../assets/img/helius_logo.png";

import { COLLECTION_ADDRESS } from "../../constants";

import type { FC } from "react";

export const NotHolder: FC = () => (
  <div className="flex flex-col justify-center items-center h-screen w-screen">
    {/* <h1>Sorry.</h1> */}
    <Wallet />
    <p className="w-96 font-bold my-1 text-xs text-center mx-auto">
      you need an NFT to access this content.
    </p>
    {
      COLLECTION_ADDRESS ? (
        <>
          <p className="w-96 font-bold my-1 text-xs text-center mx-auto">
            collection address :{" "}
            <Link href="">
              <code className="code">{`${COLLECTION_ADDRESS}`}</code>
            </Link>
          </p>
          <div className="flex justify-center items-center space-x-4 mt-2">
            <Link href={`https://solana.fm/address/${COLLECTION_ADDRESS}`}>
              <Image
                src={solamafm}
                width={12}
                height={12}
                alt={``}
                className="rounded-full"
              />
            </Link>
            <Link href={`https://solscan.io/token/${COLLECTION_ADDRESS}`}>
              <Image
                src={solscan}
                width={16}
                height={16}
                alt={``}
                className="rounded-full"
              />
            </Link>
            <Link href={`https://explorer.solana.com/address/${COLLECTION_ADDRESS}`}>
              <Image
                src={explorer}
                width={20}
                height={20}
                alt={``}
                className="rounded p-1"
              />
            </Link>
            <Link href={`https://xray.helius.xyz/token/${COLLECTION_ADDRESS}`}>
              <Image
                src={xray}
                width={18}
                height={18}
                alt={``}
                className="rounded-full"
              />
            </Link>
          </div>
        </>
      ) : (
        <p>
          mint on 16/09 at 4:20pm UTC 👉 <Link href="https://zealy.io/c/krk/questboard" className="text-success underline cursor-pointer hover:text-white">how to get wl</Link>
        </p>)
    }
    {/* <div>
      <p className="w-96 font-bold my-1 text-xs text-center mx-auto">
        trade on tensorswap
      </p>
    </div> */}
  </div>
);
