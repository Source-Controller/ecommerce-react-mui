import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../auth/useAuth";

const LOGIN_ROUTE = "/login";

const RequireAuth = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const location = useLocation();

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to={LOGIN_ROUTE} state={{ from: location }} replace />
  );
};

export default RequireAuth;
