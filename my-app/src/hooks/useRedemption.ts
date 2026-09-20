// hooks/useRedemption.ts
import { useQuery } from "@tanstack/react-query";
import { getRedemptionById } from "@/lib/redemptions";

export function useRedemption(redemptionId?: string) {
  return useQuery({
    queryKey: ["redemption", redemptionId],
    queryFn: () => getRedemptionById(redemptionId!),
    enabled: !!redemptionId,
  });
}
