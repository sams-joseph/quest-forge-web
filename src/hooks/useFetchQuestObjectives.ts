import axios from "@/lib/axios";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { type Quest } from "@/hooks/useFetchGameQuests";

export interface QuestObjectiveWithPagination {
  to: number;
  per_page: number;
  data: QuestObjective[];
}

export interface QuestObjective {
  id: string;
  name: string;
  description: string;
  status: "INCOMPLETE" | "COMPLETED";
  created_at: string;
  updated_at: string;
  quest?: Quest[];
}

const useFetchQuestObjectives = (id: string) => {
  return useInfiniteScroll({
    queryKey: ["fetchQuestObjectives", id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axios.get<QuestObjectiveWithPagination>(
        `/api/quests/${id}/objectives?page=${pageParam ? pageParam : ""}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accepts: "application/json",
          },
        },
      );

      return res.data;
    },
    enabled: !!id,
  });
};

export default useFetchQuestObjectives;
