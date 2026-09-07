export function formatDate(iso, opts = {}) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...opts,
  });
}

export function formatDateTime(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return `${formatDate(iso)}, ${d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`;
}

export function timeAgo(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  const diffMs = Date.now() - d.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  return formatDate(iso);
}

export function initials(name = "") {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function truncateHash(hash, lead = 4, tail = 4) {
  if (!hash || hash === "—") return "—";
  if (hash.length <= lead + tail + 3) return hash;
  return `${hash.slice(0, lead)}…${hash.slice(-tail)}`;
}

export function classNames(...args) {
  return args.filter(Boolean).join(" ");
}

/** Deterministic pseudo-hash for prototype "hash generation" UX — not cryptographic. */
export function simulateSha256(seed) {
  let h1 = 0x811c9dc5;
  const str = `${seed}-${Date.now()}`;
  for (let i = 0; i < str.length; i++) {
    h1 ^= str.charCodeAt(i);
    h1 = Math.imul(h1, 0x01000193);
  }
  const hex = (n) => (n >>> 0).toString(16).padStart(8, "0").toUpperCase();
  let out = "";
  let seedNum = h1 >>> 0;
  for (let i = 0; i < 8; i++) {
    seedNum = Math.imul(seedNum ^ (seedNum >>> 15), 2246822519) >>> 0;
    out += hex(seedNum);
  }
  return out.slice(0, 64);
}

export function nextEvidenceId(existingIds = []) {
  const nums = existingIds.map((id) => parseInt(id.replace("EV-", ""), 10)).filter((n) => !Number.isNaN(n));
  const max = nums.length ? Math.max(...nums) : 1041;
  return `EV-${max + 1}`;
}

export function nextCaseId(existingIds = []) {
  const year = new Date().getFullYear();
  const nums = existingIds
    .map((id) => parseInt(id.split("-").pop(), 10))
    .filter((n) => !Number.isNaN(n));
  const max = nums.length ? Math.max(...nums) : 420;
  return `CASE-${year}-${String(max + 1).padStart(5, "0")}`;
}

export const PRIORITY_COLORS = {
  High: "var(--status-red)",
  Medium: "var(--status-amber)",
  Low: "var(--status-green)",
};

export function statusTone(status) {
  const map = {
    "Under Investigation": "blue",
    "Evidence Pending": "amber",
    "Forensic Examination": "blue",
    "Report Received": "blue",
    "Ready for Court": "amber",
    "Submitted to Court": "green",
    "Under Judicial Review": "amber",
    Closed: "gray",
    // evidence lifecycle
    Created: "gray",
    Uploaded: "blue",
    "Sent to Forensic": "amber",
    Received: "blue",
    "Under Examination": "amber",
    "Examination Completed": "blue",
    "Report Submitted": "green",
    // generic
    Active: "green",
    Deactivated: "gray",
    Verified: "green",
    Recorded: "blue",
    Success: "green",
    Warning: "amber",
    Failed: "red",
    Draft: "gray",
    Submitted: "green",
  };
  return map[status] || "gray";
}
