import React from 'react';
import { RouterProvider } from 'react-router-dom';
import IndexRouter from './routes/index';

const App: React.FC = () => {
  return <RouterProvider router={IndexRouter()} />;
};

export default App;
