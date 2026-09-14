'use client';

import { useState } from 'react';
import { ActivityDefinition, LearnerTrack } from '@/types';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { formatDuration } from '@/hooks/useTimer';

interface EmailToVoiceActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
  track?: LearnerTrack;
  dayNumber?: number;
}

type EmailStep = 'read' | 'summarize' | 'voicemail' | 'register' | 'concise' | 'complete';

const EMAIL_SCENARIOS: Record<string, { subject: string; from: string; body: string; expectedAction: string }> = {
  professional: {
    subject: 'Re: Q3 Product Launch Timeline',
    from: 'Sarah Mitchell, VP of Product',
    body: `Dear Team,

Following our discussion with the engineering leads on Monday, I want to flag that the Q3 product launch timeline may need to be revised. The integration testing phase uncovered several critical issues that cannot be shipped to production without resolution.

The engineering team estimates they need an additional 10 business days to address these items. This would push the launch from September 15 to approximately October 1.

I'd like to request that each team lead prepare a brief impact assessment by end of day Thursday. Please include: (1) dependencies affected, (2) client commitments at risk, and (3) any mitigation options you can recommend.

We will reconvene Friday at 2 PM to finalize the revised timeline. Please confirm your attendance.

Regards,
Sarah`,
    expectedAction: 'Prepare an impact assessment covering dependencies, client commitments, and mitigation options by end of day Thursday. Attend Friday 2 PM meeting.',
  },
  student: {
    subject: 'Group Project — Updated Requirements',
    from: 'Professor Martinez',
    body: `Hi everyone,

I've updated the project requirements based on the feedback from last week's presentations. The main changes are:

1. The final report now needs to include a methodology section (minimum 500 words)
2. Each team member must submit an individual reflection (200 words) alongside the group submission
3. The presentation has been shortened from 20 minutes to 15 minutes maximum

The deadline has been extended by one week — new due date is November 22.

Please also note that the peer evaluation form is now mandatory and will count for 15% of the project grade. I'll send the form separately.

Let me know if you have any questions.

Best,
Prof. Martinez`,
    expectedAction: 'Add methodology section, prepare individual reflection, shorten presentation to 15 min, note new deadline Nov 22, complete peer evaluation.',
  },
  general: {
    subject: 'Community Garden — Spring Planning Meeting',
    from: 'Rachel, Garden Committee Chair',
    body: `Hi everyone,

Thanks for a wonderful winter season! As we prepare for spring, we need to address a few things:

The city council has approved our expansion request, which means we have 12 additional plots available. However, they've asked us to submit a maintenance plan by March 1. 

We also need to decide on the water system upgrade. The two options are: (A) a new irrigation system at $2,400 (shared cost), or (B) keeping the current hose system and adding two more water stations at $800 total.

There's a planning meeting this Saturday at 10 AM at the community center. Please come prepared with your plot preferences and any ideas for the new space.

If you can't attend, please email me your preferences by Friday.

Cheers,
Rachel`,
    expectedAction: 'Attend Saturday 10 AM meeting with plot preferences and ideas. If unable to attend, email preferences by Friday. Help decide on water system option.',
  },
};

const REGISTER_EXAMPLES = {
  formal: '"I would like to inform you that the timeline has been revised. Please prepare your impact assessments at your earliest convenience."',
  professional: '"The timeline is moving back about two weeks. Could each lead send me a quick impact summary by Thursday?"',
  casual: '"Heads up — the launch is getting pushed to October. We need to figure out what this means for everyone by Thursday."',
};

