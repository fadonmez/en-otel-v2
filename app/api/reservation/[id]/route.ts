import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function DELETE(req: any, context: any) {
  const id = context.params.id;
  try {
    const room = await db.reservation.delete({
      where: {
        id: id,
      },
    });

    await db.room.update({
      where: { id: room.roomId },
      data: {
        availableCount: {
          increment: 1,
        },
      },
    });

    revalidatePath('/profile');
    return NextResponse.json({ room }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
