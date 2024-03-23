import React from 'react';
import {
  useCurrentPage,
  useNavigationActions,
} from './store/navigationStore.ts';

export default function App() {
  // subscribe App to currentPage slice of store
  const currentPage = useCurrentPage();

  const navigationActions = useNavigationActions();

  const handleClick = (page) => {
    return navigationActions.setCurrentPage(page);
  };

  return (
    <>
      <h1>Linkta</h1>
      <p>Current Page: {currentPage}</p>
      <button onClick={() => handleClick('Page 1')}>Page 1</button>
      <button onClick={() => handleClick('Page 2')}>Page 2</button>
    </>
  );
}
