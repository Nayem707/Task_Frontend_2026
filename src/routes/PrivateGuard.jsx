import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TOKEN_KEY } from "../utils/constants";
import { getCookie } from "../utils/cookies";
import { getProfile } from "../features/auth/authAPI";

function PrivateGuard() {
  const token = getCookie(TOKEN_KEY);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (token && !user) {
      dispatch(getProfile());
    }
  }, [token, user, dispatch]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default PrivateGuard;
