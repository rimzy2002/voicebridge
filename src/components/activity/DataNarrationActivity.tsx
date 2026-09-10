'use client';

import { useState } from 'react';
import { ActivityDefinition, LearnerTrack, DataPoint } from '@/types';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { formatDuration } from '@/hooks/useTimer';

interface DataNarrationActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
  track?: LearnerTrack;
  dayNumber?: number;
}

const SAMPLE_DATASETS: Record<string, { title: string; data: DataPoint[]; xLabel: string; yLabel: string }> = {
  professional: {
    title: 'Quarterly Revenue Growth (2024-2025)',
    data: [
      { label: 'Q1 2024', value: 2.4, unit: 'M' },
      { label: 'Q2 2024', value: 2.8, unit: 'M' },
      { label: 'Q3 2024', value: 2.6, unit: 'M' },
      { label: 'Q4 2024', value: 3.5, unit: 'M' },
      { label: 'Q1 2025', value: 3.2, unit: 'M' },
      { label: 'Q2 2025', value: 4.1, unit: 'M' },
    ],
    xLabel: 'Quarter',
    yLabel: 'Revenue ($M)',
  },
  student: {
    title: 'Student Participation in Online Learning (2022-2025)',
    data: [
      { label: '2022', value: 45, unit: '%' },
      { label: '2023', value: 62, unit: '%' },
      { label: '2024', value: 71, unit: '%' },
      { label: '2025', value: 78, unit: '%' },
    ],
    xLabel: 'Year',
    yLabel: 'Participation Rate (%)',
  },
  general: {
    title: 'Monthly Park Visitors (Jan–Jun)',
    data: [
      { label: 'Jan', value: 1200 },
      { label: 'Feb', value: 1350 },
      { label: 'Mar', value: 2100 },
      { label: 'Apr', value: 3400 },
      { label: 'May', value: 4200 },
      { label: 'Jun', value: 3800 },
    ],
    xLabel: 'Month',
    yLabel: 'Visitors',
  },
};

const TREND_VOCABULARY = [
  { term: 'increase / rise / climb', example: 'Revenue increased steadily over the period.' },
  { term: 'surge (very strong rise)', example: 'There was a surge in Q4 sales.' },
  { term: 'decline / fall / drop', example: 'Participation dropped slightly in March.' },
  { term: 'fluctuate', example: 'The numbers fluctuated between 2.4 and 3.5 million.' },
  { term: 'remain stable / plateau', example: 'Visitor numbers remained stable during winter.' },
  { term: 'peak', example: 'Attendance peaked in May at 4,200 visitors.' },
  { term: 'reach a low', example: 'Sales reached a low in the second quarter.' },
  { term: 'gradually / steadily', example: 'The trend gradually improved over time.' },
  { term: 'sharply / significantly', example: 'Revenue rose sharply in Q4.' },
  { term: 'slightly', example: 'There was a slight dip between Q2 and Q3.' },
];

