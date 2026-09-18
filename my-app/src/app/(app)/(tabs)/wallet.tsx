import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useWallet } from "@/hooks/useWallet";
import { useWalletTransactions } from "@/hooks/useWalletTransactions";
import { useState } from "react";

export default function WalletScreen() {
  const {
    data: wallet,
    isLoading: walletLoading,
    refetch: refetchWallet,
  } = useWallet();
  const {
    data: transactions,
    isLoading: txLoading,
    refetch: refetchTx,
  } = useWalletTransactions();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchWallet?.(), refetchTx?.()]);
    setRefreshing(false);
  };

  if (walletLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator size="large" color="#16a34a" />
        <Text className="text-slate-500 mt-3 text-sm">Loading wallet...</Text>
      </View>
    );
  }

  const formatAmount = (amount: number | string) => {
    return Number(amount).toLocaleString();
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "EARN":
        return "Earned";
      case "REDEEM":
        return "Redeemed";
      case "ADJUSTMENT":
        return "Adjustment";
      case "REVERSAL":
        return "Reversal";
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    if (type === "EARN") return "text-emerald-600";
    if (type === "REDEEM") return "text-rose-600";
    return "text-slate-700";
  };

  const getTypeBg = (type: string) => {
    if (type === "EARN") return "bg-emerald-50";
    if (type === "REDEEM") return "bg-rose-50";
    return "bg-slate-100";
  };

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="bg-white pt-14 pb-4 px-5 border-b border-slate-100">
        <Text className="text-2xl font-bold text-slate-900">My Wallet</Text>
        <Text className="text-slate-500 text-sm mt-0.5">
          Track your points & activity
        </Text>
      </View>

      <FlatList
        data={transactions || []}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#16a34a"
          />
        }
        ListHeaderComponent={
          <View className="px-5 pt-5">
            {/* Balance Card */}
            <View className="bg-green-600 rounded-3xl p-6 mb-6 shadow-lg shadow-emerald-200">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-emerald-100 text-sm font-medium">
                    Available Balance
                  </Text>
                  <Text className="text-white text-4xl font-bold mt-1 tracking-tight">
                    {formatAmount(wallet?.balance ?? 0)}
                  </Text>
                  <Text className="text-emerald-100 text-base mt-0.5 font-medium">
                    PTS
                  </Text>
                </View>

                {/* Decorative circle */}
                <View className="w-16 h-16 rounded-full bg-white/15 items-center justify-center">
                  <Text className="text-white text-2xl font-bold">★</Text>
                </View>
              </View>

              <View className="mt-5 pt-4 border-t border-white/20 flex-row justify-between">
                <Text className="text-emerald-100 text-xs">
                  Points you can redeem
                </Text>
                <Text className="text-white text-xs font-semibold">
                  Keep collecting!
                </Text>
              </View>
            </View>

            {/* Section Title */}
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-slate-900">
                Recent Activity
              </Text>
              {transactions && transactions.length > 0 && (
                <Text className="text-sm text-slate-500">
                  {transactions.length} transaction
                  {transactions.length !== 1 ? "s" : ""}
                </Text>
              )}
            </View>
          </View>
        }
        ListEmptyComponent={
          !txLoading ? (
            <View className="items-center justify-center py-16 px-8">
              <View className="w-20 h-20 rounded-full bg-slate-100 items-center justify-center mb-4">
                <Text className="text-3xl">📭</Text>
              </View>
              <Text className="text-slate-900 font-semibold text-base">
                No transactions yet
              </Text>
              <Text className="text-slate-500 text-sm text-center mt-1 leading-5">
                Your earnings and redemptions will appear here once you start
                collecting.
              </Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <View className="mx-5 mb-3">
            <View className="bg-white rounded-2xl px-4 py-4 flex-row items-center border border-slate-100 shadow-sm shadow-slate-100">
              {/* Type Badge */}
              <View
                className={`w-11 h-11 rounded-xl items-center justify-center mr-3.5 ${getTypeBg(item.type)}`}
              >
                <Text
                  className={`text-lg font-bold ${getTypeColor(item.type)}`}
                >
                  {item.type === "EARN"
                    ? "+"
                    : item.type === "REDEEM"
                      ? "−"
                      : "•"}
                </Text>
              </View>

              {/* Details */}
              <View className="flex-1">
                <Text className="text-slate-900 font-semibold text-[15px]">
                  {getTypeLabel(item.type)}
                </Text>
                {item.description ? (
                  <Text
                    className="text-slate-500 text-xs mt-0.5"
                    numberOfLines={1}
                  >
                    {item.description}
                  </Text>
                ) : (
                  <Text className="text-slate-400 text-xs mt-0.5">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString(undefined, {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </Text>
                )}
              </View>

              {/* Amount */}
              <View className="items-end">
                <Text
                  className={`font-bold text-[15px] ${getTypeColor(item.type)}`}
                >
                  {item.type === "EARN" ? "+" : ""}
                  {formatAmount(item.amount)}
                </Text>
                <Text className="text-slate-400 text-xs mt-0.5">pts</Text>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          txLoading ? (
            <View className="py-8">
              <ActivityIndicator color="#16a34a" />
            </View>
          ) : null
        }
      />
    </View>
  );
}
