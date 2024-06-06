import { useState } from 'react';

const useMatchMedia = (breakpoint: number) => {
  const query = matchMedia(`(max-width: ${breakpoint}px)`);
  const [matching, setMatching] = useState(query.matches);

  const updateMatching = (e: MediaQueryListEvent) => {
    setMatching(e.matches);
    query.removeEventListener('change', updateMatching);
  };

  query.addEventListener('change', updateMatching);

  return matching;
};

export default useMatchMedia;
