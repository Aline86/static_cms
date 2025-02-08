import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContextProvider from "../auth/AuthContext";

const PrivateRoute = () => {
  const { setUser, user } = useContext(AuthContextProvider);
  const [isAccess, setAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const returnState = async () => {
    const secretMessage = sessionStorage.getItem("authToken");

    try {
      if (
        secretMessage !== "" &&
        secretMessage !== null &&
        secretMessage !== undefined
      ) {
        user.set_auth_token(sessionStorage.getItem("authToken"));
        setUser(user);

        let res = await user.check_token();

        if (res === false) {
          setAccess(false);
          <Navigate to="/login" />;
        } else {
          setAccess(true);
        }
      } else if (sessionStorage.getItem("authToken") === null) {
        setAccess(false);
        <Navigate to="/login" />;
      }
    } catch (error) {
      setAccess(false);
      <Navigate to="/login" />;
    } finally {
      setLoading(false);
      <Navigate to="/login" />;
    }
  };
  useEffect(() => {
    returnState();
  }, []);
  useEffect(() => {}, [isAccess]);
  if (loading) {
    return <div>Chargement...</div>; // Or a spinner/loading component
  }
  return isAccess ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
