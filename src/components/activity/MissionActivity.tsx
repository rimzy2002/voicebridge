'use client';

import { useState } from 'react';
import { ActivityDefinition } from '@/types';

interface MissionActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
}

export default function MissionActivity({
  activity,
  onComplete,
  onNext,
  isCompleted,
  savedResponse,
}: MissionActivityProps) {
  const [committed, setCommitted] = useState<boolean>(
    Boolean(savedResponse?.committed || isCompleted)
  );
  const [actionPlan, setActionPlan] = useState<string>(
    (savedResponse?.actionPlan as string) || ''
  );

  const config = activity.config || {};
  const missionTitle = (config.missionTitle as string) || activity.title;
  const description = (config.description as string) || activity.instructions;
  const rules = (config.criteria as string[]) || [
    'Execute in a real work setting (meeting, async message, or 1-on-1)',
    'Notice how listeners react to your clarity',
    'Do not apologize or announce you are practicing',
  ];

  const handleFinish = () => {
    onComplete({
      committed: true,
      actionPlan,
      completedAt: new Date().toISOString(),
    });
    onNext();
  };

  return (
    <div className="glass-card glass-card--elevated animate-scale-in">
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
          <span className="badge badge--accent">🎯 Real-World Micro-Mission</span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            Outside Practice
          </span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
          {missionTitle}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
          {description}
        </p>
      </div>

      <div style={{
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-5)',
        marginBottom: 'var(--space-6)',
      }}>
        <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--primary)', marginBottom: 'var(--space-3)' }}>
          📋 Mission Execution Criteria:
        </h4>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {rules.map((rule, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--color-success)', fontWeight: 700 }}>✓</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: 'var(--space-6)' }}>
        <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
          When and where will you test this today?
        </label>
        <input
          type="text"
          className="input-text"
          value={actionPlan}
          onChange={e => setActionPlan(e.target.value)}
          placeholder="e.g. During our 3 PM sprint demo or team catch-up"
          style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}
        />
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid var(--border-default)',
        paddingTop: 'var(--space-5)',
      }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={committed}
            onChange={e => setCommitted(e.target.checked)}
            style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }}
          />
          I commit to executing this micro-mission today
        </label>
        <button
          className="btn btn--primary"
          onClick={handleFinish}
          disabled={!committed}
        >
          {isCompleted ? 'Mission Logged' : 'Accept Mission & Continue'} →
        </button>
      </div>
    </div>
  );
}
