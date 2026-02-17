import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const rows = await prisma.cause.findMany({
    where: { isActive: true },
    select: { category: true },
  });

  const uniq = Array.from(new Set(rows.map((r) => r.category))).sort();

  const res = NextResponse.json({ categories: ["All", ...uniq] });
  res.headers.set("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
  return res;
}
