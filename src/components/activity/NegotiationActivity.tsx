'use client';

import { useState } from 'react';
import { ActivityDefinition, LearnerTrack } from '@/types';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { formatDuration } from '@/hooks/useTimer';

interface NegotiationActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
  track?: LearnerTrack;
  dayNumber?: number;
}

type NegotiationStep = 'teach' | 'scenario' | 'propose' | 'counter' | 'compromise' | 'confirm' | 'complete';

const NEGOTIATION_LANGUAGE = [
  { category: 'Proposing', phrases: ['Would it be possible to...?', 'One option would be...', 'What if we...?'] },
  { category: 'Exploring', phrases: ['I could do X, but I\'d need...', 'If we move X, we could...', 'What are the constraints on...?'] },
  { category: 'Compromising', phrases: ['Could we agree on...?', 'As a compromise...', 'I\'m flexible on X if we can keep Y.'] },
  { category: 'Confirming', phrases: ['So we\'ve agreed that...', 'Just to confirm: the action is...', 'The deadline we agreed on is...'] },
];

const NEGOTIATION_SCENARIOS: Record<string, { title: string; situation: string; constraint: string; aiPosition: string }> = {
  professional: {
    title: 'Deadline Negotiation',
    situation: 'Your manager requests delivery of a major feature by Friday. You estimate it needs at least 10 business days for proper testing.',
    constraint: 'The client demo is scheduled for the following Monday, so missing Friday means the demo fails.',
    aiPosition: '"I understand your concern about quality, but we absolutely cannot push past Friday. The client demo is locked in. What can you do to make it work?"',
  },
  student: {
    title: 'Group Deadline Negotiation',
    situation: 'Your group project deadline is in 5 days, but two members haven\'t started their sections. You need more time or a redistribution of work.',
    constraint: 'The professor has already given one extension and may not grant another.',
    aiPosition: '"I get that we\'re behind, but we can\'t ask for another extension. That would hurt our grade. We need to figure out how to make this work with what we have."',
  },
  general: {
    title: 'Planning Conflict',
    situation: 'You\'re organizing a community event. The venue is available on Saturday, but half the volunteers can only come Sunday. Moving to Sunday costs $200 more.',
    constraint: 'The budget is tight, and the event must happen this weekend.',
    aiPosition: '"Sunday is better for people, but we can\'t afford the extra $200. Saturday is our only option unless we find more funding. What do you think?"',
  },
};

