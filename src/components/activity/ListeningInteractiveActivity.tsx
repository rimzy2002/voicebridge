'use client';

import { useState } from 'react';
import { ActivityDefinition } from '@/types';

interface ListeningInteractiveActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
}

export default function ListeningInteractiveActivity({
  activity,
  onComplete,
  onNext,
  isCompleted,
  savedResponse,
}: ListeningInteractiveActivityProps) {
  const config = activity.config || {};
  const audioText =
    (config.audioText as string) ||
    'In modern distributed teams, async communication prevents meeting fatigue. However, without intentional documentation protocols, critical project context often gets fragmented. Therefore, established teams implement weekly digests to align priorities.';

  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [keywords, setKeywords] = useState(
    (savedResponse?.keywords as string) || ''
  );
  const [reconstruction, setReconstruction] = useState(
    (savedResponse?.reconstruction as string) || ''
  );
  const [selectedErrorReasons, setSelectedErrorReasons] = useState<string[]>([]);

  const handlePlaySpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(audioText);
      utter.rate = playbackSpeed;
      utter.lang = 'en-US';
      utter.onstart = () => setIsPlaying(true);
      utter.onend = () => setIsPlaying(false);
      utter.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utter);
    }
  };

  const handleStopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const toggleReason = (reason: string) => {
    setSelectedErrorReasons(prev =>
      prev.includes(reason) ? prev.filter(r => r !== reason) : [...prev, reason]
    );
  };

  const handleComplete = () => {
    onComplete({
      playbackSpeed,
      keywords,
      reconstruction,
      errorReasons: selectedErrorReasons,
      completedAt: new Date().toISOString(),
    });
    onNext();
  };

  return (
    <div className="glass-card glass-card--elevated animate-scale-in">
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
          <span className="badge badge--accent">🎧 Active Listening Lab</span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            Speed: {playbackSpeed}x
          </span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
          {activity.title}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
          {activity.instructions}
        </p>
      </div>

      {/* Audio Controls Card */}
      <div style={{
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)',
        marginBottom: 'var(--space-6)',
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          {!isPlaying ? (
            <button className="btn btn--primary btn--lg" onClick={handlePlaySpeech}>
              ▶️ Play Spoken Segment
            </button>
          ) : (
            <button className="btn btn--danger btn--lg" onClick={handleStopSpeech}>
              ⏹️ Stop Audio
            </button>
          )}
        </div>

        {/* Speed Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginRight: 'var(--space-2)' }}>
            Speed:
          </span>
          {[0.75, 1.0, 1.25, 1.5].map(rate => (
            <button
              key={rate}
              className={`btn btn--sm ${playbackSpeed === rate ? 'btn--primary' : 'btn--outline'}`}
              onClick={() => {
                setPlaybackSpeed(rate);
                if (isPlaying) {
                  handleStopSpeech();
                }
              }}
            >
              {rate}x
            </button>
          ))}
        </div>
      </div>

      {/* Phase 1: Keyword Capture Notepad */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
          1. Keyword Capture (5–8 key anchors only — do not transcribe full sentences):
        </label>
        <input
          type="text"
          className="input-text"
          value={keywords}
          onChange={e => setKeywords(e.target.value)}
          placeholder="e.g. distributed teams, async, fatigue, documentation, weekly digests..."
          style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}
        />
      </div>

      {/* Phase 2: Reconstruction */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
          2. Reconstruction (Rebuild the core message in your own words):
        </label>
        <textarea
          className="input-textarea"
          rows={3}
          value={reconstruction}
          onChange={e => setReconstruction(e.target.value)}
          placeholder="The speaker explained that while async communication helps teams avoid meetings, without clear documentation..."
          style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}
        />
      </div>

      {/* Phase 3: Reveal Transcript & Compare (Dictogloss) */}
      <div style={{
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-5)',
        marginBottom: 'var(--space-6)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)' }}>
            3. Dictogloss Self-Verification
          </span>
          <button
            className="btn btn--outline btn--sm"
            onClick={() => setShowTranscript(prev => !prev)}
          >
            {showTranscript ? 'Hide Transcript' : 'Reveal Original Transcript'}
          </button>
        </div>

        {showTranscript && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderLeft: '3px solid var(--primary)',
            padding: 'var(--space-4)',
            borderRadius: '0 var(--radius-md) var(--radius-md) 0',
            fontSize: 'var(--text-sm)',
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: 'var(--space-4)',
          }}>
            {audioText}
          </div>
        )}

        {showTranscript && (
          <div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
              Did you miss any details? Select the primary factor:
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {['Connected speech / Linking sounds', 'Fast speaking pace', 'Unfamiliar vocabulary', 'Attention lapse', 'Understood perfectly!'].map(reason => (
                <button
                  key={reason}
                  className={`btn btn--sm ${selectedErrorReasons.includes(reason) ? 'btn--primary' : 'btn--ghost'}`}
                  onClick={() => toggleReason(reason)}
                >
                  {reason}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Next button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className="btn btn--primary"
          onClick={handleComplete}
          disabled={!reconstruction.trim()}
        >
          {isCompleted ? 'Update Summary' : 'Complete Listening Drill'} →
        </button>
      </div>
    </div>
  );
}
