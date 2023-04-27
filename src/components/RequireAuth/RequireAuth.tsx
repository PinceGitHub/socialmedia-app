import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { appUrls } from "../../utils/app-utils";
import Loader from "../Loader/Loader";

type RequireAuthProps = {
  children: React.ReactNode;
};

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { fetchTokenResp } = useAuth();
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
        <Loader open={true} />
      )}
    </>
  );
};

export default RequireAuth;
