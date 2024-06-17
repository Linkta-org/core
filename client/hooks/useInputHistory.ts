import { useEffect, useState, useCallback } from 'react';
import { fetchInputHistoryFromApi } from '@services/userInputService';
import { ITEMS_PER_PAGE } from '@components/layout/userInputConstants';

interface UserInput {
  _id: string;
  title: string;
  input: string;
}

interface UseInputHistoryResult {
  inputHistory: UserInput[];
  loading: boolean;
  handleShowMore: () => void;
  handleShowLess: () => void;
  page: number;
}

/**
 * Custom hook to manage user input list pagination and fetching data from API.
 *
 * @returns {UseInputHistoryResult} The current user input list, loading state, page number, and handlers for pagination.
 */
const useInputHistory = (): UseInputHistoryResult => {
  const [inputHistory, setInputHistory] = useState<UserInput[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  /**
   * Fetches the user input list from the API based on the current page.
   */
  const loadInputHistory = useCallback(async () => {
    setLoading(true);

    try {
      const curInputHistory = await fetchInputHistoryFromApi(
        page,
        ITEMS_PER_PAGE
      );
      setInputHistory((prevInputHistory) => [
        ...prevInputHistory,
        ...curInputHistory,
      ]);
    } catch (error) {
      console.error('Error fetching user inputs:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    void loadInputHistory();
  }, [loadInputHistory]);

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
    setInputHistory((prevInputHistory) =>
      prevInputHistory.slice(
        0,
        Math.max(prevInputHistory.length - ITEMS_PER_PAGE, ITEMS_PER_PAGE)
      )
    );
  }, []);

  return { inputHistory, loading, handleShowMore, handleShowLess, page };
};

export default useInputHistory;
