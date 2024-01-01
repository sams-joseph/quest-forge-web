import axios from "@/lib/axios";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

export interface RaceWithPagination {
  to: number;
  per_page: number;
  data: Race[];
}

export interface Race {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

const useFetchRaces = (query = {}) => {
  return useInfiniteScroll({
    queryKey: ["fetchRaces", query],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        ...query,
        page: pageParam.toString(),
      }).toString();

      const res = await axios.get<RaceWithPagination>(`/api/races?${params}`, {
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
        },
      });

      return res.data;
    },
  });
};

export default useFetchRaces;
