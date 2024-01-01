import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { type Game } from "@/hooks/useFetchGames";

const useFetchGame = (id: string) => {
  return useQuery({
    queryKey: ["fetchGame", id],
    queryFn: async () => {
      const res = await axios.get<Game>(`/api/games/${id}`, {
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

export default useFetchGame;
