import { AuthUser } from "../contexts/AuthProvider";
import { serviceUrls } from "../utils/app-utils";
import { axiosPrivate } from "../utils/axios-utils";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosPrivate({
      url: serviceUrls.auth.refreshToken.path,
      method: serviceUrls.auth.refreshToken.method,
    });

    setAuth((prev: AuthUser | null) => {
      if (prev) {
        return {
          ...prev,
          accessToken: response.data.accessToken,
        };
      } else {
        return null;
      }
    });

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
