export const appUrls = {
  signUp: "/signup",
  signIn: "/signin",
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
    upsertProfile: {
      path: "/profile/upsert",
      method: "POST",
    },
    follow: {
      path: "/profile/follow/",
      method: "PUT",
    },
    unfollow: {
      path: "/profile/unfollow/",
      method: "PUT",
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
    delete: {
      path: "/post/delete/",
      method: "DELETE",
    },
    like: {
      path: "/post/like/",
      method: "PUT",
    },
  },
};
