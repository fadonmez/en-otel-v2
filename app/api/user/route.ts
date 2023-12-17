import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(8).max(32),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = formSchema.parse(body);

    // check if email is already exists

    const existingUserByEmail = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          error: 'Email already exists',
        },
        { status: 409 }
      );
    }

    // check if username is already exists

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const { password: _, ...user } = newUser;
    return NextResponse.json(
      { user, message: 'user created succesfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
