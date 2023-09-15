// solana
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
// components
import Wallet from "../components/wallet/wallet.component";
// types
import { useState, type FC, useEffect } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { Question } from "../types";
import { Transaction } from "@solana/web3.js";
import toast from "react-hot-toast";
import { SendTransaction } from "../components/SendTransaction";
import { Output } from "../components/output/output.component";

export const OutputView: FC = () => {
  const { publicKey } = useWallet();
  const connection = useConnection();
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, question: "you okay anon ?" },
  ]);
  const [strings, setStrings] = useState<string[]>([""]);

  const [transaction, setTransaction] = useState<Transaction>();

  useEffect(() => {
    if (questions.length > 1) {
      const newArray = questions.map(
        ({ id, ...keepAttrs }) => keepAttrs.question
      );
      setStrings(newArray);
      console.log("strings : ", strings);
    }
  }, [questions]);

  const onClickAdd = () => {
    if (questions.length >= 10) {
      toast.error("max 10 questions !");
    } else {
      setQuestions([
        ...questions,
        {
          id: questions.length + 1,
          question: "what's on your mind ?",
        },
      ]);
    }
  };

  useEffect(() => {
    if (questions && questions.length > 0) {
      const newArray = questions.map(
        ({ id, ...keepAttrs }) => keepAttrs.question
      );
      setStrings(newArray);
    }
  }, [questions]);

  return (
    <div className="w-full flex flex-col justify-center items-center z-[999]">
      {publicKey ? (
        <div className="border border-primary rounded-md w-full md:max-w-[420px] flex flex-col items-center pb-8 bg-black">
          <h1 className="leading-relaxed text-xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195] mt-8">
            <span className="">new entry</span>
          </h1>
          <div className="w-full flex justify-center items-center mb-8">
            <div
              className="tooltip hover:tooltip-open tooltip-success"
              data-tip="add question"
            >
              <AiOutlinePlusCircle
                className="text-success w-6 h-6 mt-4"
                onClick={onClickAdd}
              />
            </div>
          </div>

          {questions &&
            questions.map((question) => {
              return (
                <div className="w-[100%]" key={question.id}>
                  <Output
                    question={question}
                    questions={questions}
                    setQuestions={setQuestions}
                  />
                </div>
              );
            })}

          <SendTransaction strings={strings} />
        </div>
      ) : (
        <Wallet />
      )}
    </div>
  );
};
