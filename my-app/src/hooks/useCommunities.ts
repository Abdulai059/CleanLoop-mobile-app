// hooks/useCommunities.ts
import { useQuery } from "@tanstack/react-query";
import { getCommunities } from "@/lib/location";

export function useCommunities(districtId?: string) {
  return useQuery({
    queryKey: ["communities", districtId],
    queryFn: () => getCommunities(districtId!),
    enabled: !!districtId,
  });
}
