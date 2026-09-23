// hooks/useCommunities.ts
import { useQuery } from "@tanstack/react-query";
import { getCommunities } from "@/lib/location";
import { getCommunity } from "@/lib/community";

export function useCommunities(districtId?: string) {
  return useQuery({
    queryKey: ["communities", districtId],
    queryFn: () => getCommunities(districtId!),
    enabled: !!districtId,
  });
}

export function useCommunity(communityId?: string | null) {
  return useQuery({
    queryKey: ["community", communityId],
    queryFn: () => getCommunity(communityId!),
    enabled: !!communityId,
  });
}
