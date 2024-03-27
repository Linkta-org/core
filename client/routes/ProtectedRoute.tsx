import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../components/common/Loader';

const ProtectedRoute = () => {
  const isAuthenticated = true; //TODO: replace with authentication logic
  const isLoading = true; // TODO: replace with loading logic

  if(isLoading){
    return <Loader />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace={true} />;
};

export default ProtectedRoute;
