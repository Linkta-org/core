import type {
  UseInfiniteQueryResult,
  InfiniteData,
} from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchInputHistoryFromApi } from '@services/userInputService';
import { ITEMS_PER_PAGE } from '@utils/constants';
import type { UserInput } from '../types';

type UserInputsPage = UserInput[];
type InfiniteUserInputsData = InfiniteData<UserInputsPage>;
type InputHistoryQueryKey = ['inputHistory'];
type PageNumber = number;

/**
 * Custom hook to fetch user input history with infinite scrolling.
 * @returns {UseInfiniteQueryResult<InfiniteData<UserInput[]>, Error>} The result of the infinite query, including the data, fetch functions, and status.
 */
const useInfiniteInputQuery = (): UseInfiniteQueryResult<
  InfiniteData<UserInput[]>,
  Error
> => {
  return useInfiniteQuery<
    UserInputsPage,
    Error,
    InfiniteUserInputsData,
    InputHistoryQueryKey,
    PageNumber
  >({
    queryKey: ['inputHistory'],

    //  Function to fetch a page of user input history.
    queryFn: ({ pageParam }) =>
      fetchInputHistoryFromApi(pageParam, ITEMS_PER_PAGE),

    // Function to get the next page parameter.
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length < ITEMS_PER_PAGE ? undefined : pages.length + 1;
    },
    initialPageParam: 1,
  });
};

export default useInfiniteInputQuery;
