import { useEffect, useState, useCallback } from 'react';
import { fetchUserInputListFromApi } from '@services/userInputService';
import { ITEMS_PER_PAGE } from '@components/layout/userInputConstants';

interface UserInput {
  _id: string;
  input: string;
}

interface UseUserInputListResult {
  userInputList: UserInput[];
  loading: boolean;
  handleShowMore: () => void;
  handleShowLess: () => void;
  page: number;
}

/**
 * Custom hook to manage user input list pagination and fetching data from API.
 *
 * @returns {UseUserInputListResult} The current user input list, loading state, page number, and handlers for pagination.
 */
const useUserInputList = (): UseUserInputListResult => {
  const [userInputList, setUserInputList] = useState<UserInput[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  /**
   * Fetches the user input list from the API based on the current page.
   */
  const loadUserInputList = useCallback(async () => {
    setLoading(true);

    try {
      const inputList = await fetchUserInputListFromApi(page, ITEMS_PER_PAGE);
      setUserInputList((prevInputList) => [...prevInputList, ...inputList]);
    } catch (error) {
      // TODO: implement logging service
      // console.error('Error fetching user inputs:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    void loadUserInputList();
  }, [loadUserInputList]);

  /**
   * Handles showing more items by incrementing the page number.
   */
  const handleShowMore = useCallback(() => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  /**
   * Handles showing fewer items by decrementing the page number and slicing the user input list.
   */
  const handleShowLess = useCallback(() => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
    setUserInputList((prevInputList) =>
      prevInputList.slice(
        0,
        Math.max(prevInputList.length - ITEMS_PER_PAGE, ITEMS_PER_PAGE)
      )
    );
  }, []);

  return { userInputList, loading, handleShowMore, handleShowLess, page };
};

export default useUserInputList;
