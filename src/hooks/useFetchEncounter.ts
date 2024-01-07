import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { type Encounter } from "./useFetchEncounters";

const useFetchEncounter = (id: string) => {
  return useQuery({
    queryKey: ["fetchEncounter", id],
    queryFn: async () => {
      const res = await axios.get<Encounter>(`/api/encounters/${id}`, {
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

export default useFetchEncounter;
