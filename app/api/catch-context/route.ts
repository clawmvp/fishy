import { NextRequest, NextResponse } from "next/server";
import { getConditionsForDate } from "@/lib/historical-conditions";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "date YYYY-MM-DD required" }, { status: 400 });
  }
  const conditions = await getConditionsForDate(date);
  return NextResponse.json(conditions);
}
