import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const signOut = async () => {
  await axios.post(`/logout`);
};

const useSignOut = () => {
  return useMutation({
    mutationKey: ["signOut"],
    mutationFn: signOut,
  });
};

export default useSignOut;
