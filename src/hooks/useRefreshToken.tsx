import { serviceUrls } from "../utils/app-utils";
import { axiosPrivate } from "../utils/axios-utils";

type UseRefreshTokenType = {
  isSuccess: boolean;
  isError: boolean;
  data?: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    accessToken: string;
  };
  error?: any;
};

const useRefreshToken = () => {
  const refresh = async (): Promise<UseRefreshTokenType> => {
    const retVal: UseRefreshTokenType = {
      isError: true,
      isSuccess: false,
    };

    try {
      const response = await axiosPrivate({
        url: serviceUrls.auth.refreshToken.path,
        method: serviceUrls.auth.refreshToken.method,
      });

      retVal.isSuccess = true;
      retVal.isError = false;
      retVal.data = {
        userId: response.data.responseData.id,
        email: response.data.responseData.email,
        firstName: response.data.responseData.firstName,
        lastName: response.data.responseData.lastName,
        profilePicture: response.data.responseData.profilePicture,
        accessToken: response.data.responseData.accessToken,
      };
    } catch (error: any) {
      retVal.error = error.response?.data?.message || error.message;
    }

    return retVal;
  };

  return refresh;
};

export default useRefreshToken;
