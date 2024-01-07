import axios from "@/lib/axios";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

export interface MonsterWithPagination {
  to: number;
  per_page: number;
  data: Monster[];
}

export interface Monster {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  challenge_rating: number;
  hit_points: number;
  pivot?: {
    hit_points: number;
  };
  created_at: string;
  updated_at: string;
}

const useFetchMonsters = (query = {}, enabled = true) => {
  return useInfiniteScroll({
    enabled,
    queryKey: ["fetchMonsters2", query],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        ...query,
        page: pageParam.toString(),
      }).toString();

      const res = await axios.get<MonsterWithPagination>(
        `/api/monsters?${params}`,
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

export default useFetchMonsters;
