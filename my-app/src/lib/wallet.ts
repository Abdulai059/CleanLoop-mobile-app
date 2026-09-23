// lib/wallet.ts
import { api } from "./api";

export type Wallet = {
  id: string;
  userId: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
};

export type WalletTransaction = {
  id: string;
  walletId: string;
  type: "EARN" | "REDEEM" | "ADJUSTMENT" | "REVERSAL";
  amount: number;
  balanceAfter: number;
  referenceId?: string | null;
  description?: string | null;
  createdAt: string;
};

export async function getMyWallet(): Promise<Wallet> {
  const { data } = await api.get("/wallet");
  return data.data;
}

export async function getMyTransactions(): Promise<WalletTransaction[]> {
  const { data } = await api.get("/wallet/transactions");
  return data.data ?? [];
}
