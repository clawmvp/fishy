// Listează videoclipuri recente de pe un canal YouTube prin RSS feed (fără API key, fără yt-dlp).
// Cron-ul de pe Vercel rulează cu Node runtime — fetch nativ.

import { Canal, esteRelevantDelta } from "./beacon-channels";

export type YoutubeVideoInfo = {
  videoId: string;
  title: string;
  description: string;
  uploadDate: string; // YYYY-MM-DD
  isShort: boolean;
};

// Rezoluție channelId de la handle prin pagina /@handle
async function resolveChannelId(handle: string): Promise<string | null> {
  try {
    const resp = await fetch(`https://www.youtube.com/@${handle}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const html = await resp.text();
    const m = html.match(/"channelId":"(UC[a-zA-Z0-9_-]{22})"/);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

// RSS feed YouTube (gratuit, fără API key) — ultimele ~15 uploads
async function fetchChannelRSS(channelId: string): Promise<YoutubeVideoInfo[]> {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const resp = await fetch(url, { next: { revalidate: 0 } });
  if (!resp.ok) return [];
  const xml = await resp.text();

  const entries = xml.split("<entry>").slice(1);
  return entries.map((e) => {
    const videoId = (e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1] ?? "";
    const title = (e.match(/<title>([^<]+)<\/title>/) || [])[1] ?? "";
    const description = (e.match(/<media:description>([^<]+)<\/media:description>/) || [])[1] ?? "";
    const published = (e.match(/<published>([^<]+)<\/published>/) || [])[1] ?? "";
    const uploadDate = published.slice(0, 10); // YYYY-MM-DD
    return {
      videoId,
      title: decodeHtml(title),
      description: decodeHtml(description),
      uploadDate,
      isShort: false, // RSS nu zice; se poate detecta după durată în /watch?v=
    };
  }).filter((v) => v.videoId);
}

function decodeHtml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

export async function videosRecente(canal: Canal, ziCutOff: number = 7): Promise<YoutubeVideoInfo[]> {
  const channelId = await resolveChannelId(canal.handle);
  if (!channelId) return [];
  const videos = await fetchChannelRSS(channelId);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - ziCutOff);
  return videos.filter((v) => {
    if (new Date(v.uploadDate) < cutoff) return false;
    return esteRelevantDelta(v.title, v.description);
  });
}
