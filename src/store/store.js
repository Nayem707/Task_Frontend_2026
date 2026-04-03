import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import commentsReducer from "../features/comments/commentsSlice";
import likesReducer from "../features/likes/likesSlice";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import notificationsReducer from "../features/notifications/notificationsSlice";
import messagesReducer from "../features/messages/messagesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
    likes: likesReducer,
    profile: profileReducer,
    notifications: notificationsReducer,
    messages: messagesReducer,
  },
});
