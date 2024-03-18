import React, { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import { createRoot } from 'react-dom/client';

const rootNode = document.querySelector('#root');
if (rootNode) {
  createRoot(rootNode).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}
