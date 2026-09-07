import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { ROLES } from "./data/mockData";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";

import Login from "./pages/auth/Login";
import NotFound from "./pages/errors/NotFound";
import Forbidden from "./pages/errors/Forbidden";
import Settings from "./pages/shared/Settings";

import InvestigationDashboard from "./pages/investigation/Dashboard";
import InvestigationCases from "./pages/investigation/Cases";
import CaseCreate from "./pages/investigation/CaseCreate";
import CaseDetails from "./pages/investigation/CaseDetails";
import FinalCasePrep from "./pages/investigation/FinalCasePrep";
import InvestigationEvidence from "./pages/investigation/Evidence";
import EvidenceUpload from "./pages/investigation/EvidenceUpload";
import InvestigationEvidenceDetails from "./pages/investigation/EvidenceDetails";
import InvestigationWitnesses from "./pages/investigation/Witnesses";
import InvestigationFir from "./pages/investigation/Fir";
import InvestigationForensicReports from "./pages/investigation/ForensicReports";
import AIAssistant from "./pages/investigation/AIAssistant";
import CourtSubmissions from "./pages/investigation/CourtSubmissions";
import InvestigationAuditTrail from "./pages/investigation/AuditTrail";

import ForensicDashboard from "./pages/forensic/Dashboard";
import ForensicEvidence from "./pages/forensic/Evidence";
import ForensicEvidenceDetails from "./pages/forensic/EvidenceDetails";
import Examinations from "./pages/forensic/Examinations";
import ForensicReports from "./pages/forensic/Reports";
import ReportCreate from "./pages/forensic/ReportCreate";
import ReportView from "./pages/forensic/ReportView";
import CaseReferences from "./pages/forensic/CaseReferences";
import ForensicAuditTrail from "./pages/forensic/AuditTrail";

import CourtDashboard from "./pages/court/Dashboard";
import CourtCases from "./pages/court/Cases";
import CourtCaseReview from "./pages/court/CaseReview";
import CourtEvidence from "./pages/court/Evidence";
import CourtForensicReports from "./pages/court/ForensicReports";
import CourtCustody from "./pages/court/Custody";
import CourtAuditTrail from "./pages/court/AuditTrail";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminRoles from "./pages/admin/Roles";
import AdminCases from "./pages/admin/Cases";
import AdminActivity from "./pages/admin/Activity";
import AdminAuditLogs from "./pages/admin/AuditLogs";

function HomeRedirect() {
  const { isAuthenticated, homeRoute } = useAuth();
  return <Navigate to={isAuthenticated ? homeRoute : "/login"} replace />;
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomeRedirect />} />
              <Route path="/login" element={<Login />} />
              <Route path="/403" element={<Forbidden />} />

              <Route
                path="/investigation"
                element={
                  <ProtectedRoute allow={[ROLES.INVESTIGATOR]}>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<InvestigationDashboard />} />
                <Route path="cases" element={<InvestigationCases />} />
                <Route path="cases/new" element={<CaseCreate />} />
                <Route path="cases/:id" element={<CaseDetails />} />
                <Route path="cases/:id/prepare" element={<FinalCasePrep />} />
                <Route path="evidence" element={<InvestigationEvidence />} />
                <Route path="evidence/upload" element={<EvidenceUpload />} />
                <Route path="evidence/:id" element={<InvestigationEvidenceDetails />} />
                <Route path="witnesses" element={<InvestigationWitnesses />} />
                <Route path="fir" element={<InvestigationFir />} />
                <Route path="forensic-reports" element={<InvestigationForensicReports />} />
                <Route path="ai-assistant" element={<AIAssistant />} />
                <Route path="court-submissions" element={<CourtSubmissions />} />
                <Route path="audit-trail" element={<InvestigationAuditTrail />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              <Route
                path="/forensic"
                element={
                  <ProtectedRoute allow={[ROLES.FORENSIC]}>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<ForensicDashboard />} />
                <Route path="evidence" element={<ForensicEvidence />} />
                <Route path="evidence/:id" element={<ForensicEvidenceDetails />} />
                <Route path="examinations" element={<Examinations />} />
                <Route path="reports" element={<ForensicReports />} />
                <Route path="reports/new" element={<ReportCreate />} />
                <Route path="reports/:id" element={<ReportView />} />
                <Route path="case-references" element={<CaseReferences />} />
                <Route path="audit-trail" element={<ForensicAuditTrail />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              <Route
                path="/court"
                element={
                  <ProtectedRoute allow={[ROLES.COURT]}>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<CourtDashboard />} />
                <Route path="cases" element={<CourtCases />} />
                <Route path="cases/:id" element={<CourtCaseReview />} />
                <Route path="evidence" element={<CourtEvidence />} />
                <Route path="forensic-reports" element={<CourtForensicReports />} />
                <Route path="custody" element={<CourtCustody />} />
                <Route path="audit-trail" element={<CourtAuditTrail />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              <Route
                path="/admin"
                element={
                  <ProtectedRoute allow={[ROLES.ADMIN]}>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="roles" element={<AdminRoles />} />
                <Route path="cases" element={<AdminCases />} />
                <Route path="activity" element={<AdminActivity />} />
                <Route path="audit-logs" element={<AdminAuditLogs />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
