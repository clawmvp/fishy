"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminUser } from "@/lib/admin-users";

export default function UsersTable({ users }: { users: AdminUser[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState("");

  async function suspend(id: number, currentlySuspended: boolean) {
    await fetch(`/api/admin/users/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: currentlySuspended ? "unsuspend" : "suspend" }),
    });
    router.refresh();
  }

  async function del(id: number) {
    if (!confirm("Sigur ștergi utilizatorul? Va șterge și capturile, conversațiile, reacțiile.")) return;
    await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    router.refresh();
  }

  const filtered = filter ? users.filter((u) => `${u.name ?? ""} ${u.email} ${u.nickname ?? ""}`.toLowerCase().includes(filter.toLowerCase())) : users;

  return (
    <>
      <input
        type="search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Caută email, nume, nickname..."
        className="w-full max-w-md px-3 py-2 mb-4 bg-water-2/40 border border-amber-glow/20 rounded-md text-sm text-fog placeholder:text-fog/40 focus:outline-none focus:border-amber-glow/50"
      />

      <div className="space-y-2">
        {filtered.map((u) => (
          <article key={u.id} className="card rounded-lg p-3" style={{ opacity: u.suspended ? 0.5 : 1 }}>
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <div className="flex items-baseline gap-3 flex-1 min-w-0">
                {u.avatar_url && <img src={u.avatar_url} alt="" className="w-8 h-8 rounded-full flex-shrink-0" />}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-fog truncate">
                    {u.nickname || u.name || u.email.split("@")[0]}
                    {u.suspended && <span className="ml-2 text-xs text-red-400">SUSPENDAT</span>}
                  </p>
                  <p className="text-xs text-fog/55 truncate">{u.email}</p>
                  <p className="text-[10px] text-fog/45 mt-0.5">
                    {Number(u.catches_count)} capturi · {Number(u.conversations_count)} conversații
                    {u.last_login && ` · activ ${new Date(u.last_login).toLocaleDateString("ro-RO")}`}
                  </p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => suspend(u.id, u.suspended)}
                  className="text-xs px-2 py-1 rounded-md border border-amber-glow/20 hover:border-amber-glow/50 text-fog/75 hover:text-amber-glow transition-colors"
                >
                  {u.suspended ? "↺ activează" : "⏸ suspendă"}
                </button>
                <button
                  onClick={() => del(u.id)}
                  className="text-xs px-2 py-1 rounded-md border border-red-400/30 hover:border-red-400/60 text-red-400/80 hover:text-red-400 transition-colors"
                >
                  ✕ șterge
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
