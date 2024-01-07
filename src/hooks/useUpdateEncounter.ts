import axios from "@/lib/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { Game } from "@/hooks/useFetchGames";

const useUpdateEncounter = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { description?: string; name?: string }) => {
      const res = await axios.put<Game>(`/api/encounters/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
        },
      });

      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["fetchEncounter", id] });
    },
  });
};

export default useUpdateEncounter;
