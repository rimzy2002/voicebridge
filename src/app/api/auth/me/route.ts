import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';
import { findUserById, getLearnerProfile, getStreak, getTotalXp, getLatestProgress } from '@/lib/db';

export async function GET() {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    const user = findUserById(session.userId);
    if (!user) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    const profile = getLearnerProfile(user.id);
    const streak = getStreak(user.id);
    const totalXp = getTotalXp(user.id);
    const latestProgress = getLatestProgress(user.id);

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image,
      },
      profile: profile
        ? {
            track: profile.track,
            proficiencyLevel: profile.proficiencyLevel,
          }
        : null,
      streak: streak
        ? {
            currentStreak: streak.currentStreak,
            longestStreak: streak.longestStreak,
          }
        : { currentStreak: 0, longestStreak: 0 },
      xp: totalXp,
      latestProgress,
    });
  } catch (error: any) {
    console.error('Session check error:', error);
    return NextResponse.json({ authenticated: false, user: null });
  }
}
