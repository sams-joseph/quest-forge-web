import axios from "@/lib/axios";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { type Monster } from "@/hooks/useFetchMonsters";

export interface EncounterMonsterWithPagination {
  to: number;
  per_page: number;
  data: Monster[];
}

const useFetchEncounterMonsters = (id: string) => {
  return useInfiniteScroll({
    queryKey: ["fetchEncounterMonsters", id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axios.get<EncounterMonsterWithPagination>(
        `/api/encounters/${id}/monsters?page=${pageParam ? pageParam : ""}`,
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

export default useFetchEncounterMonsters;
