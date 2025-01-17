import { Component, useContext, useEffect, useState } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import AuthContextProvider from "../auth/AuthContext";
import CryptoJS from "crypto-js";

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
        console.log("res", user);
        let res = await user.check_token();
        console.log("res", res);
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
