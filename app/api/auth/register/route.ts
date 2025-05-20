import { NextResponse } from 'next/server';

import { hashPassword } from '@/lib/auth/bcrypt';
import { prisma } from '@/lib/db/prisma';

export async function POST(req: Request) {
  try {
    const { email, password, username } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    console.error('Registration error:', error);

    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
