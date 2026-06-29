import Link from "next/link";
import { listFeedback } from "@/lib/feedback";
import FeedbackStatusButton from "@/components/FeedbackStatusButton";

export const dynamic = "force-dynamic";

type CtxMsg = { role: string; content: string };

export default async function AdminFeedbackPage() {
  const items = await listFeedback(200);

  return (
    <div>
      <header className="mb-6">
        <Link href="/admin" className="text-sm text-moss hover:text-amber-glow">← dashboard</Link>
        <h1 className="text-3xl font-display text-fog mt-3 mb-1">📣 Feedback</h1>
        <p className="text-fog/65 text-sm">{items.length} mesaje · {items.filter((f) => f.status !== "done").length} noi</p>
      </header>

      {items.length === 0 ? (
        <div className="card rounded-xl p-8 text-center">
          <p className="text-fog/70">Niciun feedback încă. Apare aici când userii trimit din chat (📣).</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((f) => {
            const ctx = Array.isArray(f.context) ? (f.context as CtxMsg[]) : null;
            const who = f.user_nickname || f.user_name || (f.email ? f.email : "anonim");
            return (
              <article key={f.id} className={`card rounded-xl p-4 ${f.status !== "done" ? "border-amber-glow/40" : ""}`}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <p className="text-sm text-fog/55">
                      <span className="text-fog">{who}</span>
                      {f.email && f.email !== who && <span className="text-fog/40"> · {f.email}</span>}
                      {" · "}
                      {new Date(f.created_at).toLocaleString("ro-RO", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                      {f.page && <span className="text-fog/40"> · {f.page}</span>}
                    </p>
                  </div>
                  <FeedbackStatusButton id={f.id} status={f.status} />
                </div>

                <p className="text-fog/90 leading-relaxed whitespace-pre-wrap">{f.message}</p>

                {ctx && ctx.length > 0 && (
                  <details className="mt-3">
                    <summary className="text-xs text-moss cursor-pointer hover:text-amber-glow">context chat ({ctx.length} mesaje)</summary>
                    <div className="mt-2 space-y-1.5 border-l-2 border-amber-glow/15 pl-3">
                      {ctx.map((m, i) => (
                        <p key={i} className="text-xs text-fog/60">
                          <span className={m.role === "user" ? "text-amber-glow" : "text-moss"}>{m.role === "user" ? "user" : "fishy"}:</span>{" "}
                          {m.content.slice(0, 300)}
                        </p>
                      ))}
                    </div>
                  </details>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
