import axios from "@/lib/axios";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

export interface SpellWithPagination {
  to: number;
  per_page: number;
  data: Spell[];
}

export interface Spell {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

const useFetchSpells = (query = {}) => {
  return useInfiniteScroll({
    queryKey: ["fetchSpells", query],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        ...query,
        page: pageParam.toString(),
      }).toString();

      const res = await axios.get<SpellWithPagination>(
        `/api/spells?${params}`,
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

export default useFetchSpells;
