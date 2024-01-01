import React, { useMemo, type ReactElement } from "react";
import MainLayout from "@/components/MainLayout";
import { useRouter } from "next/router";
import { Layout } from "@/components/QuestObject";
import Typography from "@/ui/Typography";
import InfiniteList from "@/components/InfiniteList";
import useFetchEncounters, { type Encounter } from "@/hooks/useFetchEncounters";
import EncounterObject from "@/components/EncounterObject";

const Encounters = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isError, getInfiniteProps } = useFetchEncounters(id as string);

  const edges: Encounter[] = useMemo(() => {
    if (data?.pages) {
      return data.pages.flatMap((page) => page.data as Encounter[]);
    }

    return [];
  }, [data]);

  const renderComponent = (index: unknown): ReactElement => {
    if (typeof index !== "number") return <div></div>;

    const node = edges[index];

    return <EncounterObject key={node?.id} displayType="ROW" node={node} />;
  };

  if (isError) {
    // TODO: Hoist this error handling
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Typography variant="subtitle">Encounters</Typography>
      </div>
      <InfiniteList
        items={edges}
        renderComponent={renderComponent}
        {...getInfiniteProps()}
      />
    </div>
  );
};

Encounters.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Layout>{page}</Layout>
    </MainLayout>
  );
};

export default Encounters;
