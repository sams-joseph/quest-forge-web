import axios from "@/lib/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { type Character } from "./useFetchCharacters";

interface CreateCharacterParams {
  name: string;
  class_id: string;
  race_id: string;
  background_id: string;
}

const useCreateCharacter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createCharacter"],
    mutationFn: async (data: CreateCharacterParams) => {
      const res = await axios.post<Character>(`/api/characters`, data, {
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
        },
      });

      return res.data;
    },
    onSuccess: async () => {
      void queryClient.invalidateQueries({
        queryKey: [["fetchCharacters"]],
      });
    },
  });
};

export default useCreateCharacter;
