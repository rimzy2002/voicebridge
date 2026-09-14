import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser, saveDayProgress, addXp } from '@/lib/db';
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_DURATION_SECONDS } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, track = 'general', guestProgress } = body;

    // Validation
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }
    if (!password || password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long.' }, { status: 400 });
    }
    if (!name || name.trim().length === 0) {
      return NextResponse.json({ error: 'Please provide your name.' }, { status: 400 });
    }

    // Check existing
    const existing = findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
    }

    // Hash password
    const passwordHash = bcrypt.hashSync(password, 10);

    // Create user
    const user = createUser({
      email,
      name,
      passwordHash,
      role: 'learner',
      track: track === 'professional' || track === 'student' ? track : 'general',
    });

    // Migrate guest progress if provided
    let redirectUrl = '/';
    if (guestProgress) {
      const dayNum = parseInt(guestProgress.dayNumber || guestProgress.currentDay || '1', 10) || 1;
      const actIdx = parseInt(guestProgress.currentActivityIndex || guestProgress.activityIndex || '0', 10) || 0;
      const xp = parseInt(guestProgress.earnedXp || guestProgress.xp || '0', 10) || 0;

      saveDayProgress(user.id, {
        dayNumber: dayNum,
        currentActivityIndex: actIdx,
        status: 'in_progress',
        xpEarned: xp,
      });

      if (xp > 0) {
        addXp(user.id, xp, 'Migrated Guest Progress', dayNum);
      }
    }

    // Issue session token
    const token = createSessionToken(user);

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        track,
      },
      redirectUrl,
    });

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_DURATION_SECONDS,
    });

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Failed to create account. Please try again.' }, { status: 500 });
  }
}
