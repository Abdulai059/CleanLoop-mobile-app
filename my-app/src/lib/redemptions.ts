// lib/redemptions.ts
import { api } from "./api";

export type Redemption = {
  id: string;
  status: string;
  pointsSpent: number;
  createdAt: string;
  reward: {
    id: string;
    name: string;
    pointsCost: number;
  };
};

export async function createRedemption(rewardId: string): Promise<Redemption> {
  const { data } = await api.post("/redemptions", { rewardId });
  return data.data;
}

export async function getMyRedemptions(): Promise<Redemption[]> {
  const { data } = await api.get("/redemptions/me");
  return data.data.redemptions;
}
