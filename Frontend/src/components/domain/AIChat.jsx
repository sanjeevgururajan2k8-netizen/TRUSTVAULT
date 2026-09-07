import { useEffect, useRef, useState } from "react";
import { Bot, Send, FileText, Info } from "lucide-react";
import UserAvatar from "../ui/UserAvatar";
import { useAuth } from "../../context/AuthContext";

export default function AIChat({ messages, typing, onSend }) {
  const [value, setValue] = useState("");
  const endRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing]);

  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <div className="ai-chat-shell">
      <div className="ai-disclaimer" style={{ marginBottom: 16 }}>
        <Info size={15} style={{ flexShrink: 0, marginTop: 1 }} />
        <span>
          <b>AI Investigation Assistant — Decision Support.</b> AI-generated summaries are provided for investigative
          assistance and should always be verified against original case records before making decisions.
        </span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", paddingRight: 2 }}>
        {messages.map((m, i) => (
          <div className={`ai-msg-row ${m.role}`} key={i}>
            {m.role === "assistant" ? (
              <div className="ai-avatar">
                <Bot size={15} />
              </div>
            ) : (
              <div className="ai-avatar user-avatar">
                <UserAvatar name={user?.name} size="sm" />
              </div>
            )}
            <div className={`ai-bubble ${m.role}`}>
              {m.text}
              {m.timeline && (
                <div className="stack-y" style={{ marginTop: 10 }}>
                  {m.timeline.map((t, ti) => (
                    <div key={ti} className="flex gap-10">
                      <span className="badge badge-blue" style={{ flexShrink: 0, minWidth: 52, justifyContent: "center" }}>{t.date}</span>
                      <div>
                        <div className="font-semibold text-sm">{t.label}</div>
                        <div className="text-xs" style={{ opacity: 0.85 }}>{t.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {m.sources?.length > 0 && (
                <div className="ai-sources">
                  <span className="text-xs font-semibold text-muted">Sources</span>
                  {m.sources.map((s, si) => (
                    <span className="ai-source-chip" key={si}>
                      <FileText size={11} /> {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {typing && (
          <div className="ai-msg-row assistant">
            <div className="ai-avatar">
              <Bot size={15} />
            </div>
            <div className="ai-bubble assistant">
              <div className="ai-typing">
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form className="ai-composer" onSubmit={submit}>
        <input
          className="input"
          placeholder="Ask a question about this case…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Ask the AI Investigation Assistant"
        />
        <button className="btn btn-accent" type="submit" disabled={!value.trim()}>
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
