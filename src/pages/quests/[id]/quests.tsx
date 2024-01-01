import React, { type ReactElement } from "react";
import MainLayout from "@/components/MainLayout";
import { Layout } from "@/components/QuestObject";

const Quests = () => {
  return <div>quests</div>;
};

Quests.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Layout>{page}</Layout>
    </MainLayout>
  );
};

export default Quests;
