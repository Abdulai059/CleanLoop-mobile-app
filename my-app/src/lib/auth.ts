// lib/auth.ts
import * as SecureStore from "expo-secure-store";
import { api } from "./api";

export async function login(payload: { phone: string; password: string }) {
  const { data } = await api.post("/users/login", payload);
  await SecureStore.setItemAsync("authToken", data.token);
  return data;
}

export async function signup(payload: {
  phone: string;
  password: string;
  confirmPassword: string;
}) {
  const { data } = await api.post("/users/signup", payload);
  await SecureStore.setItemAsync("authToken", data.token);
  return data;
}

export async function logout() {
  await api.post("/users/logout");
  await SecureStore.deleteItemAsync("authToken");
}
