import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from "@/app/store/store";


interface ProtectedAdminRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({children,redirectTo = '/login'}) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}; 