import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { type Character } from "@/hooks/useFetchCharacters";

const useFetchCharacter = (id: string) => {
  return useQuery({
    queryKey: ["fetchCharacter"],
    queryFn: async () => {
      const res = await axios.get<Character>(`/api/characters/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
        },
      });

      return res.data;
    },
    enabled: !!id,
  });
};

export default useFetchCharacter;
