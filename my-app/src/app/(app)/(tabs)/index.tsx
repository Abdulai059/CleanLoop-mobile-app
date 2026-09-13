import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function HomeScreen() {
  const router = useRouter();

  async function handleLogout() {
    await SecureStore.deleteItemAsync("authToken");
    router.replace("/(auth)/login");
  }

  return (
    <View className="flex-1 bg-[#f7f9fc] px-8 pt-16">
      <View className="flex-row justify-between items-center mb-8">
        <Text className="text-2xl font-bold text-slate-900">Home</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text className="text-red-500 font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <Text className="text-slate-500 text-sm mb-1">Your Points</Text>
        <Text className="text-4xl font-bold text-slate-900">0</Text>
      </View>

      <View className="bg-white rounded-2xl p-6 shadow-sm">
        <Text className="text-lg font-semibold text-slate-900 mb-4">
          Quick Actions
        </Text>
        <TouchableOpacity className="bg-[#a9e08b] py-4 rounded-xl items-center mb-3">
          <Text className="text-slate-900 font-bold">Deposit Plastic</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#fec43a] py-4 rounded-xl items-center">
          <Text className="text-white font-bold">Redeem Rewards</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
