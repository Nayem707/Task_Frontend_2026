import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import PublicGuard from "./PublicGuard";
import PrivateGuard from "./PrivateGuard";

import FeedView from "../pages/private/FeedView";
import LoginView from "../pages/auth/LoginView";
import RegisterView from "../pages/auth/RegisterView";
import FeedLayout from "../components/layout/feed/FeedLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicGuard />}>
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
      </Route>

      <Route element={<PrivateGuard />}>
        <Route path="/feed" element={<FeedLayout />}>
          <Route index element={<FeedView />} />
        </Route>
      </Route>
    </>,
  ),
);

export default router;
