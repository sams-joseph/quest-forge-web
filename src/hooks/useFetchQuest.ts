import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { type Quest } from "@/hooks/useFetchGameQuests";

const useFetchQuest = (id: string) => {
  return useQuery({
    queryKey: ["fetchQuest", id],
    queryFn: async () => {
      const res = await axios.get<Quest>(`/api/quests/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
        },
      });

      return res.data;
    },
    enabled: !!id,
  });
};

export default useFetchQuest;
