import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { getAllUserDayProgresses, saveDayProgress, sqlite, findUserById } from '@/lib/db';

export async function GET(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden: Admin access required.' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter.' }, { status: 400 });
    }

    const user = findUserById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const dayProgresses = getAllUserDayProgresses(userId);
    const attempts = sqlite.prepare(`
      SELECT * FROM ActivityAttempt WHERE userId = ? ORDER BY dayNumber ASC, createdAt DESC
    `).all(userId);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      dayProgresses,
      attempts,
    });
  } catch (error: any) {
    console.error('Admin get progress error:', error);
    return NextResponse.json({ error: 'Failed to retrieve progress.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden: Admin access required.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { userId, dayNumber, currentActivityIndex, completedActivities, status, xpEarned } = body;

    if (!userId || dayNumber === undefined) {
      return NextResponse.json({ error: 'Missing userId or dayNumber.' }, { status: 400 });
    }

    const updated = saveDayProgress(userId, {
      dayNumber: parseInt(dayNumber, 10),
      currentActivityIndex: parseInt(currentActivityIndex || '0', 10),
      completedActivities: completedActivities !== undefined ? parseInt(completedActivities, 10) : undefined,
      status: status || 'in_progress',
      xpEarned: xpEarned !== undefined ? parseInt(xpEarned, 10) : undefined,
    });

    return NextResponse.json({
      success: true,
      message: `Progress for Day ${dayNumber} updated.`,
      dayProgress: updated,
    });
  } catch (error: any) {
    console.error('Admin update progress error:', error);
    return NextResponse.json({ error: 'Failed to update progress.' }, { status: 500 });
  }
}
