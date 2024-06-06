import { useEffect, useState } from 'react';
import { fetchUserInputListFromApi } from '@/client/services/userInputService';
import { MOCK_USER_INPUT_LIST } from '@/mocks';

const ITEMS_PER_PAGE = 10;

interface UserInput {
  _id: string;
  input: string;
}

export const useUserInputList = () => {
  // const [userInputList, setUserInputList] = useState<UserInput[]>([]);
  const [userInputList, setUserInputList] =
    useState<UserInput[]>(MOCK_USER_INPUT_LIST);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUserInputs = async () => {
      setLoading(true);

      try {
        const inputList = await fetchUserInputListFromApi(page, ITEMS_PER_PAGE);
        setUserInputList((prevInputList) => [...prevInputList, ...inputList]);
      } catch (error) {
        console.error('Error fetching user inputs:', error);
      } finally {
        setLoading(false);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadUserInputs();
  }, [page]);

  const handleShowMore = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleShowLess = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
    setUserInputList((prevInputList) =>
      prevInputList.slice(
        0,
        Math.max(prevInputList.length - ITEMS_PER_PAGE, ITEMS_PER_PAGE)
      )
    );
  };

  return { userInputList, loading, handleShowMore, handleShowLess, page };
};
