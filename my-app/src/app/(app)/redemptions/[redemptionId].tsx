import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRedemption } from "@/hooks/useRedemption";
import { Ionicons } from "@expo/vector-icons";

export default function RedemptionDetailScreen() {
  const { redemptionId } = useLocalSearchParams<{ redemptionId: string }>();
  const router = useRouter();
  const { data: redemption, isLoading, error } = useRedemption(redemptionId);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator color="#16a34a" />
      </View>
    );
  }

  if (error || !redemption) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-8">
        <Text className="text-slate-500 text-center">
          Redemption not found.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-5 pt-16 pb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center mr-3"
        >
          <Ionicons name="arrow-back" size={20} color="#0f172a" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900">
          Redemption Details
        </Text>
      </View>

      <View className="flex-1 px-6">
        <Text className="text-2xl font-bold text-slate-900">
          {redemption.reward.name}
        </Text>

        <View className="mt-6 bg-slate-50 rounded-2xl p-5">
          <View className="flex-row justify-between mb-3">
            <Text className="text-slate-400">Status</Text>
            <Text className="text-slate-900 font-semibold">
              {redemption.status}
            </Text>
          </View>
          <View className="flex-row justify-between mb-3">
            <Text className="text-slate-400">Points Spent</Text>
            <Text className="text-slate-900 font-semibold">
              {redemption.pointsSpent}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-slate-400">Date</Text>
            <Text className="text-slate-900 font-semibold">
              {new Date(redemption.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
