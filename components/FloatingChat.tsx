"use client";

import { useState, useEffect, useRef } from "react";

type Message = { role: "user" | "assistant"; content: string };

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

function FishIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 20 Q12 8 26 8 Q44 8 52 14 L60 20 L52 26 Q44 32 26 32 Q12 32 5 20 Z"
        fill="currentColor"
      />
      {/* Coada */}
      <path d="M52 14 L62 6 L60 20 L62 34 L52 26 Z" fill="currentColor" opacity="0.85" />
      {/* Ochi */}
      <circle cx="20" cy="18" r="3" fill="white" />
      <circle cx="20.5" cy="17.5" r="1.5" fill="#0d1b1e" />
      {/* Zambet */}
      <path d="M14 23 Q18 27 22 24" stroke="#0d1b1e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Aripa */}
      <path d="M30 13 L36 17 L30 21 Z" fill="currentColor" opacity="0.6" />
      {/* Bula */}
      <circle cx="56" cy="11" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, streaming]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

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
        body: JSON.stringify({ messages: newMessages }),
      });
      if (!resp.body) throw new Error("no body");
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
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

  return (
    <>
      {/* Floating button */}
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

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-5 z-[59] w-[calc(100vw-2.5rem)] sm:w-[400px] h-[70vh] sm:h-[600px] max-h-[calc(100vh-7rem)] rounded-2xl flex flex-col overflow-hidden"
          style={{
            background: "rgba(13, 27, 30, 0.98)",
            border: "1px solid rgba(212,166,87,0.30)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          {/* Header */}
          <header className="flex items-center gap-2.5 px-4 py-3 border-b border-amber-glow/15">
            <span className="text-amber-glow"><FishIcon size={24} /></span>
            <div>
              <h3 className="text-sm font-display text-fog">fishy <span className="text-amber-glow">chat</span></h3>
              <p className="text-[10px] text-fog/55">asistent Delta Dunării</p>
            </div>
          </header>

          {/* Messages */}
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

          {/* Input */}
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
        </div>
      )}
    </>
  );
}
