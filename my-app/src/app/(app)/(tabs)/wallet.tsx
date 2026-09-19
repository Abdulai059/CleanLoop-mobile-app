import { View, Text, FlatList, RefreshControl } from "react-native";
import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useWalletTransactions } from "@/hooks/useWalletTransactions";
import WalletSkeleton from "@/components/ui/Skeleton/WalletSkeleton";
import { AntDesign } from "@expo/vector-icons";

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
    return <WalletSkeleton />;
  }

  const formatAmount = (value: number | string) =>
    Number(value).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

  const formatDate = (date?: string | Date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const isPositive = (type: string) => type === "EARN";

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      {/* Header */}
      <View className=" pt-14 pb-4 px-5 border-b border-slate-100">
        <Text className="text-[22px] font-semibold text-slate-900">Wallet</Text>
        <Text className="text-slate-500 text-[13px] mt-0.5">
          Points balance & history
        </Text>
      </View>

      <FlatList
        data={transactions || []}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 48 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#059669"
          />
        }
        ListHeaderComponent={
          <View className="px-5 pt-6">
            {/* Balance Card */}
            <View className="bg-green-100 rounded-3xl p-6 mb-8 border border-slate-100 shadow-sm">
              <Text className="text-slate-500 text-[13px] font-medium mb-1.5">
                Available balance
              </Text>

              <View className="flex-row items-end">
                <Text className="text-slate-900 text-[42px] font-semibold tracking-tight leading-none">
                  {formatAmount(wallet?.balance ?? 0)}
                </Text>
                <Text className="text-slate-400 text-lg font-medium ml-2 mb-1.5">
                  PTS
                </Text>
              </View>

              <View className="mt-5 pt-4 border-t border-slate-100">
                <Text className="text-slate-400 text-xs">
                  Ready to redeem anytime
                </Text>
              </View>
            </View>

            {/* Section title */}
            <View className="flex-row items-center justify-between mb-3.5">
              <Text className="text-[15px] font-semibold text-slate-900">
                Recent transactions
              </Text>
              {transactions && transactions.length > 0 && (
                <Text className="text-slate-400 text-xs">
                  {transactions.length}
                </Text>
              )}
            </View>
          </View>
        }
        ListEmptyComponent={
          !txLoading ? (
            <View className="items-center py-20 px-10">
              <View className="w-14 h-14 rounded-full bg-slate-100 items-center justify-center mb-4">
                <AntDesign name="swap" size={22} color="#94A3B8" />
              </View>
              <Text className="text-slate-900 font-semibold text-[15px]">
                No transactions yet
              </Text>
              <Text className="text-slate-500 text-sm text-center mt-1.5 leading-5">
                Your earnings and redemptions will appear here.
              </Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => {
          const positive = isPositive(item.type);

          return (
            <View className="mx-5 mb-2.5">
              <View className="bg-white rounded-2xl px-4 py-3.5 flex-row items-center border border-slate-100">
                {/* Icon circle */}
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center mr-3.5 ${
                    positive ? "bg-emerald-50" : "bg-rose-50"
                  }`}
                >
                  <AntDesign
                    name={positive ? "rise" : "fall"}
                    size={18}
                    color={positive ? "#059669" : "#E11D48"}
                  />
                </View>

                {/* Details */}
                <View className="flex-1 pr-3">
                  <Text className="text-slate-900 font-medium text-[15px]">
                    {positive ? "Points Earned" : "Points Redeemed"}
                  </Text>
                  <Text
                    className="text-slate-400 text-xs mt-0.5"
                    numberOfLines={1}
                  >
                    {item.description || formatDate(item.createdAt)}
                  </Text>
                </View>

                {/* Amount */}
                <View className="items-end">
                  <Text
                    className={`font-semibold text-[15px] ${
                      positive ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {positive ? "+" : ""}
                    {formatAmount(item.amount)}
                  </Text>
                  <Text className="text-slate-400 text-[11px] mt-0.5">pts</Text>
                </View>
              </View>
            </View>
          );
        }}
        ListFooterComponent={
          txLoading ? (
            <View className="px-5 pt-1">
              {[1, 2, 3].map((i) => (
                <View
                  key={i}
                  className="bg-white rounded-2xl px-4 py-4 mb-2.5 flex-row items-center border border-slate-100"
                >
                  <View className="w-10 h-10 rounded-full bg-slate-200 mr-3.5" />
                  <View className="flex-1">
                    <View className="h-4 w-28 bg-slate-200 rounded mb-2" />
                    <View className="h-3 w-32 bg-slate-200 rounded" />
                  </View>
                  <View className="items-end">
                    <View className="h-4 w-14 bg-slate-200 rounded mb-1.5" />
                    <View className="h-3 w-8 bg-slate-200 rounded" />
                  </View>
                </View>
              ))}
            </View>
          ) : null
        }
      />
    </View>
  );
}
