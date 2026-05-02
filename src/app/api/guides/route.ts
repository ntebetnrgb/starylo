import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const citySlug = searchParams.get("city");

  const guides = await prisma.guide.findMany({
    where: {
      verified: true,
      ...(citySlug ? { city: { slug: citySlug } } : {}),
    },
    include: {
      user: { select: { id: true, name: true, image: true } },
      city: { select: { id: true, name: true, emoji: true, country: true } },
      reviews: {
        take: 3,
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true, image: true } } },
      },
    },
    orderBy: { rating: "desc" },
  });

  return NextResponse.json(guides);
}
