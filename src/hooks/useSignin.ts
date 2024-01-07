import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface User {
  id: string;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}

const signIn = async (data: { email: string; password: string }) => {
  const res = await axios.post<User>(`/login`, data, {
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json",
    },
  });

  return res.data;
};

const useSignin = () => {
  return useMutation({
    mutationFn: signIn,
  });
};

export default useSignin;
