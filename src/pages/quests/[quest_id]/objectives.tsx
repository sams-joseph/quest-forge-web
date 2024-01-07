import React, { useMemo, type ReactElement } from "react";
import MainLayout from "@/components/MainLayout";
import { useRouter } from "next/router";
import { Layout } from "@/components/QuestObject";
import Typography from "@/ui/Typography";
import InfiniteList from "@/components/InfiniteList";
import QuestObjectiveObject from "@/components/QuestObjectiveObject";
import useFetchQuestObjectives, {
  type QuestObjective,
} from "@/hooks/useFetchQuestObjectives";

const Objectives = () => {
  const router = useRouter();
  const { quest_id } = router.query;

  const { data, isError, getInfiniteProps, refetch } = useFetchQuestObjectives(
    quest_id as string,
  );

  const edges: QuestObjective[] = useMemo(() => {
    if (data?.pages) {
      return data.pages.flatMap((page) => page.data as QuestObjective[]);
    }

    return [];
  }, [data]);

  const renderComponent = (index: unknown): ReactElement => {
    if (typeof index !== "number") return <div></div>;

    const node = edges[index];

    return (
      <QuestObjectiveObject
        key={node?.id}
        displayType="ROW"
        node={node}
        refetch={refetch}
      />
    );
  };

  if (isError) {
    // TODO: Hoist this error handling
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Typography variant="subtitle">Objectives</Typography>
      </div>
      <InfiniteList
        items={edges}
        renderComponent={renderComponent}
        {...getInfiniteProps()}
      />
    </div>
  );
};

Objectives.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Layout>{page}</Layout>
    </MainLayout>
  );
};

export default Objectives;
