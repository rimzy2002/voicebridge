import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { findUserByEmail, getLatestProgress, saveDayProgress, getLearnerProfile } from '@/lib/db';
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_DURATION_SECONDS } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, guestProgress } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Please enter both email and password.' }, { status: 400 });
    }

    const user = findUserByEmail(email);
    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const isMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    // Check existing progress in DB
    let latest = getLatestProgress(user.id);

    // If returning user has no DB progress but had guest progress on this device, migrate it
    if (!latest && guestProgress) {
      const dayNum = parseInt(guestProgress.dayNumber || guestProgress.currentDay || '1', 10) || 1;
      const actIdx = parseInt(guestProgress.currentActivityIndex || guestProgress.activityIndex || '0', 10) || 0;
      const xp = parseInt(guestProgress.earnedXp || guestProgress.xp || '0', 10) || 0;

      saveDayProgress(user.id, {
        dayNumber: dayNum,
        currentActivityIndex: actIdx,
        status: 'in_progress',
        xpEarned: xp,
      });

      latest = getLatestProgress(user.id);
    }

    // Determine target redirect URL
    let redirectUrl = '/';
    if (user.role === 'admin') {
      redirectUrl = '/admin';
    } else {
      // Learners are routed directly to the Dashboard
      redirectUrl = '/';
    }

    const profile = getLearnerProfile(user.id);
    const token = createSessionToken(user);

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        track: profile?.track || 'general',
      },
      restoredActivity: latest
        ? {
            dayNumber: latest.dayNumber,
            currentActivityIndex: latest.currentActivityIndex,
            completedActivities: latest.completedActivities,
            status: latest.status,
          }
        : null,
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
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Failed to sign in. Please try again.' }, { status: 500 });
  }
}
