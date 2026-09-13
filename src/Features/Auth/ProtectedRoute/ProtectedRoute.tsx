import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return (
      <Navigate
        to="/auth/signin"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;