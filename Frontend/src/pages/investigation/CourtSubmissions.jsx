import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getCasesForUser } from "../../data/api";
import DataTable from "../../components/data/DataTable";
import StatusBadge, { PriorityBadge } from "../../components/ui/StatusBadge";
import { formatDate } from "../../utils/helpers";

export default function CourtSubmissions() {
  const { user } = useAuth();
  const cases = getCasesForUser(user).filter((c) => c.progress.forensicReport || c.submittedToCourt);

  const columns = [
    { key: "id", header: "Case ID", render: (r) => <span className="font-mono font-semibold">{r.id}</span> },
    { key: "title", header: "Case Title" },
    { key: "priority", header: "Priority", render: (r) => <PriorityBadge priority={r.priority} /> },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    {
      key: "submission", header: "Court Submission",
      render: (r) => (r.submittedToCourt ? `Submitted ${formatDate(r.courtSubmissionDate)}` : "Not yet submitted"),
    },
    {
      key: "action", header: "", align: "right",
      render: (r) => (
        <Link className="btn btn-primary btn-sm" to={`/investigation/cases/${r.id}/prepare`}>
          {r.submittedToCourt ? "View Submission" : "Prepare & Submit"}
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Case Preparation</div>
          <h1 className="page-title">Court Submissions</h1>
          <p className="page-desc">Cases with forensic findings ready to compile into a final case file for the court.</p>
        </div>
      </div>
      <div className="card">
        <DataTable columns={columns} data={cases} emptyTitle="No cases ready for court yet" emptyDesc="Cases become eligible once a forensic report has been received." />
      </div>
    </div>
  );
}
