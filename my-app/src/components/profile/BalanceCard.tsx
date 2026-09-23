import { View, Text } from "react-native";

type Props = {
  balance?: number | string;
};

export default function BalanceCard({ balance = "0.00" }: Props) {
  return (
    <View className="mx-5 mb-2 bg-green-600 rounded-2xl p-5 overflow-hidden">
      <Text className="text-2xl font-bold text-white">{balance} PTS</Text>
      <Text className="text-sm text-green-100 mt-1">Current Balance</Text>

      {/* decorative circles */}
      <View className="absolute right-4 top-3 opacity-20">
        <View className="w-20 h-20 rounded-full border-2 border-white" />
      </View>
      <View className="absolute right-10 bottom-2 opacity-10">
        <View className="w-16 h-16 rounded-full border-2 border-white" />
      </View>
    </View>
  );
}