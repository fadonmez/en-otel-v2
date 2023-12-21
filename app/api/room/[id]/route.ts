import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: any, context: any) {
  const id = context.params.id;
  try {
    const room = await db.room.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ room }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
