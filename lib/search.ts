import { specii } from "@/data/specii";
import { glosar } from "@/data/glosar";
import { articole } from "@/data/articole";
import { getAllLocuri, getAllTehnici, getAllMonturi } from "@/lib/data-combined";

export type SearchResult = {
  type: "specie" | "loc" | "tehnica" | "montura" | "articol" | "termen";
  label: string;
  title: string;
  desc: string;
  href: string;
};

const TYPE_LABEL: Record<SearchResult["type"], string> = {
  specie: "Specie",
  loc: "Loc",
  tehnica: "Tehnică",
  montura: "Montură",
  articol: "Articol",
  termen: "Glosar",
};

// Normalizare diacritic-insensitive (caut "stiuca" găsește "știucă").
function norm(s: string): string {
  return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export async function search(q: string): Promise<SearchResult[]> {
  const nq = norm(q).trim();
  if (nq.length < 2) return [];
  const terms = nq.split(/\s+/).filter(Boolean);
  const match = (text: string) => {
    const t = norm(text);
    return terms.every((term) => t.includes(term));
  };

  const out: SearchResult[] = [];

  for (const s of specii) {
    if (match(`${s.nume} ${s.latin} ${s.descriere ?? ""} ${s.sezonScurt ?? ""}`))
      out.push({ type: "specie", label: TYPE_LABEL.specie, title: s.nume, desc: s.latin, href: `/specii/${s.id}` });
  }

  const [locuri, tehnici, monturi] = await Promise.all([
    getAllLocuri(),
    getAllTehnici(),
    getAllMonturi(),
  ]);

  for (const l of locuri) {
    if (match(`${l.nume} ${l.scurt} ${(l.specii ?? []).join(" ")}`))
      out.push({ type: "loc", label: TYPE_LABEL.loc, title: l.nume, desc: l.scurt, href: `/locuri/${l.slug}` });
  }
  for (const t of tehnici) {
    if (match(`${t.titlu} ${t.scurt} ${t.specie}`))
      out.push({ type: "tehnica", label: TYPE_LABEL.tehnica, title: t.titlu, desc: t.scurt, href: `/tehnici/${t.slug}` });
  }
  for (const m of monturi) {
    if (match(`${m.nume} ${m.scop ?? ""}`))
      out.push({ type: "montura", label: TYPE_LABEL.montura, title: m.nume, desc: m.scop ?? "", href: `/monturi/${m.slug}` });
  }
  for (const a of articole) {
    if (match(`${a.titlu} ${a.scurt} ${(a.tags ?? []).join(" ")}`))
      out.push({ type: "articol", label: TYPE_LABEL.articol, title: a.titlu, desc: a.scurt, href: `/articole/${a.slug}` });
  }
  for (const g of glosar) {
    if (match(`${g.termen} ${g.definitie}`))
      out.push({ type: "termen", label: TYPE_LABEL.termen, title: g.termen, desc: g.definitie, href: `/glosar` });
  }

  return out;
}
