import React, { useMemo, type ReactElement } from "react";
import MainLayout from "@/components/MainLayout";
import Typography from "@/ui/Typography";
import Image from "next/image";
import InfiniteList from "@/components/InfiniteList";
import useFetchRaces, { type Race } from "@/hooks/useFetchRaces";
import RaceObject from "@/components/RaceObject";
import useDebouncedSearch from "@/hooks/useDebouncedSearch";
import Input from "@/ui/Input";

const Races = () => {
  const { inputProps, debouncedValue } = useDebouncedSearch();
  const { data, isError, getInfiniteProps } = useFetchRaces({
    name: debouncedValue,
  });

  const edges: Race[] = useMemo(() => {
    if (data?.pages) {
      return data.pages.flatMap((page) => page.data as Race[]);
    }

    return [];
  }, [data]);

  const renderComponent = (index: unknown): ReactElement => {
    if (typeof index !== "number") return <div></div>;

    const node = edges[index];

    return <RaceObject key={node?.id} displayType="ROW" node={node} />;
  };

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="pb-8">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_URL}/assets/race-icon.png`}
            alt="Campaign"
            height={60}
            width={60}
          />
          <Typography variant="headline">Races</Typography>
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
    </div>
  );
};

Races.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Races;
