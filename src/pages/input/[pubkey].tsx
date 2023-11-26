import { useState, useEffect } from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

import { Connection, PublicKey } from "@solana/web3.js";
import { ParsedUrlQuery } from "querystring";
import { PROGRAM_ID, SOLANA_RPC_ENDPOINT } from "../../constants";
import { Address, Program } from "@coral-xyz/anchor";
import Layout from "../../layout";
import { IDL } from "../../programs/form";
import { useConnection } from "@solana/wallet-adapter-react";
import { QuestionPDA } from "../../types";

import Spinner from "../../components/spinner/spinner.component";
import { OutputView } from "../../views/output";

import type { NextPage } from "next";

interface Iparams extends ParsedUrlQuery {
  pubkey: string;
}

type Props = {
  pubkey: string;
};

const Input: NextPage<Props> = ({ pubkey }) => {
  const connection = useConnection();
  const [loading, setLoading] = useState(true);
  const [pda, setPda] = useState<QuestionPDA>();
  const [answers, setAnswers] = useState<QuestionPDA>();
  const program = new Program(IDL, PROGRAM_ID as Address, connection);

  useEffect(() => {
    const fetchPda = async () => {
      // @ts-ignore
      const pda: QuestionPDA = await program.account.questions.fetch(pubkey);
      return pda;
    };
    fetchPda()
      .then((res) => setPda(res))
      .finally(() => setLoading(false));
  });
  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="z-[999]">{pubkey}</h1>
          <OutputView pda={pda} />
        </>
      )}
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
