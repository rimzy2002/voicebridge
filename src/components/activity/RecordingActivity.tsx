'use client';

import { useState, useRef, useEffect } from 'react';
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

export default function RecordingActivity({
  activity,
  onComplete,
  onNext,
  isCompleted,
  savedResponse,
}: RecordingActivityProps) {
  const [prepTimeLeft, setPrepTimeLeft] = useState<number | null>(
    (activity.config.prepTimeSeconds as number) || null
  );
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

  const maxDuration = (activity.config.durationSeconds as number) || ((activity.durationMinutes || 2) * 60) || 120;

  const {
    status,
    audioBlob,
    audioUrl,
    duration: currentDuration,
    error,
    permissionDenied,
    startRecording,
    stopRecording,
    resetRecorder,
  } = useAudioRecorder({
    maxDuration,
    onRecordingComplete: (blob, dur) => {
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

  const handleSubmit = () => {
    onComplete({
      audioUrl: recordedAudio,
      durationSeconds: duration || currentDuration,
      selfRating: confidenceRating,
      completedAt: new Date().toISOString(),
    });
    onNext();
  };

  const handleRetake = () => {
    resetRecorder();
    setRecordedAudio(null);
    setDuration(0);
    if (activity.config.prepTimeSeconds) {
      setPrepTimeLeft(activity.config.prepTimeSeconds as number);
    }
  };

  return (
    <div className="glass-card glass-card--elevated animate-scale-in">
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
          <span className="badge badge--primary">🎙️ Speaking Task</span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            Target Duration: {formatDuration(maxDuration)}
          </span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
          {activity.title}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
          {activity.instructions}
        </p>
      </div>

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
            Get ready to speak in...
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
            Skip Prep & Start Now
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
            Speaking... Take your time, breathe naturally, and maintain steady pace.
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
              Microphone access was denied. Please allow microphone access in your browser settings to record your speech.
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
            Review Your Recording ({formatDuration(duration || currentDuration)})
          </h3>
          <audio
            controls
            src={recordedAudio}
            style={{ width: '100%', marginBottom: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}
          />

          <div style={{ marginBottom: 'var(--space-6)' }}>
            <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 500, marginBottom: 'var(--space-2)' }}>
              Self-Evaluation: How clear and confident did you feel? ({confidenceRating}/5)
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
              <span>Hesitant / Unsure</span>
              <span>Acceptable</span>
              <span>Smooth & Confident</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
            <button className="btn btn--outline" onClick={handleRetake}>
              🔄 Re-record
            </button>
            <button className="btn btn--primary" onClick={handleSubmit}>
              {isCompleted ? 'Update & Next' : 'Save & Continue'} →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
