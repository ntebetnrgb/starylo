export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const skip = parseInt(searchParams.get("skip") ?? "0");
  const budget = searchParams.get("budget");

  const where = {
    isActive: true,
    ...(budget ? { budget } : {}),
  };

  const [trips, total] = await Promise.all([
    prisma.trip.findMany({
      where,
      take: limit,
      skip,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, name: true, image: true } },
        city: { select: { id: true, name: true, emoji: true, country: true } },
        styles: { include: { travelStyle: true } },
      },
    }),
    prisma.trip.count({ where }),
  ]);

  return NextResponse.json({ trips, total });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { destination, fromDate, toDate, budget, styles, spotsTotal, description } = body;

    if (!destination || !fromDate || !toDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // SQLite doesn't support insensitive mode; use basic contains
    const city = await prisma.city.findFirst({
      where: { name: { contains: destination } },
    });

    const styleIds: { travelStyleId: string }[] = [];
    if (styles?.length) {
      for (const name of styles as string[]) {
        const ts = await prisma.travelStyle.findUnique({ where: { name } });
        if (ts) styleIds.push({ travelStyleId: ts.id });
      }
    }

    const trip = await prisma.trip.create({
      data: {
        userId: session.user.id,
        destination,
        description,
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        budget: budget ?? "mid-range",
        spotsTotal: spotsTotal ?? 4,
        cityId: city?.id,
        styles: styleIds.length ? { create: styleIds } : undefined,
      },
      include: {
        user: { select: { id: true, name: true, image: true } },
        city: { select: { id: true, name: true, emoji: true, country: true } },
        styles: { include: { travelStyle: true } },
      },
    });

    return NextResponse.json(trip, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create trip" }, { status: 500 });
  }
}
