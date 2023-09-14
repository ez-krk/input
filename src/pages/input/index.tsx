import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import Layout from "../../layout";

import type { QuestionPDA } from "../../types";
import { AccountInfo, Connection, PublicKey } from "@solana/web3.js";
import { PROGRAM_ID, SOLANA_RPC_ENDPOINT } from "src/constants";
import { Address, BN, Program } from "@coral-xyz/anchor";
import { IDL } from "../../programs/form";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { ellipsis } from "../../tools/core/ellipsis";
import Spinner from "../../components/spinner/spinner.component";

import type { NextPage, GetServerSideProps } from "next";

// component render function
const Input: NextPage = () => {
  const { publicKey } = useWallet();
  const connection = useConnection();

  const [loading, setLoading] = useState(true);
  const [inputs, setInputs] = useState<QuestionPDA[]>([]);
  const [pdas, setPdas] = useState<
    {
      pubkey: PublicKey;
      account: AccountInfo<Buffer>;
    }[]
  >();

  const cnx = useMemo(() => new Connection(SOLANA_RPC_ENDPOINT), []);
  const program = useMemo(
    () => new Program(IDL, PROGRAM_ID as Address, connection),
    [connection]
  );

  const router = useRouter();

  useEffect(() => {
    if (!inputs && pdas) {
      const fetchAcc = async (pk: PublicKey) => {
        // @ts-ignore
        return await program.account.questions.fetch(pk);
      };
      pdas.map((pda) => {
        fetchAcc(pda.pubkey).then((res) => {
          console.log(res);
        });
      });
    }
  }, []);

  useEffect(() => {
    if (!pdas) {
      const getPdas = async () => {
        const info = await cnx.getProgramAccounts(new PublicKey(PROGRAM_ID));
        console.log(info);
        return info;
      };

      getPdas()
        .then((res) => {
          res.forEach(async (pda) => {
            console.log(pda.pubkey.toBase58());
            // @ts-ignore
            const acc: QuestionPDA = await program.account.questions.fetch(
              pda.pubkey
            );
            console.log(acc);
            inputs.push(acc);
          });
          setPdas(res);
        })
        .finally(() => {
          console.log("inputs : ", inputs);
          setInputs(inputs);
          setTimeout(() => {
            setLoading(false);
          }, 1337);
        });
    }
  }, [cnx, inputs, pdas]);

  const onClick = () => {};

  return (
    <Layout>
      {!loading && inputs.length > 0 ? (
        <div className="mt-[67.5px] flex flex-col justify-center items-center z-[750] w-full">
          <h1 className="my-8">input</h1>
          <div className="grid grid-cols-2 gap-4">
            {pdas.map((p, i) => {
              return (
                <div key={p.pubkey.toBase58()} className="mb-2">
                  <div className="card w-96 glass mx-auto">
                    <div className="card-body">
                      <h2 className="card-title bg-black p-4 rounded-md">
                        {/* {ellipsis(p.pubkey.toBase58())} */}
                        {p.pubkey.toBase58()}
                      </h2>
                      {inputs[i].questions.map((question) => (
                        <p
                          className="text-xs bg-black p-4 rounded-md text-justify"
                          key={i}
                        >
                          {question}
                        </p>
                      ))}
                      <div className="card-actions  justify-end"></div>
                      <div className="stats shadow bg-black">
                        <div className="stat">
                          <div className="stat-figure text-primary">
                            <button
                              className="btn btn-primary lowercase"
                              onClick={() => {
                                router.push({
                                  pathname: `/input/${p.pubkey.toBase58()}`,
                                });
                              }}
                            >
                              input
                            </button>

                            {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block w-8 h-8 stroke-current"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            ></path>
                          </svg> */}
                          </div>
                          <div className="stat-title">participants :</div>
                          <div className="stat-value text-primary">
                            {inputs[i].participants.toString()}
                          </div>
                          <div className="stat-desc">
                            created at :{" "}
                            {new Date(
                              inputs[i].createdAt * 1000
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};

export default Input;
