import useAuth from "../../hooks/useAuth";
import Signin from "../../pages/Signin/Signin";

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
      ) : (
        !persist && <Signin />
      )}
    </>
  );
};

export default RequireAuth;
