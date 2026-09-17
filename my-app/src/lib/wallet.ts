// lib/wallet.ts
import { api } from "./api";

export async function getWallet(): Promise<{ balance: number }> {
  const { data } = await api.get("/points/wallet");
  return data.data.wallet; // adjust
}
