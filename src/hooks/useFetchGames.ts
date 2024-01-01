import axios from "@/lib/axios";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { type Character } from "@/hooks/useFetchCharacters";

export interface GameWithPagination {
  to: number;
  per_page: number;
  data: Game[];
}

export interface Player {
  id: string;
  created_at: string;
  updated_at: string;
  character: Character;
}

export interface InviteLink {
  id: string;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  user_role: string;
  players: Player[];
  invite_links: InviteLink[];
  created_at: string;
  updated_at: string;
}

const fetchGames = async ({ pageParam = 1 }) => {
  const res = await axios.get<GameWithPagination>(
    `/api/games?page=${pageParam ? pageParam : ""}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
    },
  );

  return res.data;
};

const useFetchGames = () => {
  return useInfiniteScroll({
    queryKey: ["fetchGames"],
    queryFn: fetchGames,
  });
};

export default useFetchGames;
