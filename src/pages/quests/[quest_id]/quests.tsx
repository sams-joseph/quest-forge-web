import React, { useMemo, type ReactElement } from "react";
import MainLayout from "@/components/MainLayout";
import QuestObject, { Layout } from "@/components/QuestObject";
import InfiniteList from "@/components/InfiniteList";
import useFetchQuestSubquests from "@/hooks/useFetchQuestSubquests";
import { useRouter } from "next/router";
import { type Quest } from "@/hooks/useFetchGameQuests";
import Typography from "@/ui/Typography";

const Quests = () => {
  const router = useRouter();
  const { quest_id } = router.query;

  const { data, isError, getInfiniteProps } = useFetchQuestSubquests(
    quest_id as string,
  );

  const edges: Quest[] = useMemo(() => {
    if (data?.pages) {
      return data.pages.flatMap((page) => page.data as Quest[]);
    }

    return [];
  }, [data]);

  const renderComponent = (index: unknown): ReactElement => {
    if (typeof index !== "number") return <div></div>;

    const node = edges[index];

    return <QuestObject key={node?.id} displayType="ROW" node={node} />;
  };

  if (isError) {
    // TODO: Hoist this error handling
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Typography variant="subtitle">Quests</Typography>
      </div>
      <InfiniteList
        items={edges}
        renderComponent={renderComponent}
        {...getInfiniteProps()}
      />
    </div>
  );
};

Quests.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Layout>{page}</Layout>
    </MainLayout>
  );
};

export default Quests;
