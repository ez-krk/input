import { Connection, PublicKey } from "@solana/web3.js";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { PROGRAM_ID, SOLANA_RPC_ENDPOINT } from "../../constants";
import { Address, Program } from "@coral-xyz/anchor";
import { useState, useEffect } from "react";
import Layout from "src/layout";
import { IDL } from "src/programs/form";
import { useConnection } from "@solana/wallet-adapter-react";
import { QuestionPDA } from "src/types";

import { NextPage } from "next";

interface Iparams extends ParsedUrlQuery {
  pubkey: string;
}

type Props = {
  pubkey: string;
};

const Input: NextPage<Props> = ({ pubkey }) => {
  const connection = useConnection();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<QuestionPDA>();
  const program = new Program(IDL, PROGRAM_ID as Address, connection);

  useEffect(() => {
    const fetchPda = async () => {
      // @ts-ignore
      const pda: QuestionPDA = await program.account.questions.fetch(pubkey);
      return pda;
    };
    fetchPda()
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  });
  return (
    <Layout>
      <h1 className="z-[999]">{pubkey}</h1>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cnx = new Connection(SOLANA_RPC_ENDPOINT);

  const { pubkey } = context.params as Iparams;

  // @ts-ignore

  return {
    props: {
      pubkey,
    },
  };
};

// export const getStaticPaths: GetStaticPaths = () => {

//   // map through to return post paths
//   const paths = posts.map((post) => ({
//     params: {
//       slug: post.slug,
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

export default Input;
