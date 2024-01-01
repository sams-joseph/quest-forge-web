import axios from "@/lib/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { Game } from "@/hooks/useFetchGames";

interface CreateGameParams {
  name: string;
  description?: string;
}

const placeholderDescription = `
#### Campaign Setting
* **World/Universe:** [Describe the setting of the campaign, including any unique world-building elements]
* **Time Period:** [Specify the historical or fantasy time period, if applicable]

#### Storyline Summary
* **Main Plot:** [Provide a general overview of the campaign's main plot and objectives]
* **Key Conflicts:** [Describe the major conflicts or challenges that the characters may face]

#### Additional Resources
* [List any additional resources or materials related to the campaign]

#### Next Steps
* **Upcoming Session Date:** [Enter Next Session Date]
* **What to Expect:** [Brief description of what's expected for the next session or future plot developments]
`;

const useCreateGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createGame"],
    mutationFn: async (data: CreateGameParams) => {
      const res = await axios.post<Game>(
        `/api/games`,
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
      void queryClient.invalidateQueries({ queryKey: ["fetchGames"] });
    },
  });
};

export default useCreateGame;
