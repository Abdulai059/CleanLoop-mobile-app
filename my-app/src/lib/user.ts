// lib/user.ts
import { api } from "./api";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: string;
  status: string;
  dateOfBirth: string;
  profilePhotoUrl: string | null;
  regionId: string | null;
  districtId: string | null;
  communityId: string | null;
  createdAt: string;
  updatedAt: string;
  region: { id: string; name: string } | null;
  district: { id: string; name: string } | null;
  community: { id: string; name: string } | null;
  roles: string[];
};

export async function getMe(): Promise<User> {
  const { data } = await api.get("/users/me");
  return data.data.user;
}

export async function updateMe(payload: Partial<User>): Promise<User> {
  const { data } = await api.patch("/users/updateMe", payload);
  return data.data.user;
}
