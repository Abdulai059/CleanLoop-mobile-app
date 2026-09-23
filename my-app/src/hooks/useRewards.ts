// hooks/useRewards.ts
import { useQuery } from "@tanstack/react-query";
import { getRewards } from "@/lib/rewards";

export function useRewards() {
  return useQuery({
    queryKey: ["rewards"],
    queryFn: getRewards,
  });
}
