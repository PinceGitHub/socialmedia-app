import useAuthContext from "./useAuthContext";
import useRefresh from "./useRefreshToken";
import { axiosPrivate } from "../utils/axios-utils";

const useAxiosPrivate = () => {
  const { auth } = useAuthContext();
  const refresh = useRefresh();

  axiosPrivate.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const previousReq = error?.config;

      if (error?.response?.status === 401 && !previousReq?.sent) {
        previousReq.sent = true;
        const newAccessToken = await refresh();
        previousReq.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosPrivate(previousReq);
      }

      return Promise.reject(error);
    }
  );

  return axiosPrivate;
};

export default useAxiosPrivate;
