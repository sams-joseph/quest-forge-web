import React, { useMemo, type ReactElement } from "react";
import MainLayout from "@/components/MainLayout";
import Typography from "@/ui/Typography";
import Image from "next/image";
import ClassObject from "@/components/ClassObject";
import InfiniteList from "@/components/InfiniteList";
import useFetchSpells, { type Spell } from "@/hooks/useFetchSpells";
import Input from "@/ui/Input";
import useDebouncedSearch from "@/hooks/useDebouncedSearch";

const Spells = () => {
  const { inputProps, debouncedValue } = useDebouncedSearch();
  const { data, isError, getInfiniteProps } = useFetchSpells({
    name: debouncedValue,
  });

  const edges: Spell[] = useMemo(() => {
    if (data?.pages) {
      return data.pages.flatMap((page) => page.data as Spell[]);
    }

    return [];
  }, [data]);

  const renderComponent = (index: unknown): ReactElement => {
    if (typeof index !== "number") return <div></div>;

    const node = edges[index];

    return <ClassObject key={node?.id} displayType="ROW" node={node} />;
  };

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_URL}/assets/book-icon.png`}
            alt="Spell"
            height={60}
            width={60}
          />
          <Typography variant="headline">Spells</Typography>
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
    </>
  );
};

Spells.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Spells;
