import axios from "@/lib/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";

interface Params {
  monster_id: string;
}

const useAddEncounterMonster = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Params) => {
      const res = await axios.post<Params>(
        `/api/encounters/${id}/monsters`,
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
      void queryClient.invalidateQueries({ queryKey: ["fetchEncounter", id] });
      void queryClient.invalidateQueries({
        queryKey: ["fetchEncounterMonsters", id],
      });
    },
  });
};

export default useAddEncounterMonster;
