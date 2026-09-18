// hooks/useWalletTransactions.ts
import { useQuery } from "@tanstack/react-query";
import { getMyTransactions } from "@/lib/wallet";

export function useWalletTransactions() {
  return useQuery({
    queryKey: ["wallet", "transactions"],
    queryFn: getMyTransactions,
  });
}
