import axios from "@/lib/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { Quest } from "./useFetchGameQuests";

interface CreateQuestParams {
  name: string;
  description?: string;
}

const placeholderDescription = `
#### Quest Background
* **Origin:** [Describe how and where the quest was initiated]
* **Quest Giver:** [Name and description of the NPC or event that gives the quest]

#### Objective
* **Primary Goal:** [Describe the main objective or goal of the quest]
* **Secondary Goals:** [List any secondary objectives or optional goals]
`;

const useCreateQuestSubquest = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateQuestParams) => {
      const res = await axios.post<Quest>(
        `/api/quests/${id}/quests`,
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
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [["fetchQuest", id]] });
      void queryClient.invalidateQueries({
        queryKey: [["fetchQuestSubquests", id]],
      });
    },
  });
};

export default useCreateQuestSubquest;
