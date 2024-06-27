import type { InfiniteData } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import useInfiniteInputQuery from './useInfiniteInputQuery';
import { useCallback } from 'react';
import type { UserInput } from '../types';

interface UseInputHistoryResult {
  inputHistory: UserInput[];
  loading: boolean;
  handleShowMore: () => void;
  handleShowLess: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}

/**
 * Custom hook to manage user input history with infinite scrolling.
 * @returns {UseInputHistoryResult} The input history data, loading state, pagination handlers, and fetching states.
 */
const useInputHistory = (): UseInputHistoryResult => {
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteInputQuery();

  // Flatten the pages of user input history into a single array.
  const inputHistory = data ? data.pages.flat() : [];

  // Function to update the query data by removing the last page.
  const updateQueryData = useCallback(() => {
    queryClient.setQueryData<InfiniteData<UserInput[]>>(
      ['inputHistory'],
      (oldData) => {
        if (!oldData) return oldData;

        const newPages = oldData.pages.slice(0, -1);

        return {
          pages: newPages,
          pageParams: oldData.pageParams.slice(0, -1),
        };
      },
    );
  }, [queryClient]);

  // Handle showing more items by fetching the next page.
  const handleShowMore = useCallback(() => {
    if (!isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [fetchNextPage, isFetchingNextPage]);

  // Handle showing fewer items by removing the last page from the cached data.
  const handleShowLess = useCallback(() => {
    if (data && data.pages.length > 1) {
      updateQueryData();
    }
  }, [data, updateQueryData]);

  return {
    inputHistory,
    loading: status === 'pending' || isFetching,
    handleShowMore,
    handleShowLess,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useInputHistory;
