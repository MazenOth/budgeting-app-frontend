import { SetStateAction, createContext, useState } from "react";
import React, { ReactNode, Dispatch } from "react";

interface Props {
  children?: React.ReactNode;
}
interface AuthContextType {
  auth: UserType;
  setAuth: Dispatch<UserType>;
}

interface UserType {
  accessToken: string;
  id: string;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState({ accessToken: "", id: "" });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
