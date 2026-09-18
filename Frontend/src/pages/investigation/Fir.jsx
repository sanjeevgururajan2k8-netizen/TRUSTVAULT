import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { getCasesForUser, getFirByCase } from "../../data/api";
import DocumentCard from "../../components/domain/DocumentCard";
import EmptyState from "../../components/ui/EmptyState";
import { FileText } from "lucide-react";
import { generateFirDocument } from "../../utils/documentGenerator";

export default function InvestigationFir() {
  const { user } = useAuth();
  const toast = useToast();
  const cases = getCasesForUser(user);
  const firs = cases.map((c) => ({ fir: getFirByCase(c.id), caseObj: c })).filter((x) => x.fir);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Investigation Records</div>
          <h1 className="page-title">FIR Documents</h1>
          <p className="page-desc">First Information Reports filed across your assigned cases.</p>
        </div>
      </div>

      {firs.length === 0 ? (
        <EmptyState icon={FileText} title="No FIRs on file" description="FIRs added to a case will appear here." />
      ) : (
        <div className="stack-y">
          {firs.map(({ fir, caseObj }) => (
            <DocumentCard
              key={fir.id}
              title={`${fir.firNumber} · ${caseObj.title}`}
              fileName={fir.documentName}
              date={fir.filedDate}
              onView={() => toast.info("Opening secure document preview…")}
              onDownload={() => {
                generateFirDocument(fir, caseObj);
                toast.success("Download started", fir.documentName);
              }}
              onReplace={() => toast.info("Replace document flow would open a file picker here.")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
