import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: string;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}

const fetchMe = async () => {
  const res = await axios.get<User>(`/api/user`, {
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json",
    },
  });

  return res.data;
};

const useFetchMe = () => {
  return useQuery({
    queryKey: ["fetchMe"],
    queryFn: fetchMe,
    retry: false,
  });
};

export default useFetchMe;
