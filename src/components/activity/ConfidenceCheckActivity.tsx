'use client';

import { useState } from 'react';
import { ActivityDefinition } from '@/types';

interface ConfidenceCheckActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
}

export default function ConfidenceCheckActivity({
  activity,
  onComplete,
  onNext,
  isCompleted,
  savedResponse,
}: ConfidenceCheckActivityProps) {
  const dimensions = activity.config.dimensions || [];
  const initialRatings = (savedResponse?.ratings as Record<string, number>) || {};
  const [ratings, setRatings] = useState<Record<string, number>>(
    dimensions.reduce((acc, dim) => ({
      ...acc,
      [dim.id]: initialRatings[dim.id] ?? 5,
    }), {} as Record<string, number>)
  );

  const handleChange = (id: string, value: number) => {
    setRatings(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    onComplete({
      ratings,
      type: activity.config.dimensions ? 'multi_dimension' : 'single',
      timestamp: new Date().toISOString(),
    });
    onNext();
  };

  const getColorForValue = (value: number): string => {
    if (value <= 3) return 'var(--color-error-400)';
    if (value <= 5) return 'var(--color-warning-400)';
    if (value <= 7) return 'var(--color-primary-400)';
    return 'var(--color-success-400)';
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        {dimensions.map(dim => (
          <div key={dim.id} className="slider-container glass-card" style={{ padding: 'var(--space-4)' }}>
            <div className="slider-label">
              <label htmlFor={`slider-${dim.id}`} className="slider-label__text">
                {dim.label}
              </label>
              <span
                className="slider-label__value"
                style={{ color: getColorForValue(ratings[dim.id]) }}
              >
                {ratings[dim.id]}
              </span>
            </div>
            <input
              id={`slider-${dim.id}`}
              type="range"
              min={dim.min || 1}
              max={dim.max || 10}
              value={ratings[dim.id]}
              onChange={(e) => handleChange(dim.id, parseInt(e.target.value))}
              style={{
                background: `linear-gradient(to right, ${getColorForValue(ratings[dim.id])} ${((ratings[dim.id] - 1) / 9) * 100}%, var(--bg-elevated) ${((ratings[dim.id] - 1) / 9) * 100}%)`,
              }}
              aria-label={`${dim.label}: ${ratings[dim.id]} out of ${dim.max || 10}`}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
              <span>Not confident</span>
              <span>Very confident</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'var(--space-6)', display: 'flex', justifyContent: 'center' }}>
        <button
          className="btn btn--primary btn--lg"
          onClick={handleSubmit}
        >
          {isCompleted ? 'Update & Continue' : 'Save Baseline →'}
        </button>
      </div>
    </div>
  );
}
