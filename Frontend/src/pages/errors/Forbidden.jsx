import { useNavigate, useLocation } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Forbidden() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, homeRoute } = useAuth();
  const attempted = location.state?.attempted;

  return (
    <div className="error-page">
      <ShieldAlert size={40} style={{ color: "var(--status-red)" }} />
      <div className="error-code" style={{ color: "var(--status-red)" }}>403</div>
      <div className="error-title">Access Restricted</div>
      <p className="error-desc">
        You do not have permission to access this resource{attempted ? ` (${attempted})` : ""}. This attempt has been
        recorded in the system audit log.
      </p>
      <button className="btn btn-primary" onClick={() => navigate(isAuthenticated ? homeRoute : "/login")}>
        Return to {isAuthenticated ? "Dashboard" : "Login"}
      </button>
    </div>
  );
}
