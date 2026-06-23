import Link from "next/link";
import { listUsers } from "@/lib/admin-users";
import UsersTable from "@/components/UsersTable";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await listUsers(200);

  return (
    <div>
      <nav className="flex flex-wrap gap-2 mb-6">
        <Link href="/admin" className="text-xs uppercase tracking-widest text-fog/70 hover:text-amber-glow border border-amber-glow/15 hover:border-amber-glow/40 rounded-md px-3 py-1.5 transition-colors">← dashboard</Link>
      </nav>

      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-2">admin · useri</p>
        <h1 className="text-3xl font-display text-fog">Lista useri ({users.length})</h1>
        <p className="text-sm text-fog/65 mt-1">Suspendă temporar sau șterge utilizatori. Ștergerea = cascade (capturi + conversații + reacții).</p>
      </header>

      <UsersTable users={users} />
    </div>
  );
}
