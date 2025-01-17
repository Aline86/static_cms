import { createContext, useContext, useState } from "react";
import User from "../admin/authentication/class/User";

const AuthContext = createContext<any>(new User("", "", ""));

function AuthContextProvider(children: any) {
  const [user, setUser] = useState<any>(new User("", "", ""));

  const loginAction_starter = async (data: any) => {
    try {
      let response = await user.loginAction(data);

      if (response !== undefined && response[0].token !== undefined) {
        let token = await user.hashPassword(response[0].token);

        let user_data = new User(user.email, user.password, token);
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
