import { useCallback, useRef, useState } from "react";
import { UploadCloud, CheckCircle2, Loader2, FileWarning } from "lucide-react";
import { simulateSha256 } from "../../utils/helpers";

const ACCEPTED_HINT = "JPG • PNG • MP4 • WAV • PDF • DOCX";

/**
 * Drag-and-drop evidence uploader with a simulated hashing / metadata pipeline.
 * onComplete({ file, hash }) fires once the mock pipeline finishes for a file.
 */
export default function FileUploader({ onComplete, evidenceId }) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [stage, setStage] = useState("idle"); // idle | hashing | done
  const [progress, setProgress] = useState(0);
  const [hash, setHash] = useState("");
  const inputRef = useRef(null);

  const startPipeline = useCallback(
    (chosenFile) => {
      setFile(chosenFile);
      setStage("hashing");
      setProgress(0);
      let p = 0;
      const timer = window.setInterval(() => {
        p += 18 + Math.random() * 12;
        if (p >= 100) {
          p = 100;
          window.clearInterval(timer);
          const generatedHash = simulateSha256(chosenFile.name + chosenFile.size);
          setHash(generatedHash);
          setStage("done");
          onComplete?.({ file: chosenFile, hash: generatedHash });
        }
        setProgress(Math.round(p));
      }, 220);
    },
    [onComplete]
  );

  const handleFiles = (files) => {
    if (!files || !files.length) return;
    startPipeline(files[0]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  if (stage === "idle") {
    return (
      <div
        className={`dropzone ${dragActive ? "drag-active" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
      >
        <div className="dropzone-icon">
          <UploadCloud size={22} />
        </div>
        <div className="font-semibold text-md">Upload Digital Evidence</div>
        <div className="text-sm text-muted">Drag &amp; drop files here, or</div>
        <button type="button" className="btn btn-secondary btn-sm" onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}>
          Browse Files
        </button>
        <div className="text-xs text-muted uppercase" style={{ marginTop: 6 }}>{ACCEPTED_HINT}</div>
        <input
          ref={inputRef}
          type="file"
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    );
  }

  return (
    <div className="upload-progress-item">
      <div className="flex items-center gap-10">
        {stage === "hashing" ? (
          <Loader2 size={18} className="spin" style={{ color: "var(--accent-blue)" }} />
        ) : (
          <CheckCircle2 size={18} style={{ color: "var(--status-green)" }} />
        )}
        <div className="grow" style={{ minWidth: 0 }}>
          <div className="font-semibold text-sm truncate">{file?.name}</div>
          <div className="text-xs text-muted">{(file?.size / 1024).toFixed(1)} KB</div>
        </div>
        {evidenceId && <span className="badge badge-blue">{evidenceId}</span>}
      </div>

      <div className="progress-track" style={{ marginTop: 4 }}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="upload-step-list">
        <div className={`upload-step ${progress > 0 ? "done" : ""}`}>
          <CheckCircle2 size={13} /> Evidence secured in encrypted storage
        </div>
        <div className={`upload-step ${stage === "done" ? "done" : ""}`}>
          <CheckCircle2 size={13} /> {stage === "done" ? "SHA-256 fingerprint generated" : "Generating SHA-256 fingerprint…"}
        </div>
        <div className={`upload-step ${stage === "done" ? "done" : ""}`}>
          <CheckCircle2 size={13} /> Metadata recorded
        </div>
      </div>

      {stage === "done" && (
        <div className="hash-value" style={{ marginTop: 4 }}>{hash}</div>
      )}

      {stage === "idle" === false && stage !== "done" && (
        <div className="flex items-center gap-6 text-xs text-muted" style={{ marginTop: 2 }}>
          <FileWarning size={12} /> Do not close this window while evidence is being secured.
        </div>
      )}
    </div>
  );
}
