// ============================================================================
// TrustVault — Mock data layer
// Prototype-only in-memory data standing in for the future Spring Boot API.
// Every "service" function in src/data/api.js reads/writes against this file.
// ============================================================================

export const ROLES = {
  INVESTIGATOR: "investigation",
  FORENSIC: "forensic",
  COURT: "court",
  ADMIN: "admin",
};

export const ROLE_LABELS = {
  [ROLES.INVESTIGATOR]: "Investigation Officer",
  [ROLES.FORENSIC]: "Forensic Officer",
  [ROLES.COURT]: "Court Justice",
  [ROLES.ADMIN]: "Administrator",
};

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------
export const USERS = [
  {
    id: "USR-001",
    employeeId: "IO-2201",
    name: "Aditi Sharma",
    email: "investigator@example.com",
    role: ROLES.INVESTIGATOR,
    department: "Cyber Crime Investigation Wing",
    status: "Active",
    lastLogin: "2026-09-07T08:12:00",
    badgeInitials: "AS",
  },
  {
    id: "USR-002",
    employeeId: "FO-3110",
    name: "Dr. Rakesh Verma",
    email: "forensic@example.com",
    role: ROLES.FORENSIC,
    department: "Digital Forensics Laboratory",
    status: "Active",
    lastLogin: "2026-09-07T09:40:00",
    badgeInitials: "RV",
  },
  {
    id: "USR-003",
    employeeId: "CJ-0042",
    name: "Justice Meera Krishnan",
    email: "court@example.com",
    role: ROLES.COURT,
    department: "District Court — Cyber Bench",
    status: "Active",
    lastLogin: "2026-09-06T17:05:00",
    badgeInitials: "MK",
  },
  {
    id: "USR-004",
    employeeId: "AD-0001",
    name: "Sanjeev Gupta",
    email: "admin@example.com",
    role: ROLES.ADMIN,
    department: "System Administration",
    status: "Active",
    lastLogin: "2026-09-07T07:55:00",
    badgeInitials: "SG",
  },
  {
    id: "USR-005",
    employeeId: "IO-2214",
    name: "Rohan Patil",
    email: "rohan.patil@example.com",
    role: ROLES.INVESTIGATOR,
    department: "Cyber Crime Investigation Wing",
    status: "Active",
    lastLogin: "2026-09-06T11:22:00",
    badgeInitials: "RP",
  },
  {
    id: "USR-006",
    employeeId: "FO-3122",
    name: "Kavya Nair",
    email: "kavya.nair@example.com",
    role: ROLES.FORENSIC,
    department: "Digital Forensics Laboratory",
    status: "Active",
    lastLogin: "2026-09-05T15:48:00",
    badgeInitials: "KN",
  },
  {
    id: "USR-007",
    employeeId: "IO-2233",
    name: "Vikram Desai",
    email: "vikram.desai@example.com",
    role: ROLES.INVESTIGATOR,
    department: "Economic Offences Wing",
    status: "Deactivated",
    lastLogin: "2026-08-21T09:10:00",
    badgeInitials: "VD",
  },
  {
    id: "USR-008",
    employeeId: "CJ-0051",
    name: "Justice Arvind Rao",
    email: "arvind.rao@example.com",
    role: ROLES.COURT,
    department: "District Court — Cyber Bench",
    status: "Active",
    lastLogin: "2026-09-04T10:30:00",
    badgeInitials: "AR",
  },
  {
    id: "USR-009",
    employeeId: "AD-0007",
    name: "Neha Joshi",
    email: "neha.joshi@example.com",
    role: ROLES.ADMIN,
    department: "System Administration",
    status: "Active",
    lastLogin: "2026-09-06T18:02:00",
    badgeInitials: "NJ",
  },
];

export function findUserByEmail(email) {
  return USERS.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
}

