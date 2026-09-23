// hooks/useRegions.ts
import { useQuery } from "@tanstack/react-query";
import { getRegions } from "@/lib/location";

export function useRegions() {
  return useQuery({ queryKey: ["regions"], queryFn: getRegions });
}
