import { api } from "./api";

export type Community = {
  id: string;
  name: string;
  districtId: string;
};

// Get many communities by district
export async function getCommunities(districtId: string): Promise<Community[]> {
  const { data } = await api.get(`/communities`, {
    params: { districtId },
  });
  return data.data.communities;
}

// Get one community by id  ← add this
export async function getCommunity(communityId: string): Promise<Community> {
  const { data } = await api.get(`/communities/${communityId}`);
  return data.data.community; // adjust if your response is different
}
