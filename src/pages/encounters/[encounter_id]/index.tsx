import React, { type ReactElement } from "react";
import MainLayout from "@/components/MainLayout";
import { useRouter } from "next/router";
import Icon from "@/ui/Icon";
import Typography from "@/ui/Typography";
import useFetchEncounter from "@/hooks/useFetchEncounter";
import { Layout } from "@/components/EncounterObject";
import MonsterObject from "@/components/MonsterObject";

const Encounter = () => {
  const router = useRouter();
  const { encounter_id } = router.query;

  const { data, isLoading, isError } = useFetchEncounter(
    encounter_id as string,
  );

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
        <Typography variant="subtitle">Monsters</Typography>
      </div>
      <div className="flex flex-col gap-2">
        {/* <Editor
          markdown={data?.description ?? ""}
          onChange={handleUpdate}
          placeholder="Tell us about what the party has in store"
        /> */}
        {(data?.monsters ?? []).map((monster) => (
          <MonsterObject key={monster.id} node={monster} displayType="ROW" />
        ))}
      </div>
    </div>
  );
};

Encounter.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Layout>{page}</Layout>
    </MainLayout>
  );
};

export default Encounter;
