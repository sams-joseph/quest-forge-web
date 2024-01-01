import axios from "@/lib/axios";
import useInfiniteScroll from "./useInfiniteScroll";

export interface CharacterWithPagination {
  to: number;
  per_page: number;
  data: Character[];
}

export interface Class {
  id: string;
  name: string;
  image_url?: string;
}

export interface Race {
  id: string;
  name: string;
}

export interface Character {
  id: string;
  name: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  class: Class;
  race: Race;
  level: number;
  abilities: Record<string, number>;
  modifiers: Record<string, number>;
}

const useFetchCharacters = (query = {}) => {
  return useInfiniteScroll({
    queryKey: ["fetchCharacters", query],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        ...query,
        page: pageParam.toString(),
      }).toString();

      const res = await axios.get<CharacterWithPagination>(
        `/api/characters?${params}`,
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

export default useFetchCharacters;
