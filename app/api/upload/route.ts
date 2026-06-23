import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getActiveSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Detectează tipul real din magic bytes (nu din MIME/extensie, care pot fi falsificate).
function detectImageExt(buf: Buffer): string | null {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return "png";
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38) return "gif";
  if (
    buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
    buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50
  )
    return "webp";
  return null;
}

export async function POST(req: NextRequest) {
  const user = await getActiveSession();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Storage not configured. Adaugă BLOB_READ_WRITE_TOKEN din Vercel Storage." },
      { status: 500 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "no file" }, { status: 400 });
  if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: "file > 8MB" }, { status: 400 });
  if (!file.type.startsWith("image/")) return NextResponse.json({ error: "not an image" }, { status: 400 });

  const buf = Buffer.from(await file.arrayBuffer());
  const ext = detectImageExt(buf);
  if (!ext) return NextResponse.json({ error: "fișier imagine invalid (doar jpg/png/webp/gif)" }, { status: 400 });

  try {
    const key = `catches/${user.id}/${Date.now()}.${ext}`;
    const blob = await put(key, buf, {
      access: "public",
      contentType: ext === "jpg" ? "image/jpeg" : `image/${ext}`,
    });
    return NextResponse.json({ url: blob.url });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
