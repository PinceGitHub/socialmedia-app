import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { appUrls } from "../../utils/app-utils";

type RequireAuthProps = {
  children: React.ReactNode;
};

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { fetchTokenResp, persist } = useAuth();
  const { pathname } = useLocation();

  return (
    <>
      {fetchTokenResp.fetched ? (
        fetchTokenResp.isSuccessful ? (
          children
        ) : (
          <Navigate to={appUrls.signIn} state={{ from: { pathname } }} />
        )
      ) : (
        !persist && (
          <Navigate to={appUrls.signIn} state={{ from: { pathname } }} />
        )
      )}
    </>
  );
};

export default RequireAuth;
