import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const events = await prisma.event.findMany({
    where: { eventDate: { gte: new Date() } },
    include: {
      city: { select: { name: true, emoji: true } },
      rsvps: { select: { userId: true } },
    },
    orderBy: { eventDate: "asc" },
  });

  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { eventId } = await req.json();

  try {
    const existing = await prisma.eventRSVP.findUnique({
      where: { userId_eventId: { userId: session.user.id, eventId } },
    });

    if (existing) {
      await prisma.eventRSVP.delete({
        where: { userId_eventId: { userId: session.user.id, eventId } },
      });
      return NextResponse.json({ rsvped: false });
    }

    await prisma.eventRSVP.create({
      data: { userId: session.user.id, eventId },
    });
    return NextResponse.json({ rsvped: true });
  } catch {
    return NextResponse.json({ error: "RSVP failed" }, { status: 500 });
  }
}
