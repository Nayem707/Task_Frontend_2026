// Route Paths — mirrors actual API routes at /api/v1/*
export const ENDPOINT = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    PROFILE: "/auth/profile",
    REFRESH_TOKEN: "/auth/refresh-token",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },
  POSTS: {
    LIST: "/posts",
    MY_FEED: "/posts/feed/me",
    BY_USER: (userId) => `/posts/user/${userId}`,
    CREATE: "/posts",
    GET: (id) => `/posts/${id}`,
    UPDATE: (id) => `/posts/${id}`,
    DELETE: (id) => `/posts/${id}`,
  },
  COMMENTS: {
    LIST: (postId) => `/posts/${postId}/comments`,
    CREATE: (postId) => `/posts/${postId}/comments`,
    GET: (commentId) => `/comments/${commentId}`,
    UPDATE: (commentId) => `/comments/${commentId}`,
    DELETE: (commentId) => `/comments/${commentId}`,
    LIST_REPLIES: (commentId) => `/comments/${commentId}/replies`,
    ADD_REPLY: (commentId) => `/comments/${commentId}/replies`,
  },
  LIKES: {
    TOGGLE_POST: (postId) => `/likes/posts/${postId}/toggle`,
    TOGGLE_COMMENT: (commentId) => `/likes/comments/${commentId}/toggle`,
    LIST_POST: (postId) => `/likes/posts/${postId}`,
    LIST_COMMENT: (commentId) => `/likes/comments/${commentId}`,
    POST_STATS: (postId) => `/likes/posts/${postId}/stats`,
    COMMENT_STATS: (commentId) => `/likes/comments/${commentId}/stats`,
  },
};
