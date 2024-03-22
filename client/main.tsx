import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from './components/layout/main-layout/MainLayout';
import PromptInputPage from './features/prompt-input-page/PromptInputPage';
import OutputVisualizationPage from './features/output-visualization-page/OutputVisualizationPage';
import ErrorPage from './features/error-pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/generate", element: <PromptInputPage /> },
      { path: "/tree", element: <OutputVisualizationPage />},
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
