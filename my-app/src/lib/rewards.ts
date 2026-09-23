// lib/rewards.ts
import { api } from "./api";

export type Reward = {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  imageUrl: string;
  status: string;
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
};

export async function getRewards(): Promise<Reward[]> {
  const { data } = await api.get("/rewards");
  return data?.data ?? [];
}

export async function getReward(rewardId: string): Promise<Reward> {
  const { data } = await api.get(`/rewards/${rewardId}`);
  return data.data;
}


