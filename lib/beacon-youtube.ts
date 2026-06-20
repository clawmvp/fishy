// Listează videoclipuri recente de pe un canal YouTube prin RSS feed (fără API key)

import { Canal, esteRelevantDelta } from "./beacon-channels";

export type YoutubeVideoInfo = {
  videoId: string;
  title: string;
  description: string;
  uploadDate: string; // YYYY-MM-DD
  isShort: boolean;
};

async function fetchChannelRSS(channelId: string): Promise<YoutubeVideoInfo[]> {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const resp = await fetch(url, { next: { revalidate: 0 } });
  if (!resp.ok) return [];
  const xml = await resp.text();

  const entries = xml.split("<entry>").slice(1);
  return entries.map((e) => {
    const videoId = (e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1] ?? "";
    const title = (e.match(/<title>([^<]+)<\/title>/) || [])[1] ?? "";
    const description = (e.match(/<media:description>([^<]*)<\/media:description>/) || [])[1] ?? "";
    const published = (e.match(/<published>([^<]+)<\/published>/) || [])[1] ?? "";
    const uploadDate = published.slice(0, 10);
    return {
      videoId,
      title: decodeHtml(title),
      description: decodeHtml(description),
      uploadDate,
      isShort: false, // RSS nu indică; ignored pentru moment
    };
  }).filter((v) => v.videoId);
}

function decodeHtml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
}

export async function videosRecente(canal: Canal, ziCutOff: number = 14): Promise<YoutubeVideoInfo[]> {
  const videos = await fetchChannelRSS(canal.channelId);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - ziCutOff);
  return videos.filter((v) => {
    if (!v.uploadDate || new Date(v.uploadDate) < cutoff) return false;
    return esteRelevantDelta(v.title, v.description);
  });
}

// Variantă fără filtru de keyword — pentru seed inițial / debug
export async function videosRecenteToate(canal: Canal, ziCutOff: number = 14): Promise<YoutubeVideoInfo[]> {
  const videos = await fetchChannelRSS(canal.channelId);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - ziCutOff);
  return videos.filter((v) => v.uploadDate && new Date(v.uploadDate) >= cutoff);
}
