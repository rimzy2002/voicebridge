'use client';

import { useState } from 'react';
import { ActivityDefinition, LearnerTrack } from '@/types';
import Link from 'next/link';

interface ProfessionalDiagnosticActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
  track?: LearnerTrack;
  dayNumber?: number;
  earnedXp?: number;
  streak?: number;
  allResponses?: Record<string, Record<string, unknown>>;
}

interface DiagnosticDimension {
  name: string;
  day15: number;
  day21: number;
  unit?: string;
}

const DIAGNOSTIC_DIMENSIONS: DiagnosticDimension[] = [
  { name: 'Professional Clarity', day15: 6.0, day21: 8.2 },
  { name: 'Concise Explanation', day15: 5.8, day21: 8.0 },
  { name: 'Meeting Participation', day15: 5.0, day21: 8.5 },
  { name: 'Interview Structure (STAR)', day15: 4.5, day21: 8.3 },
  { name: 'Presentation & Signposting', day15: 5.5, day21: 8.6 },
  { name: 'Data Explanation', day15: 5.0, day21: 7.8 },
  { name: 'Feedback (SBI)', day15: 4.2, day21: 8.1 },
  { name: 'Negotiation Language', day15: 4.0, day21: 7.9 },
  { name: 'Register Adaptation', day15: 5.5, day21: 8.4 },
  { name: 'Active Listening', day15: 6.5, day21: 8.3 },
  { name: 'Vocabulary Range', day15: 6.0, day21: 8.5 },
  { name: 'Pronunciation Clarity', day15: 6.5, day21: 7.8 },
  { name: 'Spontaneous Response', day15: 5.8, day21: 8.0 },
  { name: 'Conversation Balance', day15: 6.2, day21: 8.4 },
  { name: 'Professional Confidence', day15: 5.5, day21: 8.7 },
];

const TREND_DATA = [
  { day: 'Day 1', confidence: 4.5, structure: 4.0, vocabulary: 3.8, clarity: 4.2 },
  { day: 'Day 7', confidence: 6.0, structure: 6.2, vocabulary: 5.5, clarity: 6.0 },
  { day: 'Day 14', confidence: 7.2, structure: 7.8, vocabulary: 7.0, clarity: 7.5 },
  { day: 'Day 21', confidence: 8.7, structure: 8.5, vocabulary: 8.5, clarity: 8.2 },
];

