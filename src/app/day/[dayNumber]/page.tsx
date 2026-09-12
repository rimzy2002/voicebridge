'use client';

import { use, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ActivityShell from '@/components/activity/ActivityShell';
import { getDay } from '@/lib/curriculum/days';
import { LearnerTrack } from '@/types';

interface DayPageProps {
  params: Promise<{
    dayNumber: string;
  }>;
}

function DayContent({ dayNum }: { dayNum: number }) {
  const searchParams = useSearchParams();
  const activityParam = searchParams.get('activity');
  const initialActivityIndex = activityParam ? parseInt(activityParam, 10) : 0;
  const trackParam = (searchParams.get('track') as LearnerTrack) || 'general';
  const modeParam = (searchParams.get('mode') as 'full' | 'express') || 'full';

  const day = useMemo(() => {
    return getDay(dayNum);
  }, [dayNum]);

  if (!day) {
    return (
      <div className="container container--content" style={{ padding: 'var(--space-12) 0', textAlign: 'center' }}>
        <h2>Day Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', margin: 'var(--space-4) 0' }}>
          We could not load curriculum data for Day {dayNum}.
        </p>
        <Link href="/" className="btn btn--primary">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <main style={{ minHeight: '100vh', padding: 'var(--space-8) 0' }}>
      <div className="container container--content">
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <Link href="/" style={{ color: 'var(--text-tertiary)', textDecoration: 'none', fontSize: 'var(--text-sm)' }}>
            ← Back to All Days
          </Link>
        </div>
        <ActivityShell
          day={day}
          initialActivityIndex={initialActivityIndex}
          track={trackParam}
          mode={modeParam}
        />
      </div>
    </main>
  );
}

export default function DayPage({ params }: DayPageProps) {
  const resolvedParams = use(params);
  const dayNum = parseInt(resolvedParams.dayNumber, 10) || 1;

  return (
    <Suspense fallback={<div className="container container--content" style={{ padding: 'var(--space-12) 0' }}>Loading day...</div>}>
      <DayContent dayNum={dayNum} />
    </Suspense>
  );
}
