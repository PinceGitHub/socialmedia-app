import { AuthUser } from "../contexts/AuthProvider";
import { serviceUrls } from "../utils/app-utils";
import { axiosPrivate } from "../utils/axios-utils";
import useAuthContext from "./useAuthContext";

const useRefreshToken = () => {
  const { setAuth } = useAuthContext();

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
