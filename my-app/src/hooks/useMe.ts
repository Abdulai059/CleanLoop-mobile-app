// hooks/useMe.ts
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/lib/user"; // adjust path if needed

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 0, // cache for 0 minutes
  });
}
