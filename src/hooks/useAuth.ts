import { useEffect } from "react";
import { useRouter } from "next/router";
import useFetchMe from "./useFetchMe";
import useSignin from "./useSignin";
import useSignOut from "./useSignout";

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: {
  middleware?: string;
  redirectIfAuthenticated?: string;
}) => {
  const router = useRouter();
  const { data: user, error, refetch } = useFetchMe();
  const { mutateAsync: signIn } = useSignin();
  const { mutateAsync: signOut } = useSignOut();

  const login = async (data: { email: string; password: string }) => {
    await signIn(data);
    void refetch();
  };

  const logout = async () => {
    await signOut();
    window.location.pathname = "/login";
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user) {
      void router.push(redirectIfAuthenticated);
    }

    if (middleware === "auth" && error) {
      void logout();
    }
  }, [user, error]);

  return {
    user,
    login,
    logout,
  };
};
