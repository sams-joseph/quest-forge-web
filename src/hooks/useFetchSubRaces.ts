import axios from "@/lib/axios";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

export interface SubRaceWithPagination {
  to: number;
  per_page: number;
  data: SubRace[];
}

export interface SubRace {
  id: string;
  name: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

const useFetchSubRaces = (query = {}) => {
  return useInfiniteScroll({
    queryKey: ["fetchSubRaces", query],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        ...query,
        page: pageParam.toString(),
      }).toString();

      const res = await axios.get<SubRaceWithPagination>(
        `/api/subraces?${params}`,
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

export default useFetchSubRaces;
