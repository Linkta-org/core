import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '@/client/components/common/Loader';
import useAuth from '@/client/hooks/useAuth';
/**
 * A higher-order component that guards child routes, ensuring they are accessible only to authenticated users. It leverages the `useAuth` hook to determine the user's authentication status.
 *
 * Unauthenticated users are redirected to the sign-in page.
 */
const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading, error } = useAuth();

  if (isLoading) {
    return <Loader />;
  }
  // TODO: update erroPage when ready
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
