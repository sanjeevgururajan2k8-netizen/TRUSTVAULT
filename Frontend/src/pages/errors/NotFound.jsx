import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function NotFound() {
  const navigate = useNavigate();
  const { isAuthenticated, homeRoute } = useAuth();

  return (
    <div className="error-page">
      <Compass size={40} style={{ color: "var(--text-muted)" }} />
      <div className="error-code">404</div>
      <div className="error-title">Page Not Found</div>
      <p className="error-desc">The requested resource could not be found. It may have been moved, or the link may be incorrect.</p>
      <button className="btn btn-primary" onClick={() => navigate(isAuthenticated ? homeRoute : "/login")}>
        Return to {isAuthenticated ? "Dashboard" : "Login"}
      </button>
    </div>
  );
}
