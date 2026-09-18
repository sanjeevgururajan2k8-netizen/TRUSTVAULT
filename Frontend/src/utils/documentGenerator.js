/**
 * generateFirDocument
 * Generates a styled HTML document representing a FIR and triggers a browser download.
 * Since no real PDF file exists on disk, we build the document from the FIR data in memory.
 *
 * @param {Object} fir      - FIR record from mockData / API
 * @param {Object} caseObj  - InvestigationCase associated with the FIR
 */
export function generateFirDocument(fir, caseObj) {
  const filedDate = fir.filedDate
    ? new Date(fir.filedDate).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })
    : "—";
  const incidentDate = fir.incidentDate
    ? new Date(fir.incidentDate).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })
    : "—";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${fir.id} — First Information Report</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
      background: #f5f6fa;
      color: #1a1d23;
      padding: 40px 20px;
    }
    .page {
      max-width: 800px;
      margin: 0 auto;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 32px rgba(0,0,0,0.10);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
      color: #fff;
      padding: 36px 48px 28px;
    }
    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
    }
    .header-badge {
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.25);
      border-radius: 6px;
      padding: 4px 12px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .watermark {
      font-size: 11px;
      opacity: 0.7;
      text-align: right;
    }
    .header h1 {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .header .fir-number {
      font-size: 13px;
      opacity: 0.8;
      font-weight: 500;
    }
    .body { padding: 36px 48px; }
    .section {
      margin-bottom: 28px;
    }
    .section-title {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #5c6bc0;
      border-bottom: 1px solid #e8eaf6;
      padding-bottom: 6px;
      margin-bottom: 14px;
    }
    .field-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px 24px;
    }
    .field { }
    .field-label {
      font-size: 11px;
      font-weight: 600;
      color: #78909c;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 3px;
    }
    .field-value {
      font-size: 14px;
      color: #1a1d23;
      font-weight: 500;
      line-height: 1.4;
    }
    .description-box {
      background: #f8f9ff;
      border: 1px solid #e8eaf6;
      border-left: 4px solid #5c6bc0;
      border-radius: 0 8px 8px 0;
      padding: 16px 18px;
      font-size: 14px;
      line-height: 1.7;
      color: #2d3748;
    }
    .footer {
      background: #f8f9ff;
      border-top: 1px solid #e8eaf6;
      padding: 20px 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .footer-text { font-size: 11px; color: #90a4ae; }
    .footer-doc { font-size: 11px; font-weight: 600; color: #5c6bc0; font-family: monospace; }
    .status-badge {
      display: inline-block;
      background: #e8f5e9;
      color: #2e7d32;
      border: 1px solid #c8e6c9;
      border-radius: 20px;
      padding: 3px 12px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.06em;
    }
    @media print {
      body { background: #fff; padding: 0; }
      .page { box-shadow: none; border-radius: 0; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="header-top">
        <div class="header-badge">🔒 TrustVault — Secure Document</div>
        <div class="watermark">TRUSTVAULT DIGITAL EVIDENCE SYSTEM<br/>Document ID: ${fir.id}</div>
      </div>
      <h1>First Information Report</h1>
      <div class="fir-number">${fir.firNumber || fir.id}</div>
    </div>

    <div class="body">
      <div class="section">
        <div class="section-title">Case Information</div>
        <div class="field-grid">
          <div class="field">
            <div class="field-label">Case Title</div>
            <div class="field-value">${caseObj.title || "—"}</div>
          </div>
          <div class="field">
            <div class="field-label">FIR Number</div>
            <div class="field-value" style="font-family:monospace">${fir.firNumber || fir.id}</div>
          </div>
          <div class="field">
            <div class="field-label">Police Station</div>
            <div class="field-value">${fir.policeStation || "—"}</div>
          </div>
          <div class="field">
            <div class="field-label">Status</div>
            <div class="field-value"><span class="status-badge">Filed</span></div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Incident Details</div>
        <div class="field-grid">
          <div class="field">
            <div class="field-label">Incident Date</div>
            <div class="field-value">${incidentDate}</div>
          </div>
          <div class="field">
            <div class="field-label">Date Filed</div>
            <div class="field-value">${filedDate}</div>
          </div>
          <div class="field">
            <div class="field-label">Complainant</div>
            <div class="field-value">${fir.complainant || "—"}</div>
          </div>
          <div class="field">
            <div class="field-label">Investigating Officer</div>
            <div class="field-value">${fir.officer || "—"}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Statement of Complaint</div>
        <div class="description-box">${fir.description || "No description provided."}</div>
      </div>

      <div class="section">
        <div class="section-title">Document Reference</div>
        <div class="field-grid">
          <div class="field">
            <div class="field-label">Document File</div>
            <div class="field-value" style="font-family:monospace;font-size:12px">${fir.documentName || fir.id + ".pdf"}</div>
          </div>
          <div class="field">
            <div class="field-label">Case ID</div>
            <div class="field-value" style="font-family:monospace;font-size:12px">${caseObj.id}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="footer-text">Generated by TrustVault Digital Evidence System · ${new Date().toLocaleString("en-IN")}</div>
      <div class="footer-doc">${fir.documentName || fir.id + ".pdf"}</div>
    </div>
  </div>
</body>
</html>`;

  // Trigger browser download
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fir.documentName ? fir.documentName.replace(".pdf", ".html") : `${fir.id}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
