'use client';

import { useState } from 'react';
import { ActivityDefinition } from '@/types';
import Link from 'next/link';

interface WeeklyDiagnosticV2ActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  earnedXp?: number;
  streak?: number;
}

interface DimensionScore {
  name: string;
  day7: number;
  day14: number;
  unit?: string;
}

const DIMENSIONS: DimensionScore[] = [
  { name: 'Fluency & WPM', day7: 105, day14: 128, unit: 'wpm' },
  { name: 'Response-Start Delay', day7: 4.8, day14: 2.3, unit: 's' },
  { name: 'Opinion Structure (6-Stage)', day7: 6.2, day14: 8.8 },
  { name: 'Connector Diversity', day7: 4.5, day14: 8.4 },
  { name: 'Aural Summarization', day7: 5.8, day14: 8.2 },
  { name: 'Spontaneous Continuity', day7: 5.5, day14: 7.9 },
  { name: 'Vocal Fillers per Min', day7: 8.2, day14: 2.6, unit: '/m' },
  { name: 'Difficult Scenario Diplomacy', day7: 5.0, day14: 8.5 },
  { name: 'Signposting & Presentations', day7: 5.2, day14: 8.6 },
  { name: 'Active Vocabulary Bank', day7: 24, day14: 68, unit: 'words' },
  { name: 'Overall Speaking Confidence', day7: 6.0, day14: 8.7 },
];

export default function WeeklyDiagnosticV2Activity({
  activity: _activity,
  onComplete,
  isCompleted: _isCompleted,
  earnedXp = 120,
  streak = 14,
}: WeeklyDiagnosticV2ActivityProps) {
  const [activeTab, setActiveTab] = useState<'metrics' | 'priorities' | 'week3'>('metrics');

  const handleFinishWeek2 = () => {
    onComplete({
      week2Completed: true,
      timestamp: new Date().toISOString(),
      unlockedWeek3: true,
    });
  };

  return (
    <div className="glass-card glass-card--elevated animate-scale-in" style={{ padding: 'var(--space-8)' }}>
      {/* Trophy Badge */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
        <div style={{
          width: '76px',
          height: '76px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--gradient-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'var(--text-3xl)',
          margin: '0 auto var(--space-4)',
          boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)',
        }}>
          🏅
        </div>
        <span className="badge badge--success" style={{ marginBottom: 'var(--space-2)' }}>
          Week 2 Milestone Complete
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
          Week 2 Fluency Diagnostic Report
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', maxWidth: '500px', margin: '0 auto' }}>
          Comparing your Day 7 benchmark with your Day 14 communicative capabilities across 11 core dimensions.
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        borderBottom: '1px solid var(--border-default)',
        paddingBottom: 'var(--space-4)',
        marginBottom: 'var(--space-6)',
      }}>
        <button
          className={`btn btn--sm ${activeTab === 'metrics' ? 'btn--primary' : 'btn--ghost'}`}
          onClick={() => setActiveTab('metrics')}
        >
          📊 11-Dimension Comparison
        </button>
        <button
          className={`btn btn--sm ${activeTab === 'priorities' ? 'btn--primary' : 'btn--ghost'}`}
          onClick={() => setActiveTab('priorities')}
        >
          🎯 Priority Evolution
        </button>
        <button
          className={`btn btn--sm ${activeTab === 'week3' ? 'btn--primary' : 'btn--ghost'}`}
          onClick={() => setActiveTab('week3')}
        >
          🔓 Week 3 Readiness
        </button>
      </div>

      {/* Tab 1: 11-Dimension Metric Bars */}
      {activeTab === 'metrics' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            {DIMENSIONS.map(dim => {
              const isLowerBetter = dim.name.includes('Delay') || dim.name.includes('Fillers');
              const improved = isLowerBetter ? dim.day14 < dim.day7 : dim.day14 > dim.day7;

              return (
                <div
                  key={dim.name}
                  style={{
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-4)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {dim.name}
                    </span>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: improved ? '#22c55e' : 'var(--text-tertiary)' }}>
                      {improved ? '▲ Improved' : '—'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: 'var(--text-xs)' }}>
                    <span style={{ color: 'var(--text-tertiary)' }}>
                      Day 7: {dim.day7}{dim.unit || '/10'}
                    </span>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>→</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                      Day 14: {dim.day14}{dim.unit || '/10'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Priority Evolution */}
      {activeTab === 'priorities' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          <div style={{
            background: 'rgba(34, 197, 94, 0.05)',
            border: '1px solid rgba(34, 197, 94, 0.25)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-5)',
          }}>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: '#22c55e', marginBottom: 'var(--space-2)' }}>
              ✅ Week 1 Primary Focus: Substantially Improved
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
              Your response delay dropped from <strong>4.8 seconds to 2.3 seconds</strong>, and your usage of filler vocalizations decreased by <strong>68%</strong>. You are beginning answers immediately with anchoring phrases.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-5)',
          }}>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--primary)', marginBottom: 'var(--space-2)' }}>
              🎯 Emerging Week 3 Priority: Executive Nuance & Persuasion
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
              As you enter workplace simulations (meetings, negotiations, and interviews), focus on adapting register and diplomacy when stakes are high.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Week 3 Preview & Unlock */}
      {activeTab === 'week3' && (
        <div style={{
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-6)',
          textAlign: 'center',
          marginBottom: 'var(--space-6)',
        }}>
          <span className="badge badge--primary" style={{ marginBottom: 'var(--space-3)' }}>
            🔓 Week 3 Unlocked
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
            Communicate Professionally (Days 15–21)
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', maxWidth: '480px', margin: '0 auto var(--space-6)' }}>
            You will now apply your structural fluency in high-stakes environments: workplace meetings, interviews, data presentations, and negotiation scenarios.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-3)', maxWidth: '500px', margin: '0 auto var(--space-6)' }}>
            <div style={{ padding: 'var(--space-3)', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)' }}>
              🤝 Professional Meetings
            </div>
            <div style={{ padding: 'var(--space-3)', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)' }}>
              🎯 STAR Interviews
            </div>
            <div style={{ padding: 'var(--space-3)', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)' }}>
              💼 Real Negotiation
            </div>
            <div style={{ padding: 'var(--space-3)', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)' }}>
              📊 Data Presentations
            </div>
          </div>
        </div>
      )}

      {/* Action footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-default)', paddingTop: 'var(--space-5)' }}>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
          Streak: 🔥 {streak} Days | Total XP: +{earnedXp}
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Link href="/" className="btn btn--outline" onClick={handleFinishWeek2}>
            Return to Dashboard
          </Link>
          <Link href="/day/15" className="btn btn--primary" onClick={handleFinishWeek2}>
            Preview Week 3 (Day 15) →
          </Link>
        </div>
      </div>
    </div>
  );
}
