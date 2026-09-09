'use client';

import { useState } from 'react';
import { ActivityDefinition } from '@/types';

interface ReflectionActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
}

export default function ReflectionActivity({
  activity,
  onComplete,
  onNext,
  isCompleted,
  savedResponse,
}: ReflectionActivityProps) {
  const config = activity.config || {};
  const prompts = (config.prompts as string[]) || [
    'What was the most natural or comfortable phrase you used today?',
    'At what point did you feel hesitation, and what caused it?',
    'What is one concrete communication habit you will focus on tomorrow?',
  ];

  const [answers, setAnswers] = useState<Record<number, string>>(
    (savedResponse?.answers as Record<number, string>) || {}
  );
  const [satisfaction, setSatisfaction] = useState<number>(
    (savedResponse?.satisfaction as number) || 4
  );

  const handleAnswerChange = (idx: number, val: string) => {
    setAnswers(prev => ({ ...prev, [idx]: val }));
  };

  const handleFinish = () => {
    onComplete({
      answers,
      satisfaction,
      completedAt: new Date().toISOString(),
    });
    onNext();
  };

  return (
    <div className="glass-card glass-card--elevated animate-scale-in">
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
          <span className="badge badge--warning">🧠 Daily Reflection</span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            Est. {activity.durationMinutes} min
          </span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
          {activity.title}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
          {activity.instructions}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', marginBottom: 'var(--space-6)' }}>
        {prompts.map((prompt, idx) => (
          <div
            key={idx}
            style={{
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4)',
            }}
          >
            <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
              {idx + 1}. {prompt}
            </label>
            <textarea
              className="input-textarea"
              rows={3}
              value={answers[idx] || ''}
              onChange={e => handleAnswerChange(idx, e.target.value)}
              placeholder="Reflect honestly on today's session..."
              style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}
            />
          </div>
        ))}
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4)',
        marginBottom: 'var(--space-6)',
      }}>
        <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
          Overall Session Satisfaction ({satisfaction}/5)
        </label>
        <input
          type="range"
          min={1}
          max={5}
          value={satisfaction}
          onChange={e => setSatisfaction(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--primary)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)' }}>
          <span>Low Value</span>
          <span>Moderate</span>
          <span>High Breakthrough</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn--primary" onClick={handleFinish}>
          {isCompleted ? 'Update & Proceed' : 'Save Reflection & Continue'} →
        </button>
      </div>
    </div>
  );
}
