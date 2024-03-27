import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '@/client/components/common/Loader';
import useAuth from '../hooks/useAuth';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading, error } = useAuth();

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
