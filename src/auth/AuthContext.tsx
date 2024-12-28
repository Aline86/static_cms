import { createContext, useContext, useState } from "react";
import User from "../admin/authentication/class/User";

const AuthContext = createContext<any>(new User("", "", ""));

function AuthContextProvider(children: any) {
  const [user, setUser] = useState<any>(new User("", "", ""));

  const loginAction_starter = async (data: any) => {
    console.log("data", data);
    try {
      let response = await user.loginAction(data);
      let res = response;
      if (
        res !== undefined &&
        res[0].email !== undefined &&
        res[0].password !== undefined &&
        res[0].token !== undefined
      ) {
        let user_data = new User(res[0].email, res[0].password, res[0].token);
        setUser(user_data);
        return user_data;
      }
      throw new Error(response.message);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
  return (
    <AuthContext.Provider value={{ user, setUser, loginAction_starter }}>
      {children.children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthContext;

export { AuthContextProvider };
