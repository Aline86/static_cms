import { useContext, createContext, useState } from "react";
import User from "../admin/authentication/class/User";

const AuthContext = createContext<any>(new User("", "", ""));

const AuthProvider = (children: any) => {
  const [user, setUser] = useState<any>(AuthContext);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
