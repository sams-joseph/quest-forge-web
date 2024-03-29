import React, { type ReactElement } from "react";
import MainLayout from "@/components/MainLayout";
import Icon from "@/ui/Icon";
import useFetchCharacter from "@/hooks/useFetchCharacter";
import { useRouter } from "next/router";
import { Layout } from "@/components/CharacterObject";

const Character = () => {
  const router = useRouter();
  const { character_id: id } = router.query;

  const { data, isLoading } = useFetchCharacter(id as string);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Icon iconName="Loading" />
      </div>
    );
  }

  if (!data) {
    return (
      // TODO: make empty list / error component
      <div className="flex items-center justify-center p-4">
        This will be an error message, let's hoist this into it's own component
      </div>
    );
  }

  return <div>Character</div>;
};

Character.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Layout>{page}</Layout>
    </MainLayout>
  );
};

export default Character;