// ---------------------------------------------------------------------------
// Cases
// ---------------------------------------------------------------------------
export const CASES = [
  {
    id: "CASE-2026-00421",
    caseNumber: "FIR/2026/CYB/00891",
    title: "Cyber Crime Investigation — Online Banking Fraud",
    incidentDate: "2026-09-04",
    incidentLocation: "Andheri East, Mumbai, Maharashtra",
    priority: "High",
    status: "Forensic Examination",
    investigatorId: "USR-001",
    createdDate: "2026-09-05T09:00:00",
    lastUpdated: "2026-09-07T16:20:00",
    description:
      "Complainant reported unauthorized transactions totalling ₹8,42,000 from a linked savings account after clicking a phishing link received via SMS. Suspect(s) allegedly used a cloned banking portal to harvest OTP and login credentials.",
    notes:
      "Preliminary triage indicates a phishing kit hosted on a short-lived domain. Bank has frozen the beneficiary account pending investigation. CCTV requested from the ATM where cash was withdrawn.",
    evidenceIds: ["EV-1042", "EV-1047", "EV-1051", "EV-1060"],
    firId: "FIR-00891",
    witnessIds: ["WT-01", "WT-02"],
    forensicReportIds: ["FR-2026-0098"],
    submittedToCourt: false,
    courtSubmissionDate: null,
    progress: {
      caseCreated: true,
      firAdded: true,
      evidenceCollected: true,
      forensicExamination: true,
      forensicReport: true,
      courtSubmission: false,
    },
  },
  {
    id: "CASE-2026-00422",
    caseNumber: "FIR/2026/CYB/00902",
    title: "Data Theft — Insider Threat, TechNova Pvt Ltd",
    incidentDate: "2026-09-01",
    incidentLocation: "Hinjewadi, Pune, Maharashtra",
    priority: "Medium",
    status: "Evidence Pending",
    investigatorId: "USR-001",
    createdDate: "2026-09-02T10:15:00",
    lastUpdated: "2026-09-06T12:00:00",
    description:
      "Former employee suspected of exfiltrating proprietary source code and customer database prior to resignation. Company IT team flagged large outbound transfers to a personal cloud drive.",
    notes: "Awaiting forensic disk image of the employee's issued laptop from IT asset recovery.",
    evidenceIds: ["EV-1075"],
    firId: "FIR-00902",
    witnessIds: ["WT-03"],
    forensicReportIds: [],
    submittedToCourt: false,
    courtSubmissionDate: null,
    progress: {
      caseCreated: true,
      firAdded: true,
      evidenceCollected: false,
      forensicExamination: false,
      forensicReport: false,
      courtSubmission: false,
    },
  },
  {
    id: "CASE-2026-00423",
    caseNumber: "FIR/2026/CYB/00874",
    title: "Social Media Impersonation & Extortion",
    incidentDate: "2026-08-27",
    incidentLocation: "Koramangala, Bengaluru, Karnataka",
    priority: "High",
    status: "Ready for Court",
    investigatorId: "USR-005",
    createdDate: "2026-08-28T14:30:00",
    lastUpdated: "2026-09-05T09:40:00",
    description:
      "Accused created a duplicate social media profile impersonating the complainant and demanded payment to avoid publishing morphed images. Screenshots, chat logs and a UPI transaction trail were collected.",
    notes: "Final case package compiled; pending investigating officer sign-off before court submission.",
    evidenceIds: ["EV-1080"],
    firId: "FIR-00874",
    witnessIds: ["WT-04"],
    forensicReportIds: ["FR-2026-0101"],
    submittedToCourt: false,
    courtSubmissionDate: null,
    progress: {
      caseCreated: true,
      firAdded: true,
      evidenceCollected: true,
      forensicExamination: true,
      forensicReport: true,
      courtSubmission: false,
    },
  },
  {
    id: "CASE-2026-00424",
    caseNumber: "FIR/2026/CYB/00810",
    title: "Ransomware Attack — District Cooperative Bank",
    incidentDate: "2026-08-14",
    incidentLocation: "Nashik, Maharashtra",
    priority: "High",
    status: "Submitted to Court",
    investigatorId: "USR-001",
    createdDate: "2026-08-15T08:45:00",
    lastUpdated: "2026-08-30T11:10:00",
    description:
      "Bank's internal file server was encrypted by ransomware; attacker demanded 5 BTC. Forensic imaging of the affected server and network logs completed. Case file submitted for judicial review.",
    notes: "Court has acknowledged receipt; awaiting scheduling of review hearing.",
    evidenceIds: ["EV-1090"],
    firId: "FIR-00810",
    witnessIds: [],
    forensicReportIds: ["FR-2026-0087"],
    submittedToCourt: true,
    courtSubmissionDate: "2026-08-30T11:10:00",
    progress: {
      caseCreated: true,
      firAdded: true,
      evidenceCollected: true,
      forensicExamination: true,
      forensicReport: true,
      courtSubmission: true,
    },
  },
];

export const CASE_STATUS_OPTIONS = [
  "Under Investigation",
  "Evidence Pending",
  "Forensic Examination",
  "Report Received",
  "Ready for Court",
  "Submitted to Court",
  "Under Judicial Review",
];

export const PRIORITY_OPTIONS = ["High", "Medium", "Low"];

// ---------------------------------------------------------------------------
// FIRs
// ---------------------------------------------------------------------------
export const FIRS = {
  "FIR-00891": {
    id: "FIR-00891",
    caseId: "CASE-2026-00421",
    firNumber: "FIR/2026/CYB/00891",
    policeStation: "Andheri Cyber Crime Police Station",
    incidentDate: "2026-09-04",
    complainant: "Mr. Suresh Iyer",
    officer: "Aditi Sharma",
    description:
      "Complainant states he received an SMS claiming to be from his bank warning of account suspension, with a link to 'verify' his KYC. On entering his net-banking credentials and OTP on the linked page, ₹8,42,000 was withdrawn across four transactions within eleven minutes.",
    documentName: "FIR_00891_AndheriCyberPS.pdf",
    filedDate: "2026-09-05T09:10:00",
  },
  "FIR-00902": {
    id: "FIR-00902",
    caseId: "CASE-2026-00422",
    firNumber: "FIR/2026/CYB/00902",
    policeStation: "Hinjewadi Cyber Crime Police Station",
    incidentDate: "2026-09-01",
    complainant: "TechNova Pvt Ltd (represented by CISO)",
    officer: "Aditi Sharma",
    description:
      "Company reports that a former senior developer accessed the source-code repository and customer database after resignation using retained VPN credentials, exfiltrating data to a personal cloud storage account.",
    documentName: "FIR_00902_HinjewadiCyberPS.pdf",
    filedDate: "2026-09-02T10:30:00",
  },
  "FIR-00874": {
    id: "FIR-00874",
    caseId: "CASE-2026-00423",
    firNumber: "FIR/2026/CYB/00874",
    policeStation: "Koramangala Cyber Crime Police Station",
    incidentDate: "2026-08-27",
    complainant: "Ms. Priya Nambiar",
    officer: "Rohan Patil",
    description:
      "A fake Instagram profile using the complainant's photographs was created. The accused messaged the complainant demanding ₹50,000 via UPI, threatening to circulate morphed images if payment was refused.",
    documentName: "FIR_00874_KoramangalaCyberPS.pdf",
    filedDate: "2026-08-28T14:40:00",
  },
  "FIR-00810": {
    id: "FIR-00810",
    caseId: "CASE-2026-00424",
    firNumber: "FIR/2026/CYB/00810",
    policeStation: "Nashik Cyber Crime Police Station",
    incidentDate: "2026-08-14",
    complainant: "District Cooperative Bank (Branch Manager)",
    officer: "Aditi Sharma",
    description:
      "Bank's file server became inaccessible with all shared documents encrypted and a ransom note demanding 5 BTC for a decryption key. IT team isolated the server from the network upon discovery.",
    documentName: "FIR_00810_NashikCyberPS.pdf",
    filedDate: "2026-08-15T08:55:00",
  },
};

