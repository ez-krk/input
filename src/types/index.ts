import type { PublicKey } from "@solana/web3.js";

export enum Holder {
  Yay,
  Nay,
}

export type EndpointTypes = "mainnet" | "devnet" | "localnet";

export type Question = {
  id: number;
  question: string;
};

export type QuestionPDA = {
  owner: PublicKey;
  questions: string[];
  participants: number;
  createdAt: number;
  seed: number;
  bump: number;
};
