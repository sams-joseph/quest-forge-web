import axios from "@/lib/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { QuestObjective } from "@/hooks/useFetchQuestObjectives";

interface CreateQuestObjectiveParams {
  name: string;
  description?: string;
}

const placeholderDescription = `
#### Objective Description
* **Summary:** [Provide a brief summary of the quest objective]
* **Importance:** [Explain why this objective is important in the context of the quest]

#### Location Details
* **Primary Location:** [Name and describe the main location where the objective is to be achieved]
* **Key Features:** [Describe significant features or landmarks of the location]

#### Required Actions
* **Main Task:** [Detail the primary action or task required to accomplish the objective]
* **Secondary Tasks:** [List any additional tasks or actions that support the main objective]
`;

const useCreateQuestObjective = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateQuestObjectiveParams) => {
      const res = await axios.post<QuestObjective>(
        `/api/quests/${id}/objectives`,
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
        queryKey: [["fetchQuestObjectives", id]],
      });
    },
  });
};

export default useCreateQuestObjective;
