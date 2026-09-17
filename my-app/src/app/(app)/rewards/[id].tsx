// app/(app)/rewards/[id].tsx
import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getReward } from "@/lib/rewards";
import { getWallet } from "@/lib/wallet";
import { createRedemption } from "@/lib/redemptions";
import { Ionicons } from "@expo/vector-icons";
import RewardDetailSkeleton from "@/components/ui/Skeleton/RewardDetailSkeleton";

export default function RewardDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [redeeming, setRedeeming] = useState(false);

  const { data: reward, isLoading: loadingReward } = useQuery({
    queryKey: ["reward", id],
    queryFn: () => getReward(id!),
    enabled: !!id,
  });

  const { data: wallet, isLoading: loadingWallet } = useQuery({
    queryKey: ["wallet"],
    queryFn: getWallet,
  });

  const balance = wallet?.balance ?? 0;
  const canRedeem =
    !!reward &&
    reward.status === "ACTIVE" &&
    reward.stockQuantity > 0 &&
    balance >= reward.pointsCost;

  const afterBalance = reward ? balance - reward.pointsCost : balance;

  async function handleConfirm() {
    if (!reward || !canRedeem) return;

    setRedeeming(true);
    try {
      const redemption = await createRedemption(reward.id);
      router.replace({
        pathname: "/(app)/rewards/success",
        params: {
          redemptionId: redemption.id,
          rewardName: reward.name,
          pointsUsed: String(redemption.pointsUsed),
          status: redemption.status,
        },
      });
    } catch (err: any) {
      const message =
        err?.response?.data?.message ??
        "Couldn't complete redemption. Please try again.";
      Alert.alert("Redemption failed", message);
    } finally {
      setRedeeming(false);
    }
  }

 if (loadingReward || loadingWallet) {
   return <RewardDetailSkeleton />;
 }

  if (!reward) {
    return (
      <SafeAreaView
        className="flex-1 items-center justify-center bg-white px-6"
        edges={["top"]}
      >
        <Text className="text-slate-500">Reward not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-5 pt-4 pb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center mr-3"
        >
          <Ionicons name="arrow-back" size={20} color="#0f172a" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900">Confirm Redeem</Text>
      </View>

      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Image */}
        <View className="items-center my-6 ">
          <View className="w-40 h-40 rounded-2xl p-4 bg-green-50 items-center justify-center border border-gray-200 overflow-hidden">
            {reward.imageUrl ? (
              <Image
                source={{ uri: reward.imageUrl }}
                className="w-full h-full"
                resizeMode="contain"
              />
            ) : (
              <Ionicons name="gift-outline" size={48} color="#16a34a" />
            )}
          </View>
        </View>

        <Text className="text-2xl font-bold text-slate-900 text-center">
          {reward.name}
        </Text>
        {reward.description ? (
          <Text className="text-sm text-slate-500 text-center mt-2">
            {reward.description}
          </Text>
        ) : null}

        <Text className="text-lg font-semibold text-green-700 text-center mt-4">
          {reward.pointsCost.toLocaleString()} points
        </Text>

        {/* Balance card */}
        <View className="mt-8 bg-slate-50 rounded-2xl p-5">
          <View className="flex-row justify-between mb-3">
            <Text className="text-sm text-slate-500">Your balance</Text>
            <Text className="text-sm font-semibold text-slate-900">
              {balance.toLocaleString()} pts
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-sm text-slate-500">After redemption</Text>
            <Text
              className={`text-sm font-semibold ${
                canRedeem ? "text-slate-900" : "text-red-500"
              }`}
            >
              {canRedeem
                ? `${afterBalance.toLocaleString()} pts`
                : "Insufficient points"}
            </Text>
          </View>
        </View>

        {!canRedeem && balance < reward.pointsCost && (
          <Text className="text-sm text-red-500 text-center mt-4">
            You need {(reward.pointsCost - balance).toLocaleString()} more
            points.
          </Text>
        )}
      </ScrollView>

      {/* Actions */}
      <View className="px-6 pb-[120px] flex-row gap-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-1 rounded-2xl bg-rose-100 py-4 items-center border border-slate-200"
        >
          <Text className="text-red-700 font-semibold text-base">Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleConfirm}
          disabled={!canRedeem || redeeming}
          activeOpacity={0.8}
          className={`flex-1 rounded-2xl py-4 items-center ${
            canRedeem ? "bg-green-600" : "bg-green-400"
          }`}
        >
          {redeeming ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text
              className={`font-bold text-base ${
                canRedeem ? "text-slate-900" : "text-slate-600"
              }`}
            >
              Redeem
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
