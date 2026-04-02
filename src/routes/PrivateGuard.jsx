import { Navigate, Outlet } from "react-router-dom";
import { TOKEN_KEY } from "../utils/constants";
import { getCookie } from "../utils/cookies";

function PrivateGuard() {
  const token = false;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default PrivateGuard;
