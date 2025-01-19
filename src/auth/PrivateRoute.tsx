import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContextProvider from "../auth/AuthContext";

const PrivateRoute = () => {
  const { setUser, user } = useContext(AuthContextProvider);
  const [isAccess, setAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const returnState = async () => {
    const secretMessage = localStorage.getItem("authToken");
    /// A CACHER DANS .ENV

    try {
      if (
        secretMessage !== null &&
        secretMessage !== undefined &&
        secretMessage.length > 10
      ) {
        user.set_auth_token(localStorage.getItem("authToken"));
        setUser(user);
        // setUser(user);

        let res = await user.check_token();

        if (res === false) {
          setAccess(false);
        } else {
          setAccess(true);
        }
      } else if (localStorage.getItem("authToken") === null) {
        setAccess(false);
      }
    } catch (error) {
      setAccess(false);

      setLoading(false);
    } finally {
      setLoading(false);
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
