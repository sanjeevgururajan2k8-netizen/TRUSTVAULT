import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ShieldCheck, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2,
  Fingerprint, GitBranch, ScanEye,
} from "lucide-react";
import { useAuth, ROLE_HOME } from "../../context/AuthContext";
import boardImg from "../../assets/investigation-board.jpg";

const DEMO_ACCOUNTS = [
  { email: "investigator@example.com", role: "Investigation Officer", name: "Aditi Sharma" },
  { email: "forensic@example.com", role: "Forensic Officer", name: "Dr. Rakesh Verma" },
  { email: "court@example.com", role: "Court Justice", name: "Justice Meera Krishnan" },
  { email: "admin@example.com", role: "Administrator", name: "Sanjeev Gupta" },
];

export default function Login() {
  const { login, loading, error, clearError, homeRoute, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !success) {
      navigate(homeRoute, { replace: true });
    }
  }, [isAuthenticated, success, homeRoute, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    clearError();
    try {
      const loggedInUser = await login(email, password);
      setSuccess(true);
      const target = location.state?.from || ROLE_HOME[loggedInUser.role] || homeRoute;
      window.setTimeout(() => {
        navigate(target, { replace: true });
      }, 600);
    } catch {
      /* error is already set in context */
    }
  };

  const fillDemo = (acct) => {
    setEmail(acct.email);
    setPassword("Demo@1234");
    clearError();
  };

  return (
    <div className="auth-shell">
      <section className="auth-visual" style={{ backgroundImage: `url(${boardImg})` }}>
        <div className="auth-brand">
          <div className="auth-brand-mark">
            <ShieldCheck size={22} color="#fff" />
          </div>
          <div>
            <div className="auth-brand-title">TrustVault</div>
            <div className="auth-brand-sub">Digital Evidence &amp; Investigation Platform</div>
          </div>
        </div>

        <div className="auth-visual-copy">
          <h1>Secure, AI-assisted case &amp; evidence management for modern investigations.</h1>
          <p>
            From FIR to final judgment — manage cases, verify evidence integrity, coordinate forensic examination,
            and prepare court-ready case files in one secure, auditable platform.
          </p>
        </div>

        <div className="auth-visual-badges">
          <div className="auth-visual-badge">
            <span className="ico"><Fingerprint size={15} /></span>
            SHA-256 evidence fingerprinting on every upload
          </div>
          <div className="auth-visual-badge">
            <span className="ico"><GitBranch size={15} /></span>
            Immutable, timestamped chain-of-custody records
          </div>
          <div className="auth-visual-badge">
            <span className="ico"><ScanEye size={15} /></span>
            Role-protected access for every stage of the workflow
          </div>
        </div>
      </section>

      <section className="auth-form-side">
        <div className="auth-card">
          <div className="auth-card-header">
            <h2>Welcome Back</h2>
            <p>Sign in with your official employee credentials to continue.</p>
          </div>

          {error && !success && (
            <div className="auth-alert error">
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="auth-alert success">
              <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
              <span>Authentication successful. Redirecting to your dashboard…</span>
            </div>
          )}

          <form onSubmit={submit} className="stack-y">
            <div className="field">
              <label className="field-label" htmlFor="email">Email / Employee ID<span className="req">*</span></label>
              <div className="input-icon-wrap">
                <Mail />
                <input
                  id="email"
                  className="input"
                  type="text"
                  placeholder="you@department.gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="field-label" htmlFor="password">Password<span className="req">*</span></label>
              <div className="input-icon-wrap">
                <Lock />
                <input
                  id="password"
                  className="input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="input-suffix-btn"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="checkbox-row">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                Remember me
              </label>
              <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-sm">Forgot Password?</a>
            </div>

            <button className="btn btn-primary btn-block btn-lg" type="submit" disabled={loading || success}>
              {loading ? <Loader2 size={16} className="spin" /> : <ShieldCheck size={16} />}
              {loading ? "Authenticating…" : success ? "Signed In" : "Sign In"}
            </button>
          </form>

          <div className="demo-accounts">
            <div className="demo-accounts-title">Demo Accounts — Prototype Access</div>
            {DEMO_ACCOUNTS.map((acct) => (
              <button key={acct.email} className="demo-acct-btn" onClick={() => fillDemo(acct)} type="button">
                <ShieldCheck size={15} style={{ color: "var(--accent-blue)", flexShrink: 0 }} />
                <span>
                  <b>{acct.name}</b>
                  <span className="role"> · {acct.role} · {acct.email}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
