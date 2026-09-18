import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useWallet } from "@/hooks/useWallet";
import { useWalletTransactions } from "@/hooks/useWalletTransactions";

export default function WalletScreen() {
  const { data: wallet, isLoading: walletLoading } = useWallet();
  const { data: transactions, isLoading: txLoading } = useWalletTransactions();

  if (walletLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator color="#16a34a" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-5 pt-16">
      <View className="bg-green-600 rounded-2xl p-6 mb-6">
        <Text className="text-white text-sm">Current Balance</Text>
        <Text className="text-white text-3xl font-bold mt-1">
          {wallet?.balance ?? 0} PTS
        </Text>
      </View>

      <Text className="text-lg font-bold text-slate-900 mb-3">
        Transaction History
      </Text>

      {txLoading ? (
        <ActivityIndicator color="#16a34a" />
      ) : (
        <FlatList
          data={transactions ?? []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row justify-between py-3 border-b border-slate-100">
              <View>
                <Text className="text-slate-900  font-medium">{item.type}</Text>
                {item.description && (
                  <Text className="text-slate-400 text-xs mt-0.5">
                    {item.description}
                  </Text>
                )}
              </View>
              <Text
                className={
                  item.type === "EARN"
                    ? "text-green-600 font-bold"
                    : "text-slate-900 font-bold"
                }
              >
                {item.type === "EARN" ? "+" : "-"}
                {item.amount} pts
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
