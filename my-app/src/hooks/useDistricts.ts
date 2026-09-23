// hooks/useDistricts.ts
import { useQuery } from "@tanstack/react-query";
import { getDistricts } from "@/lib/location";

export function useDistricts(regionId?: string) {
  return useQuery({
    queryKey: ["districts", regionId],
    queryFn: () => getDistricts(regionId!),
    enabled: !!regionId,
  });
}
