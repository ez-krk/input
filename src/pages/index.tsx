import type { NextPage } from "next";
import Head from "next/head";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import Layout from "../layout";
import { HomeView } from "../views/home";
import { InputView } from "../views/input";
import Wallet from "../components/wallet/wallet.component";
import { Connection, PublicKey } from "@solana/web3.js";
import { PROGRAM_ID, SOLANA_RPC_ENDPOINT } from "../constants";
import { Address, Program } from "@coral-xyz/anchor";
import { IDL } from "src/programs/form";

const Home: NextPage = () => {
  const { publicKey } = useWallet();
  const connection = useConnection();
  const cnx = new Connection(SOLANA_RPC_ENDPOINT);
  const program = new Program(IDL, PROGRAM_ID as Address, connection);

  const pdas = async () => {
    const info = await cnx.getProgramAccounts(new PublicKey(PROGRAM_ID));
    console.log(info);
    return info;
  };

  pdas().then((res) => {
    res.forEach(async (pda) => {
      console.log(pda.pubkey.toBase58());
      // @ts-ignore
      const acc = await program.account.questions.fetch(pda.pubkey);
      console.log(acc);
    });
  });

  return (
    <>
      <Head>
        <title>input ─ home</title>
        <meta property="og:title" content="input ─ new" />
        <meta property="og:site_name" content="input.xyz" />
        <meta property="og:url" content="https://input.xyz/" />
        <meta
          property="og:description"
          content="whitelist & fundraising management platform"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/EsyWin/cdn/main/krk.finance/assets/img/krk_embed_2.png"
        />
      </Head>
      <Layout>
        <HomeView />
        {publicKey ? <InputView /> : <Wallet />}
      </Layout>
    </>
  );
};

export default Home;
