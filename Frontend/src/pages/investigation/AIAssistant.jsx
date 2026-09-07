import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Bot, CheckCircle2, FileStack } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getCasesForUser } from "../../data/api";
import { AI_CASE_SOURCES, AI_QUICK_ACTIONS, AI_TIMELINE, getAIAnswer } from "../../data/mockData";
import AIChat from "../../components/domain/AIChat";
import AIQuickActions from "../../components/domain/AIQuickActions";

export default function AIAssistant() {
  const { user } = useAuth();
  const [params, setParams] = useSearchParams();
  const cases = getCasesForUser(user);

  const [caseId, setCaseId] = useState(params.get("case") || cases[0]?.id || "");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I'm your AI Investigation Assistant. I can summarize this case, extract key points, build a timeline, or answer questions about authorized case records. What would you like to know?",
      sources: [],
    },
  ]);
  const [typing, setTyping] = useState(false);

  const activeCase = cases.find((c) => c.id === caseId);

  const respondWith = (msg) => {
    setTyping(true);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, msg]);
      setTyping(false);
    }, 1000 + Math.random() * 500);
  };

  const handleSend = (text) => {
    setMessages((prev) => [...prev, { role: "user", text }]);
    const { answer, sources } = getAIAnswer(text);
    respondWith({ role: "assistant", text: answer, sources });
  };

  const handleQuickAction = (key) => {
    const action = AI_QUICK_ACTIONS[key];
    setMessages((prev) => [...prev, { role: "user", text: action.label }]);
    if (key === "timeline") {
      respondWith({ role: "assistant", text: "Here's the generated timeline for this case:", timeline: AI_TIMELINE, sources: action.sources });
    } else {
      respondWith({ role: "assistant", text: action.response, sources: action.sources });
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow flex items-center gap-6"><Bot size={13} /> AI Investigation Assistant — Decision Support</div>
          <h1 className="page-title">Ask AI About a Case</h1>
          <p className="page-desc">Retrieval-grounded assistant for case summaries, timelines and Q&amp;A over authorized case records.</p>
        </div>
        <div className="page-actions">
          <select className="select" style={{ width: 260 }} value={caseId} onChange={(e) => { setCaseId(e.target.value); setParams({ case: e.target.value }); }}>
            {cases.map((c) => <option key={c.id} value={c.id}>{c.id} — {c.title}</option>)}
          </select>
        </div>
      </div>

      <div className="grid-2">
        <div className="card" style={{ height: 640, display: "flex", flexDirection: "column" }}>
          <div className="card-pad" style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
            <AIChat messages={messages} typing={typing} onSend={handleSend} />
          </div>
        </div>

        <div className="flex-col gap-16">
          <div className="card card-pad">
            <div className="card-title" style={{ marginBottom: 10 }}>Case Sources</div>
            {activeCase && (
              <div className="text-xs text-muted font-mono" style={{ marginBottom: 10 }}>{activeCase.id}</div>
            )}
            <ul className="stack-y">
              {AI_CASE_SOURCES.map((s) => (
                <li key={s.key} className="flex items-center gap-8 text-sm">
                  <CheckCircle2 size={15} style={{ color: "var(--status-green)" }} />
                  {s.label}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-6 text-xs text-muted" style={{ marginTop: 12 }}>
              <FileStack size={13} /> Sources Used: 8 documents
            </div>
          </div>

          <div className="card card-pad">
            <div className="card-title" style={{ marginBottom: 10 }}>Quick Actions</div>
            <AIQuickActions actions={AI_QUICK_ACTIONS} onSelect={handleQuickAction} disabled={typing} />
          </div>
        </div>
      </div>
    </div>
  );
}