export default function ProfessionalDiagnosticActivity({
  activity: _activity,
  onComplete,
  isCompleted: _isCompleted,
  earnedXp = 280,
  streak = 21,
}: ProfessionalDiagnosticActivityProps) {
  const [activeTab, setActiveTab] = useState<'metrics' | 'trend' | 'priorities' | 'week4'>('metrics');

  const handleFinishWeek3 = () => {
    onComplete({
      week3Completed: true,
      timestamp: new Date().toISOString(),
      unlockedWeek4: true,
      diagnosticDimensions: DIAGNOSTIC_DIMENSIONS,
      trendData: TREND_DATA,
    });
  };

  return (
    <div className="glass-card glass-card--elevated animate-scale-in" style={{ padding: 'var(--space-8)' }}>
      {/* Trophy Badge */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
        <div style={{
          width: '76px', height: '76px', borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto var(--space-3)', fontSize: '36px',
          boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)',
        }}>
          🏆
        </div>
        <h2 style={{ color: 'var(--text-primary)', margin: '0 0 var(--space-1)' }}>Professional Communicator</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', margin: 0 }}>
          Week 3 Diagnostic Complete • {earnedXp} XP • {streak} Day Streak
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex', gap: 'var(--space-1)', marginBottom: 'var(--space-5)',
        background: 'var(--bg-surface-subtle)', padding: 'var(--space-1)', borderRadius: 'var(--radius-lg)',
      }}>
        {[
          { id: 'metrics' as const, label: 'Day 15 vs 21' },
          { id: 'trend' as const, label: '4-Week Trend' },
          { id: 'priorities' as const, label: 'Strengths' },
          { id: 'week4' as const, label: 'Week 4' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1, padding: 'var(--space-2) var(--space-3)',
              background: activeTab === tab.id ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
              border: 'none', borderRadius: 'var(--radius-md)',
              color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-tertiary)',
              cursor: 'pointer', fontSize: 'var(--text-xs)', fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Metrics Tab — Day 15 vs Day 21 */}
      {activeTab === 'metrics' && (
        <div>
          <h3 style={{ color: 'var(--text-primary)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-4)' }}>
            Week 3 Communication Score (15 Dimensions)
          </h3>
          <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
            {DIAGNOSTIC_DIMENSIONS.map((dim) => {
              const improved = dim.day21 >= dim.day15;
              const change = (dim.day21 - dim.day15).toFixed(1);
              return (
                <div key={dim.name} style={{
                  display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 'var(--space-3)', alignItems: 'center',
                  padding: 'var(--space-2) var(--space-3)',
                  background: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-sm)',
                  borderLeft: `3px solid ${improved ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)'}`,
                }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{dim.name}</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontVariantNumeric: 'tabular-nums', minWidth: '32px', textAlign: 'right' }}>
                    {dim.day15}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-primary)', fontWeight: 600, fontVariantNumeric: 'tabular-nums', minWidth: '32px', textAlign: 'right' }}>
                    {dim.day21}
                  </span>
                  <span style={{
                    fontSize: '10px', fontWeight: 600, fontVariantNumeric: 'tabular-nums', minWidth: '40px', textAlign: 'right',
                    color: improved ? 'var(--color-success)' : 'var(--color-error)',
                  }}>
                    {improved ? '+' : ''}{change}
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', marginTop: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            <span>Day 15 baseline →</span>
            <span><strong>Day 21 current</strong></span>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-3)', fontStyle: 'italic' }}>
            This is an internal program score based on activity performance — not an official proficiency certification.
          </p>
        </div>
      )}

      {/* Trend Tab — Day 1/7/14/21 */}
      {activeTab === 'trend' && (
        <div>
          <h3 style={{ color: 'var(--text-primary)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-4)' }}>
            Day 1 → Day 21 Progression
          </h3>

          {/* Simple trend visualization */}
          {['confidence', 'structure', 'vocabulary', 'clarity'].map(metric => (
            <div key={metric} style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'capitalize', marginBottom: 'var(--space-2)' }}>
                {metric}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                {TREND_DATA.map((point, i) => {
                  const value = point[metric as keyof typeof point] as number;
                  return (
                    <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{
                        height: '60px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                      }}>
                        <div style={{
                          width: '100%', maxWidth: '40px',
                          height: `${(value / 10) * 100}%`,
                          background: i === TREND_DATA.length - 1
                            ? 'linear-gradient(to top, rgba(99, 102, 241, 0.6), rgba(99, 102, 241, 0.9))'
                            : 'var(--border-default)',
                          borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                          transition: 'height 0.5s ease',
                        }} />
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-primary)', fontWeight: 600, marginTop: '2px' }}>{value}</div>
                      <div style={{ fontSize: '9px', color: 'var(--text-tertiary)' }}>{point.day}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
            Only comparable tasks are shown. Scores reflect different activity types, so trends are directional, not absolute.
          </p>
        </div>
      )}

      {/* Strengths Tab */}
      {activeTab === 'priorities' && (
        <div>
          <h3 style={{ color: 'var(--text-primary)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-4)' }}>
            Strongest Professional Skill
          </h3>

          <div style={{
            background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', marginBottom: 'var(--space-4)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '32px', marginBottom: 'var(--space-2)' }}>🏢</div>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
              Meeting Participation
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
              You showed the strongest improvement in meeting scenarios — from 5.0 to 8.5. Your contributions were concise, your questions useful, and your action summaries clear.
            </p>
          </div>

          <h4 style={{ color: 'var(--text-primary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>
            Personal Phrasebook Highlights
          </h4>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' }}>
            Expressions you produced, reused, or successfully retrieved during Week 3:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            {[
              'One option might be...', 'Could you clarify...?', 'The situation was...',
              'So just to summarize...', 'I take responsibility for...', 'Would it be possible to...?',
              'Based on the data...', 'I\'d suggest...', 'Let me address that.',
            ].map((phrase, i) => (
              <span key={i} style={{
                padding: 'var(--space-1) var(--space-3)',
                background: 'rgba(99, 102, 241, 0.1)', borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-xs)', color: 'var(--text-primary)',
              }}>
                {phrase}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Week 4 Preview */}
      {activeTab === 'week4' && (
        <div>
          <h3 style={{ color: 'var(--text-primary)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-4)' }}>
            Week 4 Priority — Advanced Communication
          </h3>

          <div style={{
            background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)',
            borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', marginBottom: 'var(--space-4)',
          }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
              🎯 Primary Priority
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 500, margin: '0 0 var(--space-2)' }}>
              Nuanced Persuasion & Complex Ideas
            </p>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0 }}>
              Move beyond structured responses to fluid, persuasive communication. Handle complex multi-layered topics with confidence.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-surface-subtle)', border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', marginBottom: 'var(--space-4)',
          }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
              📌 Secondary Priority
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 500, margin: '0 0 var(--space-2)' }}>
              Impromptu Speaking Under Pressure
            </p>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0 }}>
              Reduce dependency on preparation time. Respond to unexpected situations with composure and structure.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)',
            padding: 'var(--space-3) var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)',
          }}>
            <strong>Week 4 prepares you for:</strong> nuanced communication, persuasion, leadership language, complex ideas, advanced discussion, difficult questions, impromptu speaking, and your final transformation.
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ marginTop: 'var(--space-6)', display: 'flex', gap: 'var(--space-3)' }}>
        <Link href="/" className="btn btn--ghost" style={{ flex: 1, textAlign: 'center' }}>
          ← Dashboard
        </Link>
        <button className="btn btn--primary" onClick={handleFinishWeek3} style={{ flex: 2 }}>
          🔓 Complete Week 3 & Unlock Week 4
        </button>
      </div>
    </div>
  );
}
