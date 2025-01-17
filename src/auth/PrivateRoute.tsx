import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContextProvider from "../auth/AuthContext";

const PrivateRoute = () => {
  const { setUser, user } = useContext(AuthContextProvider);

  if ("" !== localStorage.getItem("authToken")) {
    console.log("user", user);
    user.authToken = localStorage.getItem("authToken");
    // setUser(user);
    if (!user.check_token) {
      return <Navigate to="/login" />;
    }
    return <Outlet />;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
