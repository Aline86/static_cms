import { Component, useContext, useEffect, useState } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import AuthContextProvider from "../auth/AuthContext";

const PrivateRoute = () => {
  const { setUser, user } = useContext(AuthContextProvider);
  const [isAccess, setAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const returnState = async () => {
    try {
      if (
        "" !== localStorage.getItem("authToken") &&
        localStorage.getItem("authToken") !== null &&
        localStorage.getItem("authToken") !== undefined
      ) {
        user.set_auth_token(localStorage.getItem("authToken"));
        setUser(user);
        // setUser(user);
        console.log("res", user.authToken);
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
      console.log("res", error);
      setAccess(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    returnState();
  }, []);
  useEffect(() => {
    console.log("isaccess", isAccess);
  }, [isAccess]);
  if (loading) {
    return <div>Chargement...</div>; // Or a spinner/loading component
  }
  return isAccess ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
