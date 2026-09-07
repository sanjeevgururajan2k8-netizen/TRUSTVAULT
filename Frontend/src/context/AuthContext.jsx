import { createContext, useContext, useEffect, useState } from "react";
import { findUserByEmail, ROLES, ROLE_LABELS } from "../data/mockData";

const AuthContext = createContext(null);
const STORAGE_KEY = "trustvault.session";

const ROLE_HOME = {
  [ROLES.INVESTIGATOR]: "/investigation/dashboard",
  [ROLES.FORENSIC]: "/forensic/dashboard",
  [ROLES.COURT]: "/court/dashboard",
  [ROLES.ADMIN]: "/admin/dashboard",
};

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadSession);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } catch {
        /* ignore */
      }
    } else {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
  }, [user]);

  const login = (email, password) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      setError("");
      window.setTimeout(() => {
        const found = findUserByEmail(email);
        if (!found || !password || password.length < 4) {
          setLoading(false);
          const msg = "Invalid Employee ID/email or password. Please try again.";
          setError(msg);
          reject(new Error(msg));
          return;
        }
        if (found.status === "Deactivated") {
          setLoading(false);
          const msg = "This account has been deactivated. Contact your system administrator.";
          setError(msg);
          reject(new Error(msg));
          return;
        }
        setLoading(false);
        setUser(found);
        resolve(found);
      }, 900);
    });

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    role: user?.role || null,
    roleLabel: user ? ROLE_LABELS[user.role] : null,
    isAuthenticated: !!user,
    loading,
    error,
    clearError: () => setError(""),
    login,
    logout,
    homeRoute: user ? ROLE_HOME[user.role] : "/login",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { ROLE_HOME };
