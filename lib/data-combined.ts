// Combined data sources: static TS + accepted insights din DB
// Folosit de paginile /locuri, /tehnici, /monturi pentru integrare instantă a propunerilor

import { locuri as locuriStatic } from "@/data/locuri";
import { tehnici as tehniciStatic } from "@/data/tehnici";
import { monturi as monturiStatic } from "@/data/monturi";
import { echipament as echipamentStatic } from "@/data/echipament";
import type { Loc } from "@/data/locuri";
import type { Tehnica } from "@/data/tehnici";
import type { Montura } from "@/data/monturi";
import type { Item as Echipament } from "@/data/echipament";
import { sql } from "./db";

type AcceptedRow = {
  id: number;
  payload: Record<string, unknown>;
  source_video_id: string;
};

async function getAccepted(type: "loc" | "tehnica" | "montura" | "echipament"): Promise<AcceptedRow[]> {
  try {
    const rows = await sql`
      SELECT id, payload, source_video_id
      FROM fishy_beacon.insights_pending
      WHERE status = 'accepted' AND type = ${type}
    `;
    return rows as AcceptedRow[];
  } catch {
    return [];
  }
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/ă/g, "a").replace(/â/g, "a").replace(/î/g, "i").replace(/ș/g, "s").replace(/ț/g, "t")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function uniqueSlug(base: string, existing: Set<string>): string {
  let s = base || "auto";
  let i = 2;
  while (existing.has(s)) { s = `${base}-${i++}`; }
  return s;
}

export async function getAllLocuri(): Promise<Loc[]> {
  const accepted = await getAccepted("loc");
  const existingSlugs = new Set(locuriStatic.map((l) => l.slug));
  const mapped = accepted.map((row) => {
    const p = row.payload;
    const slugBase = (p.slug as string) || slugify((p.nume as string) || `loc-${row.id}`);
    const slug = uniqueSlug(slugBase, existingSlugs);
    existingSlugs.add(slug);
    const tip = (p.tip as Loc["tip"]) || "canal";
    return {
      slug,
      nume: (p.nume as string) || "Loc fără nume",
      tip,
      regiune: (p.regiune as Loc["regiune"]) || "delta",
      scurt: (p.scurt as string) || "",
      sezon: Array.isArray(p.sezon) ? (p.sezon as string[]) : [],
      specii: Array.isArray(p.specii) ? (p.specii as Loc["specii"]) : [],
      caracteristici: Array.isArray(p.caracteristici) ? (p.caracteristici as string[]) : [],
      pericole: Array.isArray(p.pericole) ? (p.pericole as string[]) : [],
      sfaturi: Array.isArray(p.sfaturi) ? (p.sfaturi as string[]) : [],
      sursa: [row.source_video_id],
      adapostitDeVant: p.adapostitDeVant as boolean | undefined,
      preferaCotaMica: p.preferaCotaMica as boolean | undefined,
      preferaCotaMare: p.preferaCotaMare as boolean | undefined,
    } as Loc;
  });
  return [...locuriStatic, ...mapped];
}

export async function getAllTehnici(): Promise<Tehnica[]> {
  const accepted = await getAccepted("tehnica");
  const existingSlugs = new Set(tehniciStatic.map((t) => t.slug));
  const mapped = accepted.map((row) => {
    const p = row.payload;
    const titluOrNume = (p.titlu as string) || (p.nume as string) || `Tehnică #${row.id}`;
    const slugBase = (p.slug as string) || slugify(titluOrNume);
    const slug = uniqueSlug(slugBase, existingSlugs);
    existingSlugs.add(slug);
    return {
      slug,
      specie: (p.specie as Tehnica["specie"]) || "crap",
      metoda: (p.metoda as Tehnica["metoda"]) || "static",
      titlu: titluOrNume,
      scurt: (p.scurt as string) || "",
      perioada: (p.perioada as string) || "",
      pasi: Array.isArray(p.pasi) ? (p.pasi as string[]) : [],
      naluci: Array.isArray(p.naluci) ? (p.naluci as string[]) : undefined,
      echipament: Array.isArray(p.echipament) ? (p.echipament as string[]) : [],
      monturi: Array.isArray(p.monturi) ? (p.monturi as string[]) : [],
      sfaturi: Array.isArray(p.sfaturi) ? (p.sfaturi as string[]) : [],
    } as Tehnica;
  });
  return [...tehniciStatic, ...mapped];
}

export async function getAllMonturi(): Promise<Montura[]> {
  const accepted = await getAccepted("montura");
  const existingSlugs = new Set(monturiStatic.map((m) => m.slug));
  const mapped = accepted.map((row) => {
    const p = row.payload;
    const nume = (p.nume as string) || `Montură #${row.id}`;
    const slugBase = (p.slug as string) || slugify(nume);
    const slug = uniqueSlug(slugBase, existingSlugs);
    existingSlugs.add(slug);
    const specie = (p.specie as string) || "crap";
    return {
      slug,
      nume,
      pentru: Array.isArray(p.pentru) ? (p.pentru as Montura["pentru"]) : ([specie] as Montura["pentru"]),
      metoda: (p.metoda as Montura["metoda"]) || "static",
      scop: (p.scop as string) || (p.scurt as string) || "",
      cand: (p.cand as string) || "",
      luni: Array.isArray(p.luni) ? (p.luni as number[]) : [],
      components: Array.isArray(p.components)
        ? (p.components as Array<{ item: string; spec: string; nota?: string }>)
        : [],
      diagrama: (p.diagrama as string) || "",
      pasi: Array.isArray(p.pasi) ? (p.pasi as string[]) : [],
      sfaturi: Array.isArray(p.sfaturi) ? (p.sfaturi as string[]) : [],
      surse: [row.source_video_id],
    } as Montura;
  });
  return [...monturiStatic, ...mapped];
}

export async function getAllEchipament(): Promise<Echipament[]> {
  const accepted = await getAccepted("echipament");
  const mapped = accepted.map((row) => {
    const p = row.payload;
    return {
      nume: (p.nume as string) || "Item fără nume",
      marca: (p.marca as string) ?? undefined,
      specific: (p.specific as string) ?? undefined,
      pret: (p.pret as string) ?? undefined,
      prioritate: (p.prioritate as Echipament["prioritate"]) || "nice",
      pentru: Array.isArray(p.pentru) ? (p.pentru as Echipament["pentru"]) : [],
      categoria: (p.categoria as Echipament["categoria"]) || "accesorii",
      note: (p.note as string) ?? undefined,
    } as Echipament;
  });
  return [...echipamentStatic, ...mapped];
}

export async function getLocBySlug(slug: string): Promise<Loc | null> {
  const all = await getAllLocuri();
  return all.find((l) => l.slug === slug) ?? null;
}

export async function getTehnicaBySlug(slug: string): Promise<Tehnica | null> {
  const all = await getAllTehnici();
  return all.find((t) => t.slug === slug) ?? null;
}

export async function getMonturaBySlug(slug: string): Promise<Montura | null> {
  const all = await getAllMonturi();
  return all.find((m) => m.slug === slug) ?? null;
}
