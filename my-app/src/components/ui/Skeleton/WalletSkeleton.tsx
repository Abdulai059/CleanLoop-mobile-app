import { View } from "react-native";

function SkeletonBox({ className }: { className?: string }) {
  return <View className={`bg-slate-200 rounded-xl ${className}`} />;
}

export default function WalletSkeleton() {
  return (
    <View className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="bg-white pt-14 pb-5 px-5 border-b border-slate-100">
        <SkeletonBox className="h-7 w-36 mb-2" />
        <SkeletonBox className="h-4 w-48" />
      </View>

      <View className="px-5 pt-6">
        {/* Balance Card Skeleton */}
        <View className="bg-white rounded-3xl p-6 mb-8 border border-slate-100">
          <SkeletonBox className="h-4 w-28 mb-4" />
          <SkeletonBox className="h-10 w-44 mb-2" />
          <SkeletonBox className="h-4 w-16" />
        </View>

        {/* Section title */}
        <View className="flex-row justify-between items-center mb-4">
          <SkeletonBox className="h-5 w-36" />
          <SkeletonBox className="h-4 w-20" />
        </View>

        {/* Transaction rows */}
        {[1, 2, 3, 4, 5].map((i) => (
          <View
            key={i}
            className="bg-white rounded-2xl px-4 py-4 mb-3 flex-row items-center border border-slate-100"
          >
            <SkeletonBox className="w-11 h-11 rounded-xl mr-3.5" />
            <View className="flex-1">
              <SkeletonBox className="h-4 w-28 mb-2" />
              <SkeletonBox className="h-3 w-40" />
            </View>
            <View className="items-end">
              <SkeletonBox className="h-4 w-16 mb-1.5" />
              <SkeletonBox className="h-3 w-10" />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
