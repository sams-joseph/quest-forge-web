import axios from "@/lib/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { QuestObjective } from "@/hooks/useFetchQuestObjectives";

const useUpdateQuestObjective = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateQuestObjective", id],
    mutationFn: async (data: {
      description?: string;
      name?: string;
      status?: string;
    }) => {
      const res = await axios.put<QuestObjective>(
        `/api/objectives/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accepts: "application/json",
          },
        },
      );

      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["fetchQuestObjective", id],
      });
    },
  });
};

export default useUpdateQuestObjective;
