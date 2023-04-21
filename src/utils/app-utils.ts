export const appUrls = {
  signIn: "signin",
  signUp: "signup",
  home: "/",
  profile: "profile",
  followingProfile: "profile/:id",
};

export const serviceUrls = {
  auth: {
    register: {
      path: "/api/v1/auth/register",
      method: "POST",
    },
    login: {
      path: "/api/v1/auth/login",
      method: "POST",
    },
    logout: {
      path: "/api/v1/auth/logout",
      method: "POST",
    },
    changePassword: {
      path: "/api/v1/auth/change-password",
      method: "POST",
    },
    refreshToken: {
      path: "/api/v1/auth/refresh-token",
      method: "POST",
    },
  },
};
