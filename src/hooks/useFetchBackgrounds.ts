import axios from "@/lib/axios";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

export interface BackgroundWithPagination {
  to: number;
  per_page: number;
  data: Background[];
}

export interface Background {
  id: string;
  name: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

const useFetchBackgrounds = () => {
  return useInfiniteScroll({
    queryKey: ["fetchBackgrounds"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axios.get<BackgroundWithPagination>(
        `/api/backgrounds?page=${pageParam ? pageParam : ""}`,
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

export default useFetchBackgrounds;
