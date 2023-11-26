import React, { useRef, useState, useEffect, useContext } from "react";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineCheck,
} from "react-icons/ai";
import { MdDone } from "react-icons/md";
import type { Answer } from "../../types";

import { toast } from "react-hot-toast";
import type { SetStateAction } from "react";

interface Props {
  answer: Answer;
  answers: Answer[] | null;
  setAnswers: React.Dispatch<SetStateAction<Answer[] | null>>;
}

export const Output: React.FC<Props> = ({ answer, answers, setAnswers }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(answer.answer);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleEditNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  };

  const handleEditNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editName) {
      toast.error("anwser is empty !");
    } else {
      setAnswers(
        answers!.map((item) =>
          item.id === answer.id ? { ...item, question: editName } : item
        )
      );
    }
    setEdit(false);
  };

  const handleDelete = () => {
    answers && setAnswers(answers.filter((item) => item.id !== answer!.id));
  };

  return (
    <form
      className="flex justify-center items-center w-full border border-primary rounded-md mb-2 px-2"
      onSubmit={handleEditNameSubmit}
    >
      {edit ? (
        <input
          autoFocus
          className="w-[88%] flex-1 rounded-md px-1 text-[#000] outline-none"
          type="text"
          ref={inputRef}
          value={editName}
          onChange={handleEditNameChange}
        />
      ) : (
        <span className="w-[88%] font-bold">{answer.answer}</span>
      )}
      <div className="flex justify-center items-center w-[12%] space-x-2 gap-1">
        <span className="flex cursor-pointer text-[25px]" onClick={handleEdit}>
          {!edit ? (
            <AiOutlineEdit className="text-info w-6 h-6" />
          ) : (
            <button type="submit">
              <AiOutlineCheck className="text-info w-6 h-6" />
            </button>
          )}
        </span>
        <div className="w-[12%] flex justify-center items-center">
          <div
            className="tooltip hover:tooltip-open tooltip-error"
            data-tip="remove question"
          >
            <AiOutlineDelete
              className="text-error w-6 h-6"
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
