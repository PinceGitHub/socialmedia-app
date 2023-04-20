import { createContext, useState } from "react";

export type AuthUser = {
  userId: string;
  email: string;
  accessToken: string;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderType = {
  auth: AuthUser | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthProviderType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthUser | null>(null);
  const [persist, setPersist] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
