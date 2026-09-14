'use client';

import { useState } from 'react';
import { ActivityDefinition, LearnerTrack } from '@/types';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { formatDuration } from '@/hooks/useTimer';

interface FeedbackActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
  track?: LearnerTrack;
  dayNumber?: number;
}

type FeedbackStep = 'sbi_teach' | 'sbi_practice' | 'receive' | 'mistake' | 'apology' | 'request_help' | 'hostile' | 'roleplay' | 'complete';

const SBI_EXAMPLE = {
  bad: '"You are unreliable."',
  good: {
    situation: 'During our Monday stand-up meeting...',
    behavior: '...I noticed you didn\'t have your status update prepared for the second time this sprint...',
    impact: '...which meant we couldn\'t identify the blocker until Wednesday, delaying the release by two days.',
  },
};

const DIFFICULT_SCENARIOS: Record<string, { label: string; scenario: string }[]> = {
  professional: [
    { label: 'Missed Deadline', scenario: 'A team member missed an important deadline, affecting the whole project timeline.' },
    { label: 'Poor-Quality Work', scenario: 'You received work from a colleague that doesn\'t meet the agreed standard.' },
    { label: 'Unfair Workload', scenario: 'You notice the work distribution is significantly uneven on your team.' },
    { label: 'Customer Complaint', scenario: 'A client has complained about communication delays from your team.' },
  ],
  student: [
    { label: 'Group Member Not Contributing', scenario: 'A group member hasn\'t done their share of the project work.' },
    { label: 'Unfair Grade Distribution', scenario: 'Group grades don\'t reflect individual effort levels.' },
    { label: 'Disagreement on Approach', scenario: 'Your group can\'t agree on the project direction.' },
    { label: 'Missed Meeting', scenario: 'A group member keeps missing scheduled meetings.' },
  ],
  general: [
    { label: 'Misunderstanding', scenario: 'A misunderstanding has caused tension between you and a friend or neighbor.' },
    { label: 'Broken Agreement', scenario: 'Someone didn\'t follow through on something you agreed on together.' },
    { label: 'Service Complaint', scenario: 'You need to address a problem with a service provider professionally.' },
    { label: 'Planning Conflict', scenario: 'There\'s a disagreement about how to organize a shared event.' },
  ],
};

const BUFFER_PHRASES = [
  'That\'s a fair question. Let me address that.',
  'I understand the concern. Based on what we know...',
  'Let me clarify that point.',
  'That\'s something we\'d need to examine further.',
  'I don\'t have that specific figure, but I can say...',
  'I take responsibility for that. Here\'s what happened...',
];

