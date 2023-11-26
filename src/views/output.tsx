// solana
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
// components
import Wallet from "../components/wallet/wallet.component";
// types
import { useState, type FC, useEffect } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { Answer, Question, QuestionPDA } from "../types";
import { Transaction } from "@solana/web3.js";
import toast from "react-hot-toast";
import { Output } from "../components/output/output.component";
import { SendReply } from "src/components/SendReply";

type Props = {
  pda: QuestionPDA;
};

export const OutputView: FC<Props> = ({ pda }) => {
  const { publicKey } = useWallet();
  const connection = useConnection();

  const [questions, setQuestions] = useState<string[]>([""]);

  const [answers, setAnswers] = useState<Answer[] | null>([
    { id: 1, answer: "" },
    { id: 2, answer: "" },
    { id: 3, answer: "" },
    { id: 4, answer: "" },
    { id: 5, answer: "" },
    { id: 6, answer: "" },
    { id: 7, answer: "" },
    { id: 8, answer: "" },
    { id: 9, answer: "" },
    { id: 10, answer: "" },
  ]);

  const [loading, setLoading] = useState(true);

  const [strings, setStrings] = useState<string[]>([""]);

  const [transaction, setTransaction] = useState<Transaction>();

  useEffect(() => {
    console.log("pda : ", pda);
    setQuestions(pda.questions);
    setAnswers(answers.splice(pda.questions.length));
    console.log(answers);
  }, []);

  useEffect(() => {
    if (answers.length > 0) {
      const newArray = answers.map(({ id, ...keepAttrs }) => keepAttrs.answer);
      setStrings(newArray);
      console.log("strings : ", strings);
    }
  }, [answers]);

  return (
    <div className="w-full flex flex-col justify-center items-center z-[999]">
      {publicKey ? (
        <div className="border border-primary rounded-md w-full md:max-w-[420px] flex flex-col items-center pb-8 bg-black">
          <h1 className="leading-relaxed text-xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195] mt-8">
            <span className="">new output</span>
          </h1>
          <div className="w-full flex justify-center items-center mb-8"></div>

          {questions.map((question, index) => {
            console.log("index : ", index);
            return (
              <div className="w-[100%]" key={index}>
                <span>{question}</span>
                <Output
                  answer={answers[index]}
                  answers={answers}
                  setAnswers={setAnswers}
                />
              </div>
            );
          })}

          <SendReply strings={strings} />
        </div>
      ) : (
        <Wallet />
      )}
    </div>
  );
};
