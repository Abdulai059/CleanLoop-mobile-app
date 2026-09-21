import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRedemption } from "@/hooks/useRedemption";
import { Ionicons } from "@expo/vector-icons";

const STATUS_STYLES: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  PENDING: { bg: "bg-amber-50", text: "text-amber-700", label: "Pending" },
  COMPLETED: { bg: "bg-green-50", text: "text-green-700", label: "Completed" },
  CANCELLED: { bg: "bg-red-50", text: "text-red-600", label: "Cancelled" },
  FAILED: { bg: "bg-red-50", text: "text-red-600", label: "Failed" },
};

export default function RedemptionDetailScreen() {
  const { redemptionId } = useLocalSearchParams<{ redemptionId: string }>();
  const router = useRouter();
  const { data: redemption, isLoading, error } = useRedemption(redemptionId);

  if (isLoading) {
    return (
      <SafeAreaView
        className="flex-1 items-center justify-center bg-[#f7f9fc]"
        edges={["top"]}
      >
        <ActivityIndicator color="#16a34a" />
      </SafeAreaView>
    );
  }

  if (error || !redemption) {
    return (
      <SafeAreaView
        className="flex-1 items-center justify-center bg-[#f7f9fc] px-8"
        edges={["top"]}
      >
        <View className="w-16 h-16 rounded-full bg-slate-100 items-center justify-center mb-4">
          <Ionicons name="alert-circle-outline" size={28} color="#94a3b8" />
        </View>
        <Text className="text-slate-500 text-center">
          Redemption not found.
        </Text>
      </SafeAreaView>
    );
  }

  const status = STATUS_STYLES[redemption.status] ?? {
    bg: "bg-slate-100",
    text: "text-slate-600",
    label: redemption.status,
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f7f9fc]" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-5 pt-2 pb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white border border-slate-100 items-center justify-center mr-3"
        >
          <Ionicons name="arrow-back" size={20} color="#0f172a" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900">
          Redemption Details
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero card */}
        <View className="bg-white rounded-3xl p-6 items-center mb-5 border border-slate-100">
          {redemption.reward.imageUrl ? (
            <Image
              source={{ uri: redemption.reward.imageUrl }}
              className="w-20 h-20 rounded-full mb-4"
              resizeMode="cover"
            />
          ) : (
            <View className="w-20 h-20 rounded-full bg-green-100 items-center justify-center mb-4">
              <Ionicons name="gift-outline" size={36} color="#16a34a" />
            </View>
          )}

          <Text className="text-2xl font-bold text-slate-900 text-center">
            {redemption.reward.name}
          </Text>

          <View className={`mt-3 px-3 py-1.5 rounded-full ${status.bg}`}>
            <Text className={`text-xs font-semibold ${status.text}`}>
              {status.label}
            </Text>
          </View>
        </View>

        {/* Details card */}
        <View className="bg-white rounded-3xl p-5 border border-slate-100">
          <Text className="text-sm font-semibold text-slate-400 mb-4">
            Transaction
          </Text>

          <View className="flex-row justify-between items-center py-3 border-b border-slate-50">
            <Text className="text-sm text-slate-500">Points spent</Text>
            <Text className="text-base font-bold text-green-700">
              {Number(redemption.pointsSpent).toLocaleString()} pts
            </Text>
          </View>

          <View className="flex-row justify-between items-center py-3 border-b border-slate-50">
            <Text className="text-sm text-slate-500">Date</Text>
            <Text className="text-sm font-semibold text-slate-900">
              {new Date(redemption.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Text>
          </View>

          <View className="flex-row justify-between items-center py-3">
            <Text className="text-sm text-slate-500">Redemption ID</Text>
            <Text
              className="text-xs font-medium text-slate-400"
              numberOfLines={1}
            >
              {redemption.id.slice(0, 12)}…
            </Text>
          </View>
        </View>

        {/* Info note */}
        {redemption.status === "PENDING" && (
          <View className="mt-5 bg-amber-50 rounded-2xl p-4 flex-row gap-3">
            <Ionicons name="time-outline" size={20} color="#d97706" />
            <Text className="flex-1 text-sm text-amber-800">
              Your redemption is being processed. You’ll be notified when it’s
              ready for pickup.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom action */}
      {/* <View className="px-5 pb-8">
        <TouchableOpacity
          onPress={() => router.replace("/(app)/(tabs)")}
          activeOpacity={0.8}
          className="w-full bg-[#a9e08b] rounded-2xl py-4 items-center"
        >
          <Text className="text-slate-900 font-bold text-base">
            Back to Home
          </Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}
