import axios from "@/lib/axios";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

export interface ItemWithPagination {
  to: number;
  per_page: number;
  data: Item[];
}

export interface Item {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  rarity: string;
  created_at: string;
  updated_at: string;
}

const useFetchItems = (query = {}) => {
  return useInfiniteScroll({
    queryKey: ["fetchItems", query],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        ...query,
        page: pageParam.toString(),
      }).toString();

      const res = await axios.get<ItemWithPagination>(`/api/items?${params}`, {
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
        },
      });

      return res.data;
    },
  });
};

export default useFetchItems;
