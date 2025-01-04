import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../auth/AuthContext";

const PrivateRoute = () => {
  const user = useContext(AuthContext);

  if (
    user.user.token === "" ||
    user.user.token !== localStorage.getItem("authToken")
  ) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
