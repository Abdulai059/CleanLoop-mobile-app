// components/RewardCardSkeleton.tsx
import { View } from "react-native";
import { Skeleton } from "./Skeleton";

export function RewardCardSkeleton() {
  return (
    <View className="w-[48%] bg-slate-50 rounded-2xl p-4 items-center">
      <Skeleton className="w-24 h-24 mb-3 rounded-xl" />
      <Skeleton className="w-20 h-3.5 rounded-md mb-2" />
      <Skeleton className="w-14 h-3 rounded-md" />
    </View>
  );
}
