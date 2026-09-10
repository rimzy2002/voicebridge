'use client';

import { useState, useCallback } from 'react';
import { ActivityDefinition, LearnerTrack } from '@/types';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { formatDuration } from '@/hooks/useTimer';

interface MeetingSimulationActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
  track?: LearnerTrack;
  dayNumber?: number;
}

interface MeetingParticipant {
  name: string;
  role: string;
  avatar: string;
}

const MEETING_PARTICIPANTS: Record<string, MeetingParticipant[]> = {
  professional: [
    { name: 'Alex', role: 'Project Manager', avatar: '👤' },
    { name: 'Maria', role: 'Design Lead', avatar: '👩' },
    { name: 'James', role: 'Engineering', avatar: '👨' },
  ],
  student: [
    { name: 'Jordan', role: 'Group Leader', avatar: '👤' },
    { name: 'Sam', role: 'Researcher', avatar: '🧑' },
    { name: 'Taylor', role: 'Presenter', avatar: '👩' },
  ],
  general: [
    { name: 'Pat', role: 'Organizer', avatar: '👤' },
    { name: 'Morgan', role: 'Volunteer', avatar: '🧑' },
    { name: 'Casey', role: 'Treasurer', avatar: '👩' },
  ],
};

const MEETING_PHASES = [
  { id: 'opener', label: 'Meeting Opener', instruction: 'Open or respond to the meeting opening. Set the tone for the discussion.' },
  { id: 'update', label: 'Give Your Update', instruction: 'Use the STATUS → PROGRESS → ISSUE → NEXT STEP framework to deliver a concise update.' },
  { id: 'idea', label: 'Contribute an Idea', instruction: 'Propose an idea using phrases like "One option might be..." or "I\'d suggest..."' },
  { id: 'disagree', label: 'Handle Disagreement', instruction: 'A participant disagrees with your idea. Respond respectfully while defending your position or finding middle ground.' },
  { id: 'clarify', label: 'Ask for Clarification', instruction: 'Something is unclear. Ask a useful clarification question using "Could you clarify..." or "Just to make sure I understand..."' },
  { id: 'summarize', label: 'Action Summary', instruction: 'Summarize: What was decided? Who is responsible? What is the next action? When is the deadline?' },
];