// ---------------------------------------------------------------------------
// Witnesses
// ---------------------------------------------------------------------------
export const WITNESSES = {
  "WT-01": {
    id: "WT-01",
    caseId: "CASE-2026-00421",
    name: "Suresh Iyer",
    role: "Complainant / Account Holder",
    statementDate: "2026-09-05",
    status: "Recorded",
    summaryAvailable: true,
    statementText:
      "I received an SMS at 10:42 AM claiming my bank account KYC needed urgent verification. I clicked the link, which opened a page identical to my bank's login. I entered my user ID, password and the OTP that followed. Minutes later I received debit alerts for four transactions I never authorized.",
  },
  "WT-02": {
    id: "WT-02",
    caseId: "CASE-2026-00421",
    name: "Radhika Menon",
    role: "Branch Manager, Andheri East Branch",
    statementDate: "2026-09-05",
    status: "Recorded",
    summaryAvailable: true,
    statementText:
      "On being alerted by the customer, we immediately flagged the account and froze the beneficiary account that received the transferred funds. We provided the transaction logs and beneficiary account details to the investigating officer.",
  },
  "WT-03": {
    id: "WT-03",
    caseId: "CASE-2026-00422",
    name: "Ananya Kulkarni",
    role: "IT Security Lead, TechNova Pvt Ltd",
    statementDate: "2026-09-03",
    status: "Recorded",
    summaryAvailable: false,
    statementText:
      "Our DLP system flagged an unusual 12 GB outbound transfer to a personal cloud storage account two days after the employee's last working day, using credentials that should have been revoked.",
  },
  "WT-04": {
    id: "WT-04",
    caseId: "CASE-2026-00423",
    name: "Priya Nambiar",
    role: "Complainant",
    statementDate: "2026-08-28",
    status: "Recorded",
    summaryAvailable: true,
    statementText:
      "I noticed a duplicate account using my photos on 26 August. The next day I received a direct message demanding ₹50,000 via a UPI ID, with a threat to post morphed images to my followers if I did not comply.",
  },
};

// ---------------------------------------------------------------------------
// Evidence
// ---------------------------------------------------------------------------
export const EVIDENCE_TYPES = ["CCTV", "Video", "Image", "Audio", "Document", "Mobile Extraction"];

export const EVIDENCE = {
  "EV-1042": {
    id: "EV-1042",
    caseId: "CASE-2026-00421",
    name: "ATM CCTV Footage — Linking Road Branch",
    type: "CCTV",
    fileName: "ATM_CCTV_LinkingRoad_040926.mp4",
    fileSize: "482 MB",
    uploadedBy: "Aditi Sharma",
    uploadDate: "2026-09-05T10:05:00",
    hashOriginal: "A4F9C72D91E6B3F80C1D5A9E7F2B6C41D8A03F5E9B7C2D14F6A8E0C3B9D5F721",
    hashCurrent: "A4F9C72D91E6B3F80C1D5A9E7F2B6C41D8A03F5E9B7C2D14F6A8E0C3B9D5F721",
    integrityStatus: "verified",
    lastVerified: "2026-09-07T18:21:00",
    status: "Report Submitted",
    currentHolder: "Digital Forensics Laboratory",
  },
  "EV-1047": {
    id: "EV-1047",
    caseId: "CASE-2026-00421",
    name: "Complainant Mobile Device — Forensic Image",
    type: "Mobile Extraction",
    fileName: "Mobile_Extraction_SureshIyer_iPhone13.zip",
    fileSize: "6.1 GB",
    uploadedBy: "Aditi Sharma",
    uploadDate: "2026-09-05T11:40:00",
    hashOriginal: "B27E410CAF9931D2E8B6047FDC58A19E732CAB0459D6F1E82C4B7A0935DE21F",
    hashCurrent: "B27E410CAF9931D2E8B6047FDC58A19E732CAB0459D6F1E82C4B7A0935DE21F",
    integrityStatus: "verified",
    lastVerified: "2026-09-06T14:12:00",
    status: "Examination Completed",
    currentHolder: "Digital Forensics Laboratory",
  },
  "EV-1051": {
    id: "EV-1051",
    caseId: "CASE-2026-00421",
    name: "Bank Statement & Transaction Log",
    type: "Document",
    fileName: "BankStatement_SureshIyer_Sep2026.pdf",
    fileSize: "1.4 MB",
    uploadedBy: "Aditi Sharma",
    uploadDate: "2026-09-05T12:15:00",
    hashOriginal: "C813F5A2E9D047B6C1A8309FE624D71B0A9C5F3E8B62D410A7C9E5F318B4D6A",
    hashCurrent: "C813F5A2E9D047B6C1A8309FE624D71B0A9C5F3E8B62D410A7C9E5F318B4D6A",
    integrityStatus: "verified",
    lastVerified: "2026-09-07T09:02:00",
    status: "Under Examination",
    currentHolder: "Digital Forensics Laboratory",
  },
  "EV-1060": {
    id: "EV-1060",
    caseId: "CASE-2026-00421",
    name: "Customer Care Call Recording",
    type: "Audio",
    fileName: "CallRecording_BankSupport_050926.wav",
    fileSize: "18 MB",
    uploadedBy: "Aditi Sharma",
    uploadDate: "2026-09-06T09:20:00",
    hashOriginal: "D40B92E7F1C6A385D0E9B4718FCA6023E9D5B7C1A4F802D6E93B5C7A1F0284D",
    hashCurrent: "D40B92E7F1C6A385D0E9B4718FCA6023E9D5B7C1A4F802D6E93B5C7A1F0284D",
    integrityStatus: "verified",
    lastVerified: "2026-09-06T09:45:00",
    status: "Sent to Forensic",
    currentHolder: "Digital Forensics Laboratory",
  },
  "EV-1075": {
    id: "EV-1075",
    caseId: "CASE-2026-00422",
    name: "Employee Laptop — Disk Image (Pending)",
    type: "Document",
    fileName: "Pending_Asset_Recovery.txt",
    fileSize: "—",
    uploadedBy: "Aditi Sharma",
    uploadDate: "2026-09-06T10:00:00",
    hashOriginal: "—",
    hashCurrent: "—",
    integrityStatus: "pending",
    lastVerified: null,
    status: "Created",
    currentHolder: "Investigation Officer",
  },
  "EV-1080": {
    id: "EV-1080",
    caseId: "CASE-2026-00423",
    name: "Chat Log & UPI Transaction Screenshots",
    type: "Image",
    fileName: "Screenshots_Extortion_Bundle.zip",
    fileSize: "44 MB",
    uploadedBy: "Rohan Patil",
    uploadDate: "2026-08-28T15:00:00",
    hashOriginal: "E51C083FA924D6B71E0C5A398F6D2417B0A3C9E5D1F672A8B4C0E9D3F581A26",
    hashCurrent: "F62D194FB035E7C82F1D6B4A9F7E3528C1B4D0F6E2A783B9C5D1F0E4A692B37",
    integrityStatus: "mismatch",
    lastVerified: "2026-09-04T16:30:00",
    status: "Examination Completed",
    currentHolder: "Digital Forensics Laboratory",
  },
  "EV-1090": {
    id: "EV-1090",
    caseId: "CASE-2026-00424",
    name: "Bank File Server — Full Disk Image",
    type: "Document",
    fileName: "DiskImage_CoopBankServer_140826.dd",
    fileSize: "512 GB",
    uploadedBy: "Aditi Sharma",
    uploadDate: "2026-08-15T09:30:00",
    hashOriginal: "17A29B4D8E63C0F5A72D9B1E4C806FA35D9B2E7C1F408A6D3B95E2C7A0F1846",
    hashCurrent: "17A29B4D8E63C0F5A72D9B1E4C806FA35D9B2E7C1F408A6D3B95E2C7A0F1846",
    integrityStatus: "verified",
    lastVerified: "2026-08-29T13:00:00",
    status: "Report Submitted",
    currentHolder: "Digital Forensics Laboratory",
  },
};

