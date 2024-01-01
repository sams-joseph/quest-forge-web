import axios from "@/lib/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { type Encounter } from "./useFetchEncounters";

interface CreateEncounterParams {
  name: string;
  description?: string;
}

const placeholderDescription = `
#### Encounter Details
* **Summary:** [Provide a brief summary of the quest objective]
* **Importance:** [Explain why this objective is important in the context of the quest]

#### Location Details
* **Primary Location:** [Name and describe the main location where the objective is to be achieved]
* **Key Features:** [Describe significant features or landmarks of the location]
`;

const useCreateEncounter = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createEncounter"],
    mutationFn: async (data: CreateEncounterParams) => {
      const res = await axios.post<Encounter>(
        `/api/quests/${id}/encounters`,
        { ...data, description: data.description ?? placeholderDescription },
        {
          headers: {
            "Content-Type": "application/json",
            Accepts: "application/json",
          },
        },
      );

      return res.data;
    },
    onSuccess: async () => {
      void queryClient.invalidateQueries({
        queryKey: [["fetchEncounters", id]],
      });
    },
  });
};

export default useCreateEncounter;