export default function MeetingSimulationActivity({
  activity,
  onComplete,
  onNext,
  isCompleted,
  savedResponse,
  track = 'general',
}: MeetingSimulationActivityProps) {
  const config = activity.config || {};
  const [currentPhase, setCurrentPhase] = useState(0);
  const [phaseResponses, setPhaseResponses] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(isCompleted);

  const participants = MEETING_PARTICIPANTS[track] || MEETING_PARTICIPANTS.general;
  const phase = MEETING_PHASES[currentPhase];
  const totalPhases = MEETING_PHASES.length;

  const {
    isRecording,
    isPaused,
    duration,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    audioUrl,
    error: recorderError,
  } = useAudioRecorder({ maxDuration: 120 });

  const meetingDialogue: Record<string, string> = {
    opener: track === 'professional'
      ? `Thanks for joining, everyone. We need to discuss the project timeline. ${participants[0].name}, let's start with you — then we'll hear from everyone.`
      : track === 'student'
        ? `Hey everyone! So our presentation is next week. Let's figure out where we are and what still needs to happen.`
        : `Thanks for coming, everyone. We need to finalize plans for the event. Let's go around and share updates.`,
    update: `${participants[1].name}: I've completed the research phase, but I'm still waiting on the data we discussed. We might need to adjust the timeline.`,
    idea: `${participants[2].name}: I think we should divide the remaining work into smaller chunks and set daily check-ins. What does everyone think?`,
    disagree: `${participants[1].name}: I'm not sure that will work. Daily check-ins might slow us down — we already have enough meetings. I'd prefer a different approach.`,
    clarify: `${participants[0].name}: Just to clarify — when you mentioned the data issue, are you saying the entire dataset is delayed, or just the secondary analysis?`,
    summarize: `${participants[0].name}: Great discussion. Before we wrap up, can someone summarize what we've agreed on and the next steps?`,
  };

  const handleRecordingComplete = useCallback(() => {
    if (audioUrl && phase) {
      setPhaseResponses(prev => ({
        ...prev,
        [phase.id]: audioUrl,
      }));
    }
  }, [audioUrl, phase]);

  const handlePhaseNext = () => {
    handleRecordingComplete();
    if (currentPhase < totalPhases - 1) {
      setCurrentPhase(prev => prev + 1);
    } else {
      setShowFeedback(true);
    }
  };

  const handleFinish = () => {
    setCompleted(true);
    onComplete({
      meetingPhases: phaseResponses,
      totalPhases,
      completedPhases: Object.keys(phaseResponses).length,
      track,
      timestamp: new Date().toISOString(),
    });
  };

  if (completed || isCompleted) {
    return (
      <div className="glass-card glass-card--elevated animate-scale-in" style={{ padding: 'var(--space-8)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>🏢</div>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Meeting Complete</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
            You participated in all {totalPhases} meeting phases. Great contribution!
          </p>
        </div>
        <button className="btn btn--primary" onClick={onNext} style={{ width: '100%', marginTop: 'var(--space-6)' }}>
          Continue →
        </button>
      </div>
    );
  }

  if (showFeedback) {
    return (
      <div className="glass-card glass-card--elevated animate-scale-in" style={{ padding: 'var(--space-8)' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>Meeting Scorecard</h3>

        <div style={{ display: 'grid', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
          {MEETING_PHASES.map((p) => (
            <div key={p.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: 'var(--space-3) var(--space-4)',
              background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{p.label}</span>
              <span style={{ fontSize: 'var(--text-sm)', color: phaseResponses[p.id] ? 'var(--color-success)' : 'var(--text-tertiary)' }}>
                {phaseResponses[p.id] ? '✓ Completed' : '— Skipped'}
              </span>
            </div>
          ))}
        </div>

        <div style={{
          background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', marginBottom: 'var(--space-6)',
        }}>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
            <strong>Key Insight:</strong> Effective meeting participation means contributing concisely, asking useful questions,
            and summarizing actions clearly. The goal is to add value — not to speak the most.
          </p>
        </div>

        <button className="btn btn--primary" onClick={handleFinish} style={{ width: '100%' }}>
          Complete Meeting Activity
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card glass-card--elevated animate-slide-up" style={{ padding: 'var(--space-6)' }}>
      {/* Meeting Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <div>
          <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: 'var(--text-lg)' }}>
            {(config.meetingTitle as string) || 'Team Meeting Simulation'}
          </h3>
          <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)', margin: 'var(--space-1) 0 0' }}>
            Phase {currentPhase + 1} of {totalPhases}
          </p>
        </div>
        <div style={{
          background: 'rgba(99, 102, 241, 0.15)', padding: 'var(--space-2) var(--space-3)',
          borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', color: 'var(--text-primary)',
        }}>
          🎯 {phase.label}
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <div className="progress-bar" style={{ height: '4px' }}>
          <div className="progress-bar__fill" style={{ width: `${((currentPhase + 1) / totalPhases) * 100}%`, transition: 'width 0.5s ease' }} />
        </div>
      </div>

      {/* Participants */}
      <div style={{
        display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)',
        padding: 'var(--space-3)', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)',
      }}>
        {participants.map(p => (
          <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)' }}>
            <span>{p.avatar}</span>
            <div>
              <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{p.name}</div>
              <div style={{ color: 'var(--text-tertiary)' }}>{p.role}</div>
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)' }}>
          <span>🎤</span>
          <div>
            <div style={{ color: 'var(--color-primary)', fontWeight: 600 }}>You</div>
            <div style={{ color: 'var(--text-tertiary)' }}>Participant</div>
          </div>
        </div>
      </div>

      {/* Meeting Dialogue */}
      <div style={{
        background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4)', marginBottom: 'var(--space-4)',
        borderLeft: '3px solid rgba(99, 102, 241, 0.5)',
      }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', margin: 0, lineHeight: 'var(--leading-relaxed)' }}>
          {meetingDialogue[phase.id]}
        </p>
      </div>

      {/* Your Turn Instruction */}
      <div style={{
        background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)',
        borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', marginBottom: 'var(--space-4)',
      }}>
        <p style={{ color: 'var(--text-primary)', fontSize: 'var(--text-sm)', margin: 0 }}>
          <strong>Your turn:</strong> {phase.instruction}
        </p>
      </div>

      {/* Recording Controls */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
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
              <button className="btn btn--primary" onClick={stopRecording}>
                ⏹ Stop
              </button>
            </div>
          </div>
        )}

        {audioUrl && !isRecording && (
          <div>
            <audio src={audioUrl} controls style={{ width: '100%', marginBottom: 'var(--space-3)' }} />
            <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center' }}>
              <button className="btn btn--ghost" onClick={startRecording}>
                🔄 Re-record
              </button>
              <button className="btn btn--primary" onClick={handlePhaseNext}>
                {currentPhase < totalPhases - 1 ? 'Next Phase →' : 'View Scorecard'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Meeting Language Tips */}
      {phase.id === 'update' && (
        <div style={{
          background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)',
          padding: 'var(--space-3) var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)',
        }}>
          <strong>Update Framework:</strong> STATUS (Where are we?) → PROGRESS (What happened?) → ISSUE (What is blocking?) → NEXT STEP (What happens next?)
        </div>
      )}

      {phase.id === 'disagree' && (
        <div style={{
          background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)',
          padding: 'var(--space-3) var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)',
        }}>
          <strong>Useful language:</strong> &quot;I see your point, however...&quot; &quot;Another perspective might be...&quot; &quot;What if we considered...&quot;
        </div>
      )}

      {phase.id === 'summarize' && (
        <div style={{
          background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)',
          padding: 'var(--space-3) var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)',
        }}>
          <strong>Summary format:</strong> &quot;So, just to summarize...&quot; → Decision → Owner → Next action → Deadline
        </div>
      )}
    </div>
  );
}
