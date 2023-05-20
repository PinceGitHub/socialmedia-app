import { createContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

type AuthUser = {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  accessToken: string;
};

type FetchTokenResponseType = {
  fetched: boolean;
  isSuccessful: boolean;
};

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
  socket: Socket<any, any> | null;
  setReconnectSocket: React.Dispatch<React.SetStateAction<boolean>>;
  onlineUsers: Array<string> | null;
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
    isSuccessful: false,
  });
  const [socket, setSocket] = useState<Socket<any, any> | null>(null);
  const [reconnectSocket, setReconnectSocket] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<Array<string> | null>(null);

  useEffect(() => {
    if (auth && (reconnectSocket || socket === null || socket.disconnected)) {
      const socket = io(String(process.env.REACT_APP_SOCKET_HOST), {
        auth: {
          token: `Bearer ${auth.accessToken}`,
        },
      });

      socket.once("connect", () => {
        reconnectSocket && setReconnectSocket(false);
        setSocket(socket);
        socket.emit("addUser", auth.userId);
        socket.on("getOnlineUsers", (users) => {
          setOnlineUsers(users);
        });
      });
    }
  }, [auth, socket, reconnectSocket]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        persist,
        setPersist,
        fetchTokenResp,
        setFetchTokenResp,
        socket,
        setReconnectSocket,
        onlineUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
