export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: guideId } = await params;
  const { date, hours, message } = await req.json();

  const guide = await prisma.guide.findUnique({ where: { id: guideId } });
  if (!guide) return NextResponse.json({ error: "Guide not found" }, { status: 404 });

  const total = guide.hourlyRate * (hours ?? 3);

  const booking = await prisma.booking.create({
    data: {
      userId: session.user.id,
      guideId,
      date: new Date(date),
      hours: hours ?? 3,
      message,
      total,
      status: "pending",
    },
  });

  return NextResponse.json(booking, { status: 201 });
}