// ---------------------------------------------------------------------------
// Chain of custody
// ---------------------------------------------------------------------------
export const CUSTODY = {
  "EV-1042": [
    { actor: "Aditi Sharma", role: "Investigation Officer", action: "Evidence Created & Uploaded", timestamp: "2026-09-05T10:05:00", hash: "A4F9…F721", status: "ok" },
    { actor: "Aditi Sharma", role: "Investigation Officer", action: "Submitted to Forensic (Digital Forensics Laboratory)", timestamp: "2026-09-05T11:05:00", hash: "A4F9…F721", status: "ok" },
    { actor: "Dr. Rakesh Verma", role: "Forensic Officer", action: "Received by Forensic Officer", timestamp: "2026-09-05T11:22:00", hash: "A4F9…F721", status: "ok" },
    { actor: "Dr. Rakesh Verma", role: "Forensic Officer", action: "Integrity Verified on Receipt", timestamp: "2026-09-05T11:30:00", hash: "A4F9…F721", status: "ok" },
    { actor: "Dr. Rakesh Verma", role: "Forensic Officer", action: "Examination Started", timestamp: "2026-09-05T13:10:00", hash: "A4F9…F721", status: "ok" },
    { actor: "Dr. Rakesh Verma", role: "Forensic Officer", action: "Examination Completed", timestamp: "2026-09-06T15:45:00", hash: "A4F9…F721", status: "ok" },
    { actor: "Dr. Rakesh Verma", role: "Forensic Officer", action: "Forensic Report Submitted (FR-2026-0098)", timestamp: "2026-09-06T16:20:00", hash: "A4F9…F721", status: "ok" },
  ],
  "EV-1047": [
    { actor: "Aditi Sharma", role: "Investigation Officer", action: "Evidence Created & Uploaded", timestamp: "2026-09-05T11:40:00", hash: "B27E…DE21", status: "ok" },
    { actor: "Aditi Sharma", role: "Investigation Officer", action: "Submitted to Forensic (Digital Forensics Laboratory)", timestamp: "2026-09-05T12:00:00", hash: "B27E…DE21", status: "ok" },
    { actor: "Dr. Rakesh Verma", role: "Forensic Officer", action: "Received by Forensic Officer", timestamp: "2026-09-05T12:20:00", hash: "B27E…DE21", status: "ok" },
    { actor: "Dr. Rakesh Verma", role: "Forensic Officer", action: "Examination Completed", timestamp: "2026-09-06T14:12:00", hash: "B27E…DE21", status: "ok" },
  ],
  "EV-1051": [
    { actor: "Aditi Sharma", role: "Investigation Officer", action: "Evidence Created & Uploaded", timestamp: "2026-09-05T12:15:00", hash: "C813…B4D6A", status: "ok" },
    { actor: "Aditi Sharma", role: "Investigation Officer", action: "Submitted to Forensic (Digital Forensics Laboratory)", timestamp: "2026-09-06T09:00:00", hash: "C813…B4D6A", status: "ok" },
    { actor: "Kavya Nair", role: "Forensic Officer", action: "Received by Forensic Officer", timestamp: "2026-09-06T09:30:00", hash: "C813…B4D6A", status: "ok" },
    { actor: "Kavya Nair", role: "Forensic Officer", action: "Examination Started", timestamp: "2026-09-07T09:05:00", hash: "C813…B4D6A", status: "ok" },
  ],
  "EV-1060": [
    { actor: "Aditi Sharma", role: "Investigation Officer", action: "Evidence Created & Uploaded", timestamp: "2026-09-06T09:20:00", hash: "D40B…0284D", status: "ok" },
    { actor: "Aditi Sharma", role: "Investigation Officer", action: "Submitted to Forensic (Digital Forensics Laboratory)", timestamp: "2026-09-06T09:50:00", hash: "D40B…0284D", status: "ok" },
  ],
  "EV-1080": [
    { actor: "Rohan Patil", role: "Investigation Officer", action: "Evidence Created & Uploaded", timestamp: "2026-08-28T15:00:00", hash: "E51C…81A26", status: "ok" },
    { actor: "Rohan Patil", role: "Investigation Officer", action: "Submitted to Forensic (Digital Forensics Laboratory)", timestamp: "2026-08-29T09:00:00", hash: "E51C…81A26", status: "ok" },
    { actor: "Kavya Nair", role: "Forensic Officer", action: "Received by Forensic Officer", timestamp: "2026-08-29T09:40:00", hash: "E51C…81A26", status: "ok" },
    { actor: "Kavya Nair", role: "Forensic Officer", action: "Examination Completed", timestamp: "2026-09-04T16:30:00", hash: "F62D…92B37", status: "warn" },
  ],
  "EV-1090": [
    { actor: "Aditi Sharma", role: "Investigation Officer", action: "Evidence Created & Uploaded", timestamp: "2026-08-15T09:30:00", hash: "17A2…F1846", status: "ok" },
    { actor: "Aditi Sharma", role: "Investigation Officer", action: "Submitted to Forensic (Digital Forensics Laboratory)", timestamp: "2026-08-15T10:00:00", hash: "17A2…F1846", status: "ok" },
    { actor: "Dr. Rakesh Verma", role: "Forensic Officer", action: "Received by Forensic Officer", timestamp: "2026-08-15T10:25:00", hash: "17A2…F1846", status: "ok" },
    { actor: "Dr. Rakesh Verma", role: "Forensic Officer", action: "Examination Completed", timestamp: "2026-08-28T12:00:00", hash: "17A2…F1846", status: "ok" },
    { actor: "Dr. Rakesh Verma", role: "Forensic Officer", action: "Forensic Report Submitted (FR-2026-0087)", timestamp: "2026-08-29T10:00:00", hash: "17A2…F1846", status: "ok" },
    { actor: "Aditi Sharma", role: "Investigation Officer", action: "Case Submitted to Court", timestamp: "2026-08-30T11:10:00", hash: "17A2…F1846", status: "ok" },
  ],
};

