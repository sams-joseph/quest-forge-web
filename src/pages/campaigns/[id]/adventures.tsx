import React, { useMemo, type ReactElement } from "react";
import MainLayout from "@/components/MainLayout";
import { useRouter } from "next/router";
import { Layout } from "@/components/GameObject";
import Typography from "@/ui/Typography";
import InfiniteList from "@/components/InfiniteList";
import QuestObject from "@/components/QuestObject";
import useFetchGameQuests, { type Quest } from "@/hooks/useFetchGameQuests";

const Adventures = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isError, getInfiniteProps } = useFetchGameQuests(id as string);

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
        <Typography variant="subtitle">Adventures</Typography>
      </div>
      <InfiniteList
        items={edges}
        renderComponent={renderComponent}
        {...getInfiniteProps()}
      />
    </div>
  );
};

Adventures.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Layout>{page}</Layout>
    </MainLayout>
  );
};

export default Adventures;
