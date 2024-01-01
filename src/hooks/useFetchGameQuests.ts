import axios from "@/lib/axios";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import type { Game } from "@/hooks/useFetchGames";

export interface QuestWithPagination {
  to: number;
  per_page: number;
  data: Quest[];
}

export interface Quest {
  id: string;
  name: string;
  description: string;
  status: "ACTIVE" | "COMPLETED" | "LOCKED" | "UNLOCKED";
  created_at: string;
  updated_at: string;
  quests: Quest[];
  questable: Quest | Game;
  questable_type: string;
}

const useFetchGameQuests = (id: string) => {
  return useInfiniteScroll({
    queryKey: ["fetchGameQuests", id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axios.get<QuestWithPagination>(
        `/api/games/${id}/quests?page=${pageParam ? pageParam : ""}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accepts: "application/json",
          },
        },
      );

      return res.data;
    },
  });
};

export default useFetchGameQuests;
