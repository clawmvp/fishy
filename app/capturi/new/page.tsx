import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getAllLocuri } from "@/lib/data-combined";
import NewCatchForm from "@/components/NewCatchForm";

export const dynamic = "force-dynamic";

export default async function NewCatchPage() {
  const user = await getSession();
  if (!user) redirect("/login");

  const locuri = await getAllLocuri();
  const locuriDelta = locuri
    .filter((l) => (l.regiune ?? "delta") === "delta")
    .map((l) => ({ slug: l.slug, nume: l.nume }));

  return (
    <div className="max-w-2xl">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-2">+ captură</p>
        <h1 className="text-3xl font-display text-fog mb-2">Adaugă o captură</h1>
        <p className="text-sm text-fog/70">Mărimea, locul, nada. Doar tu poți vedea — privat.</p>
      </header>

      <NewCatchForm locuri={locuriDelta} />
    </div>
  );
}
