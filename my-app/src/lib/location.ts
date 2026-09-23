// lib/location.ts
import { api } from "./api";

export type Region = { id: string; name: string };
export type District = { id: string; name: string; regionId: string };
export type Community = { id: string; name: string; districtId: string };

export async function getRegions(): Promise<Region[]> {
  const { data } = await api.get("/locations/regions");
  return data?.data?.regions ?? [];
}

export async function getDistricts(regionId: string): Promise<District[]> {
  const { data } = await api.get(`/locations/regions/${regionId}/districts`);
  return data?.data?.districts ?? [];
}

export async function getCommunities(districtId: string): Promise<Community[]> {
  const { data } = await api.get(
    `/locations/districts/${districtId}/communities`,
  );
  return data?.data?.communities ?? [];
}
