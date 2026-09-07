import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/** Wraps a role's route tree. Redirects unauthenticated users to /login and
 *  blocks cross-role access (e.g. an Investigation Officer hitting /court/*). */
export default function ProtectedRoute({ allow, children }) {
  const { isAuthenticated, role, homeRoute } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  if (allow && !allow.includes(role)) {
    return <Navigate to="/403" replace state={{ attempted: location.pathname, homeRoute }} />;
  }
  return children;
}
