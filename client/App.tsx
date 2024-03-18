import React from 'react';
import { Route, Routes } from 'react-router';

export default function App(): JSX.Element {
  return (
    <div id="App">
      <Routes>
        <Route path="/*" element={<div>Welcome to Linkta</div>} />
      </Routes>
    </div>
  );
}