export default function NegotiationActivity({
  activity,
  onComplete,
  onNext,
  isCompleted,
  savedResponse,
  track = 'general',
}: NegotiationActivityProps) {
  const [step, setStep] = useState<NegotiationStep>('teach');
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(isCompleted);

  const scenario = NEGOTIATION_SCENARIOS[track] || NEGOTIATION_SCENARIOS.general;

  const {
    isRecording, duration, startRecording, stopRecording,
    isPaused, pauseRecording, resumeRecording, audioUrl, error: recorderError,
  } = useAudioRecorder({ maxDuration: 120 });

  const saveAndAdvance = (nextStep: NegotiationStep) => {
    if (audioUrl) {
      setResponses(prev => ({ ...prev, [step]: audioUrl }));
    }
    setStep(nextStep);
  };

  const handleFinish = () => {
    setCompleted(true);
    onComplete({
      negotiationResponses: responses,
      scenario: scenario.title,
      track,
      timestamp: new Date().toISOString(),
    });
  };

  if (completed || isCompleted) {
    return (
      <div className="glass-card glass-card--elevated animate-scale-in" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>🤝</div>
        <h3 style={{ color: 'var(--text-primary)' }}>Negotiation Complete</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>You practiced negotiation language, compromise, and agreement confirmation.</p>
        <button className="btn btn--primary" onClick={onNext} style={{ marginTop: 'var(--space-6)' }}>Continue →</button>
      </div>
    );
  }

  // Teach
  if (step === 'teach') {
    return (
      <div className="glass-card glass-card--elevated animate-slide-up" style={{ padding: 'var(--space-6)' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>Negotiation Language</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
          Negotiation in English isn&apos;t about winning — it&apos;s about communicating priorities, exploring alternatives, and reaching workable agreements.
        </p>

        <div style={{ display: 'grid', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
          {NEGOTIATION_LANGUAGE.map((group) => (
            <div key={group.category} style={{
              background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)',
              padding: 'var(--space-3) var(--space-4)', border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 'var(--space-2)', textTransform: 'uppercase' }}>
                {group.category}
              </div>
              <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                {group.phrases.map((p, i) => (
                  <li key={i} style={{ marginBottom: '2px' }}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <button className="btn btn--primary" onClick={() => setStep('scenario')} style={{ width: '100%' }}>
          Start Negotiation Scenario →
        </button>
      </div>
    );
  }

  // Scenario presentation
  if (step === 'scenario') {
    return (
      <div className="glass-card glass-card--elevated animate-slide-up" style={{ padding: 'var(--space-6)' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>{scenario.title}</h3>

        <div style={{
          background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-4)', marginBottom: 'var(--space-3)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>📋 Situation</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', margin: 0 }}>{scenario.situation}</p>
        </div>

        <div style={{
          background: 'rgba(239, 68, 68, 0.06)', borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-4)', marginBottom: 'var(--space-3)',
          border: '1px solid rgba(239, 68, 68, 0.15)',
        }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-error)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>⚠️ Constraint</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', margin: 0 }}>{scenario.constraint}</p>
        </div>

        <button className="btn btn--primary" onClick={() => setStep('propose')} style={{ width: '100%' }}>
          Begin Negotiation →
        </button>
      </div>
    );
  }

  // Negotiation steps
  const negotiationStepConfigs: Record<string, { title: string; aiSays: string; instruction: string; next: NegotiationStep; nextLabel: string }> = {
    propose: {
      title: 'Make Your Proposal',
      aiSays: scenario.aiPosition,
      instruction: 'Acknowledge their position and propose an alternative. Use phrases like "Would it be possible to..." or "One option would be..."',
      next: 'counter',
      nextLabel: 'Next: Handle Counter →',
    },
    counter: {
      title: 'Handle the Counter-Proposal',
      aiSays: '"I see what you\'re suggesting, but that doesn\'t fully solve our problem. We still need something deliverable by the deadline. Can you suggest a middle ground?"',
      instruction: 'Explore trade-offs. What can you offer? What do you need in return? Use "If we move X, we could..." or "I could do X, but I\'d need..."',
      next: 'compromise',
      nextLabel: 'Next: Reach Agreement →',
    },
    compromise: {
      title: 'Find the Compromise',
      aiSays: '"Okay, I think we can work with that. Let me understand exactly what you\'re proposing so we can finalize it."',
      instruction: 'State your final proposal clearly. What are you offering? What are the conditions? Be specific about actions, owners, and deadlines.',
      next: 'confirm',
      nextLabel: 'Next: Confirm Agreement →',
    },
    confirm: {
      title: 'Confirm the Agreement',
      aiSays: '"That sounds reasonable. Let\'s make sure we\'re on the same page."',
      instruction: 'Summarize: "So we\'ve agreed that..." Include the action, who is responsible, and the deadline.',
      next: 'complete',
      nextLabel: 'Complete Negotiation',
    },
  };

  const currentStep = negotiationStepConfigs[step];
  if (!currentStep) {
    return (
      <div className="glass-card glass-card--elevated animate-scale-in" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
        <button className="btn btn--primary" onClick={handleFinish}>Complete</button>
      </div>
    );
  }

  return (
    <div className="glass-card glass-card--elevated animate-slide-up" style={{ padding: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>{currentStep.title}</h3>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
          {step === 'propose' ? '1/4' : step === 'counter' ? '2/4' : step === 'compromise' ? '3/4' : '4/4'}
        </span>
      </div>

      {/* AI response */}
      <div style={{
        background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4)', marginBottom: 'var(--space-4)',
        borderLeft: '3px solid rgba(99, 102, 241, 0.5)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
          <span>👤</span>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-primary)' }}>
            {track === 'professional' ? 'Manager' : track === 'student' ? 'Group Member' : 'Organizer'}
          </span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', margin: 0, fontStyle: 'italic' }}>
          {currentStep.aiSays}
        </p>
      </div>

      {/* Instruction */}
      <div style={{
        background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)',
        borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)',
        marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)',
      }}>
        <strong>Your turn:</strong> {currentStep.instruction}
      </div>

      {/* Recording */}
      <div style={{ textAlign: 'center' }}>
        {recorderError && (
          <p style={{ color: 'var(--color-error)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>{recorderError}</p>
        )}

        {!isRecording && !audioUrl && (
          <button className="btn btn--primary" onClick={startRecording} style={{ minWidth: '200px' }}>
            🎤 Respond
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
                if (currentStep.next === 'complete') {
                  if (audioUrl) setResponses(prev => ({ ...prev, [step]: audioUrl }));
                  handleFinish();
                } else {
                  saveAndAdvance(currentStep.next);
                }
              }}>
                {currentStep.nextLabel}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
