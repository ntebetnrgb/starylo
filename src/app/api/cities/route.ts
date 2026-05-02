import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cities = await prisma.city.findMany({
    include: {
      spots: { orderBy: { isHidden: "asc" } },
      guides: {
        include: { user: { select: { name: true, image: true } } },
        where: { verified: true },
      },
      _count: { select: { trips: true, events: true } },
    },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(cities);
}
