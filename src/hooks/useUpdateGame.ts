import axios from "@/lib/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { Game } from "@/hooks/useFetchGames";

const useUpdateGame = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateGame", id],
    mutationFn: async (data: { description?: string; name?: string }) => {
      const res = await axios.put<Game>(`/api/games/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
        },
      });

      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["fetchGame", id] });
    },
  });
};

export default useUpdateGame;
