import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface ProcessedInvite {
  character_id: string;
  user_id: string;
  game_id: string;
  id: string;
  updated_at: string;
  created_at: string;
}

type Inputs = {
  invite_id: string;
  character_id: string;
};

const useProcessInviteLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Inputs) => {
      const res = await axios.post<ProcessedInvite>(
        `/api/game-invitations/accept`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accepts: "application/json",
          },
        },
      );

      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["fetchGames"] });
    },
  });
};

export default useProcessInviteLink;
