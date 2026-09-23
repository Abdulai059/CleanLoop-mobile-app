// components/ui/Skeleton/RewardDetailSkeleton.tsx
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Bone({ className }: { className?: string }) {
  return <View className={`bg-slate-200 rounded-xl ${className ?? ""}`} />;
}

export default function RewardDetailSkeleton() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-5 pt-4 pb-4">
        <Bone className="w-10 h-10 rounded-full mr-3" />
        <Bone className="h-6 w-40" />
      </View>

      <View className="flex-1 px-6">
        {/* Image */}
        <View className="items-center my-6">
          <Bone className="w-36 h-36 rounded-2xl" />
        </View>

        {/* Title + description + points */}
        <View className="items-center gap-3">
          <Bone className="h-7 w-48" />
          <Bone className="h-4 w-56" />
          <Bone className="h-5 w-28 mt-2" />
        </View>

        {/* Balance card */}
        <View className="mt-8 bg-slate-50 rounded-2xl p-5 gap-4">
          <View className="flex-row justify-between">
            <Bone className="h-4 w-24" />
            <Bone className="h-4 w-16" />
          </View>
          <View className="flex-row justify-between">
            <Bone className="h-4 w-28" />
            <Bone className="h-4 w-16" />
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View className="px-6 pb-[120px] flex-row gap-3">
        <Bone className="h-14 flex-1 rounded-2xl" />
        <Bone className="h-14 flex-1 rounded-2xl" />
      </View>
    </SafeAreaView>
  );
}
