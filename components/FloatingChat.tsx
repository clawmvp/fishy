"use client";

import { useState, useEffect, useRef } from "react";

type Message = { role: "user" | "assistant"; content: string };
type Conv = { id: number; title: string | null; updated_at: string; message_count: number; preview: string };

const SUGGESTED = [
  "Ce să iau cu mine pe Sulina?",
  "Ce e săptămâna magică?",
  "Cum se face PVA?",
  "Unde se prinde șalău?",
];

function renderMarkdown(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-fog">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-amber-glow hover:text-amber-soft underline">$1</a>')
    .replace(/(\/(?:locuri|tehnici|monturi|articole|azi|harta|beacon|provizii|prognoza|specii|glosar)\/?[a-z0-9-]*)/g, '<a href="$1" class="text-amber-glow hover:text-amber-soft underline">$1</a>')
    .replace(/\n/g, "<br />");
}

import FishIcon from "./FishIcon";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"chat" | "history">("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [conversations, setConversations] = useState<Conv[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Persist conversationId in localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("fishy_conv_id");
    if (saved) setConversationId(parseInt(saved, 10));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (conversationId) localStorage.setItem("fishy_conv_id", String(conversationId));
  }, [conversationId]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, streaming]);

  useEffect(() => {
    if (open && view === "chat") setTimeout(() => inputRef.current?.focus(), 100);
  }, [open, view]);

  async function loadConversations() {
    setLoadingHistory(true);
    try {
      const resp = await fetch("/api/conversations");
      const data = await resp.json();
      if (data.conversations) setConversations(data.conversations);
    } catch { /* ignore */ }
    setLoadingHistory(false);
  }

  async function openConversation(id: number) {
    try {
      const resp = await fetch(`/api/conversations/${id}`);
      const data = await resp.json();
      if (Array.isArray(data.messages)) {
        setMessages(data.messages.map((m: { role: "user" | "assistant"; content: string }) => ({ role: m.role, content: m.content })));
        setConversationId(id);
        setView("chat");
      }
    } catch { /* ignore */ }
  }

  function startNew() {
    setMessages([]);
    setConversationId(null);
    if (typeof window !== "undefined") localStorage.removeItem("fishy_conv_id");
    setView("chat");
  }

  async function deleteConv(id: number, e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm("Ștergi conversația?")) return;
    await fetch(`/api/conversations/${id}`, { method: "DELETE" });
    setConversations(conversations.filter((c) => c.id !== id));
    if (conversationId === id) startNew();
  }

  async function send(text: string) {
    const userText = text.trim();
    if (!userText || streaming) return;
    const newMessages: Message[] = [...messages, { role: "user", content: userText }];
    setMessages([...newMessages, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, conversationId }),
      });
      if (!resp.body) throw new Error("no body");
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      let metaParsed = false;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        // Parse metadata prefix if present
        if (!metaParsed && chunk.startsWith("__META__")) {
          const endIdx = chunk.indexOf("__END__");
          if (endIdx !== -1) {
            try {
              const meta = JSON.parse(chunk.slice(8, endIdx));
              if (meta.conversationId) setConversationId(meta.conversationId);
              metaParsed = true;
              acc += chunk.slice(endIdx + 7);
            } catch { acc += chunk; }
          } else acc += chunk;
        } else acc += chunk;
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: acc };
          return next;
        });
      }
    } catch (e) {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: "assistant", content: `[Eroare: ${(e as Error).message}]` };
        return next;
      });
    }
    setStreaming(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  const empty = messages.length === 0;

  function timeAgo(iso: string): string {
    const d = new Date(iso);
    const min = Math.floor((Date.now() - d.getTime()) / 60000);
    if (min < 60) return `${min}min`;
    if (min < 1440) return `${Math.floor(min / 60)}h`;
    return `${Math.floor(min / 1440)}z`;
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Deschide chat fishy"
        className="fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full bg-amber-glow text-water shadow-xl hover:scale-110 hover:bg-amber-soft transition-all flex items-center justify-center"
        style={{ boxShadow: "0 4px 16px rgba(212,166,87,0.4)" }}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        ) : (
          <FishIcon size={32} />
        )}
        {!open && messages.length === 0 && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-moss border-2 border-water animate-pulse"></span>
        )}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-5 z-[59] w-[calc(100vw-2.5rem)] sm:w-[420px] h-[70vh] sm:h-[620px] max-h-[calc(100vh-7rem)] rounded-2xl flex flex-col overflow-hidden"
          style={{
            background: "rgba(13, 27, 30, 0.98)",
            border: "1px solid rgba(212,166,87,0.30)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          {/* Header */}
          <header className="flex items-center gap-2.5 px-3 py-2.5 border-b border-amber-glow/15">
            <span className="text-amber-glow"><FishIcon size={24} /></span>
            <div className="flex-1">
              <h3 className="text-sm font-display text-fog">fishy <span className="text-amber-glow">chat</span></h3>
              <p className="text-[10px] text-fog/55">{view === "history" ? "istoric" : "asistent Delta"}</p>
            </div>
            <div className="flex gap-1">
              {view === "chat" && (
                <>
                  <button
                    onClick={startNew}
                    title="Conversație nouă"
                    className="text-xs px-2 py-1 rounded-md border border-amber-glow/20 hover:border-amber-glow/50 text-fog/75 hover:text-amber-glow transition-colors"
                  >+ nou</button>
                  <button
                    onClick={() => { setView("history"); loadConversations(); }}
                    title="Istoric"
                    className="text-xs px-2 py-1 rounded-md border border-amber-glow/20 hover:border-amber-glow/50 text-fog/75 hover:text-amber-glow transition-colors"
                  >📜</button>
                </>
              )}
              {view === "history" && (
                <button
                  onClick={() => setView("chat")}
                  className="text-xs px-2 py-1 rounded-md border border-amber-glow/20 hover:border-amber-glow/50 text-fog/75 hover:text-amber-glow transition-colors"
                >← chat</button>
              )}
            </div>
          </header>

          {view === "history" ? (
            <div className="flex-1 overflow-y-auto p-3">
              {loadingHistory ? (
                <p className="text-xs text-fog/55 text-center">Se încarcă...</p>
              ) : conversations.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="text-fog/65 text-sm mb-2">Niciun istoric salvat încă.</p>
                  <p className="text-xs text-fog/50 max-w-xs">Conversațiile se salvează automat dacă ești logat. <a href="/login" className="text-amber-glow">Loghează-te</a> ca să le salvezi.</p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {conversations.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => openConversation(c.id)}
                      className={`w-full text-left p-2.5 rounded-md border transition-colors ${
                        conversationId === c.id
                          ? "border-amber-glow/50 bg-amber-glow/10"
                          : "border-amber-glow/15 hover:border-amber-glow/40 bg-water-2/20"
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2 mb-0.5">
                        <span className="text-xs font-medium text-fog truncate flex-1">{c.title ?? "Conversație"}</span>
                        <span className="text-[10px] text-fog/45 flex-shrink-0">{timeAgo(c.updated_at)}</span>
                      </div>
                      <p className="text-[11px] text-fog/55 line-clamp-2">{c.preview?.slice(0, 100) ?? ""}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] text-fog/40">{c.message_count} mesaje</span>
                        <span
                          onClick={(e) => deleteConv(c.id, e)}
                          className="text-[10px] text-fog/40 hover:text-red-400 cursor-pointer"
                        >✕ șterge</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3">
                {empty ? (
                  <div className="h-full flex flex-col items-center justify-center text-center px-2">
                    <div className="text-amber-glow mb-3"><FishIcon size={56} /></div>
                    <h4 className="text-base font-display text-fog mb-1">Salut! Sunt fishy.</h4>
                    <p className="text-xs text-fog/65 max-w-xs mb-4 leading-relaxed">
                      Întreabă-mă orice despre pescuit în Delta Dunării.
                    </p>
                    <div className="grid grid-cols-1 gap-1.5 w-full max-w-xs">
                      {SUGGESTED.map((s) => (
                        <button
                          key={s}
                          onClick={() => send(s)}
                          className="text-xs text-left px-2.5 py-1.5 rounded-md border border-amber-glow/20 hover:border-amber-glow/50 hover:bg-water-2/40 text-fog/85 transition-colors"
                        >
                          💬 {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {messages.map((m, i) => (
                      <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[88%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                            m.role === "user"
                              ? "bg-amber-glow/15 border border-amber-glow/30 text-fog"
                              : "bg-water-2/40 border border-amber-glow/10 text-fog/90"
                          }`}
                        >
                          {m.role === "assistant" && i === messages.length - 1 && streaming && !m.content && (
                            <span className="text-fog/55">
                              <span className="inline-block animate-pulse">●</span>
                              <span className="inline-block animate-pulse" style={{ animationDelay: "0.2s" }}>●</span>
                              <span className="inline-block animate-pulse" style={{ animationDelay: "0.4s" }}>●</span>
                            </span>
                          )}
                          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-amber-glow/15 p-2.5">
                <div className="flex gap-1.5">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Întreabă fishy..."
                    rows={1}
                    disabled={streaming}
                    className="flex-1 bg-water-2/40 border border-amber-glow/20 rounded-md px-2.5 py-1.5 text-sm text-fog placeholder:text-fog/40 focus:outline-none focus:border-amber-glow/50 resize-none"
                    style={{ maxHeight: 100 }}
                  />
                  <button
                    onClick={() => send(input)}
                    disabled={streaming || !input.trim()}
                    className="px-3 py-1.5 rounded-md bg-amber-glow/15 hover:bg-amber-glow/25 border border-amber-glow/40 text-amber-glow font-medium transition-colors disabled:opacity-40"
                  >
                    {streaming ? "..." : "→"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
