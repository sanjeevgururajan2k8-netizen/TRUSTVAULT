import { formatDateTime } from "../../utils/helpers";

export default function ReportViewer({ report }) {
  return (
    <div className="report-doc">
      <div className="report-doc-header">
        <h2>FORENSIC EXAMINATION REPORT</h2>
        <div className="text-xs text-muted" style={{ marginTop: 4 }}>Report ID: {report.id}</div>
      </div>

      <dl className="report-doc-meta">
        <div>
          <dt>Case ID</dt>
          <dd>{report.caseId}</dd>
        </div>
        <div>
          <dt>Evidence Examined</dt>
          <dd>{report.evidenceIds.join(", ")}</dd>
        </div>
        <div>
          <dt>Examiner</dt>
          <dd>{report.examiner}</dd>
        </div>
        <div>
          <dt>Date / Time</dt>
          <dd>{formatDateTime(report.date)}</dd>
        </div>
      </dl>

      <div className="report-doc-section">
        <h3>1. Evidence Examined</h3>
        <p>{report.evidenceIds.join(", ")}</p>
      </div>
      <div className="report-doc-section">
        <h3>2. Examination Method</h3>
        <p>{report.method}</p>
      </div>
      <div className="report-doc-section">
        <h3>3. Observations</h3>
        <p>{report.observations}</p>
      </div>
      <div className="report-doc-section">
        <h3>4. Findings</h3>
        <p>{report.findings}</p>
      </div>
      <div className="report-doc-section">
        <h3>5. Conclusion</h3>
        <p>{report.conclusion}</p>
      </div>
    </div>
  );
}
