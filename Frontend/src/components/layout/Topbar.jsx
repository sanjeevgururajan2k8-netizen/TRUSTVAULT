import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Search, Bell, ChevronDown, LogOut, Settings as SettingsIcon, Lock, Folder, Shield, Microscope, Users, X } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";
import UserAvatar from "../ui/UserAvatar";
import Modal from "../ui/Modal";
import { useAuth } from "../../context/AuthContext";
import { ROLE_LABELS, NOTIFICATIONS } from "../../data/mockData";
import { globalSearch } from "../../data/api";

function roleBasePath(role) {
  return `/${role}`;
}

export default function Topbar({ onOpenMobileMenu }) {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (userRef.current && !userRef.current.contains(e.target)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const results = query.trim() ? globalSearch(user, query) : null;
  const base = roleBasePath(role);
  const notifications = NOTIFICATIONS[role] || [];
  const unreadCount = notifications.filter((n) => n.unread).length;

  const goTo = (path) => {
    navigate(path);
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-menu-btn" onClick={onOpenMobileMenu} aria-label="Open navigation menu">
          <Menu size={19} />
        </button>

        <div className="topbar-search" ref={searchRef}>
          <Search />
          <input
            type="text"
            placeholder="Search cases, evidence, reports, witnesses…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => query && setSearchOpen(true)}
            aria-label="Global search"
          />
          {searchOpen && results && (
            <div className="dropdown-panel" style={{ left: 0, right: "auto", width: 380 }}>
              <div className="dropdown-header">
                Search Results
                <button className="modal-close" onClick={() => setSearchOpen(false)}><X size={15} /></button>
              </div>
              <div className="dropdown-list">
                {results.cases.length === 0 && results.evidence.length === 0 && results.reports.length === 0 && results.witnesses.length === 0 ? (
                  <div className="notif-item" style={{ cursor: "default" }}>
                    <span className="text-sm text-muted">No authorized records match "{query}".</span>
                  </div>
                ) : (
                  <>
                    {results.cases.map((c) => (
                      <div className="notif-item" key={c.id} onClick={() => goTo(`${base}/cases/${c.id}`)}>
                        <Folder size={15} style={{ color: "var(--accent-blue)", marginTop: 2 }} />
                        <div>
                          <div className="text-sm font-semibold">{c.id}</div>
                          <div className="text-xs text-muted">{c.title}</div>
                        </div>
                      </div>
                    ))}
                    {results.evidence.map((e) => (
                      <div className="notif-item" key={e.id} onClick={() => goTo(`${base}/evidence/${e.id}`)}>
                        <Shield size={15} style={{ color: "var(--status-green)", marginTop: 2 }} />
                        <div>
                          <div className="text-sm font-semibold">{e.id}</div>
                          <div className="text-xs text-muted">{e.name}</div>
                        </div>
                      </div>
                    ))}
                    {results.reports.map((r) => (
                      <div className="notif-item" key={r.id} onClick={() => goTo(`${base}/cases/${r.caseId}?tab=forensic`)}>
                        <Microscope size={15} style={{ color: "var(--accent-teal)", marginTop: 2 }} />
                        <div>
                          <div className="text-sm font-semibold">{r.id}</div>
                          <div className="text-xs text-muted">Examiner: {r.examiner}</div>
                        </div>
                      </div>
                    ))}
                    {results.witnesses.map((w) => (
                      <div className="notif-item" key={w.id} onClick={() => goTo(`${base}/cases/${w.caseId}?tab=witnesses`)}>
                        <Users size={15} style={{ color: "var(--status-amber)", marginTop: 2 }} />
                        <div>
                          <div className="text-sm font-semibold">{w.name}</div>
                          <div className="text-xs text-muted">{w.role}</div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="topbar-right">
        <div className="security-chip hidden-mobile">
          <Lock size={12} /> Secure Session
        </div>

        <ThemeToggle />

        <div style={{ position: "relative" }} ref={notifRef}>
          <button className="icon-btn" onClick={() => setNotifOpen((v) => !v)} aria-label="Notifications">
            <Bell size={18} />
            {unreadCount > 0 && <span className="dot-badge" />}
          </button>
          {notifOpen && (
            <div className="dropdown-panel">
              <div className="dropdown-header">
                Notifications
                {unreadCount > 0 && <span className="badge badge-blue">{unreadCount} new</span>}
              </div>
              <div className="dropdown-list">
                {notifications.length === 0 && (
                  <div className="notif-item" style={{ cursor: "default" }}>
                    <span className="text-sm text-muted">You're all caught up.</span>
                  </div>
                )}
                {notifications.map((n) => (
                  <div className={`notif-item ${n.unread ? "unread" : ""}`} key={n.id}>
                    {n.unread && <span className="notif-dot" />}
                    <div>
                      <div className="text-sm font-semibold">{n.title}</div>
                      <div className="text-xs text-muted">{n.desc}</div>
                      <div className="text-xs text-muted" style={{ marginTop: 3 }}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ position: "relative" }} ref={userRef}>
          <button className="user-menu-btn" onClick={() => setUserMenuOpen((v) => !v)}>
            <UserAvatar name={user?.name} size="sm" />
            <span className="hidden-mobile">
              <div className="user-menu-name">{user?.name}</div>
              <div className="user-menu-role">{ROLE_LABELS[role]}</div>
            </span>
            <ChevronDown size={14} className="hidden-mobile" style={{ color: "var(--text-muted)" }} />
          </button>
          {userMenuOpen && (
            <div className="dropdown-panel" style={{ width: 220 }}>
              <div className="dropdown-list">
                <div className="notif-item" onClick={() => { setUserMenuOpen(false); navigate(`${base}/settings`); }}>
                  <SettingsIcon size={15} />
                  <span className="text-sm font-medium">Settings</span>
                </div>
                <div className="notif-item" onClick={() => { setUserMenuOpen(false); setLogoutOpen(true); }}>
                  <LogOut size={15} style={{ color: "var(--status-red)" }} />
                  <span className="text-sm font-medium" style={{ color: "var(--status-red)" }}>Log Out</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        title="Confirm Logout"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setLogoutOpen(false)}>Cancel</button>
            <button className="btn btn-danger" onClick={logout}>
              <LogOut size={14} /> Log Out
            </button>
          </>
        }
      >
        <p className="text-sm text-secondary">
          You're about to end your secure session as <b>{user?.name}</b>. Any unsaved changes on this page will be lost.
        </p>
      </Modal>
    </header>
  );
}
