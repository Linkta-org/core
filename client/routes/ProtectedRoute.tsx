import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '@/client/components/common/Loader';

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = true; //TODO: replace with authentication logic
  const isLoading = true; // TODO: replace with loading logic
  const error = ''; // TODO: replace with error handling logic

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {error && <div>errorPage placeholder</div>}
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate
          to="/sign-in"
          replace={true}
        />
      )}
    </div>
  );
};

export default ProtectedRoute;
