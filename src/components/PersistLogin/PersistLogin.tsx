import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";
import useSnackbar from "../../hooks/useSnackbar";

type PersistLoginProps = {
  children: React.ReactNode;
};

const PersistLogin = ({ children }: PersistLoginProps) => {
  const { auth, persist, setAuth, setFetchTokenResp } = useAuth();
  const refresh = useRefreshToken();
  const snackbar = useSnackbar();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      const response = await refresh();

      if (response.isSuccess) {
        setAuth({
          userId: response.data?.userId as string,
          email: response.data?.email as string,
          firstName: response.data?.firstName as string,
          lastName: response.data?.lastName as string,
          profilePicture: response.data?.profilePicture as string,
          accessToken: response.data?.accessToken as string,
        });

        setFetchTokenResp({
          fetched: true,
          isSuccessful: true,
        });
      } else {
        setFetchTokenResp({
          fetched: true,
          isSuccessful: false,
        });

        snackbar({
          show: true,
          messageType: "error",
          message: response.error.message,
        });
      }
    };

    if (auth?.accessToken) {
      setFetchTokenResp({
        fetched: true,
        isSuccessful: true,
      });
    } else if (persist) {
      verifyRefreshToken();
    } else {
      setFetchTokenResp({
        fetched: true,
        isSuccessful: false,
      });
    }

    //eslint-disable-next-line
  }, []);

  return <>{children}</>;
};

export default PersistLogin;
