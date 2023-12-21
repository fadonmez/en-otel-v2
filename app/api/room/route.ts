import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import * as z from 'zod';

const formSchema = z.object({
  roomType: z.string(),
  roomDescription: z.string().min(10).max(500),
  roomPrice: z.number(),
  roomImgUrl: z.string(),
  roomAvailableCount: z.coerce.number(),
});

export async function GET() {
  try {
    const rooms = await db.room.findMany();
    return NextResponse.json(rooms, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      roomType,
      roomDescription,
      roomPrice,
      roomImgUrl,
      roomAvailableCount,
    } = formSchema.parse(body);

    const existingRoomType = await db.room.findUnique({
      where: {
        roomType: roomType,
      },
    });

    if (existingRoomType) {
      const updatedRoom = await db.room.update({
        where: {
          roomType: roomType,
        },
        data: {
          availableCount: existingRoomType.availableCount + roomAvailableCount,
        },
      });
      return NextResponse.json(
        {
          room: updatedRoom,
          message: 'Oda mevcut olduğu için kontenjanı güncellendi',
        },
        { status: 500 }
      );
    }
    const newRoom = await db.room.create({
      data: {
        roomType,
        roomDescription,
        price: roomPrice,
        imgUrl: roomImgUrl,
        availableCount: roomAvailableCount,
      },
    });

    return NextResponse.json(
      { newRoom, message: 'room created succesfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
