import { useEffect, useState } from 'react';

const useMatchMedia = (breakpoint: number) => {
  const query = matchMedia(`(max-width: ${breakpoint}px)`);
  const [matching, setMatching] = useState(query.matches);

  useEffect(() => {
    const updateMatching = (e: MediaQueryListEvent) => {
      setMatching(e.matches);
      query.removeEventListener('change', updateMatching);
    };

    query.addEventListener('change', updateMatching);
  }, [query]);

  return matching;
};

export default useMatchMedia;

