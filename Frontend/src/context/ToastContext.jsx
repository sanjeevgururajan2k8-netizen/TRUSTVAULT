import { createContext, useCallback, useContext, useRef, useState } from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (type, message, sub) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, type, message, sub }]);
      window.setTimeout(() => dismiss(id), 5000);
      return id;
    },
    [dismiss]
  );

  const toast = {
    success: (message, sub) => push("success", message, sub),
    warning: (message, sub) => push("warning", message, sub),
    error: (message, sub) => push("error", message, sub),
    info: (message, sub) => push("info", message, sub),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="toast-stack" role="region" aria-label="Notifications">
        {toasts.map((t) => {
          const Icon = ICONS[t.type] || Info;
          return (
            <div key={t.id} className={`toast toast-${t.type}`} role="status">
              <Icon size={18} className="toast-icon" />
              <div>
                <div className="toast-msg">{t.message}</div>
                {t.sub && <div className="toast-sub">{t.sub}</div>}
              </div>
              <button className="toast-close" onClick={() => dismiss(t.id)} aria-label="Dismiss notification">
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
