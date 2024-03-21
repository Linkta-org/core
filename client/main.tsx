import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from './features/not-found-page/NotFoundPage';
import MainLayout from './components/layout/main-layout/MainLayout';
import PromptInputPage from './features/prompt-input-page/PromptInputPage';
import OutputVisualizationPage from './features/output-visualization-page/OutputVisualizationPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
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
