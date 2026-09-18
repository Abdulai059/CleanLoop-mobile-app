// hooks/useWallet.ts
import { useQuery } from "@tanstack/react-query";
import { getMyWallet } from "@/lib/wallet";

export function useWallet() {
  return useQuery({ queryKey: ["wallet"], queryFn: getMyWallet });
}
