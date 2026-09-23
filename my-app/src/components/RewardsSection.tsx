import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRewards } from "@/hooks/useRewards";
import { RewardCardSkeleton } from "./ui/Skeleton/RewardCardSkeleton";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Reward } from "@/lib/rewards";

const BG_COLORS = [
  "bg-sky-50",
  "bg-yellow-50",
  "bg-pink-50",
  "bg-green-50",
  "bg-purple-50",
];

export default function RewardsSection() {
  const { data: rewards, isLoading, error } = useRewards();
  const router = useRouter();

  function handleRedeem(item: Reward) {
    router.push({
      pathname: "/(app)/rewards/[id]",
      params: { id: item.id },
    });
  }
  if (isLoading) {
    return (
      <View className="flex-row flex-wrap gap-3.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <RewardCardSkeleton key={i} />
        ))}
      </View>
    );
  }

  if (error || !rewards) {
    return (
      <View className="py-10 items-center">
        <Text className="text-slate-500">Couldn't load rewards.</Text>
      </View>
    );
  }

  return (
    <View className="flex-row flex-wrap gap-3.5">
      {rewards.map((item, index) => (
        <View
          key={item.id}
          className={`w-[48%] ${BG_COLORS[index % BG_COLORS.length]} rounded-2xl p-4 items-center border border-gray-200 relative`}
        >
          {/* Image */}
          <View className="w-24 h-24 mb-3 rounded-xl overflow-hidden items-center justify-center">
            <Image
              source={{ uri: item.imageUrl }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>

          <View className=" flex-row items-center justify-between">
            <View className="flex-1 pr-2">
              <Text className="text-sm font-bold text-slate-900 mb-1">
                {item.name}
              </Text>
              <Text className="text-xs text-slate-500 font-medium">
                {item.pointsCost} pts
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => handleRedeem(item)}
              activeOpacity={0.8}
              className="w-9 h-9 rounded-full bg-green-400 items-center justify-center"
            >
              <Ionicons name="cart-outline" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}
