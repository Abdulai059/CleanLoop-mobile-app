import { useEffect } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { View, Text, Image, ActivityIndicator } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const token = await SecureStore.getItemAsync("authToken");
      if (token) {
        router.replace("/(app)/(tabs)");
      } else {
        router.replace("/(auth)/login");
      }
    }
    checkAuth();
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Image
        source={require("../../assets/rubaking1.jpg")}
        className="w-[200px] h-[200px] mb-6 object-contain"
      />

      <View className="flex-row items-baseline">
        <Text className="text-5xl font-black tracking-tight text-slate-900">
          Pikup
        </Text>
        <View className="h-2 w-2 rounded-full bg-[#59c51f] ml-0.5" />
      </View>

      <View className="absolute bottom-16">
        <ActivityIndicator size="large" color="#59c51f" />
      </View>
    </View>
  );
}