// ---------------------------------------------------------------------------
// Forensic reports
// ---------------------------------------------------------------------------
export const FORENSIC_REPORTS = {
  "FR-2026-0098": {
    id: "FR-2026-0098",
    caseId: "CASE-2026-00421",
    evidenceIds: ["EV-1042"],
    examiner: "Dr. Rakesh Verma",
    examinerId: "USR-002",
    date: "2026-09-06T16:20:00",
    method: "Video Frame Analysis & Metadata Verification",
    observations:
      "Footage timestamp is consistent with the ATM transaction log. Frame-by-frame analysis at 00:04:12–00:05:03 shows an individual in a grey hooded jacket withdrawing cash, face partially obscured. No signs of tampering detected in container metadata.",
    findings:
      "Video container metadata (creation/modification timestamps, codec signature) is internally consistent and matches the DVR export log provided by the bank. No frame insertion or deletion artifacts were detected using error-level analysis.",
    conclusion:
      "The footage is assessed as authentic and unaltered. It corroborates the timeline of the unauthorized cash withdrawal described in the complaint. Recommend enhancement pass for facial region prior to identification proceedings.",
    status: "Submitted",
    supportingFiles: ["ELA_FrameAnalysis_EV1042.pdf", "Hash_Verification_Log_EV1042.txt"],
  },
  "FR-2026-0101": {
    id: "FR-2026-0101",
    caseId: "CASE-2026-00423",
    evidenceIds: ["EV-1080"],
    examiner: "Kavya Nair",
    examinerId: "USR-006",
    date: "2026-09-04T16:45:00",
    method: "Image Metadata & Chat Log Correlation Analysis",
    observations:
      "EXIF metadata on two of six submitted screenshots shows re-encoding by a third-party editing application after the reported capture date. Original hash recorded at intake does not match the hash recalculated on the received file set.",
    findings:
      "A hash mismatch was identified on the submitted evidence bundle, indicating the file set was modified after the original chain-of-custody hash was recorded. Root cause under review with the submitting officer.",
    conclusion:
      "Examination flags an unresolved integrity discrepancy. Recommend re-acquisition of the original screenshot bundle directly from the complainant's device before this evidence is relied upon in court submission.",
    status: "Submitted",
    supportingFiles: ["Metadata_Report_EV1080.pdf"],
  },
  "FR-2026-0087": {
    id: "FR-2026-0087",
    caseId: "CASE-2026-00424",
    evidenceIds: ["EV-1090"],
    examiner: "Dr. Rakesh Verma",
    examinerId: "USR-002",
    date: "2026-08-29T10:00:00",
    method: "Disk Forensic Imaging & Malware Reverse Engineering",
    observations:
      "Ransomware binary identified in scheduled tasks directory; encryption routine consistent with a known ransomware-as-a-service family. Network logs show outbound C2 beaconing to two IP addresses in the 48 hours preceding encryption.",
    findings:
      "Initial access vector traced to a compromised remote-desktop credential. Encrypted file headers match the identified ransomware family's signature. Ransom note metadata contains a wallet address consistent with prior reported campaigns.",
    conclusion:
      "Attack attributed with high confidence to a known ransomware operation. Recommend coordination with the national cyber-crime cell given the wallet-address overlap with other reported incidents.",
    status: "Submitted",
    supportingFiles: ["Malware_Analysis_EV1090.pdf", "Network_Log_Extract.csv"],
  },
};

