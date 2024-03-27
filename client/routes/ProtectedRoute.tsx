import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '@/client/components/common/Loader';

const ProtectedRoute = () => {
  const isAuthenticated = true; //TODO: replace with authentication logic
  const isLoading = true; // TODO: replace with loading logic
  const error = ''; // TODO: implement error handling logic

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {error && <p>error message placeholder</p>}
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate
          to="/"
          replace={true}
        />
      )}
    </div>
  );
};

export default ProtectedRoute;
