import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';
import {
  getAllUserDayProgresses,
  getDayProgress,
  saveDayProgress,
  saveActivityAttempt,
  getLatestProgress,
} from '@/lib/db';

// GET /api/progress - Fetch all day progresses for the current user
export async function GET(request: Request) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const dayParam = searchParams.get('day');

    if (dayParam) {
      const dayNum = parseInt(dayParam, 10);
      const progress = getDayProgress(session.userId, dayNum);
      return NextResponse.json({ progress });
    }

    const allProgress = getAllUserDayProgresses(session.userId);
    const latest = getLatestProgress(session.userId);

    return NextResponse.json({
      progresses: allProgress,
      latest,
    });
  } catch (error: any) {
    console.error('Fetch progress error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/progress - Save/update activity and day progress
export async function POST(request: Request) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      dayNumber,
      currentActivityIndex,
      totalActivities,
      completedActivities,
      status,
      speakingMinutes,
      xpEarned,
      activityAttempt,
    } = body;

    if (!dayNumber && dayNumber !== 0) {
      return NextResponse.json({ error: 'Missing dayNumber' }, { status: 400 });
    }

    // Save/update day progress
    const updatedDay = saveDayProgress(session.userId, {
      dayNumber: parseInt(dayNumber, 10),
      currentActivityIndex: parseInt(currentActivityIndex || '0', 10),
      totalActivities: totalActivities ? parseInt(totalActivities, 10) : undefined,
      completedActivities: completedActivities ? parseInt(completedActivities, 10) : undefined,
      status: status || 'in_progress',
      speakingMinutes: speakingMinutes ? parseFloat(speakingMinutes) : 0,
      xpEarned: xpEarned ? parseInt(xpEarned, 10) : 0,
    });

    // Save individual activity attempt if provided
    if (activityAttempt && activityAttempt.activityId) {
      saveActivityAttempt(session.userId, {
        dayNumber: parseInt(dayNumber, 10),
        activityId: activityAttempt.activityId,
        activityType: activityAttempt.activityType || 'interactive',
        status: activityAttempt.status || 'completed',
        responseData: activityAttempt.responseData,
        score: activityAttempt.score,
        feedback: activityAttempt.feedback,
        duration: activityAttempt.duration,
      });
    }

    return NextResponse.json({
      success: true,
      dayProgress: updatedDay,
    });
  } catch (error: any) {
    console.error('Save progress error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
