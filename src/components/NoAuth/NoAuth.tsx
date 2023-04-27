import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { appUrls } from "../../utils/app-utils";
import Loader from "../Loader/Loader";

type NoAuthProps = {
  children: React.ReactNode;
};

const NoAuth = ({ children }: NoAuthProps) => {
  const { fetchTokenResp } = useAuth();

  return (
    <>
      {fetchTokenResp.fetched ? (
        fetchTokenResp.isSuccessful ? (
          <Navigate to={appUrls.home} replace />
        ) : (
          children
        )
      ) : (
        <Loader open={true} />
      )}
    </>
  );
};

export default NoAuth;
