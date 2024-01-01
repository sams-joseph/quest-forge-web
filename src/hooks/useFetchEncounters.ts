import axios from "@/lib/axios";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

export interface EncounterWithPagination {
  to: number;
  per_page: number;
  data: Encounter[];
}

export interface Encounter {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

const useFetchEncounters = (id: string) => {
  return useInfiniteScroll({
    queryKey: ["fetchEncounters", id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axios.get<EncounterWithPagination>(
        `/api/quests/${id}/encounters?page=${pageParam ? pageParam : ""}`,
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

export default useFetchEncounters;
