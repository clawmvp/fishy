import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { getCatch } from "@/lib/catches";
import { getAllLocuri } from "@/lib/data-combined";
import EditCatchForm from "@/components/EditCatchForm";

export const dynamic = "force-dynamic";

export default async function EditCatchPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getSession();
  if (!user) redirect("/login");

  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  const c = await getCatch(user.id, id);
  if (!c) notFound();

  const locuri = await getAllLocuri();
  const locuriDelta = locuri
    .filter((l) => (l.regiune ?? "delta") === "delta")
    .map((l) => ({ slug: l.slug, nume: l.nume }));

  return (
    <div className="max-w-2xl">
      <Link href={`/capturi/${c.id}`} className="text-sm text-moss hover:text-amber-glow">← înapoi la captură</Link>
      <header className="mt-4 mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-2">editează</p>
        <h1 className="text-3xl font-display text-fog">Editează captura</h1>
      </header>
      <EditCatchForm c={c} locuri={locuriDelta} />
    </div>
  );
}