// ---------------------------------------------------------------------------
// Audit logs
// ---------------------------------------------------------------------------
export const AUDIT_LOGS = [
  { id: "AL-1001", timestamp: "2026-09-07T18:21:00", actor: "Aditi Sharma", role: ROLES.INVESTIGATOR, action: "Evidence Integrity Verified", entity: "EV-1042", ip: "10.24.6.112", status: "Success" },
  { id: "AL-1002", timestamp: "2026-09-07T09:02:00", actor: "Aditi Sharma", role: ROLES.INVESTIGATOR, action: "Evidence Integrity Verified", entity: "EV-1051", ip: "10.24.6.112", status: "Success" },
  { id: "AL-1003", timestamp: "2026-09-06T16:20:00", actor: "Dr. Rakesh Verma", role: ROLES.FORENSIC, action: "Forensic Report Submitted", entity: "FR-2026-0098", ip: "10.24.9.041", status: "Success" },
  { id: "AL-1004", timestamp: "2026-09-06T15:45:00", actor: "Dr. Rakesh Verma", role: ROLES.FORENSIC, action: "Examination Completed", entity: "EV-1042", ip: "10.24.9.041", status: "Success" },
  { id: "AL-1005", timestamp: "2026-09-06T14:12:00", actor: "Dr. Rakesh Verma", role: ROLES.FORENSIC, action: "Examination Completed", entity: "EV-1047", ip: "10.24.9.041", status: "Success" },
  { id: "AL-1006", timestamp: "2026-09-06T09:50:00", actor: "Aditi Sharma", role: ROLES.INVESTIGATOR, action: "Evidence Submitted to Forensic", entity: "EV-1060", ip: "10.24.6.112", status: "Success" },
  { id: "AL-1007", timestamp: "2026-09-06T09:20:00", actor: "Aditi Sharma", role: ROLES.INVESTIGATOR, action: "Evidence Uploaded", entity: "EV-1060", ip: "10.24.6.112", status: "Success" },
  { id: "AL-1008", timestamp: "2026-09-05T18:41:00", actor: "Dr. Rakesh Verma", role: ROLES.FORENSIC, action: "Evidence Received", entity: "EV-1042", ip: "10.24.9.041", status: "Success" },
  { id: "AL-1009", timestamp: "2026-09-05T12:00:00", actor: "Aditi Sharma", role: ROLES.INVESTIGATOR, action: "Evidence Submitted to Forensic", entity: "EV-1047", ip: "10.24.6.112", status: "Success" },
  { id: "AL-1010", timestamp: "2026-09-05T11:05:00", actor: "Aditi Sharma", role: ROLES.INVESTIGATOR, action: "Evidence Submitted to Forensic", entity: "EV-1042", ip: "10.24.6.112", status: "Success" },
  { id: "AL-1011", timestamp: "2026-09-05T10:05:00", actor: "Aditi Sharma", role: ROLES.INVESTIGATOR, action: "Evidence Uploaded", entity: "EV-1042", ip: "10.24.6.112", status: "Success" },
  { id: "AL-1012", timestamp: "2026-09-05T09:10:00", actor: "Aditi Sharma", role: ROLES.INVESTIGATOR, action: "FIR Added", entity: "FIR-00891", ip: "10.24.6.112", status: "Success" },
  { id: "AL-1013", timestamp: "2026-09-05T09:00:00", actor: "Aditi Sharma", role: ROLES.INVESTIGATOR, action: "Case Created", entity: "CASE-2026-00421", ip: "10.24.6.112", status: "Success" },
  { id: "AL-1014", timestamp: "2026-09-04T16:30:00", actor: "Kavya Nair", role: ROLES.FORENSIC, action: "Integrity Mismatch Detected", entity: "EV-1080", ip: "10.24.9.055", status: "Warning" },
  { id: "AL-1015", timestamp: "2026-08-30T11:10:00", actor: "Aditi Sharma", role: ROLES.INVESTIGATOR, action: "Case Submitted to Court", entity: "CASE-2026-00424", ip: "10.24.6.112", status: "Success" },
  { id: "AL-1016", timestamp: "2026-08-29T10:00:00", actor: "Dr. Rakesh Verma", role: ROLES.FORENSIC, action: "Forensic Report Submitted", entity: "FR-2026-0087", ip: "10.24.9.041", status: "Success" },
  { id: "AL-1017", timestamp: "2026-09-06T18:02:00", actor: "Neha Joshi", role: ROLES.ADMIN, action: "User Login", entity: "USR-009", ip: "10.24.1.010", status: "Success" },
  { id: "AL-1018", timestamp: "2026-09-06T11:47:00", actor: "Sanjeev Gupta", role: ROLES.ADMIN, action: "User Deactivated", entity: "USR-007 (Vikram Desai)", ip: "10.24.1.001", status: "Success" },
  { id: "AL-1019", timestamp: "2026-09-05T08:30:00", actor: "Unknown", role: ROLES.INVESTIGATOR, action: "Failed Login Attempt", entity: "investigator@example.com", ip: "185.220.101.4", status: "Failed" },
  { id: "AL-1020", timestamp: "2026-09-04T09:15:00", actor: "Justice Meera Krishnan", role: ROLES.COURT, action: "Case Reviewed", entity: "CASE-2026-00424", ip: "10.24.3.020", status: "Success" },
  { id: "AL-1021", timestamp: "2026-09-07T08:12:00", actor: "Aditi Sharma", role: ROLES.INVESTIGATOR, action: "User Login", entity: "USR-001", ip: "10.24.6.112", status: "Success" },
  { id: "AL-1022", timestamp: "2026-09-07T09:40:00", actor: "Dr. Rakesh Verma", role: ROLES.FORENSIC, action: "User Login", entity: "USR-002", ip: "10.24.9.041", status: "Success" },
];

// ---------------------------------------------------------------------------
// Notifications (per role)
// ---------------------------------------------------------------------------
export const NOTIFICATIONS = {
  [ROLES.INVESTIGATOR]: [
    { id: "N1", icon: "report", title: "Forensic Report Received", desc: "FR-2026-0098 submitted for EV-1042 on CASE-2026-00421.", time: "2 hours ago", unread: true },
    { id: "N2", icon: "transfer", title: "Evidence Transfer Accepted", desc: "EV-1060 received by Digital Forensics Laboratory.", time: "1 day ago", unread: true },
    { id: "N3", icon: "ai", title: "AI Summary Generated", desc: "Case summary refreshed for CASE-2026-00421.", time: "1 day ago", unread: false },
    { id: "N4", icon: "warning", title: "Evidence Integrity Mismatch", desc: "EV-1080 flagged a hash mismatch during forensic examination.", time: "3 days ago", unread: false },
  ],
  [ROLES.FORENSIC]: [
    { id: "N1", icon: "transfer", title: "New Evidence Assigned", desc: "EV-1051 submitted for forensic examination on CASE-2026-00421.", time: "1 day ago", unread: true },
    { id: "N2", icon: "report", title: "Report Submitted", desc: "FR-2026-0098 successfully delivered to Investigation Officer.", time: "1 day ago", unread: false },
  ],
  [ROLES.COURT]: [
    { id: "N1", icon: "court", title: "Case Submission Completed", desc: "CASE-2026-00424 has been submitted for judicial review.", time: "5 days ago", unread: true },
  ],
  [ROLES.ADMIN]: [
    { id: "N1", icon: "warning", title: "Failed Login Attempt", desc: "Suspicious login attempt on investigator@example.com from an unrecognized IP.", time: "2 days ago", unread: true },
    { id: "N2", icon: "user", title: "User Deactivated", desc: "Vikram Desai's account was deactivated by Sanjeev Gupta.", time: "1 day ago", unread: false },
  ],
};

