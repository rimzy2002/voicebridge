'use client';

import { useState, useCallback } from 'react';
import { ActivityDefinition, LearnerTrack } from '@/types';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { formatDuration } from '@/hooks/useTimer';

interface NetworkingRoleplayActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
  track?: LearnerTrack;
  dayNumber?: number;
}

const NETWORKING_PHASES = [
  { id: 'open', label: 'Open the Conversation', tip: 'Use a context-specific opener: "What brought you to this event?" or "How do you know the organizer?"' },
  { id: 'common_ground', label: 'Find Common Ground', tip: 'Listen for shared interests. Ask relevant follow-up questions to build connection.' },
  { id: 'deepen', label: 'Deepen Appropriately', tip: 'Move beyond surface-level. Ask about current projects, challenges, or goals.' },
  { id: 'transition', label: 'Transition Naturally', tip: 'Shift the topic smoothly. "That reminds me..." or "Speaking of which..."' },
  { id: 'exit', label: 'Exit Politely', tip: '"It was great speaking with you." "I won\'t keep you, but it was nice meeting you."' },
];

const AI_RESPONSES: Record<string, Record<string, string>> = {
  professional: {
    open: "Hi! I'm Taylor — I'm in product development at a healthcare startup. This is my first time at this conference. What about you?",
    common_ground: "Oh that's interesting! I've been thinking about the intersection of technology and communication a lot lately. What kind of projects are you working on right now?",
    deepen: "That sounds really challenging but rewarding. How did you get into that particular area? Was it a planned career move?",
    transition: "You know, that actually connects to something the keynote speaker mentioned about industry trends shifting. Did you catch that part?",
    exit: "Well, it was really great talking with you! I should go catch the next session, but let me know if you'd like to continue this conversation sometime. Enjoy the rest of the conference!",
  },
  student: {
    open: "Hey! I'm Taylor — I'm studying computer science. Are you in the same program, or a different department?",
    common_ground: "Oh cool! I've been thinking about taking some courses in that area. What got you interested in it?",
    deepen: "That's really interesting. Have you had a chance to do any projects or internships related to that? I'm still figuring out what direction I want to go.",
    transition: "By the way, did you hear about the new research opportunity they announced last week? It seems like it could be related to what you're studying.",
    exit: "Great talking with you! I should head to my next class, but it was really nice meeting you. Maybe we'll see each other around!",
  },
  general: {
    open: "Hi there! I'm Taylor. Nice to see a new face here. How did you hear about this event?",
    common_ground: "That's great! I've been coming here for a while now. It's always nice to meet people with similar interests. What do you enjoy doing?",
    deepen: "Oh really? That sounds fascinating. How long have you been doing that? What's the most interesting part?",
    transition: "You know, that actually reminds me of something I read recently about community projects. Have you been involved in anything like that?",
    exit: "It was lovely meeting you! I'm going to grab something to drink, but I hope we get to chat again. Enjoy the rest of the evening!",
  },
};

export default function NetworkingRoleplayActivity({
  activity,
  onComplete,
  onNext,
  isCompleted,
  savedResponse,
  track = 'general',
}: NetworkingRoleplayActivityProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [phaseResponses, setPhaseResponses] = useState<Record<string, string>>({});
  const [showScorecard, setShowScorecard] = useState(false);
  const [completed, setCompleted] = useState(isCompleted);

  const phase = NETWORKING_PHASES[currentPhase];
  const aiResponse = AI_RESPONSES[track] || AI_RESPONSES.general;

  const {
    isRecording, duration, startRecording, stopRecording,
    isPaused, pauseRecording, resumeRecording, audioUrl, error: recorderError,
  } = useAudioRecorder({ maxDuration: 120 });

  const handleSaveAndNext = useCallback(() => {
    if (audioUrl && phase) {
      setPhaseResponses(prev => ({ ...prev, [phase.id]: audioUrl }));
    }
    if (currentPhase < NETWORKING_PHASES.length - 1) {
      setCurrentPhase(prev => prev + 1);
    } else {
      setShowScorecard(true);
    }
  }, [audioUrl, phase, currentPhase]);

  const handleFinish = () => {
    setCompleted(true);
    onComplete({
      networkingPhases: phaseResponses,
      completedPhases: Object.keys(phaseResponses).length,
      totalPhases: NETWORKING_PHASES.length,
      track,
      timestamp: new Date().toISOString(),
    });
  };

  if (completed || isCompleted) {
    return (
      <div className="glass-card glass-card--elevated animate-scale-in" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>🤝</div>
        <h3 style={{ color: 'var(--text-primary)' }}>Networking Complete</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>You practiced the full networking conversation flow.</p>
        <button className="btn btn--primary" onClick={onNext} style={{ marginTop: 'var(--space-6)' }}>Continue →</button>
      </div>
    );
  }

  if (showScorecard) {
    return (
      <div className="glass-card glass-card--elevated animate-scale-in" style={{ padding: 'var(--space-8)' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>Networking Scorecard</h3>
        <div style={{ display: 'grid', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
          {NETWORKING_PHASES.map(p => (
            <div key={p.id} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: 'var(--space-3) var(--space-4)',
              background: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{p.label}</span>
              <span style={{ color: phaseResponses[p.id] ? 'var(--color-success)' : 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>
                {phaseResponses[p.id] ? '✓' : '—'}
              </span>
            </div>
          ))}
        </div>

        <div style={{
          background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', marginBottom: 'var(--space-6)',
        }}>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
            <strong>Remember:</strong> Great networking is about genuine interest in the other person. Ask questions, listen actively, and exit gracefully. You don&apos;t need to be the most interesting person — be the most interested.
          </p>
        </div>

        <button className="btn btn--primary" onClick={handleFinish} style={{ width: '100%' }}>
          Complete Networking Activity
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card glass-card--elevated animate-slide-up" style={{ padding: 'var(--space-6)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: 'var(--text-lg)' }}>Networking Conversation</h3>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
          {currentPhase + 1} / {NETWORKING_PHASES.length}
        </span>
      </div>

      {/* Progress */}
      <div className="progress-bar" style={{ height: '4px', marginBottom: 'var(--space-4)' }}>
        <div className="progress-bar__fill" style={{ width: `${((currentPhase + 1) / NETWORKING_PHASES.length) * 100}%`, transition: 'width 0.5s ease' }} />
      </div>

      {/* Phase label */}
      <div style={{
        background: 'rgba(99, 102, 241, 0.12)', padding: 'var(--space-2) var(--space-3)',
        borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', color: 'var(--text-primary)',
        display: 'inline-block', marginBottom: 'var(--space-4)', fontWeight: 600,
      }}>
        🎯 {phase.label}
      </div>

      {/* AI partner dialogue */}
      <div style={{
        background: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4)', marginBottom: 'var(--space-4)',
        borderLeft: '3px solid rgba(99, 102, 241, 0.5)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
          <span>🧑</span>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-primary)' }}>Taylor</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', margin: 0, lineHeight: 'var(--leading-relaxed)' }}>
          {aiResponse[phase.id]}
        </p>
      </div>

      {/* Tip */}
      <div style={{
        background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)',
        borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)',
        marginBottom: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)',
      }}>
        💡 {phase.tip}
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
              <button className="btn btn--primary" onClick={handleSaveAndNext}>
                {currentPhase < NETWORKING_PHASES.length - 1 ? 'Continue Conversation →' : 'View Scorecard'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