export default function DataNarrationActivity({
  activity,
  onComplete,
  onNext,
  isCompleted,
  savedResponse,
  track = 'general',
}: DataNarrationActivityProps) {
  const config = activity.config || {};
  const [step, setStep] = useState<'vocab' | 'chart' | 'describe' | 'no_visual' | 'audience' | 'complete'>('vocab');
  const [completed, setCompleted] = useState(isCompleted);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [showDataTable, setShowDataTable] = useState(false);

  const dataset = SAMPLE_DATASETS[track] || SAMPLE_DATASETS.general;
  const maxValue = Math.max(...dataset.data.map(d => d.value));

  const {
    isRecording, duration, startRecording, stopRecording,
    isPaused, pauseRecording, resumeRecording, audioUrl, error: recorderError,
  } = useAudioRecorder({ maxDuration: 120 });

  const saveAndAdvance = (nextStep: typeof step) => {
    if (audioUrl) {
      setResponses(prev => ({ ...prev, [step]: audioUrl }));
    }
    setStep(nextStep);
  };

  const handleFinish = () => {
    setCompleted(true);
    onComplete({
      dataResponses: responses,
      dataset: dataset.title,
      track,
      timestamp: new Date().toISOString(),
    });
  };

  if (completed || isCompleted) {
    return (
      <div className="glass-card glass-card--elevated animate-scale-in" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>📊</div>
        <h3 style={{ color: 'var(--text-primary)' }}>Data Narration Complete</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>You practiced explaining data trends clearly and accurately.</p>
        <button className="btn btn--primary" onClick={onNext} style={{ marginTop: 'var(--space-6)' }}>Continue →</button>
      </div>
    );
  }

  // Vocabulary step
  if (step === 'vocab') {
    return (
      <div className="glass-card glass-card--elevated animate-slide-up" style={{ padding: 'var(--space-6)' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>Data Vocabulary</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
          Before describing data, review key vocabulary for trends and changes. These words help you explain patterns precisely.
        </p>

        <div style={{ display: 'grid', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
          {TREND_VOCABULARY.map((item, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 'var(--space-3)',
              padding: 'var(--space-3) var(--space-4)',
              background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 500 }}>{item.term}</span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>{item.example}</span>
            </div>
          ))}
        </div>

        <div style={{
          background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', marginBottom: 'var(--space-4)',
        }}>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
            <strong>Framework: WHAT → EVIDENCE → INTERPRETATION</strong><br />
            What happened? → What numbers matter? → Why might it matter?<br />
            Use &quot;One possible explanation is...&quot; when inference is not proven.
          </p>
        </div>

        <button className="btn btn--primary" onClick={() => setStep('chart')} style={{ width: '100%' }}>
          View Data →
        </button>
      </div>
    );
  }

  // Chart / describe / no_visual / audience steps
  return (
    <div className="glass-card glass-card--elevated animate-slide-up" style={{ padding: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>
          {step === 'chart' ? 'Describe This Data' : step === 'no_visual' ? 'Explain Without the Chart' : step === 'audience' ? 'Audience Adaptation' : 'Results'}
        </h3>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
          {step === 'chart' ? 'Step 2/4' : step === 'no_visual' ? 'Step 3/4' : step === 'audience' ? 'Step 4/4' : ''}
        </span>
      </div>

      {/* Chart visualization */}
      {(step === 'chart' || step === 'describe') && (
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <h4 style={{ color: 'var(--text-primary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>
            {dataset.title}
          </h4>

          {/* CSS Bar Chart */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4)', marginBottom: 'var(--space-3)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--space-2)', height: '160px' }}>
              {dataset.data.map((d, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: 'var(--space-1)' }}>
                    {d.value}{d.unit || ''}
                  </span>
                  <div style={{
                    width: '100%', maxWidth: '48px',
                    height: `${(d.value / maxValue) * 100}%`,
                    background: 'linear-gradient(to top, rgba(99, 102, 241, 0.6), rgba(99, 102, 241, 0.9))',
                    borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                    transition: 'height 0.5s ease',
                    minHeight: '8px',
                  }} />
                  <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)', textAlign: 'center' }}>
                    {d.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Accessible data table toggle */}
          <button
            className="btn btn--ghost"
            onClick={() => setShowDataTable(!showDataTable)}
            style={{ fontSize: 'var(--text-xs)', marginBottom: 'var(--space-3)' }}
          >
            {showDataTable ? 'Hide' : 'Show'} Data Table
          </button>

          {showDataTable && (
            <table style={{ width: '100%', fontSize: 'var(--text-xs)', borderCollapse: 'collapse', marginBottom: 'var(--space-3)' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: 'var(--space-2)', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>{dataset.xLabel}</th>
                  <th style={{ textAlign: 'right', padding: 'var(--space-2)', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>{dataset.yLabel}</th>
                </tr>
              </thead>
              <tbody>
                {dataset.data.map((d, i) => (
                  <tr key={i}>
                    <td style={{ padding: 'var(--space-2)', color: 'var(--text-secondary)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{d.label}</td>
                    <td style={{ padding: 'var(--space-2)', color: 'var(--text-primary)', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{d.value}{d.unit || ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Instructions per step */}
      <div style={{
        background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)',
        borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)',
        marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)',
      }}>
        {step === 'chart' && (
          <>
            <strong>Task:</strong> Describe the key trends in this data for 60–90 seconds. Use the WHAT → EVIDENCE → INTERPRETATION framework.
            Remember: distinguish between facts and inferences.
          </>
        )}
        {step === 'no_visual' && (
          <>
            <strong>Task:</strong> The chart is now hidden. Explain the key findings verbally from memory in 60 seconds. What were the most important patterns?
          </>
        )}
        {step === 'audience' && (
          <>
            <strong>Task:</strong> Explain the same data to a <em>general audience</em> (non-specialist). Use simpler language, avoid jargon, and focus on the main takeaway.
          </>
        )}
      </div>

      {/* Recording */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
        {recorderError && (
          <p style={{ color: 'var(--color-error)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>{recorderError}</p>
        )}

        {!isRecording && !audioUrl && (
          <button className="btn btn--primary" onClick={startRecording} style={{ minWidth: '200px' }}>
            🎤 Describe the Data
          </button>
        )}

        {isRecording && (
          <div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-error)', marginBottom: 'var(--space-2)', fontVariantNumeric: 'tabular-nums' }}>
              {formatDuration(duration)}
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center' }}>
              <button className="btn btn--ghost" onClick={isPaused ? resumeRecording : pauseRecording}>
                {isPaused ? '▶ Resume' : '⏸ Pause'}
              </button>
              <button className="btn btn--primary" onClick={stopRecording}>⏹ Stop</button>
            </div>
          </div>
        )}

        {audioUrl && !isRecording && (
          <div>
            <audio src={audioUrl} controls style={{ width: '100%', marginBottom: 'var(--space-3)' }} />
            <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center' }}>
              <button className="btn btn--ghost" onClick={startRecording}>🔄 Re-record</button>
              <button className="btn btn--primary" onClick={() => {
                if (step === 'chart') saveAndAdvance('no_visual');
                else if (step === 'no_visual') saveAndAdvance('audience');
                else if (step === 'audience') saveAndAdvance('complete');
              }}>
                {step === 'audience' ? 'View Results' : 'Next Step →'}
              </button>
            </div>
          </div>
        )}
      </div>

      {step === 'complete' && (
        <button className="btn btn--primary" onClick={handleFinish} style={{ width: '100%' }}>
          Complete Data Narration
        </button>
      )}
    </div>
  );
}