// ---------------------------------------------------------------------------
// AI Assistant — canned responses for the demo case
// ---------------------------------------------------------------------------
export const AI_CASE_SOURCES = [
  { key: "fir", label: "FIR", available: true },
  { key: "witnesses", label: "Witness Statements", available: true },
  { key: "evidence", label: "Evidence Records", available: true },
  { key: "forensic", label: "Forensic Report", available: true },
  { key: "documents", label: "Investigation Documents", available: true },
];

export const AI_QUICK_ACTIONS = {
  summarize_case: {
    label: "Summarize Case",
    response:
      "CASE SUMMARY — CASE-2026-00421\n\nOverview\nA digital investigation into an online banking fraud in which the complainant, Suresh Iyer, lost ₹8,42,000 through a phishing SMS impersonating his bank.\n\nKey Findings\n• Phishing link harvested net-banking credentials and OTP.\n• Four unauthorized transactions occurred within 11 minutes.\n• ATM CCTV footage (EV-1042) corroborates a cash withdrawal matching the transaction timeline.\n\nImportant Evidence\n• EV-1042 — ATM CCTV Footage (integrity verified)\n• EV-1047 — Mobile device forensic image\n• EV-1051 — Bank statement & transaction log\n\nForensic Findings\nVideo analysis (FR-2026-0098) found the CCTV footage authentic and unaltered, corroborating the reported withdrawal window.\n\nCurrent Status\nForensic report received for the primary evidence item. Case is progressing toward final case preparation.",
    sources: ["FIR.pdf", "Forensic_Report_FR-2026-0098.pdf", "Evidence_Record_EV-1042"],
  },
  key_points: {
    label: "Extract Key Points",
    response:
      "KEY POINTS — CASE-2026-00421\n\nPeople\n• Suresh Iyer — Complainant\n• Radhika Menon — Branch Manager (witness)\n• Dr. Rakesh Verma — Forensic Examiner\n\nDates\n• 04 Sep 2026 — Incident occurred\n• 05 Sep 2026 — Case created, FIR filed, evidence uploaded\n• 06 Sep 2026 — Forensic examination completed, report submitted\n\nEvidence\n• EV-1042 CCTV footage (verified, examined)\n• EV-1047 Mobile forensic image (examined)\n• EV-1051 Bank statement (under examination)\n\nMajor Finding\nCCTV footage authenticity confirmed; corroborates fraudulent withdrawal timeline.",
    sources: ["FIR.pdf", "Evidence_Record_EV-1042", "Evidence_Record_EV-1047"],
  },
  timeline: {
    label: "Generate Timeline",
    response: "GENERATED_TIMELINE",
    sources: ["FIR.pdf", "Evidence_Record_EV-1042", "Forensic_Report_FR-2026-0098.pdf"],
  },
  summarize_witnesses: {
    label: "Summarize Witnesses",
    response:
      "WITNESS SUMMARY\n\nSuresh Iyer (Complainant): Received a phishing SMS, entered credentials and OTP on a spoofed banking page, and observed four unauthorized debit alerts within minutes.\n\nRadhika Menon (Branch Manager): Confirmed the bank froze the beneficiary account upon being alerted and supplied transaction logs to investigators.\n\nBoth statements are internally consistent and align with the transaction log evidence (EV-1051).",
    sources: ["Witness_Statement_WT-01", "Witness_Statement_WT-02"],
  },
  summarize_forensic: {
    label: "Summarize Forensic Report",
    response:
      "FORENSIC REPORT SUMMARY — FR-2026-0098\n\nExamination performed: Video frame analysis and metadata verification on EV-1042.\n\nObservations: Timestamp consistent with the ATM log; individual in grey hooded jacket seen withdrawing cash; no tampering indicators in container metadata.\n\nFindings: Metadata and codec signatures match the bank's DVR export; no frame insertion/deletion artifacts detected.\n\nConclusion: Footage assessed as authentic and unaltered, corroborating the reported withdrawal timeline. Facial-region enhancement recommended before identification proceedings.",
    sources: ["Forensic_Report_FR-2026-0098.pdf"],
  },
  missing_info: {
    label: "Find Missing Information",
    response:
      "POTENTIALLY MISSING INFORMATION\n\n• Bank statement (EV-1051) forensic examination is still in progress — findings not yet available.\n• No forensic report yet filed for EV-1047 (mobile device image), though examination is marked complete.\n• Call recording (EV-1060) has not yet been received by the forensic laboratory.\n• Beneficiary account holder has not yet been formally identified or recorded as a suspect/witness.\n\nThese gaps do not block continued investigation but should be resolved before final case preparation for court submission.",
    sources: ["Evidence_Record_EV-1051", "Evidence_Record_EV-1047", "Evidence_Record_EV-1060"],
  },
};

