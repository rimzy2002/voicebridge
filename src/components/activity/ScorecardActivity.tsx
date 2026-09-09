'use client';

import { ActivityDefinition } from '@/types';
import Link from 'next/link';

interface ScorecardActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  earnedXp: number;
  streak: number;
  completedActivities: number;
  totalActivities: number;
  speakingMinutes: number;
  dayTitle: string;
  dayNumber?: number;
}

export default function ScorecardActivity({
  activity,
  onComplete,
  earnedXp,
  streak,
  completedActivities,
  totalActivities,
  dayTitle,
  dayNumber = 1,
}: ScorecardActivityProps) {
  const handleFinishDay = () => {
    onComplete({
      finished: true,
      timestamp: new Date().toISOString(),
      earnedXp,
      streak,
    });
  };

  return (
    <div className="glass-card glass-card--elevated animate-scale-in" style={{ textAlign: 'center', padding: 'var(--space-8) var(--space-6)' }}>
      <div style={{
        width: '72px',
        height: '72px',
        borderRadius: 'var(--radius-full)',
        background: 'var(--gradient-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'var(--text-3xl)',
        margin: '0 auto var(--space-4)',
        boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)',
      }}>
        🎉
      </div>

      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
        Day {dayNumber} Complete!
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', maxWidth: '460px', margin: '0 auto var(--space-6)' }}>
        Outstanding dedication. You have successfully completed &ldquo;{dayTitle}&rdquo; and advanced your communication competence.
      </p>

      {/* Metrics Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-8)',
        maxWidth: '560px',
        margin: '0 auto var(--space-8)',
      }}>
        <div style={{
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-4)',
        }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 600 }}>
            Activities
          </div>
          <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)', marginTop: 'var(--space-1)' }}>
            {completedActivities}/{totalActivities}
          </div>
        </div>

        <div style={{
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-4)',
        }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 600 }}>
            Total XP
          </div>
          <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--primary)', marginTop: 'var(--space-1)' }}>
            +{earnedXp}
          </div>
        </div>

        <div style={{
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-4)',
        }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 600 }}>
            Current Streak
          </div>
          <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: '#f59e0b', marginTop: 'var(--space-1)' }}>
            🔥 {streak + 1}
          </div>
        </div>
      </div>

      {/* Next actions */}
      <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/" className="btn btn--outline btn--lg" onClick={handleFinishDay}>
          Return to Dashboard
        </Link>
        <Link href={`/day/${dayNumber + 1}`} className="btn btn--primary btn--lg" onClick={handleFinishDay}>
          Preview Day {dayNumber + 1} →
        </Link>
      </div>
    </div>
  );
}
