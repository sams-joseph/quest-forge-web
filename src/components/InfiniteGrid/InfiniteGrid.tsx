import React, { useEffect, useMemo, useRef } from "react";
import { type Components, VirtuosoGrid } from "react-virtuoso";
import Icon from "@/ui/Icon";
import EmptyList from "@/components/EmptyList";

interface InfiniteProps {
  items: unknown[];
  onEndReached?: () => void;
  renderComponent: (item: unknown) => JSX.Element;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  maxColumns?: number;
  hasNextPage?: boolean;
}

const ColumnContainer: Components["List"] = React.forwardRef((props, ref) => {
  const { isFetchingNextPage, isLoading, items } = props?.context as {
    isFetchingNextPage: boolean;
    isLoading: boolean;
    items: unknown[];
  };

  if (!items?.length && !isLoading && !isFetchingNextPage) {
    return <EmptyList {...props} />;
  }

  return (
    <div
      {...props}
      ref={ref}
      className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
    />
  );
});

const InfiniteGrid = ({
  items,
  onEndReached,
  renderComponent,
  isFetchingNextPage,
  isLoading,
  hasNextPage,
  maxColumns = 6,
}: InfiniteProps) => {
  const scrollParentRef = useRef<HTMLElement | undefined>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const parent = document.getElementById("main-scroll-area");
      if (parent) {
        scrollParentRef.current = parent;
      }
    }
  }, []);

  const context = useMemo(() => {
    return {
      maxColumns,
      hasNextPage,
      isFetchingNextPage,
      isLoading,
      items,
    };
  }, [maxColumns, hasNextPage, isFetchingNextPage, isLoading, items]);

  return (
    <VirtuosoGrid
      customScrollParent={scrollParentRef.current}
      overscan={10}
      context={context}
      components={{
        List: ColumnContainer,
        Footer: () => {
          if (!isFetchingNextPage && !isLoading) {
            return null;
          }
          return (
            <div className="flex items-center justify-center p-8">
              <Icon iconName="Loading" />
            </div>
          );
        },
      }}
      itemContent={(index = 0) => renderComponent(index)}
      totalCount={items?.length}
      data={items}
      endReached={onEndReached}
    />
  );
};

export default InfiniteGrid;
