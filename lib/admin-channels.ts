import { sql } from "./db";
import { CANALE as STATIC_CHANNELS, type Canal } from "./beacon-channels";

export type AdminChannel = Canal & {
  enabled: boolean;
  added_via_admin: boolean;
  source: "static" | "db";
};

// Returnează lista efectivă de canale folosită de beacon-scan
// Merge: static (din TS) + admin overrides (din DB)
// Static channels pot fi DEZACTIVATE prin entries DB cu enabled=FALSE
export async function getActiveChannels(): Promise<Canal[]> {
  const dbChannels = await sql`SELECT slug, channel_id, nume, focus, enabled FROM fishy_beacon.channels`;
  const overrides = new Map((dbChannels as Array<{ slug: string; channel_id: string; nume: string; focus: string | null; enabled: boolean }>).map((c) => [c.slug, c]));

  // Apply static + override flags
  const merged: Canal[] = [];
  for (const sc of STATIC_CHANNELS) {
    const override = overrides.get(sc.slug);
    if (override) {
      if (override.enabled) {
        merged.push({ slug: sc.slug, channelId: override.channel_id, nume: override.nume, focus: override.focus ?? sc.focus });
      }
    } else {
      merged.push(sc);
    }
  }

  // Add admin-only channels (not in static)
  for (const dc of dbChannels as Array<{ slug: string; channel_id: string; nume: string; focus: string | null; enabled: boolean }>) {
    if (!STATIC_CHANNELS.find((s) => s.slug === dc.slug) && dc.enabled) {
      merged.push({ slug: dc.slug, channelId: dc.channel_id, nume: dc.nume, focus: dc.focus ?? "" });
    }
  }
  return merged;
}

// Lista pentru UI: arată static + DB, cu sursa și starea
export async function listAllChannels(): Promise<AdminChannel[]> {
  const dbChannels = await sql`SELECT slug, channel_id, nume, focus, enabled, added_via_admin FROM fishy_beacon.channels`;
  const dbMap = new Map((dbChannels as Array<{ slug: string; channel_id: string; nume: string; focus: string | null; enabled: boolean; added_via_admin: boolean }>).map((c) => [c.slug, c]));

  const result: AdminChannel[] = [];
  for (const sc of STATIC_CHANNELS) {
    const override = dbMap.get(sc.slug);
    result.push({
      slug: sc.slug,
      channelId: sc.channelId,
      nume: sc.nume,
      focus: sc.focus,
      enabled: override ? override.enabled : true,
      added_via_admin: false,
      source: "static",
    });
  }
  for (const dc of dbChannels as Array<{ slug: string; channel_id: string; nume: string; focus: string | null; enabled: boolean; added_via_admin: boolean }>) {
    if (!STATIC_CHANNELS.find((s) => s.slug === dc.slug)) {
      result.push({
        slug: dc.slug,
        channelId: dc.channel_id,
        nume: dc.nume,
        focus: dc.focus ?? "",
        enabled: dc.enabled,
        added_via_admin: dc.added_via_admin,
        source: "db",
      });
    }
  }
  return result;
}

export async function toggleChannel(slug: string, enabled: boolean, fallbackData?: { channelId: string; nume: string; focus: string }): Promise<void> {
  const existing = await sql`SELECT id FROM fishy_beacon.channels WHERE slug = ${slug} LIMIT 1`;
  if (existing.length > 0) {
    await sql`UPDATE fishy_beacon.channels SET enabled = ${enabled} WHERE slug = ${slug}`;
  } else if (fallbackData) {
    await sql`INSERT INTO fishy_beacon.channels (slug, channel_id, nume, focus, enabled, added_via_admin)
              VALUES (${slug}, ${fallbackData.channelId}, ${fallbackData.nume}, ${fallbackData.focus}, ${enabled}, FALSE)`;
  }
}

export async function addChannel(slug: string, channelId: string, nume: string, focus: string): Promise<void> {
  await sql`
    INSERT INTO fishy_beacon.channels (slug, channel_id, nume, focus, enabled, added_via_admin)
    VALUES (${slug}, ${channelId}, ${nume}, ${focus}, TRUE, TRUE)
    ON CONFLICT (slug) DO UPDATE SET channel_id = EXCLUDED.channel_id, nume = EXCLUDED.nume, focus = EXCLUDED.focus, enabled = TRUE
  `;
}

export async function removeChannel(slug: string): Promise<boolean> {
  const rows = await sql`DELETE FROM fishy_beacon.channels WHERE slug = ${slug} RETURNING id`;
  return rows.length > 0;
}
