import React from 'react';
import { RouterProvider } from 'react-router-dom';
import IndexRouter from '@routes/index';
import NotificationContainer from '@components/common/NotificationContainer';

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={IndexRouter()} />
      <NotificationContainer />
    </>
  );
};

export default App;
