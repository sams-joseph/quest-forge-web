import React, { useMemo, type ReactElement } from "react";
import MainLayout from "@/components/MainLayout";
import Typography from "@/ui/Typography";
import Image from "next/image";
import InfiniteList from "@/components/InfiniteList";
import useFetchItems, { type Item } from "@/hooks/useFetchItems";
import ItemObject from "@/components/ItemObject";
import Input from "@/ui/Input";
import useDebouncedSearch from "@/hooks/useDebouncedSearch";

const Items = () => {
  const { inputProps, debouncedValue } = useDebouncedSearch();
  const { data, isError, getInfiniteProps } = useFetchItems({
    name: debouncedValue,
  });

  const edges: Item[] = useMemo(() => {
    if (data?.pages) {
      return data.pages.flatMap((page) => page.data as Item[]);
    }

    return [];
  }, [data]);

  const renderComponent = (index: unknown): ReactElement => {
    if (typeof index !== "number") return <div></div>;

    const node = edges[index];

    return <ItemObject key={node?.id} displayType="ROW" node={node} />;
  };

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_URL}/assets/bag-icon.png`}
            alt="Items"
            height={60}
            width={60}
          />
          <Typography variant="headline">Items</Typography>
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

Items.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Items;
