'use client';

import { ActivityDefinition } from '@/types';

interface InformationDisplayActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
}

export default function InformationDisplayActivity({
  activity,
  onComplete,
  onNext,
  isCompleted,
}: InformationDisplayActivityProps) {
  const handleProceed = () => {
    onComplete({
      viewed: true,
      timestamp: new Date().toISOString(),
    });
    onNext();
  };

  const config = activity.config || {};
  const content = (config.content as string) || activity.instructions;
  const keyPoints = (config.keyPoints as string[]) || [];

  return (
    <div className="glass-card glass-card--elevated animate-scale-in">
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
          <span className="badge badge--primary">ℹ️ Guidance & Knowledge</span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            Est. {activity.durationMinutes} min
          </span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
          {activity.title}
        </h2>
        {activity.instructions && (
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
            {activity.instructions}
          </p>
        )}
      </div>

      {content && (
        <div style={{
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-5)',
          marginBottom: 'var(--space-6)',
          fontSize: 'var(--text-base)',
          lineHeight: 'var(--leading-relaxed)',
          color: 'var(--text-primary)',
          whiteSpace: 'pre-line',
        }}>
          {content}
        </div>
      )}

      {keyPoints.length > 0 && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-5)',
          marginBottom: 'var(--space-6)',
        }}>
          <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--primary)', marginBottom: 'var(--space-3)' }}>
            Key Principles:
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {keyPoints.map((point, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-default)', paddingTop: 'var(--space-5)' }}>
        <button className="btn btn--primary" onClick={handleProceed}>
          {isCompleted ? 'Next' : 'Continue'} →
        </button>
      </div>
    </div>
  );
}
