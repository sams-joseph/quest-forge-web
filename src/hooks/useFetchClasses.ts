import axios from "@/lib/axios";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

export interface ClassWithPagination {
  to: number;
  per_page: number;
  data: Class[];
}

export interface Class {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

const useFetchClasses = (query = {}) => {
  return useInfiniteScroll({
    queryKey: ["fetchClasses", query],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        ...query,
        page: pageParam.toString(),
      }).toString();

      const res = await axios.get<ClassWithPagination>(
        `/api/classes?${params}}`,
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

export default useFetchClasses;
