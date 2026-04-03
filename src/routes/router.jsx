import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";

import PublicGuard from "./PublicGuard";
import PrivateGuard from "./PrivateGuard";

import FeedView from "../pages/private/FeedView";
import LoginView from "../pages/auth/LoginView";
import RegisterView from "../pages/auth/RegisterView";
import FeedLayout from "../components/layout/feed/FeedLayout";
import ProfileView from "../pages/private/ProfileView";
import FollowersView from "../pages/private/FollowersView";
import ProfileLayout from "../components/layout/profile/ProfileLayout";
import NotFoundView from "../pages/error/NotFoundView";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/feed" replace />} />

      <Route element={<PublicGuard />}>
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
      </Route>

      <Route element={<PrivateGuard />}>
        <Route path="/feed" element={<FeedLayout />}>
          <Route index element={<FeedView />} />
        </Route>

        <Route path="/profile" element={<ProfileLayout />}>
          <Route index element={<ProfileView />} />
          <Route path="followers" element={<FollowersView />} />
          <Route path=":userId" element={<ProfileView />} />
        </Route>
      </Route>

      {/* 404 Catch-all */}
      <Route path="*" element={<NotFoundView />} />
    </>
  )
);

export default router;