export default function FeedbackActivity({
  activity,
  onComplete,
  onNext,
  isCompleted,
  savedResponse,
  track = 'general',
}: FeedbackActivityProps) {
  const config = activity.config || {};
  const [step, setStep] = useState<FeedbackStep>(config.startStep as FeedbackStep || 'sbi_teach');
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [completed, setCompleted] = useState(isCompleted);

  const scenarios = DIFFICULT_SCENARIOS[track] || DIFFICULT_SCENARIOS.general;

  const {
    isRecording, duration, startRecording, stopRecording,
    isPaused, pauseRecording, resumeRecording, audioUrl, error: recorderError,
  } = useAudioRecorder({ maxDuration: 180 });

  const saveAndAdvance = (nextStep: FeedbackStep) => {
    if (audioUrl) {
      setResponses(prev => ({ ...prev, [step]: audioUrl }));
    }
    setStep(nextStep);
  };

  const handleFinish = () => {
    setCompleted(true);
    onComplete({
      feedbackResponses: responses,
      selectedScenario: scenarios[selectedScenario]?.label,
      track,
      timestamp: new Date().toISOString(),
    });
  };

  if (completed || isCompleted) {
    return (
      <div className="glass-card glass-card--elevated animate-scale-in" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>🤝</div>
        <h3 style={{ color: 'var(--text-primary)' }}>Feedback Activity Complete</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>You practiced giving constructive, specific feedback.</p>
        <button className="btn btn--primary" onClick={onNext} style={{ marginTop: 'var(--space-6)' }}>Continue →</button>
      </div>
    );
  }

  // SBI Teaching
  if (step === 'sbi_teach') {
    return (
      <div className="glass-card glass-card--elevated animate-slide-up" style={{ padding: 'var(--space-6)' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>SBI Feedback Model</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
          The SBI model helps you give feedback that is specific, fair, and actionable — without personal attacks.
        </p>

        {/* Bad example */}
        <div style={{
          background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', marginBottom: 'var(--space-4)',
        }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-error)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>❌ Personal Attack</div>
          <p style={{ color: 'var(--text-primary)', fontSize: 'var(--text-sm)', margin: 0, fontStyle: 'italic' }}>{SBI_EXAMPLE.bad}</p>
        </div>

        {/* Good example with SBI breakdown */}
        <div style={{
          background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', marginBottom: 'var(--space-4)',
        }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)', fontWeight: 600, marginBottom: 'var(--space-3)' }}>✓ SBI Feedback</div>
          {Object.entries(SBI_EXAMPLE.good).map(([key, value]) => (
            <div key={key} style={{ marginBottom: 'var(--space-2)' }}>
              <span style={{
                display: 'inline-block', fontSize: '10px', fontWeight: 700,
                color: 'var(--color-primary)', textTransform: 'uppercase',
                marginRight: 'var(--space-2)',
                background: 'rgba(99, 102, 241, 0.15)', padding: '2px 8px', borderRadius: 'var(--radius-full)',
              }}>
                {key}
              </span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{value}</span>
            </div>
          ))}
        </div>

        <div style={{
          background: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)',
          padding: 'var(--space-3) var(--space-4)', marginBottom: 'var(--space-4)',
          fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)',
        }}>
          <strong>Rules:</strong> Describe observable behavior, not personality. State impact, not motive. After SBI, you can add a request: &quot;What I&apos;d like us to do next is...&quot;
        </div>

        <button className="btn btn--primary" onClick={() => setStep('sbi_practice')} style={{ width: '100%' }}>
          Practice SBI →
        </button>
      </div>
    );
  }

  // SBI Practice
  if (step === 'sbi_practice') {
    return (
      <div className="glass-card glass-card--elevated animate-slide-up" style={{ padding: 'var(--space-6)' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>SBI Practice</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
          Transform this into SBI feedback: <em>&quot;You are unreliable.&quot;</em>
        </p>
        <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)', marginBottom: 'var(--space-4)' }}>
          Invent a realistic Situation, describe specific observable Behavior, and explain the Impact. Then add a &quot;Next Step&quot; request.
        </p>

        <RecordingControls
          isRecording={isRecording} duration={duration} audioUrl={audioUrl}
          isPaused={isPaused} recorderError={recorderError}
          startRecording={startRecording} stopRecording={stopRecording}
          pauseRecording={pauseRecording} resumeRecording={resumeRecording}
          onNext={() => saveAndAdvance('mistake')}
          nextLabel="Next: Explain a Mistake →"
        />
      </div>
    );
  }

  // Explain a Mistake
  if (step === 'mistake') {
    return (
      <div className="glass-card glass-card--elevated animate-slide-up" style={{ padding: 'var(--space-6)' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Explain a Mistake</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
          Scenario: You made an error that affected someone else. Explain it professionally.
        </p>

        <div style={{
          background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', marginBottom: 'var(--space-4)',
        }}>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
            <strong>Structure:</strong><br />
            1. What happened<br />
            2. Responsibility (own it)<br />
            3. Impact on others<br />
            4. Correction taken<br />
            5. Prevention plan
          </p>
        </div>

        <div style={{
          background: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)',
          padding: 'var(--space-3) var(--space-4)', marginBottom: 'var(--space-4)',
          fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)',
        }}>
          ⚠️ Avoid excessive excuses. Keep the apology proportional to the mistake.
        </div>

        <RecordingControls
          isRecording={isRecording} duration={duration} audioUrl={audioUrl}
          isPaused={isPaused} recorderError={recorderError}
          startRecording={startRecording} stopRecording={stopRecording}
          pauseRecording={pauseRecording} resumeRecording={resumeRecording}
          onNext={() => saveAndAdvance('hostile')}
          nextLabel="Next: Handle a Challenge →"
        />
      </div>
    );
  }

  // Hostile / Challenging Question
  if (step === 'hostile') {
    return (
      <div className="glass-card glass-card--elevated animate-slide-up" style={{ padding: 'var(--space-6)' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Handle a Challenging Question</h3>

        <div style={{
          background: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-4)', marginBottom: 'var(--space-4)',
          borderLeft: '3px solid rgba(239, 68, 68, 0.5)',
        }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' }}>🔥 Stakeholder Challenge</div>
          <p style={{ color: 'var(--text-primary)', fontSize: 'var(--text-sm)', margin: 0, fontWeight: 500 }}>
            &quot;I don&apos;t think your plan will work. The last time we tried something similar, it failed completely.&quot;
          </p>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>
          Respond using: <strong>Acknowledge → Answer → Evidence/Alternative</strong>
        </p>

        {/* Buffer phrases */}
        <div style={{
          background: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)',
          padding: 'var(--space-3) var(--space-4)', marginBottom: 'var(--space-4)',
        }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>Buffer Phrases:</div>
          <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
            {BUFFER_PHRASES.slice(0, 4).map((phrase, i) => (
              <li key={i} style={{ marginBottom: 'var(--space-1)' }}>{phrase}</li>
            ))}
          </ul>
        </div>

        <RecordingControls
          isRecording={isRecording} duration={duration} audioUrl={audioUrl}
          isPaused={isPaused} recorderError={recorderError}
          startRecording={startRecording} stopRecording={stopRecording}
          pauseRecording={pauseRecording} resumeRecording={resumeRecording}
          onNext={() => saveAndAdvance('roleplay')}
          nextLabel="Next: Difficult Conversation →"
        />
      </div>
    );
  }

  // Difficult Conversation Roleplay
  if (step === 'roleplay') {
    return (
      <div className="glass-card glass-card--elevated animate-slide-up" style={{ padding: 'var(--space-6)' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Difficult Conversation Roleplay</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
          Choose a scenario and respond as if you were in the situation. Speak for 60–90 seconds.
        </p>

        <div style={{ display: 'grid', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
          {scenarios.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelectedScenario(i)}
              style={{
                padding: 'var(--space-3) var(--space-4)',
                background: selectedScenario === i ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-surface-subtle)',
                border: selectedScenario === i ? '2px solid rgba(99, 102, 241, 0.5)' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'left', color: 'var(--text-primary)',
              }}
            >
              <div style={{ fontWeight: 500, fontSize: 'var(--text-sm)' }}>{s.label}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: '2px' }}>{s.scenario}</div>
            </button>
          ))}
        </div>

        <RecordingControls
          isRecording={isRecording} duration={duration} audioUrl={audioUrl}
          isPaused={isPaused} recorderError={recorderError}
          startRecording={startRecording} stopRecording={stopRecording}
          pauseRecording={pauseRecording} resumeRecording={resumeRecording}
          onNext={handleFinish}
          nextLabel="Complete Activity"
        />
      </div>
    );
  }

  // Fallback complete
  return (
    <div className="glass-card glass-card--elevated animate-scale-in" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
      <button className="btn btn--primary" onClick={handleFinish}>Complete</button>
    </div>
  );
}

// --- Reusable Recording Controls ---
function RecordingControls({
  isRecording, duration, audioUrl, isPaused, recorderError,
  startRecording, stopRecording, pauseRecording, resumeRecording,
  onNext, nextLabel,
}: {
  isRecording: boolean; duration: number; audioUrl: string | null; isPaused: boolean; recorderError: string | null;
  startRecording: () => void; stopRecording: () => void; pauseRecording: () => void; resumeRecording: () => void;
  onNext: () => void; nextLabel: string;
}) {
  return (
    <div style={{ textAlign: 'center' }}>
      {recorderError && (
        <p style={{ color: 'var(--color-error)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>{recorderError}</p>
      )}

      {!isRecording && !audioUrl && (
        <button className="btn btn--primary" onClick={startRecording} style={{ minWidth: '200px' }}>
          🎤 Start Speaking
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
            <button className="btn btn--primary" onClick={onNext}>{nextLabel}</button>
          </div>
        </div>
      )}
    </div>
  );
}
