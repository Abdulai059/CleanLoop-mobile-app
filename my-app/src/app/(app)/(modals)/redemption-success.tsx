// app/(app)/rewards/success.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RedemptionSuccessScreen() {
  const router = useRouter();
  const { rewardName, pointsUsed, status, redemptionId } =
    useLocalSearchParams<{
      rewardName: string;
      pointsUsed: string;
      status: string;
      redemptionId: string;
    }>();

  return (
    <SafeAreaView
      className="flex-1 bg-white items-center justify-center px-8"
      edges={["top"]}
    >
      <View className="w-20 h-20 rounded-full bg-green-100 items-center justify-center mb-6">
        <Ionicons name="checkmark" size={40} color="#16a34a" />
      </View>

      <Text className="text-2xl font-bold text-slate-900 text-center mb-2">
        Redemption Successful
      </Text>
      <Text className="text-base text-slate-700 text-center mb-1">
        {rewardName}
      </Text>
      <Text className="text-sm text-slate-500 text-center mb-6">
        {Number(pointsUsed).toLocaleString()} points used
      </Text>

      <View className="bg-slate-50 rounded-xl px-4 py-2 mb-10">
        <Text className="text-sm text-slate-600">
          Status: <Text className="font-semibold">{status}</Text>
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.replace("/(app)/(tabs)")}
        className="w-full rounded-2xl py-4 items-center border border-slate-200"
      >
        <Text className="text-slate-700 font-semibold text-base">
          Back to Home
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
