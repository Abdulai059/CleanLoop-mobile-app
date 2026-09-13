import { useEffect } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Stack } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function AppLayout() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const token = await SecureStore.getItemAsync("authToken");
      if (!token) {
        router.replace("/(auth)/login");
      }
    }
    checkAuth();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(modals)" options={{ presentation: "modal" }} />
    </Stack>
  );
}
