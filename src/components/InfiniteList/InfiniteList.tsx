import React, { useEffect, useMemo, useRef } from "react";
import { type Components, Virtuoso } from "react-virtuoso";
import Icon from "@/ui/Icon";
import EmptyList from "@/components/EmptyList";

interface InfiniteProps {
  items: unknown[];
  onEndReached?: () => void;
  renderComponent: (item: unknown) => JSX.Element;
  isFetchingNextPage: boolean;
  isLoading?: boolean;
  hasNextPage?: boolean;
  refreshing?: boolean;
}

const Container: Components["List"] = React.forwardRef((props, ref) => {
  return <div {...props} ref={ref} className="flex w-full flex-col gap-2" />;
});

const EmptyPlaceholder: Components["EmptyPlaceholder"] = (props) => {
  const { isFetchingNextPage, isLoading, refreshing } = props?.context as {
    isFetchingNextPage: boolean;
    isLoading: boolean;
    items: unknown[];
    refreshing: boolean;
  };

  if (isFetchingNextPage || isLoading || refreshing) {
    return null;
  }

  return <EmptyList />;
};

const Footer: Components["Footer"] = (props) => {
  const { isFetchingNextPage, isLoading, refreshing } = props?.context as {
    isFetchingNextPage: boolean;
    isLoading: boolean;
    items: unknown[];
    refreshing: boolean;
  };

  if (!isFetchingNextPage && !isLoading && !refreshing) {
    return null;
  }

  return (
    <div className="flex items-center justify-center p-8">
      <Icon iconName="Loading" />
    </div>
  );
};

const InfiniteList = ({
  items,
  onEndReached,
  renderComponent,
  isFetchingNextPage,
  isLoading,
  hasNextPage,
  refreshing,
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
      hasNextPage,
      isFetchingNextPage,
      isLoading,
      items,
      refreshing,
    };
  }, [hasNextPage, isFetchingNextPage, isLoading, items, refreshing]);

  return (
    <Virtuoso
      customScrollParent={scrollParentRef.current}
      components={{
        List: Container,
        EmptyPlaceholder,
        Footer,
      }}
      context={context}
      itemContent={(index = 0) => renderComponent(index)}
      totalCount={items?.length}
      data={items}
      endReached={onEndReached}
    />
  );
};

export default InfiniteList;
