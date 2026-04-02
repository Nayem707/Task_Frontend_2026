import { Navigate, Outlet } from "react-router-dom";
import { TOKEN_KEY } from "../utils/constants";
import { getCookie } from "../utils/cookies";

function PublicGuard() {
  const token = false;

  if (token) {
    return <Navigate to="/feed" replace />;
  }

  return <Outlet />;
}

export default PublicGuard;
