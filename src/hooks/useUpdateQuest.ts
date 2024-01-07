import axios from "@/lib/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { Quest } from "@/hooks/useFetchGameQuests";

const useUpdateQuest = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { description?: string; name?: string }) => {
      const res = await axios.put<Quest>(`/api/quests/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
        },
      });

      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["fetchQuest", id] });
    },
  });
};

export default useUpdateQuest;
