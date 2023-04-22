import useAuth from "../../hooks/useAuth";
import Signin from "../../pages/Signin/Signin";
import Loader from "../Loader/Loader";

type RequireAuthProps = {
  children: React.ReactNode;
};

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { fetchTokenResp, persist } = useAuth();

  return (
    <>
      {fetchTokenResp.fetched ? (
        fetchTokenResp.isSuccessful ? (
          children
        ) : (
          <Signin />
        )
      ) : persist ? (
        <Loader open={true} />
      ) : (
        <Signin />
      )}
    </>
  );
};

export default RequireAuth;
