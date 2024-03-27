import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const auth = true;

  return (
    auth ? <Outlet /> : <Navigate to='/sign-in' />
  )
}

export default ProtectedRoute;
