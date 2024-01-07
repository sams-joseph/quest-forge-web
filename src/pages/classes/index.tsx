import React, { useMemo, type ReactElement } from "react";
import MainLayout from "@/components/MainLayout";
import Typography from "@/ui/Typography";
import Image from "next/image";
import useFetchClasses, { type Class } from "@/hooks/useFetchClasses";
import ClassObject from "@/components/ClassObject";
import InfiniteList from "@/components/InfiniteList";
import Input from "@/ui/Input";
import useDebouncedSearch from "@/hooks/useDebouncedSearch";

const Classes = () => {
  const { inputProps, debouncedValue } = useDebouncedSearch();
  const { data, isError, getInfiniteProps } = useFetchClasses({
    name: debouncedValue,
  });

  const edges: Class[] = useMemo(() => {
    if (data?.pages) {
      return data.pages.flatMap((page) => page.data as Class[]);
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
    <div className="pb-8">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_URL}/assets/helmet-icon.png`}
            alt="Campaign"
            height={60}
            width={60}
          />
          <Typography variant="headline">Classes</Typography>
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

Classes.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Classes;
