import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '@/client/components/common/Loader';
import useAuth from '@/client/hooks/useAuth';
/**
 * A higher-order component that guards child routes, ensuring they are accessible only to authenticated users. It leverages the `useAuth` hook to determine the user's authentication status.
 * Unauthenticated users are redirected to the home page.
 */
const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }
// TODO: add error handling
  return (
    <div>
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
