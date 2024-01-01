import React, { useMemo, type ReactElement } from "react";
import useFetchCharacters, { type Character } from "@/hooks/useFetchCharacters";
import MainLayout from "@/components/MainLayout";
import CharacterObject from "@/components/CharacterObject";
import InfiniteGrid from "@/components/InfiniteGrid";
import Typography from "@/ui/Typography";
import Image from "next/image";
import CreateCharacterModal from "@/components/CreateCharacterModal";

const Characters = () => {
  const { data, isError, getInfiniteProps } = useFetchCharacters();

  const edges: Character[] = useMemo(() => {
    if (data?.pages) {
      return data.pages.flatMap((page) => page.data as Character[]);
    }

    return [];
  }, [data]);

  const renderComponent = (index: unknown): ReactElement => {
    if (typeof index !== "number") return <div></div>;

    const node = edges[index];

    return <CharacterObject key={node?.id} displayType="ROW" node={node} />;
  };

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_URL}/assets/people-icon.png`}
            alt="Characters"
            height={60}
            width={60}
          />
          <Typography variant="headline">Characters</Typography>
        </div>
        <CreateCharacterModal />
      </div>
      <InfiniteGrid
        items={edges}
        renderComponent={renderComponent}
        {...getInfiniteProps()}
      />
    </>
  );
};

Characters.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Characters;
