import { useParams, Link } from "react-router-dom";
import { Download, ShieldCheck, ArrowLeft } from "lucide-react";
import { getForensicReportById } from "../../data/api";
import { useToast } from "../../context/ToastContext";
import ReportViewer from "../../components/domain/ReportViewer";
import NotFound from "../errors/NotFound";

export default function ReportView() {
  const { id } = useParams();
  const toast = useToast();
  const report = getForensicReportById(id);
  if (!report) return <NotFound />;

  return (
    <div>
      <div className="page-header">
        <div>
          <Link to="/forensic/reports" className="text-xs text-muted flex items-center gap-4" style={{ marginBottom: 6 }}>
            <ArrowLeft size={12} /> Back to Reports
          </Link>
          <h1 className="page-title">{report.id}</h1>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary" onClick={() => toast.success("Download started", `${report.id}.pdf`)}>
            <Download size={14} /> Download
          </button>
          <button className="btn btn-secondary" onClick={() => toast.success("Integrity verified", "Report signature matches submission record.")}>
            <ShieldCheck size={14} /> Verify Integrity
          </button>
        </div>
      </div>
      <ReportViewer report={report} />
    </div>
  );
}
