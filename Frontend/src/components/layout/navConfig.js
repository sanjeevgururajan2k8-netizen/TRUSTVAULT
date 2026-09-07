import {
  LayoutDashboard, Folder, Shield, Users, FileText, Microscope, Bot, Scale,
  History, Settings, ClipboardList, ScrollText, UserCog, KeyRound, Activity,
} from "lucide-react";
import { ROLES } from "../../data/mockData";

export const NAV_CONFIG = {
  [ROLES.INVESTIGATOR]: [
    { label: "Dashboard", to: "/investigation/dashboard", icon: LayoutDashboard },
    { label: "Cases", to: "/investigation/cases", icon: Folder },
    { label: "Evidence", to: "/investigation/evidence", icon: Shield },
    { label: "Witness Statements", to: "/investigation/witnesses", icon: Users },
    { label: "FIR Documents", to: "/investigation/fir", icon: FileText },
    { label: "Forensic Reports", to: "/investigation/forensic-reports", icon: Microscope },
    { label: "AI Assistant", to: "/investigation/ai-assistant", icon: Bot },
    { label: "Court Submissions", to: "/investigation/court-submissions", icon: Scale },
    { label: "Audit Trail", to: "/investigation/audit-trail", icon: History },
    { label: "Settings", to: "/investigation/settings", icon: Settings },
  ],
  [ROLES.FORENSIC]: [
    { label: "Dashboard", to: "/forensic/dashboard", icon: LayoutDashboard },
    { label: "Assigned Evidence", to: "/forensic/evidence", icon: Shield },
    { label: "Examinations", to: "/forensic/examinations", icon: ClipboardList },
    { label: "Forensic Reports", to: "/forensic/reports", icon: Microscope },
    { label: "Case References", to: "/forensic/case-references", icon: Folder },
    { label: "Audit Trail", to: "/forensic/audit-trail", icon: History },
    { label: "Settings", to: "/forensic/settings", icon: Settings },
  ],
  [ROLES.COURT]: [
    { label: "Dashboard", to: "/court/dashboard", icon: LayoutDashboard },
    { label: "Submitted Cases", to: "/court/cases", icon: Folder },
    { label: "Evidence Review", to: "/court/evidence", icon: Shield },
    { label: "Forensic Reports", to: "/court/forensic-reports", icon: Microscope },
    { label: "Chain of Custody", to: "/court/custody", icon: ScrollText },
    { label: "Audit Trail", to: "/court/audit-trail", icon: History },
    { label: "Settings", to: "/court/settings", icon: Settings },
  ],
  [ROLES.ADMIN]: [
    { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Users", to: "/admin/users", icon: UserCog },
    { label: "Roles & Permissions", to: "/admin/roles", icon: KeyRound },
    { label: "Cases", to: "/admin/cases", icon: Folder },
    { label: "System Activity", to: "/admin/activity", icon: Activity },
    { label: "Audit Logs", to: "/admin/audit-logs", icon: History },
    { label: "Settings", to: "/admin/settings", icon: Settings },
  ],
};
