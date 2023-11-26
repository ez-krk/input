import { FC, useCallback, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  SystemProgram,
  TransactionSignature,
} from "@solana/web3.js";
import { Program, Address, BN } from "@coral-xyz/anchor";
import { IDL } from "../programs/form";
import { notify } from "../tools/notify";
import { PROGRAM_ID, SOLANA_RPC_ENDPOINT } from "../constants";

type Props = {
  strings: string[];
};

export const SendReply: FC<Props> = ({ strings }) => {
  const connection = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const cnx = new Connection(SOLANA_RPC_ENDPOINT);

  const onClick = async () => {
    if (!publicKey) {
      notify({ type: "error", message: `Wallet not connected!` });
      console.log("error", `Send Transaction: Wallet not connected!`);
      return;
    }
    console.log("strings : ", strings);

    let signature: TransactionSignature = "";
    try {
      function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
      }
      const seed = new BN(getRandomInt(1337));
      const program = new Program(IDL, PROGRAM_ID as Address, connection);

      const pda = PublicKey.findProgramAddressSync(
        [
          Buffer.from("questions"),
          publicKey.toBytes(),
          seed.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      )[0];

      const transaction = await program.methods
        .newQuestions(strings, seed)
        .accounts({
          owner: publicKey,
          questions: pda,
          systemProgram: SystemProgram.programId,
        })
        .transaction();

      signature = await sendTransaction(transaction, cnx);

      await cnx.confirmTransaction(signature, "confirmed");
      notify({
        type: "success",
        message: "Transaction successful!",
        txid: signature,
      });
    } catch (error: any) {
      notify({
        type: "error",
        message: `Transaction failed!`,
        description: error?.message,
        txid: signature,
      });
      console.log("error", `Transaction failed! ${error?.message}`, signature);
      return;
    }
  };

  return (
    <div
      className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
      onClick={onClick}
      // disabled={!publicKey}
    >
      <div className="hidden group-disabled:block ">Wallet not connected</div>
      <span className="block group-disabled:hidden">Send Output</span>
    </div>
  );
};
