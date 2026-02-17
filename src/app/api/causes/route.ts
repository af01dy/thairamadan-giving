import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category");

  const where: any = { isActive: true };
  if (category && category !== "All") where.category = category;

  const causes = await prisma.cause.findMany({
    where,
    select: {
      id: true,
      title: true,
      description: true,
      infoUrl: true,
      bankName: true,   // ✅ add
      bank: true,
      category: true,
      tags: true,
      imgUrl: true,
    },
  });

  // Shuffle (Fisher–Yates)
  for (let i = causes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [causes[i], causes[j]] = [causes[j], causes[i]];
  }

  const res = NextResponse.json({ causes });
  res.headers.set("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
  return res;
}