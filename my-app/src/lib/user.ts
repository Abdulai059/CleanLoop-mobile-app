// lib/user.ts
import { api } from "./api";

export type User = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  phone: string;
  email: string | null;
  gender: string | null;
  status: string;
  dateOfBirth: string | null;
  profilePhotoUrl: string | null;
  region: { id: string; name: string } | null;
  district: { id: string; name: string } | null;
  community: { id: string; name: string } | null;
  roles: string[];
};

export async function getMe(): Promise<User> {
  const { data } = await api.get("/users/me");
  return data.data.user;
}

export async function updateMe(
  payload: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    dateOfBirth: string;
    profilePhotoUrl: string;
    regionId: string;
    districtId: string;
    communityId: string;
  }>,
): Promise<User> {
  const { data } = await api.patch("/users/updateMe", payload);
  return data.data.user;
}
