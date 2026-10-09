import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { setUserDetailsData } from "../../../Redux/Slices/UserDetails/UserDetails";
import { useDispatch } from "react-redux";

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const userDetails = localStorage.getItem("userDetails");
  const parsedUserDetails = userDetails ? JSON.parse(userDetails) : null;
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserDetailsData(parsedUserDetails as any));
  }, [parsedUserDetails]);

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