import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db/prisma';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { tasks } = await request.json();

    if (!Array.isArray(tasks) || tasks.length === 0) {
      return NextResponse.json({ success: true, migrated: 0 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found. Please log out and sign in again.' },
        { status: 404 }
      );
    }

    const migratedTasks = await prisma.$transaction(
      tasks.map((task) =>
        prisma.task.create({
          data: {
            title: task.title,
            note: task.note || null,
            estimatedPomodoros: task.estimatedPomodoros || 1,
            project: task.project || null,
            completed: task.completed || false,
            userId: session.user.id,
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      migrated: migratedTasks.length,
      tasks: migratedTasks,
    });
  } catch (error) {
    console.error('Error migrating tasks:', error);
    return NextResponse.json({ error: 'Failed to migrate tasks' }, { status: 500 });
  }
}
