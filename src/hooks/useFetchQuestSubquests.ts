import axios from "@/lib/axios";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { type QuestWithPagination } from "@/hooks/useFetchGameQuests";

const useFetchGameQuests = (id: string) => {
  return useInfiniteScroll({
    queryKey: ["fetchQuestSubquests", id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axios.get<QuestWithPagination>(
        `/api/quests/${id}/quests?page=${pageParam ? pageParam : ""}`,
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
