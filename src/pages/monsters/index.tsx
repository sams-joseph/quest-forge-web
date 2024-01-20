import React, { useMemo, type ReactElement, useState } from "react";
import MainLayout from "@/components/MainLayout";
import Typography from "@/ui/Typography";
import Image from "next/image";
import MonsterObject from "@/components/MonsterObject";
import InfiniteList from "@/components/InfiniteList";
import Input from "@/ui/Input";
import useDebouncedSearch from "@/hooks/useDebouncedSearch";
import useFetchMonsters, { type Monster } from "@/hooks/useFetchMonsters";

const Monsters = () => {
  const { inputProps, debouncedValue } = useDebouncedSearch();
  const { data, isError, getInfiniteProps } = useFetchMonsters({
    name: debouncedValue,
  });

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
    <div className="pb-8">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_URL}/assets/door-icon.png`}
            alt="Monster"
            height={60}
            width={60}
          />
          <Typography variant="headline">Monsters</Typography>
        </div>
        <Input
          name="search"
          placeholder="Search"
          {...inputProps()}
          rounded="md"
        />
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
  return <MainLayout>{page}</MainLayout>;
};

export default Monsters;
