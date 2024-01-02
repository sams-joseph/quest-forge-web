import React, {
  useMemo,
  type ReactElement,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import MainLayout from "@/components/MainLayout";
import Typography from "@/ui/Typography";
import Image from "next/image";
import InfiniteList from "@/components/InfiniteList";
import useFetchItems, { type Item } from "@/hooks/useFetchItems";
import ItemObject from "@/components/ItemObject";
import Input from "@/ui/Input";
import useDebouncedSearch from "@/hooks/useDebouncedSearch";
import { cx } from "class-variance-authority";

const ITEM_ICON_MAP: Record<string, string> = {
  Armor: `${process.env.NEXT_PUBLIC_S3_URL}/assets/armor-icon.png`,
  Weapon: `${process.env.NEXT_PUBLIC_S3_URL}/assets/weapon-icon.png`,
  Potion: `${process.env.NEXT_PUBLIC_S3_URL}/assets/potion-icon.png`,
  Ring: `${process.env.NEXT_PUBLIC_S3_URL}/assets/ring-icon.png`,
  Staff: `${process.env.NEXT_PUBLIC_S3_URL}/assets/staff-icon.png`,
  Wand: `${process.env.NEXT_PUBLIC_S3_URL}/assets/wand-icon.png`,
};

const Filter = ({
  item,
  isSelected,
  onSelect,
}: {
  item: string;
  isSelected: boolean;
  onSelect: (s: string) => void;
}) => {
  const classes = cx([
    "flex cursor-pointer items-center justify-between gap-4 rounded-md bg-primary-500 p-2 hover:bg-primary-600",
    isSelected && "outline outline-primary-200",
  ]);

  const select = () => {
    if (isSelected) {
      onSelect("");
    } else {
      onSelect(item);
    }
  };

  return (
    <div className={classes} onClick={select}>
      <Typography variant="subtitle2">{item}</Typography>
      <Image
        src={ITEM_ICON_MAP[item] ?? "/"}
        alt={item}
        height={40}
        width={40}
        className="rounded-md"
      />
    </div>
  );
};

const Filters = ({
  onSelect,
  selected,
}: {
  selected: string;
  onSelect: Dispatch<SetStateAction<string>>;
}) => {
  const items = Object.keys(ITEM_ICON_MAP);

  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {items.map((item) => (
        <Filter
          item={item}
          isSelected={selected === item}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

const Items = () => {
  const [type, setType] = useState("");
  const { inputProps, debouncedValue } = useDebouncedSearch();
  const { data, isError, getInfiniteProps } = useFetchItems({
    name: debouncedValue,
    type,
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
      <Filters selected={type} onSelect={setType} />
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
