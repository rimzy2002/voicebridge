'use client';

import { ActivityDefinition } from '@/types';

interface WelcomeActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  dayTitle: string;
  goals: string[];
}

export default function WelcomeActivity({
  activity,
  onComplete,
  onNext,
  isCompleted,
  dayTitle,
  goals,
}: WelcomeActivityProps) {
  const handleStart = () => {
    onComplete({ viewed: true, timestamp: new Date().toISOString() });
    onNext();
  };

  return (
    <div className="glass-card glass-card--elevated animate-scale-in">
      <div style={{ textAlign: 'center', padding: 'var(--space-4) 0' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-3xl)',
          fontWeight: 800,
          marginBottom: 'var(--space-4)',
          lineHeight: 'var(--leading-tight)',
        }}>
          {dayTitle}
        </h1>

        {activity.config.content && (
          <div style={{
            fontSize: 'var(--text-base)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
            maxWidth: '500px',
            margin: '0 auto var(--space-6)',
            whiteSpace: 'pre-line',
          }}>
            {activity.config.content}
          </div>
        )}

        {goals.length > 0 && (
          <div style={{
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-5)',
            textAlign: 'left',
            marginBottom: 'var(--space-6)',
          }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', marginBottom: 'var(--space-3)' }}>
              Today&apos;s Goals
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {goals.map((goal, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  <span style={{ width: '24px', height: '24px', borderRadius: 'var(--radius-full)', background: 'var(--gradient-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-xs)', fontWeight: 700, flexShrink: 0 }}>
                    {i + 1}
                  </span>
                  {goal}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          className="btn btn--primary btn--lg"
          onClick={handleStart}
        >
          {isCompleted ? 'Continue' : "Let's Begin"} →
        </button>
      </div>
    </div>
  );
}
