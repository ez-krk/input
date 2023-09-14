import { FC, PropsWithChildren, ReactChildren } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import localFont from "next/font/local";
const aTag = localFont({ src: "../../assets/fonts/adrip1.ttf" });

import Wallet from "../wallet/wallet.component";
import twitterIcon from "../../assets/img/twitter.svg";
import discordIcon from "../../assets/img/discord.svg";
import githubIcon from "../../assets/img/github.svg";

import type { WalletContextState } from "@solana/wallet-adapter-react";
import type { NextRouter } from "next/router";

type Props = {
  wallet: WalletContextState;
  router: NextRouter;
};

export const NavBar: FC<Props> = ({ wallet, router }) => (
  <div className="navbar h-[67.5px] text-[21px] flex flex-row shadow-lg bg-black text-neutral-content z-[999] border-b border-primary fixed top-0">
    <div className="navbar-start flex z-[1]">
      <Link href="/">
        <div className="flex btn btn-square btn-ghost btn-lg ml-10 justify-center items-center px-4">
          <span className="leading-relaxed text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195] lowercase tracking-widest">
            <span className={aTag.className}>input</span>
          </span>
        </div>
      </Link>
    </div>

    {/* Nav Links */}
    {/* <div className="hidden md:inline md:navbar-center z-[999]">
      <div className="flex items-stretch z-[999]">
        <Link href="/">
          <span className="btn btn-sm btn-ghost rounded-btn lowercase">
            home
          </span>
        </Link>
        <Link href="/roadmap">
          <span className="btn btn-sm btn-ghost rounded-btn lowercase">
            roadmap
          </span>
        </Link>
        <Link href="/pricing">
          <span className="btn btn-sm btn-ghost rounded-btn lowercase">
            pricing
          </span>
        </Link>
        <Link href="/docs">
          <span className="btn btn-sm btn-ghost rounded-btn lowercase">
            docs
          </span>
        </Link>
      </div>
    </div> */}

    {/* Wallet & Settings */}
    <div className="navbar-end">
      <div className="flex items-center justify-end">
        <span className="mr-5 mt-1 cursor-pointer">
          <Link
            href="https://twitter.com/krkfinance"
            target={"_blank"}
            rel="noreferrer"
          >
            <Image
              src={twitterIcon}
              priority
              alt="follow us on twitter"
              className=""
            />
          </Link>
        </span>
        <span className="mr-5 mt-1 cursor-pointer">
          <Link
            href="https://discord.gg/jpWc7A6dcf"
            target={"_blank"}
            rel="noreferrer"
          >
            <Image src={discordIcon} priority alt="join our discord" />
          </Link>
        </span>
        <span className="mr-10 mt-1 cursor-pointer">
          <Link
            href="https://github.com/krk-finance"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={githubIcon} priority alt="join our discord" />
          </Link>
        </span>

        {wallet.publicKey && (
          <span className="border-r border-primary h-[40px]"></span>
        )}
      </div>
      {wallet.publicKey && <Wallet />}
    </div>
  </div>
);
