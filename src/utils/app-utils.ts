export const appUrls = {
  signIn: "/signin",
  signUp: "/signup",
  home: "/",
  profile: "/profile/:id",
};

export const serviceUrls = {
  auth: {
    register: {
      path: "/auth/register",
      method: "POST",
    },
    login: {
      path: "/auth/login",
      method: "POST",
    },
    logout: {
      path: "/auth/logout",
      method: "POST",
    },
    changePassword: {
      path: "/auth/change-password",
      method: "POST",
    },
    refreshToken: {
      path: "/auth/refresh-token",
      method: "POST",
    },
  },
  profile: {
    getProfileByUserId: {
      path: "/profile/",
      method: "GET",
    },
  },
  posts: {
    getTimeline: {
      path: "/post/timeline",
      method: "POST",
    },
    create: {
      path: "/post/create",
      method: "POST",
    },
    like: {
      path: "/post/like/",
      method: "PUT",
    },
  },
};
