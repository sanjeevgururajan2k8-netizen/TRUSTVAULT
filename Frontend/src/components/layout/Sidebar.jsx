import { NavLink } from "react-router-dom";
import { ShieldCheck, ChevronsLeft, ChevronsRight } from "lucide-react";
import { NAV_CONFIG } from "./navConfig";
import { ROLE_LABELS } from "../../data/mockData";

export default function Sidebar({ role, collapsed, onToggleCollapse, mobileOpen, onCloseMobile }) {
  const links = NAV_CONFIG[role] || [];

  return (
    <>
      <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-mark">
            <ShieldCheck size={18} color="#fff" />
          </div>
          <div className="sidebar-brand-text">
            <div className="sidebar-brand-title">TrustVault</div>
            <div className="sidebar-brand-sub">Evidence &amp; Case Platform</div>
          </div>
        </div>

        <div className="sidebar-role-tag">{ROLE_LABELS[role]}</div>

        <nav className="sidebar-nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
              onClick={onCloseMobile}
              end={link.to.endsWith("dashboard")}
            >
              <link.icon />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-collapse-btn" onClick={onToggleCollapse}>
            {collapsed ? <ChevronsRight size={15} /> : <ChevronsLeft size={15} />}
            {!collapsed && "Collapse"}
          </button>
        </div>
      </aside>
      <div className={`sidebar-scrim ${mobileOpen ? "show" : ""}`} onClick={onCloseMobile} />
    </>
  );
}
