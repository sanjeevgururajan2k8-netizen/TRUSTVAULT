import { useState } from "react";
import { Copy, Check, ShieldCheck, ShieldAlert, ShieldQuestion, Loader2 } from "lucide-react";
import { formatDateTime } from "../../utils/helpers";
import { useToast } from "../../context/ToastContext";

export default function HashVerification({ evidence, onVerify }) {
  const [copied, setCopied] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const toast = useToast();

  const copyHash = async () => {
    try {
      await navigator.clipboard.writeText(evidence.hashCurrent);
      setCopied(true);
      toast.success("Hash copied to clipboard");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Unable to copy hash");
    }
  };

  const runVerify = () => {
    setVerifying(true);
    window.setTimeout(() => {
      setVerifying(false);
      onVerify?.();
    }, 1100);
  };

  const status = evidence.integrityStatus;

  return (
    <div className="hash-panel">
      <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
        <span className="text-sm font-semibold">SHA-256 Fingerprint</span>
        <button className="btn btn-ghost btn-sm" onClick={copyHash}>
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy Hash"}
        </button>
      </div>
      <div className="hash-value">{evidence.hashCurrent}</div>

      {status === "verified" && (
        <div className="integrity-banner ok">
          <ShieldCheck size={20} />
          <div>
            <div className="integrity-banner-title">Evidence Integrity Verified</div>
            <div className="integrity-banner-desc">
              Current hash matches the original fingerprint recorded at upload.
              {evidence.lastVerified && <> Verified: {formatDateTime(evidence.lastVerified)}</>}
            </div>
          </div>
        </div>
      )}

      {status === "mismatch" && (
        <div className="integrity-banner fail">
          <ShieldAlert size={20} />
          <div>
            <div className="integrity-banner-title">⚠ Integrity Mismatch</div>
            <div className="integrity-banner-desc">
              The current evidence fingerprint does not match the original stored fingerprint. Do not treat this
              evidence as integrity-verified — escalate for review before further use.
            </div>
          </div>
        </div>
      )}

      {status === "pending" && (
        <div className="integrity-banner pending">
          <ShieldQuestion size={20} />
          <div>
            <div className="integrity-banner-title">Not Yet Verified</div>
            <div className="integrity-banner-desc">This evidence item has not undergone an integrity check yet.</div>
          </div>
        </div>
      )}

      <button className="btn btn-accent btn-sm" style={{ marginTop: 12 }} onClick={runVerify} disabled={verifying}>
        {verifying ? <Loader2 size={14} className="spin" /> : <ShieldCheck size={14} />}
        {verifying ? "Verifying…" : "Verify Integrity"}
      </button>
    </div>
  );
}
