/* 
1.Here show only logged in user and correct role user access
2.Purpose: Allow only logged-in + specific role users.
3.workflow : 
a: check token will have or not 
b: no token then redirect to login page please login first
c:If correct role → allow access
d:Otherwise need to login in that role and then enter that page */

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const ProtectedRoutes = ({ children, allowrole }) => {
  const { auth } = useAuth();
  // check logged in user --> if not token then first need to login
  if (!auth.token) {
    return <Navigate to={"/login"} replace />;
  }
  // role based login
  if (allowrole && auth.role !== allowrole) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
};

export default ProtectedRoutes;
