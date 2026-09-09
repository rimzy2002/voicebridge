'use client';

import { useState, useEffect, useMemo } from 'react';
import { ActivityDefinition } from '@/types';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { formatDuration } from '@/hooks/useTimer';

interface RecordingActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
}

interface MultiRoundConfig {
  label: string;
  durationSeconds: number;
  guidance?: string;
}

const DEFAULT_STORY_WORDS = [
  ['Briefcase', 'Airport', 'Contract'],
  ['Smartwatch', 'Coffee shop', 'Algorithm'],
  ['Presentation', 'Elevator', 'Investor'],
  ['Microphone', 'Conference', 'Breakthrough'],
  ['Strategy', 'Deadline', 'Teamwork'],
];

export default function RecordingActivity({
  activity,
  onComplete,
  onNext,
  isCompleted,
  savedResponse,
}: RecordingActivityProps) {
  const config = activity.config || {};
  const rounds: MultiRoundConfig[] = (config.rounds as MultiRoundConfig[]) || [];
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);

  // Determine current active duration
  const activeRound = rounds[currentRoundIndex];
  const maxDuration = activeRound
    ? activeRound.durationSeconds
    : (config.durationSeconds as number) || (config.speakTimeSeconds as number) || ((activity.durationMinutes || 2) * 60) || 120;

  const defaultPrep = config.isFiveSecondRule
    ? 5
    : (config.prepTimeSeconds as number) || null;

  const [prepTimeLeft, setPrepTimeLeft] = useState<number | null>(defaultPrep);
  const [isPrepping, setIsPrepping] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(
    (savedResponse?.audioUrl as string) || null
  );
  const [duration, setDuration] = useState<number>(
    (savedResponse?.durationSeconds as number) || 0
  );
  const [confidenceRating, setConfidenceRating] = useState<number>(
    (savedResponse?.selfRating as number) || 3
  );

  // Story cubes randomizer
  const [cubeIndex, setCubeIndex] = useState(0);
  const activeStoryWords = useMemo(() => {
    if (config.storyCubes && Array.isArray(config.storyCubes)) {
      return config.storyCubes;
    }
    return DEFAULT_STORY_WORDS[cubeIndex % DEFAULT_STORY_WORDS.length];
  }, [config.storyCubes, cubeIndex]);

  const {
    status,
    audioBlob: _audioBlob,
    audioUrl,
    duration: currentDuration,
    error,
    permissionDenied,
    startRecording,
    stopRecording,
    resetRecorder,
  } = useAudioRecorder({
    maxDuration,
    onRecordingComplete: (_blob, dur) => {
      setDuration(dur);
    },
  });

  // Handle prep timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPrepping && prepTimeLeft !== null && prepTimeLeft > 0) {
      timer = setTimeout(() => setPrepTimeLeft(prev => (prev !== null ? prev - 1 : 0)), 1000);
    } else if (isPrepping && prepTimeLeft === 0) {
      setIsPrepping(false);
      startRecording();
    }
    return () => clearTimeout(timer);
  }, [isPrepping, prepTimeLeft, startRecording]);

  useEffect(() => {
    if (audioUrl) {
      setRecordedAudio(audioUrl);
    }
  }, [audioUrl]);

  const handleStartFlow = () => {
    if (prepTimeLeft && prepTimeLeft > 0) {
      setIsPrepping(true);
    } else {
      startRecording();
    }
  };

  const handleNextRoundOrFinish = () => {
    if (rounds.length > 0 && currentRoundIndex < rounds.length - 1) {
      setCurrentRoundIndex(prev => prev + 1);
      setRecordedAudio(null);
      setDuration(0);
      resetRecorder();
      if (defaultPrep) {
        setPrepTimeLeft(defaultPrep);
      }
    } else {
      onComplete({
        audioUrl: recordedAudio,
        durationSeconds: duration || currentDuration,
        selfRating: confidenceRating,
        roundsCompleted: rounds.length > 0 ? rounds.length : 1,
        completedAt: new Date().toISOString(),
      });
      onNext();
    }
  };

  const handleRetake = () => {
    resetRecorder();
    setRecordedAudio(null);
    setDuration(0);
    if (defaultPrep) {
      setPrepTimeLeft(defaultPrep);
    }
  };

  return (
    <div className="glass-card glass-card--elevated animate-scale-in">
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <span className="badge badge--primary">🎙️ Speaking Task</span>
            {config.isFiveSecondRule && <span className="badge badge--warning">⚡ 5-Second Rule</span>}
            {config.devilAdvocate && <span className="badge badge--accent">⚖️ Devil&apos;s Advocate</span>}
            {rounds.length > 0 && (
              <span className="badge badge--success">
                Round {currentRoundIndex + 1} of {rounds.length}
              </span>
            )}
          </div>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            Target: {formatDuration(maxDuration)}
          </span>
        </div>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
          {activeRound ? `${activity.title}: ${activeRound.label}` : activity.title}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
          {activeRound?.guidance || activity.instructions}
        </p>
      </div>

      {/* Devil's Advocate Banner */}
      {config.devilAdvocate && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.25)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-4)',
          marginBottom: 'var(--space-5)',
        }}>
          <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: '#ef4444', marginBottom: 'var(--space-1)' }}>
            ⚖️ Perspective Reversal Challenge:
          </h4>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Argue the opposite side of your instinctive belief. Do not score ideology—focus purely on fluid phrasing and counter-evidence.
          </p>
        </div>
      )}

      {/* Story Cubes Generator */}
      {config.type === 'story_cube' && (
        <div style={{
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-5)',
          marginBottom: 'var(--space-6)',
          textAlign: 'center',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
            <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)', fontWeight: 600 }}>
              🎲 Story Cubes (Connect all 3 into 1 coherent story):
            </span>
            <button
              className="btn btn--ghost btn--sm"
              onClick={() => setCubeIndex(prev => prev + 1)}
              disabled={isPrepping || status === 'recording'}
            >
              🔄 Roll New Words
            </button>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
            {activeStoryWords.map((word: string, i: number) => (
              <div
                key={i}
                style={{
                  background: 'var(--gradient-primary)',
                  color: 'white',
                  padding: 'var(--space-3) var(--space-5)',
                  borderRadius: 'var(--radius-lg)',
                  fontWeight: 700,
                  fontSize: 'var(--text-lg)',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
                }}
              >
                {word}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Speaking Prompt */}
      {activity.config.prompt && (
        <div style={{
          background: 'var(--bg-glass)',
          borderLeft: '4px solid var(--primary)',
          borderRadius: '0 var(--radius-lg) var(--radius-lg) 0',
          padding: 'var(--space-4) var(--space-5)',
          marginBottom: 'var(--space-6)',
        }}>
          <h4 style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)', marginBottom: 'var(--space-1)' }}>
            Speaking Prompt
          </h4>
          <p style={{ fontSize: 'var(--text-base)', fontWeight: 500, color: 'var(--text-primary)' }}>
            {activity.config.prompt as string}
          </p>
        </div>
      )}

      {/* Preparation State */}
      {isPrepping && (
        <div style={{ textAlign: 'center', padding: 'var(--space-8) 0' }}>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
            {config.isFiveSecondRule ? '5-Second Rule: Starting automatically in...' : 'Get ready to speak in...'}
          </div>
          <div style={{ fontSize: 'var(--text-5xl)', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
            {prepTimeLeft}s
          </div>
          <button
            className="btn btn--outline btn--sm"
            style={{ marginTop: 'var(--space-4)' }}
            onClick={() => {
              setIsPrepping(false);
              startRecording();
            }}
          >
            Start Immediately
          </button>
        </div>
      )}

      {/* Recording In Progress */}
      {status === 'recording' && (
        <div style={{ textAlign: 'center', padding: 'var(--space-6) 0' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '2px solid #ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--space-4)',
            animation: 'pulse 1.5s infinite',
          }}>
            <div style={{ width: '24px', height: '24px', background: '#ef4444', borderRadius: '4px' }} />
          </div>
          <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, fontFamily: 'var(--font-mono)', marginBottom: 'var(--space-2)' }}>
            {formatDuration(currentDuration)} / {formatDuration(maxDuration)}
          </div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
            Keep speaking fluently. Connect your ideas steadily and avoid pausing.
          </p>
          <button className="btn btn--danger btn--lg" onClick={stopRecording}>
            ⏹️ Stop Recording
          </button>
        </div>
      )}

      {/* Initial Idle State */}
      {!isPrepping && status === 'idle' && !recordedAudio && (
        <div style={{ textAlign: 'center', padding: 'var(--space-6) 0' }}>
          {permissionDenied && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid #ef4444',
              color: '#f87171',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: 'var(--space-4)',
              fontSize: 'var(--text-sm)',
            }}>
              Microphone access denied. Please permit microphone access in browser settings.
            </div>
          )}
          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid #ef4444',
              color: '#f87171',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: 'var(--space-4)',
              fontSize: 'var(--text-sm)',
            }}>
              {error}
            </div>
          )}
          <button className="btn btn--primary btn--lg" onClick={handleStartFlow}>
            🎙️ {prepTimeLeft ? `Start (${prepTimeLeft}s Prep)` : 'Start Recording'}
          </button>
        </div>
      )}

      {/* Review State after Recording */}
      {recordedAudio && status !== 'recording' && (
        <div style={{
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-6)',
          marginTop: 'var(--space-4)',
        }}>
          <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-3)' }}>
            Review Recording ({formatDuration(duration || currentDuration)})
          </h3>
          <audio
            controls
            src={recordedAudio}
            style={{ width: '100%', marginBottom: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}
          />

          <div style={{ marginBottom: 'var(--space-6)' }}>
            <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 500, marginBottom: 'var(--space-2)' }}>
              Self-Rating: Delivery Fluency & Structure ({confidenceRating}/5)
            </label>
            <input
              type="range"
              min={1}
              max={5}
              value={confidenceRating}
              onChange={e => setConfidenceRating(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)' }}>
              <span>Hesitant</span>
              <span>Acceptable</span>
              <span>Executive Flow</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
            <button className="btn btn--outline" onClick={handleRetake}>
              🔄 Re-record
            </button>
            <button className="btn btn--primary" onClick={handleNextRoundOrFinish}>
              {rounds.length > 0 && currentRoundIndex < rounds.length - 1
                ? `Proceed to Round ${currentRoundIndex + 2} →`
                : isCompleted ? 'Update & Continue →' : 'Save & Continue →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
