import axios from "@/lib/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export interface InviteLink {
  game_id: string;
  user_id: string;
  id: string;
  created_at: string;
  updated_at: string;
}

const useCreatInviteLink = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createInviteLink", id],
    mutationFn: async () => {
      const res = await axios.post<InviteLink>(
        `/api/game-invitations/create`,
        { game_id: id },
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
      void queryClient.invalidateQueries({ queryKey: ["fetchGame", id] });
    },
  });
};

export default useCreatInviteLink;
