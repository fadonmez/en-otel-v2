import { db } from '@/lib/db';
import console from 'console';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import * as z from 'zod';

const reservationSchema = z.object({
  roomId: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  ownerId: z.string(),
});

export async function POST(req: Request) {
  const body = await req.json();

  const reservation = reservationSchema.parse(body);

  try {
    const newRoom = await db.reservation.create({
      data: {
        roomId: reservation.roomId,
        startTime: reservation.startTime,
        endTime: reservation.endTime,
        ownerId: reservation.ownerId,
      },
    });

    await db.room.update({
      where: { id: reservation.roomId },
      data: {
        availableCount: { decrement: 1 },
      },
    });
    revalidatePath('/rooms');
    return NextResponse.json({ newRoom, message: 'success' }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
