// lib/household.ts
import { api } from "./api";

export type Household = {
  id: string;
  address: string;
  regionId: string;
  districtId: string;
  communityId: string;
  // add any other fields your householdService actually returns
};

export type CreateHouseholdPayload = {
  name: string;
  communityId: string;
  latitude?: number;
  longitude?: number;
};

export async function createHousehold(
  payload: CreateHouseholdPayload,
): Promise<Household> {
  const { data } = await api.post("/households", payload);
  return data.data;
}

export async function getMyHousehold(): Promise<Household> {
  const { data } = await api.get("/households/me");
  return data.data;
}

export async function updateMyHousehold(
  payload: Partial<CreateHouseholdPayload>,
): Promise<Household> {
  const { data } = await api.patch("/households/me", payload);
  return data.data;
}
