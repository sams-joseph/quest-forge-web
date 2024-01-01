import React, { useMemo, type ReactElement } from "react";
import useFetchGames, { type Game } from "@/hooks/useFetchGames";
import MainLayout from "@/components/MainLayout";
import GameObject from "@/components/GameObject";
import InfiniteGrid from "@/components/InfiniteGrid";
import Typography from "@/ui/Typography";
import Button from "@/ui/Button";
import useCreateGame from "@/hooks/useCreateGame";
import { useRouter } from "next/router";
import Image from "next/image";

const Characters = () => {
  const router = useRouter();
  const { data, isError, getInfiniteProps } = useFetchGames();
  const createGame = useCreateGame();

  const edges: Game[] = useMemo(() => {
    if (data?.pages) {
      return data.pages.flatMap((page) => page.data as Game[]);
    }

    return [];
  }, [data]);

  const handleCreateGame = async () => {
    const response = await createGame.mutateAsync({
      name: "New Campaign",
    });

    void router.push(`/campaigns/${response.id}`);
  };

  const renderComponent = (index: unknown): ReactElement => {
    if (typeof index !== "number") return <div></div>;

    const node = edges[index];

    return <GameObject key={node?.id} displayType="CARD" node={node} />;
  };

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_URL}/assets/flag-icon.png`}
            alt="Campaign"
            height={60}
            width={60}
          />
          <Typography variant="headline">Campaigns</Typography>
        </div>
        <Button
          size="medium"
          rounded="md"
          onClick={handleCreateGame}
          iconName="Plus"
        >
          Campaign
        </Button>
      </div>
      <InfiniteGrid
        items={edges}
        renderComponent={renderComponent}
        maxColumns={4}
        {...getInfiniteProps()}
      />
    </>
  );
};

Characters.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Characters;
