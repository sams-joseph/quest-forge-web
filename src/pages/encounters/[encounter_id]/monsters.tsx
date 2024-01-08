import React, { useMemo, type ReactElement, useState } from "react";
import MainLayout from "@/components/MainLayout";
import Typography from "@/ui/Typography";
import MonsterObject from "@/components/MonsterObject";
import InfiniteList from "@/components/InfiniteList";
import { type Monster } from "@/hooks/useFetchMonsters";
import useFetchEncounterMonsters from "@/hooks/useFetchEncounterMonsters";
import { useRouter } from "next/router";
import { Layout } from "@/components/EncounterObject";

const Monsters = () => {
  const router = useRouter();
  const { encounter_id } = router.query;
  const { data, isError, getInfiniteProps } = useFetchEncounterMonsters(
    encounter_id as string,
  );

  const [selectedMonster, setSelectedMonster] = useState<
    Monster | null | undefined
  >();

  const edges: Monster[] = useMemo(() => {
    if (data?.pages) {
      return data.pages.flatMap((page) => page.data as Monster[]);
    }

    return [];
  }, [data]);

  const renderComponent = (index: unknown): ReactElement => {
    if (typeof index !== "number") return <div></div>;

    const node = edges[index];

    return (
      <MonsterObject
        key={node?.id}
        displayType="ROW"
        node={node}
        onClick={() => setSelectedMonster(node)}
      />
    );
  };

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Typography variant="subtitle">Monsters</Typography>
      </div>
      <InfiniteList
        items={edges}
        renderComponent={renderComponent}
        {...getInfiniteProps()}
      />
      <MonsterObject
        displayType="DRAWER"
        node={selectedMonster}
        onClose={() => setSelectedMonster(null)}
      />
    </div>
  );
};

Monsters.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Layout>{page}</Layout>
    </MainLayout>
  );
};

export default Monsters;
