// hooks/useMe.ts
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/lib/user"; // adjust path if needed

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
}
