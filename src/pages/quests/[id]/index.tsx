import React, { type ReactElement } from "react";
import MainLayout from "@/components/MainLayout";
import { useRouter } from "next/router";
import Icon from "@/ui/Icon";
import useFetchQuest from "@/hooks/useFetchQuest";
import dynamic from "next/dynamic";
import debounce from "just-debounce-it";
import Typography from "@/ui/Typography";
import { Layout } from "@/components/QuestObject";
import useUpdateQuest from "@/hooks/useUpdateQuest";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

const Quest = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isError } = useFetchQuest(id as string);
  const updateQuest = useUpdateQuest(id as string);

  const handleUpdate = debounce(async (description: string) => {
    await updateQuest.mutateAsync({ description });
  }, 2000);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Icon iconName="Loading" />
      </div>
    );
  }

  if (isError) {
    return <div className="flex items-center justify-center p-4">Error</div>;
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

Quest.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Layout>{page}</Layout>
    </MainLayout>
  );
};

export default Quest;
