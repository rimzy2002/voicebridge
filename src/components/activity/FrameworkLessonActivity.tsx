'use client';

import { useState } from 'react';
import { ActivityDefinition } from '@/types';

interface FrameworkLessonActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
}

export default function FrameworkLessonActivity({
  activity,
  onComplete,
  onNext,
  isCompleted,
  savedResponse,
}: FrameworkLessonActivityProps) {
  const [activeTab, setActiveTab] = useState<'concept' | 'example' | 'practice'>('concept');
  const [notes, setNotes] = useState<string>((savedResponse?.notes as string) || '');
  const [understood, setUnderstood] = useState<boolean>(
    Boolean(savedResponse?.understood || isCompleted)
  );

  const config = activity.config || {};
  const steps = (config.steps as Array<{ title?: string; name?: string; description: string; example?: string }>) || [];
  const examples = (config.examples as Array<{ scenario: string; poor: string; strong: string }>) || [];

  const handleFinish = () => {
    onComplete({
      understood: true,
      notes,
      completedAt: new Date().toISOString(),
    });
    onNext();
  };

  return (
    <div className="glass-card glass-card--elevated animate-scale-in">
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
          <span className="badge badge--success">📐 Framework Mastery</span>
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

      {/* Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-default)',
        marginBottom: 'var(--space-6)',
        gap: 'var(--space-2)',
      }}>
        <button
          className={`btn btn--sm ${activeTab === 'concept' ? 'btn--primary' : 'btn--ghost'}`}
          onClick={() => setActiveTab('concept')}
        >
          📖 Framework Structure
        </button>
        {examples.length > 0 && (
          <button
            className={`btn btn--sm ${activeTab === 'example' ? 'btn--primary' : 'btn--ghost'}`}
            onClick={() => setActiveTab('example')}
          >
            💡 Real Examples
          </button>
        )}
        <button
          className={`btn btn--sm ${activeTab === 'practice' ? 'btn--primary' : 'btn--ghost'}`}
          onClick={() => setActiveTab('practice')}
        >
          ✍️ Personal Application
        </button>
      </div>

      {/* Concept Tab */}
      {activeTab === 'concept' && (
        <div>
          {config.content && (
            <div style={{
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-relaxed)',
              color: 'var(--text-secondary)',
              marginBottom: 'var(--space-6)',
              whiteSpace: 'pre-line',
            }}>
              {config.content as string}
            </div>
          )}

          {steps.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-4) var(--space-5)',
                    display: 'flex',
                    gap: 'var(--space-4)',
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--gradient-primary)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>
                    {idx + 1}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-1)' }}>
                      {step.title || step.name || `Step ${idx + 1}`}
                    </h4>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-normal)' }}>
                      {step.description}
                    </p>
                    {step.example && (
                      <div style={{
                        marginTop: 'var(--space-2)',
                        padding: 'var(--space-2) var(--space-3)',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-tertiary)',
                        fontStyle: 'italic',
                      }}>
                        &ldquo;{step.example}&rdquo;
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Examples Tab */}
      {activeTab === 'example' && examples.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
          {examples.map((ex, i) => (
            <div
              key={i}
              style={{
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-5)',
              }}
            >
              <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--primary)', marginBottom: 'var(--space-3)' }}>
                Scenario: {ex.scenario}
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)' }}>
                <div style={{
                  background: 'rgba(239, 68, 68, 0.05)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-4)',
                }}>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: '#ef4444', textTransform: 'uppercase' }}>
                    ❌ Unstructured / Rambling
                  </span>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontStyle: 'italic' }}>
                    &ldquo;{ex.poor}&rdquo;
                  </p>
                </div>
                <div style={{
                  background: 'rgba(34, 197, 94, 0.05)',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-4)',
                }}>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: '#22c55e', textTransform: 'uppercase' }}>
                    ✅ Structured with Framework
                  </span>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
                    &ldquo;{ex.strong}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Practice / Notes Tab */}
      {activeTab === 'practice' && (
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
            Your Framework Notes & Custom Application:
          </label>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)' }}>
            How will you apply this framework in your next meeting, presentation, or conversation?
          </p>
          <textarea
            className="input-textarea"
            rows={4}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Write down your takeaway or formulate your own 3-point outline..."
            style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}
          />
        </div>
      )}

      {/* Confirmation & Navigation */}
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
            checked={understood}
            onChange={e => setUnderstood(e.target.checked)}
            style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }}
          />
          I have understood this framework and feel ready to test it
        </label>
        <button
          className="btn btn--primary"
          onClick={handleFinish}
          disabled={!understood}
        >
          {isCompleted ? 'Next Activity' : 'Mark Understood & Continue'} →
        </button>
      </div>
    </div>
  );
}
