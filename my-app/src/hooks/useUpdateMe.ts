// hooks/useUpdateMe.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "@/lib/user";

export function useUpdateMe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMe,
    onSuccess: (updatedUser) => {
      // update the cached "me" query so every screen using it refreshes instantly
      queryClient.setQueryData(["me"], updatedUser);
    },
  });
}