export const AI_TIMELINE = [
  { date: "04 Sep", label: "Incident Reported", desc: "Complainant identifies unauthorized transactions and contacts bank support." },
  { date: "05 Sep", label: "Case Created", desc: "CASE-2026-00421 opened by Investigation Officer Aditi Sharma." },
  { date: "05 Sep", label: "FIR Filed & Evidence Collected", desc: "FIR/2026/CYB/00891 filed; CCTV, mobile image, bank statement uploaded." },
  { date: "06 Sep", label: "Evidence Sent to Forensic", desc: "Evidence transferred to the Digital Forensics Laboratory; chain of custody recorded." },
  { date: "06 Sep", label: "Forensic Examination Completed", desc: "CCTV and mobile image examinations completed by Dr. Rakesh Verma." },
  { date: "06 Sep", label: "Forensic Report Submitted", desc: "FR-2026-0098 submitted back to the Investigation Officer." },
  { date: "07 Sep", label: "AI Case Analysis", desc: "AI Investigation Assistant generates case summary and key points for review." },
];

const AI_QA_BANK = [
  {
    match: ["evidence", "examined"],
    answer:
      "Based on the forensic records available for CASE-2026-00421, 2 evidence items have been fully examined and 1 is currently under examination.\n\n1. EV-1042 — ATM CCTV Footage (examination completed, report submitted)\n2. EV-1047 — Mobile Device Forensic Image (examination completed)\n3. EV-1051 — Bank Statement & Transaction Log (under examination)\n\nThe forensic report for EV-1042 (FR-2026-0098) has been submitted to the Investigation Officer.",
    sources: ["Forensic_Report_FR-2026-0098.pdf", "Evidence_Record_EV-1042", "Evidence_Record_EV-1047"],
  },
  {
    match: ["forensic officer find", "forensic findings", "what did the forensic"],
    answer:
      "The forensic examiner, Dr. Rakesh Verma, found that the ATM CCTV footage (EV-1042) is authentic and unaltered. Metadata and codec signatures matched the bank's original DVR export, with no signs of frame insertion or deletion. This corroborates the complainant's reported withdrawal timeline.",
    sources: ["Forensic_Report_FR-2026-0098.pdf"],
  },
  {
    match: ["witness", "who provided statements", "statements"],
    answer:
      "Two witnesses have provided recorded statements on this case:\n\n1. Suresh Iyer — Complainant and account holder, describing the phishing incident.\n2. Radhika Menon — Branch Manager, confirming the bank froze the beneficiary account and supplied transaction logs.\n\nBoth statements are consistent with the collected evidence.",
    sources: ["Witness_Statement_WT-01", "Witness_Statement_WT-02"],
  },
  {
    match: ["status", "current status", "where is this case"],
    answer:
      "CASE-2026-00421 is currently in the Forensic Examination stage. The FIR and evidence have been collected, the CCTV footage has been examined with a report submitted, and the bank statement is still under active forensic examination. The case is not yet ready for court submission.",
    sources: ["Evidence_Record_EV-1042", "Evidence_Record_EV-1051"],
  },
  {
    match: ["key facts", "summary", "overview"],
    answer:
      "Key facts: the complainant lost ₹8,42,000 to a phishing SMS scam on 4 Sep 2026. Four unauthorized debits occurred within 11 minutes of entering credentials on a spoofed banking page. ATM CCTV footage has been forensically verified as authentic and corroborates a matching cash withdrawal. The bank statement is still under forensic review.",
    sources: ["FIR.pdf", "Forensic_Report_FR-2026-0098.pdf"],
  },
];

const AI_FALLBACK_ANSWER =
  "I found limited information on that specific question within the authorized case records for CASE-2026-00421. You may want to check the Evidence or Forensic tabs directly, or rephrase your question. Remember to verify any AI-generated information against the original case records.";

export function getAIAnswer(question) {
  const q = question.toLowerCase();
  const hit = AI_QA_BANK.find((entry) => entry.match.some((phrase) => q.includes(phrase)));
  if (hit) return { answer: hit.answer, sources: hit.sources };
  return { answer: AI_FALLBACK_ANSWER, sources: [] };
}

// ---------------------------------------------------------------------------
// Permission matrix (Administrator > Roles & Permissions)
// ---------------------------------------------------------------------------
export const PERMISSION_MATRIX = [
  { permission: "Create Case", investigation: "yes", forensic: "no", court: "no", admin: "no" },
  { permission: "Upload Evidence", investigation: "yes", forensic: "no", court: "no", admin: "no" },
  { permission: "Submit Evidence to Forensic", investigation: "yes", forensic: "no", court: "no", admin: "no" },
  { permission: "Receive & Examine Evidence", investigation: "no", forensic: "yes", court: "no", admin: "no" },
  { permission: "Generate Forensic Report", investigation: "no", forensic: "yes", court: "no", admin: "no" },
  { permission: "Use AI Investigation Assistant", investigation: "yes", forensic: "no", court: "no", admin: "no" },
  { permission: "Prepare & Submit Case to Court", investigation: "yes", forensic: "no", court: "no", admin: "no" },
  { permission: "View Submitted Cases", investigation: "no", forensic: "no", court: "yes", admin: "yes" },
  { permission: "Review Chain of Custody", investigation: "yes", forensic: "yes", court: "yes", admin: "yes" },
  { permission: "Manage Users & Roles", investigation: "no", forensic: "no", court: "no", admin: "yes" },
  { permission: "View Audit Logs", investigation: "limited", forensic: "limited", court: "limited", admin: "yes" },
];

// ---------------------------------------------------------------------------
// System activity (Administrator dashboard)
// ---------------------------------------------------------------------------
export const SYSTEM_ACTIVITY = [
  { icon: "user", title: "New user created", desc: "Kavya Nair added as Forensic Officer", time: "2 days ago" },
  { icon: "upload", title: "Evidence uploaded", desc: "EV-1060 added to CASE-2026-00421", time: "1 day ago" },
  { icon: "transfer", title: "Evidence transferred", desc: "EV-1051 sent to Digital Forensics Laboratory", time: "1 day ago" },
  { icon: "report", title: "Forensic report submitted", desc: "FR-2026-0098 delivered to Investigation Officer", time: "1 day ago" },
  { icon: "court", title: "Case submitted to court", desc: "CASE-2026-00424 submitted for judicial review", time: "5 days ago" },
];
