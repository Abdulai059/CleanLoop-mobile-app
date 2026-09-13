import { View, Text } from "react-native";

export default function WalletScreen() {
  return (
    <View className="flex-1 bg-[#f7f9fc] px-8 pt-16">
      <Text className="text-2xl font-bold text-slate-900 mb-6">Wallet</Text>
      <View className="bg-white rounded-2xl p-6 shadow-sm">
        <Text className="text-slate-500">Your wallet balance and transactions</Text>
      </View>
    </View>
  );
}
