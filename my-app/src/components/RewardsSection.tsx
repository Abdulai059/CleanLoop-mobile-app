import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRewards } from "@/hooks/useRewards";
import { RewardCardSkeleton } from "./ui/Skeleton/RewardCardSkeleton";


const BG_COLORS = [
  "bg-sky-50",
  "bg-yellow-50",
  "bg-pink-50",
  "bg-green-50",
  "bg-purple-50",
];

export default function RewardsSection() {
  const { data: rewards, isLoading, error } = useRewards();

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
        <TouchableOpacity
          key={item.id}
          className={`w-[48%] ${BG_COLORS[index % BG_COLORS.length]} rounded-2xl p-4 items-center`}
        >
          <View className="w-24 h-24 mb-3 rounded-xl overflow-hidden items-center justify-center">
            <Image
              source={{ uri: item.imageUrl }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-bold text-slate-900 mb-1 text-center">
            {item.name}
          </Text>
          <Text className="text-xs text-slate-500 font-medium">
            {item.pointsCost} pts
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
