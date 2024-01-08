import { useCallback } from "react";
import { type QueryKey, useInfiniteQuery } from "@tanstack/react-query";

type InfinitePageResponse = {
  to: number;
  per_page: number;
  data: unknown[];
};

interface UseInfiniteScrollOptions {
  queryKey: QueryKey;
  queryFn: (params: { pageParam?: number }) => Promise<InfinitePageResponse>;
  enabled?: boolean;
}

const useInfiniteScroll = ({
  queryKey,
  queryFn,
  enabled,
}: UseInfiniteScrollOptions) => {
  const {
    data,
    isLoading,
    isError,
    error,
    status,
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    hasPreviousPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn,
    getNextPageParam: (lastPage: InfinitePageResponse) => {
      if (lastPage?.to % lastPage?.per_page === 0) {
        return lastPage?.to / lastPage?.per_page + 1;
      }

      return null;
    },
    initialPageParam: 1,
    enabled,
  });

  const fetchMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage]);

  const getInfiniteProps = () => {
    return {
      refreshing: isRefetching,
      onRefresh: refetch,
      isLoading,
      isError,
      error,
      isFetchingNextPage,
      hasNextPage,
      onEndReached: fetchMore,
    };
  };

  return {
    data: data ?? { pages: [] },
    isLoading,
    isError,
    error,
    status,
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    hasPreviousPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
    getInfiniteProps,
  };
};

export default useInfiniteScroll;
