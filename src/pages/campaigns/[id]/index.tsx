import React, { type ReactElement } from "react";
import MainLayout from "@/components/MainLayout";
import { useRouter } from "next/router";
import { Layout } from "@/components/GameObject";
import Icon from "@/ui/Icon";
import useFetchGame from "@/hooks/useFetchGame";
import dynamic from "next/dynamic";
import useUpdateGame from "@/hooks/useUpdateGame";
import debounce from "just-debounce-it";
import Typography from "@/ui/Typography";
import toast from "react-hot-toast";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

const Game = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useFetchGame(id as string);
  const updateGame = useUpdateGame(id as string);

  const handleUpdate = debounce(async (description: string) => {
    await toast.promise(updateGame.mutateAsync({ description }), {
      loading: "Updating...",
      success: "Updated",
      error: "Error updating",
    });
  }, 2000);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Icon iconName="Loading" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Typography variant="subtitle">Overview</Typography>
      </div>
      <div>
        <Editor
          markdown={data?.description ?? ""}
          onChange={handleUpdate}
          placeholder="Tell us about what the party has in store"
        />
      </div>
    </div>
  );
};

Game.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Layout>{page}</Layout>
    </MainLayout>
  );
};

export default Game;
