import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../auth/AuthContext";

const PrivateRoute = () => {
  const user = useContext(AuthContext);
  console.log("user.token", user.user.token);
  if (user.user.token === "") return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