export default function EmailToVoiceActivity({
  activity,
  onComplete,
  onNext,
  isCompleted,
  savedResponse,
  track = 'general',
}: EmailToVoiceActivityProps) {
  const [step, setStep] = useState<EmailStep>('read');
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(isCompleted);

  const email = EMAIL_SCENARIOS[track] || EMAIL_SCENARIOS.general;

  const {
    isRecording, duration, startRecording, stopRecording,
    isPaused, pauseRecording, resumeRecording, audioUrl, error: recorderError,
  } = useAudioRecorder({ maxDuration: 120 });

  const saveAndAdvance = (nextStep: EmailStep) => {
    if (audioUrl) {
      setResponses(prev => ({ ...prev, [step]: audioUrl }));
    }
    setStep(nextStep);
  };

  const handleFinish = () => {
    setCompleted(true);
    onComplete({
      emailResponses: responses,
      emailSubject: email.subject,
      track,
      timestamp: new Date().toISOString(),
    });
  };

  if (completed || isCompleted) {
    return (
      <div className="glass-card glass-card--elevated animate-scale-in" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>📧</div>
        <h3 style={{ color: 'var(--text-primary)' }}>Email-to-Voice Complete</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>You practiced converting written messages into clear spoken communication.</p>
        <button className="btn btn--primary" onClick={onNext} style={{ marginTop: 'var(--space-6)' }}>Continue →</button>
      </div>
    );
  }

  // Privacy notice
  const PrivacyNotice = () => (
    <div style={{
      background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)',
      borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)',
      marginBottom: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)',
    }}>
      ⚠️ <strong>Privacy:</strong> Do not upload confidential, proprietary, or personally sensitive information unless your organization&apos;s policies allow it. This exercise uses platform-generated fictional content.
    </div>
  );

  // Read step
  if (step === 'read') {
    return (
      <div className="glass-card glass-card--elevated animate-slide-up" style={{ padding: 'var(--space-6)' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>Read This Message</h3>
        <PrivacyNotice />

        {/* Email display */}
        <div style={{
          background: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-5)', marginBottom: 'var(--space-4)',
          border: '1px solid var(--border-subtle)',
        }}>
          <div style={{ marginBottom: 'var(--space-3)' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>From: {email.from}</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 600 }}>Subject: {email.subject}</div>
          </div>
          <div style={{
            fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)',
            whiteSpace: 'pre-line',
          }}>
            {email.body}
          </div>
        </div>

        <div style={{
          background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', marginBottom: 'var(--space-4)',
        }}>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
            <strong>Extract the action using:</strong><br />
            CONTEXT (Why?) → KEY MESSAGE (What matters?) → ACTION (What needs to happen?) → OWNER (Who?) → TIMING (When?)
          </p>
        </div>

        <button className="btn btn--primary" onClick={() => setStep('summarize')} style={{ width: '100%' }}>
          Summarize This Message →
        </button>
      </div>
    );
  }

  // Recording steps
  const stepConfig: Record<string, { title: string; instruction: string; next: EmailStep; nextLabel: string }> = {
    summarize: {
      title: 'Verbal Summary',
      instruction: 'Explain what this message says and what action needs to be taken. Speak naturally — do not read the email word-for-word.',
      next: 'voicemail',
      nextLabel: 'Next: Voicemail Version →',
    },
    voicemail: {
      title: 'Convert to Voicemail',
      instruction: 'Leave a 30-second voicemail for a colleague explaining the key points. Keep it concise and spoken — not written.',
      next: 'register',
      nextLabel: 'Next: Register Comparison →',
    },
    register: {
      title: 'Register Awareness',
      instruction: 'Explain the same information casually, as if telling a close colleague over coffee. Notice how your language changes.',
      next: 'concise',
      nextLabel: 'Next: 30-Second Summary →',
    },
    concise: {
      title: '30-Second Summary',
      instruction: 'Distill the entire message into a 30-second spoken summary. What is the one thing the listener must know and do?',
      next: 'complete',
      nextLabel: 'Complete Activity',
    },
  };

  const current = stepConfig[step];
  if (!current) {
    return (
      <div className="glass-card glass-card--elevated animate-scale-in" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
        <button className="btn btn--primary" onClick={handleFinish}>Complete</button>
      </div>
    );
  }

  return (
    <div className="glass-card glass-card--elevated animate-slide-up" style={{ padding: 'var(--space-6)' }}>
      <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>{current.title}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
        {current.instruction}
      </p>

      {/* Register examples for register step */}
      {step === 'register' && (
        <div style={{
          background: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)',
          padding: 'var(--space-4)', marginBottom: 'var(--space-4)',
        }}>
          <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' }}>
            Same meaning, different registers:
          </div>
          {Object.entries(REGISTER_EXAMPLES).map(([key, value]) => (
            <div key={key} style={{ marginBottom: 'var(--space-2)' }}>
              <span style={{
                display: 'inline-block', fontSize: '10px', fontWeight: 700,
                textTransform: 'uppercase', marginRight: 'var(--space-2)',
                background: key === 'formal' ? 'rgba(99, 102, 241, 0.15)' : key === 'professional' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                padding: '2px 8px', borderRadius: 'var(--radius-full)',
                color: key === 'formal' ? 'var(--color-primary)' : key === 'professional' ? 'var(--color-success)' : 'var(--color-warning)',
              }}>
                {key}
              </span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', fontStyle: 'italic' }}>{value}</span>
            </div>
          ))}
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', margin: 'var(--space-2) 0 0', fontStyle: 'italic' }}>
            No version is universally &quot;better.&quot; Choose the right register for your audience.
          </p>
        </div>
      )}

      {/* Recording */}
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
              <button className="btn btn--primary" onClick={() => {
                if (current.next === 'complete') {
                  if (audioUrl) setResponses(prev => ({ ...prev, [step]: audioUrl }));
                  handleFinish();
                } else {
                  saveAndAdvance(current.next);
                }
              }}>
                {current.nextLabel}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
