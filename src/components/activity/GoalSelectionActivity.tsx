'use client';

import { useState } from 'react';
import { ActivityDefinition } from '@/types';

interface GoalSelectionActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
}

export default function GoalSelectionActivity({
  activity,
  onComplete,
  onNext,
  isCompleted,
  savedResponse,
}: GoalSelectionActivityProps) {
  const options = activity.config.options || [];
  const allowMultiple = activity.config.allowMultiple ?? false;
  const initialSelected = (savedResponse?.selected as string[]) || [];
  const [selected, setSelected] = useState<string[]>(initialSelected);

  const handleToggle = (id: string) => {
    if (allowMultiple) {
      setSelected(prev =>
        prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
      );
    } else {
      setSelected([id]);
    }
  };

  const handleSubmit = () => {
    onComplete({
      selected,
      questionText: activity.config.questionText,
      timestamp: new Date().toISOString(),
    });
    onNext();
  };

  return (
    <div>
      <h3 style={{
        fontSize: 'var(--text-xl)',
        fontWeight: 700,
        marginBottom: 'var(--space-2)',
      }}>
        {activity.config.questionText}
      </h3>

      {allowMultiple && (
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-4)' }}>
          Select all that apply
        </p>
      )}

      <div className="option-grid" role="group" aria-label={activity.config.questionText}>
        {options.map(option => (
          <button
            key={option.id}
            className={`option-card ${selected.includes(option.id) ? 'option-card--selected' : ''}`}
            onClick={() => handleToggle(option.id)}
            role={allowMultiple ? 'checkbox' : 'radio'}
            aria-checked={selected.includes(option.id)}
            aria-label={option.label}
          >
            {option.icon && (
              <span className="option-card__icon" aria-hidden="true">{option.icon}</span>
            )}
            <span>{option.label}</span>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 'var(--space-6)', display: 'flex', justifyContent: 'center' }}>
        <button
          className="btn btn--primary btn--lg"
          onClick={handleSubmit}
          disabled={selected.length === 0}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
