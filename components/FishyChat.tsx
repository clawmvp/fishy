"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTED = [
  "Ce să iau cu mine sâmbătă pe Sulina, vreau crap?",
  "Cea mai bună perioadă pentru somn?",
  "Cum se face PVA cu plumb greu?",
  "Unde se prinde șalău în Delta?",
  "Ce e săptămâna magică?",
];

function renderMarkdown(text: string): string {
  // Minimal markdown: bold, links, italic
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

export default function FishyChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streaming]);

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
    inputRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  const empty = messages.length === 0;

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] min-h-[400px]">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto card rounded-xl p-4 mb-3">
        {empty ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="text-5xl mb-3">🎣</div>
            <h2 className="text-2xl font-display text-amber-glow mb-2">Salut! Sunt fishy.</h2>
            <p className="text-fog/75 max-w-md mb-6 leading-relaxed">
              Asistentul tău pentru pescuit în Delta Dunării. Întreabă-mă despre locuri, tehnici, monturi, ferestre meteo, sau ce să iei la o partidă concretă.
            </p>
            <div className="grid sm:grid-cols-2 gap-2 w-full max-w-xl">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-sm text-left px-3 py-2 rounded-md border border-amber-glow/20 hover:border-amber-glow/50 hover:bg-water-2/40 text-fog/85 transition-colors"
                >
                  💬 {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
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
      <div className="card rounded-xl p-3">
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Întreabă-mă despre pescuit Delta..."
            rows={1}
            disabled={streaming}
            className="flex-1 bg-water-2/40 border border-amber-glow/20 rounded-md px-3 py-2 text-sm text-fog placeholder:text-fog/40 focus:outline-none focus:border-amber-glow/50 resize-none"
            style={{ maxHeight: 120 }}
          />
          <button
            onClick={() => send(input)}
            disabled={streaming || !input.trim()}
            className="px-4 py-2 rounded-md bg-amber-glow/15 hover:bg-amber-glow/25 border border-amber-glow/40 text-amber-glow font-medium transition-colors disabled:opacity-40"
          >
            {streaming ? "..." : "→"}
          </button>
        </div>
        <p className="text-[10px] text-fog/40 mt-1.5 text-center">
          fishy poate să greșească · pentru date live verifică <a href="/azi" className="text-amber-glow">/azi</a> și <a href="/beacon" className="text-amber-glow">/beacon</a>
        </p>
      </div>
    </div>
  );
}
