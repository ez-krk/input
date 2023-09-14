import { Cluster } from "@solana/web3.js";
import { ENV as ENVChainId } from "@solana/spl-token-registry";

export const PROGRAM_ID =
  (process.env.NEXT_PUBLIC_PROGRAM_ID as string) ||
  "DEVK1cQcDUsCwnE1rZvKvEeg4GmPo4SSfmV3cb1TEw2u";

// Endpoints, connection
export const ENV: Cluster =
  (process.env.NEXT_PUBLIC_CLUSTER as Cluster) || "devnet";

export const CHAIN_ID =
  ENV === "mainnet-beta"
    ? ENVChainId.MainnetBeta
    : ENV === "devnet"
    ? ENVChainId.Devnet
    : ENV === "testnet"
    ? ENVChainId.Testnet
    : ENVChainId.MainnetBeta;

// Token Mints
export const INPUT_MINT_ADDRESS =
  ENV === "devnet"
    ? "So11111111111111111111111111111111111111112" // SOL
    : "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"; // USDC
export const OUTPUT_MINT_ADDRESS =
  ENV === "devnet"
    ? "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt" // SRM
    : "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"; // USDT

// Token
export interface Token {
  chainId: number; // 101,
  address: string; // '8f9s1sUmzUbVZMoMh6bufMueYH1u4BJSM57RCEvuVmFp',
  symbol: string; // 'TRUE',
  name: string; // 'TrueSight',
  decimals: number; // 9,
  logoURI: string; // 'https://i.ibb.co/pKTWrwP/true.jpg',
  tags: string[]; // [ 'utility-token', 'capital-token' ]
}

export const SOLANA_RPC_ENDPOINT =
  (process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT as string) ||
  "https://api.devnet.solana.com";

export const COLLECTION_ADDRESS =
  (process.env.NEXT_PUBLIC_COLLECTION_ADDRESS as string) || null;

export enum HolderEnum {
  Yay,
  Nay,
}

export const CANDY_MACHINE_ID =
  (process.env.NEXT_PUBLIC_CANDY_MACHINE_ID as string) ||
  "3HjZkEgByv7Y8KgYZ9ZNvrFp4TNyyBQdhHUhmjkV6bha";

export const TREASURY_ADDRESS =
  (process.env.NEXT_PUBLIC_TREASURY_ADDRESS as string) || null;

export const WHITELIST_TOKEN =
  (process.env.NEXT_PUBLIC_WHITELIST_TOKEN as string) ||
  "25ZFsHJgbHd2XvJcdndXzo7CgK7CPSecVuKoPJVMTssm";
