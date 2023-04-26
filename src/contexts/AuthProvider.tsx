import { createContext, useState } from "react";

type AuthUser = {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  accessToken: string;
};

type FetchedTokenResponseType = {
  fetched: true;
  isSuccessful?: boolean;
  isFailure?: boolean;
};

type FetchingTokenResponseType = {
  fetched: false;
  isSuccessful?: never;
  isFailure?: never;
};

type FetchTokenResponseType =
  | FetchingTokenResponseType
  | FetchedTokenResponseType;

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderType = {
  auth: AuthUser | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
  fetchTokenResp: FetchTokenResponseType;
  setFetchTokenResp: React.Dispatch<
    React.SetStateAction<FetchTokenResponseType>
  >;
};

const AuthContext = createContext<AuthProviderType | null>(null);

let strIsPersistentLogin = localStorage.getItem("persist");
const isPersistentLogin = strIsPersistentLogin
  ? Boolean(JSON.parse(strIsPersistentLogin))
  : false;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthUser | null>(null);
  const [persist, setPersist] = useState(isPersistentLogin);
  const [fetchTokenResp, setFetchTokenResp] = useState<FetchTokenResponseType>({
    fetched: false,
  });

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        persist,
        setPersist,
        fetchTokenResp,
        setFetchTokenResp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
