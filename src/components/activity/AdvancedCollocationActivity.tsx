'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { AdvancedClass, AdvancedActivity } from '@/lib/curriculum/advanced/types';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { formatDuration } from '@/hooks/useTimer';

interface AdvancedCollocationActivityProps {
  currentClass: AdvancedClass;
  initialActivityIndex?: number;
}

export default function AdvancedCollocationActivity({
  currentClass,
  initialActivityIndex = 0,
}: AdvancedCollocationActivityProps) {
  const [currentIndex, setCurrentIndex] = useState(initialActivityIndex);
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [submittedIds, setSubmittedIds] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showLinguistNote, setShowLinguistNote] = useState<boolean>(false);
  const [earnedXp, setEarnedXp] = useState<number>(0);
  const [isSpeakingDone, setIsSpeakingDone] = useState<boolean>(false);

  const activities = currentClass.activities;
  const currentActivity: AdvancedActivity | undefined = activities[currentIndex];

  // Local storage key for this class
  const storageKey = `adv-class-${currentClass.letter.toLowerCase()}-progress`;

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.submittedIds) {
          setSubmittedIds(new Set(parsed.submittedIds));
        }
        if (parsed.userInputs) {
          setUserInputs(parsed.userInputs);
        }
        if (parsed.earnedXp) {
          setEarnedXp(parsed.earnedXp);
        }
        if (parsed.currentIndex !== undefined && parsed.currentIndex < activities.length) {
          setCurrentIndex(parsed.currentIndex);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [storageKey, activities.length]);

  // Save progress
  const saveProgress = useCallback(
    (newSubmitted: Set<string>, newInputs: Record<string, string>, newXp: number, newIndex: number) => {
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            submittedIds: Array.from(newSubmitted),
            userInputs: newInputs,
            earnedXp: newXp,
            currentIndex: newIndex,
            updatedAt: new Date().toISOString(),
          })
        );
      } catch {
        // Ignore localStorage errors
      }
    },
    [storageKey]
  );

  // Audio recording hook for Speaking activities
  const {
    status: recordingStatus,
    audioUrl,
    duration: recordingDuration,
    startRecording,
    stopRecording,
    discardRecording,
  } = useAudioRecorder({
    maxDuration: 60,
    onRecordingComplete: () => {
      setIsSpeakingDone(true);
    },
  });

  const isCurrentSubmitted = currentActivity ? submittedIds.has(currentActivity.id) : false;
  const currentInput = currentActivity ? userInputs[currentActivity.id] || '' : '';

  // Calculate collocation similarity / match
  const evaluation = useMemo(() => {
    if (!currentActivity || !isCurrentSubmitted) return null;
    const input = (userInputs[currentActivity.id] || '').trim().toLowerCase();
    const expected = currentActivity.expectedAnswer.toLowerCase();
    const targetTerms = currentActivity.targetCollocation
      .toLowerCase()
      .split(/[/,]/)
      .map(t => t.trim())
      .filter(Boolean);

    const hasTargetCollocation = targetTerms.some(term => input.includes(term));
    const isExactMatch = input === expected || input.replace(/[.,]/g, '') === expected.replace(/[.,]/g, '');

    return {
      hasTargetCollocation,
      isExactMatch,
      score: isExactMatch ? 100 : hasTargetCollocation ? 90 : 70,
    };
  }, [currentActivity, isCurrentSubmitted, userInputs]);

  // Handle submit rewrite
  const handleSubmitRewrite = () => {
    if (!currentActivity || !currentInput.trim()) return;
    const nextSubmitted = new Set(submittedIds);
    nextSubmitted.add(currentActivity.id);
    const addedXp = currentActivity.xpReward || 20;
    const nextXp = earnedXp + (submittedIds.has(currentActivity.id) ? 0 : addedXp);

    setSubmittedIds(nextSubmitted);
    setEarnedXp(nextXp);
    saveProgress(nextSubmitted, userInputs, nextXp, currentIndex);
  };

  // Handle complete spoken drill
  const handleCompleteSpokenDrill = () => {
    if (!currentActivity) return;
    const nextSubmitted = new Set(submittedIds);
    nextSubmitted.add(currentActivity.id);
    const addedXp = currentActivity.xpReward || 25;
    const nextXp = earnedXp + (submittedIds.has(currentActivity.id) ? 0 : addedXp);

    setSubmittedIds(nextSubmitted);
    setEarnedXp(nextXp);
    setIsSpeakingDone(true);
    saveProgress(nextSubmitted, userInputs, nextXp, currentIndex);
  };

  // Switch activities
  const goToActivity = (index: number) => {
    if (index >= 0 && index < activities.length) {
      setCurrentIndex(index);
      setShowHint(false);
      setIsSpeakingDone(false);
      discardRecording();
      saveProgress(submittedIds, userInputs, earnedXp, index);
    }
  };

  if (!currentActivity) {
    return (
      <div className="glass-card" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
        <h3>No activity loaded</h3>
        <p>Return to class selection or dashboard.</p>
        <Link href="/" className="btn btn--primary" style={{ marginTop: 'var(--space-4)' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  const completedCount = submittedIds.size;
  const progressPercent = Math.round((completedCount / activities.length) * 100);

  return (
    <div className="adv-collocation-activity">
      {/* Top Breadcrumb & Class Header */}
      <div className="adv-header">
        <div className="adv-header__breadcrumb">
          <Link href="/" className="adv-header__back-link">
            ← Home
          </Link>
          <span className="adv-header__divider">/</span>
          <span className="adv-header__track">C1–C2 Advanced Master Classes</span>
          <span className="adv-header__divider">/</span>
          <span className="adv-header__class-badge">{currentClass.name}</span>
        </div>

        <div className="adv-header__title-row">
          <div>
            <span className="badge badge--primary" style={{ marginBottom: 'var(--space-2)' }}>
              Module {currentClass.moduleNumber}: {currentClass.theme}
            </span>
            <h1 className="adv-header__title">{currentClass.title}</h1>
          </div>

          <div className="adv-header__xp-badge">
            <span className="adv-header__xp-icon">⚡</span>
            <span className="adv-header__xp-value">{earnedXp} XP Earned</span>
          </div>
        </div>

        {/* Stepper Navigation */}
        <div className="adv-stepper">
          <div className="adv-stepper__bar">
            <div className="adv-stepper__fill" style={{ width: `${progressPercent}%` }} />
          </div>

          <div className="adv-stepper__pills">
            {activities.map((act, idx) => {
              const isCompleted = submittedIds.has(act.id);
              const isActive = idx === currentIndex;
              return (
                <button
                  key={act.id}
                  onClick={() => goToActivity(idx)}
                  className={`adv-stepper__pill ${isActive ? 'adv-stepper__pill--active' : ''} ${
                    isCompleted ? 'adv-stepper__pill--completed' : ''
                  }`}
                  title={`Activity ${act.activityNumber}: ${act.title}`}
                  aria-label={`Activity ${act.activityNumber}: ${act.title}`}
                >
                  <span className="adv-stepper__pill-num">{act.activityNumber}</span>
                  {isCompleted && <span className="adv-stepper__pill-check">✓</span>}
                </button>
              );
            })}
          </div>

          <div className="adv-stepper__meta">
            <span>
              Activity {currentActivity.activityNumber} of {activities.length}:{' '}
              <strong>{currentActivity.title}</strong>
            </span>
            <span>{progressPercent}% Class Completed</span>
          </div>
        </div>
      </div>

      {/* Main Activity Card */}
      <div className="adv-card glass-card">
        {/* Activity Meta Pills */}
        <div className="adv-card__meta-bar">
          <div className="adv-card__badges">
            <span className={`badge ${currentActivity.cefrLevel === 'C2' ? 'badge--accent' : 'badge--primary'}`}>
              Level {currentActivity.cefrLevel}
            </span>
            <span className="badge badge--outline">
              {currentActivity.skill === 'Speaking' ? '🎙️ Speaking' : '✍️ Writing'}
            </span>
            <span className="badge badge--warning">{currentActivity.difficulty}</span>
            <span className="adv-card__subskill">{currentActivity.subskill}</span>
          </div>

          <span className="adv-card__type-tag">{currentActivity.activityType}</span>
        </div>

        {/* Objective & Instructions */}
        <div className="adv-card__header-info">
          <h2 className="adv-card__activity-title">{currentActivity.title}</h2>
          <p className="adv-card__objective">
            <strong>Objective:</strong> {currentActivity.objective}
          </p>
          <div className="adv-card__instructions-box">
            <span className="adv-card__instructions-icon">📋</span>
            <span>{currentActivity.instructions}</span>
          </div>
        </div>

        {/* Task Prompt Display */}
        <div className="adv-prompt-box">
          <div className="adv-prompt-box__label">
            <span className="adv-prompt-box__label-icon">💬</span>
            <span>Casual / Standard Prompt to Elevate:</span>
          </div>
          <blockquote className="adv-prompt-box__quote">&ldquo;{currentActivity.taskPrompt}&rdquo;</blockquote>
        </div>

        {/* Workspace: Writing or Speaking */}
        {currentActivity.skill === 'Writing' ? (
          <div className="adv-workspace adv-workspace--writing">
            <label htmlFor="user-rewrite-input" className="adv-workspace__label">
              Your Professional C1/C2 Rewrite:
            </label>
            <textarea
              id="user-rewrite-input"
              className="adv-workspace__textarea"
              rows={3}
              placeholder="Transform the casual phrase into the required formal register..."
              value={currentInput}
              onChange={e =>
                setUserInputs(prev => ({
                  ...prev,
                  [currentActivity.id]: e.target.value,
                }))
              }
              onKeyDown={e => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  handleSubmitRewrite();
                }
              }}
              disabled={isCurrentSubmitted}
            />

            <div className="adv-workspace__actions">
              <button
                type="button"
                className="btn btn--outline btn--sm"
                onClick={() => setShowHint(!showHint)}
              >
                {showHint ? 'Hide Hint' : '💡 Need a Hint?'}
              </button>

              {!isCurrentSubmitted ? (
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={handleSubmitRewrite}
                  disabled={!currentInput.trim()}
                >
                  Submit Rewrite & Check Collocation →
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn--secondary btn--sm"
                  onClick={() => {
                    const nextSubmitted = new Set(submittedIds);
                    nextSubmitted.delete(currentActivity.id);
                    setSubmittedIds(nextSubmitted);
                  }}
                >
                  Edit Rewrite
                </button>
              )}
            </div>

            {showHint && currentActivity.hint && (
              <div className="adv-hint-box animate-fade-in">
                <strong>Hint:</strong> {currentActivity.hint}
              </div>
            )}
          </div>
        ) : (
          /* Speaking Workspace */
          <div className="adv-workspace adv-workspace--speaking">
            <div className="adv-speaking-box">
              <div className="adv-speaking-box__header">
                <span className="adv-speaking-box__title">Vocal Delivery Drill</span>
                <span className="adv-speaking-box__timer">
                  {recordingStatus === 'recording'
                    ? formatDuration(recordingDuration)
                    : 'Duration: Up to 60s'}
                </span>
              </div>

              <p className="adv-speaking-box__instructions">
                Rehearse delivering the formal equivalent out loud with executive presence, measured tempo, and clear articulation.
              </p>

              <div className="adv-speaking-box__controls">
                {recordingStatus === 'recording' ? (
                  <button
                    type="button"
                    className="btn btn--error btn--lg adv-speaking-btn--recording"
                    onClick={stopRecording}
                  >
                    ⏹️ Stop Recording ({formatDuration(recordingDuration)})
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn--primary btn--lg"
                    onClick={startRecording}
                  >
                    🎙️ Record Voice Response
                  </button>
                )}

                {audioUrl && (
                  <div className="adv-speaking-box__audio-preview animate-fade-in">
                    <audio src={audioUrl} controls className="adv-audio-player" />
                  </div>
                )}
              </div>

              {!isCurrentSubmitted && (
                <div style={{ marginTop: 'var(--space-4)', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
                  <button
                    type="button"
                    className="btn btn--outline btn--sm"
                    onClick={() => setShowHint(!showHint)}
                  >
                    {showHint ? 'Hide Hint' : '💡 Speaking Hint'}
                  </button>
                  <button
                    type="button"
                    className="btn btn--success"
                    onClick={handleCompleteSpokenDrill}
                  >
                    ✓ Complete Spoken Rehearsal & Compare →
                  </button>
                </div>
              )}

              {showHint && currentActivity.hint && (
                <div className="adv-hint-box animate-fade-in" style={{ marginTop: 'var(--space-3)' }}>
                  <strong>Vocal Target:</strong> {currentActivity.hint}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Evaluation & Model Comparison (shown upon submission) */}
        {isCurrentSubmitted && (
          <div className="adv-evaluation-box animate-slide-up">
            <div className="adv-evaluation-box__header">
              <div className="adv-evaluation-box__status">
                <span className="adv-evaluation-box__badge">
                  {evaluation?.hasTargetCollocation || isSpeakingDone
                    ? '🎯 Target Register Mastered'
                    : '📖 Model Answer Review'}
                </span>
                <span className="adv-evaluation-box__xp">+{currentActivity.xpReward || 20} XP Awarded!</span>
              </div>
            </div>

            <div className="adv-comparison-grid">
              {currentActivity.skill === 'Writing' && (
                <div className="adv-comparison-card adv-comparison-card--user">
                  <span className="adv-comparison-card__label">Your Rewrite</span>
                  <p className="adv-comparison-card__text">{currentInput}</p>
                </div>
              )}

              <div className="adv-comparison-card adv-comparison-card--expected">
                <span className="adv-comparison-card__label">
                  Expected C1–C2 Collocation Model
                </span>
                <p className="adv-comparison-card__text">
                  &ldquo;{currentActivity.expectedAnswer}&rdquo;
                </p>
                <div className="adv-target-collocation">
                  <strong>Key Target:</strong>{' '}
                  <span className="collocation-tag">{currentActivity.targetCollocation}</span>
                </div>
              </div>
            </div>

            {/* Linguistic Justification */}
            {currentActivity.justification && (
              <div className="adv-justification-box">
                <div className="adv-justification-box__title">
                  <span>🧠</span> Linguistic Justification & Register Analysis
                </div>
                <p className="adv-justification-box__content">{currentActivity.justification}</p>
              </div>
            )}

            {/* Next Activity or Class Finish */}
            <div className="adv-evaluation-box__footer">
              {currentIndex < activities.length - 1 ? (
                <button
                  type="button"
                  className="btn btn--primary btn--lg"
                  onClick={() => goToActivity(currentIndex + 1)}
                >
                  Next Activity: {activities[currentIndex + 1].title} →
                </button>
              ) : (
                <div className="adv-class-complete">
                  <div className="adv-class-complete__message">
                    🎉 <strong>Class Complete!</strong> You have completed all 10 activities of {currentClass.name}.
                  </div>
                  <Link href="/" className="btn btn--primary btn--lg">
                    Return to Dashboard
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Linguist's Note / Master Framework Drawer */}
      <div className="adv-linguist-card glass-card">
        <button
          type="button"
          className="adv-linguist-card__toggle"
          onClick={() => setShowLinguistNote(!showLinguistNote)}
          aria-expanded={showLinguistNote}
        >
          <div className="adv-linguist-card__title">
            <span>📚</span>
            <span>Linguist’s Note: {currentClass.theme} Framework</span>
          </div>
          <span className="adv-linguist-card__chevron">{showLinguistNote ? '▲' : '▼'}</span>
        </button>

        {showLinguistNote && (
          <div className="adv-linguist-card__body animate-fade-in">
            <p className="adv-linguist-card__overview">{currentClass.overview}</p>
            {currentClass.linguistNote && (
              <div className="adv-linguist-card__deep-dive">
                <strong>Executive & Journalistic Pragmatics:</strong>
                <p>{currentClass.linguistNote}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="adv-footer-nav">
        <button
          type="button"
          className="btn btn--outline"
          disabled={currentIndex === 0}
          onClick={() => goToActivity(currentIndex - 1)}
        >
          ← Previous
        </button>

        <span className="adv-footer-nav__counter">
          {currentIndex + 1} of {activities.length}
        </span>

        <button
          type="button"
          className="btn btn--outline"
          disabled={currentIndex === activities.length - 1}
          onClick={() => goToActivity(currentIndex + 1)}
        >
          Next →
        </button>
      </div>

      {/* Scoped Styling for Advanced Collocation Player */}
      <style jsx>{`
        .adv-collocation-activity {
          max-width: 860px;
          margin: 0 auto;
          padding: var(--space-6) 0 var(--space-16);
        }

        .adv-header {
          margin-bottom: var(--space-6);
        }

        .adv-header__breadcrumb {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--text-tertiary);
          margin-bottom: var(--space-3);
        }

        .adv-header__back-link {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .adv-header__back-link:hover {
          color: var(--color-primary-400);
        }

        .adv-header__divider {
          color: var(--text-muted);
        }

        .adv-header__track {
          color: var(--text-secondary);
        }

        .adv-header__class-badge {
          color: var(--color-primary-300);
          font-weight: 600;
        }

        .adv-header__title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--space-4);
          margin-bottom: var(--space-6);
          flex-wrap: wrap;
        }

        .adv-header__title {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, var(--text-3xl));
          font-weight: 700;
          line-height: var(--leading-tight);
          color: var(--text-primary);
        }

        .adv-header__xp-badge {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: var(--radius-full);
          padding: var(--space-2) var(--space-4);
          color: var(--color-primary-300);
          font-weight: 600;
          font-size: var(--text-sm);
        }

        .adv-stepper {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: var(--space-4);
        }

        .adv-stepper__bar {
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-bottom: var(--space-3);
        }

        .adv-stepper__fill {
          height: 100%;
          background: linear-gradient(90deg, var(--color-primary-500), var(--color-accent-500));
          transition: width var(--transition-normal);
        }

        .adv-stepper__pills {
          display: flex;
          gap: var(--space-2);
          overflow-x: auto;
          padding-bottom: var(--space-2);
        }

        .adv-stepper__pill {
          flex: 1;
          min-width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          color: var(--text-secondary);
          font-size: var(--text-xs);
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .adv-stepper__pill:hover {
          background: var(--bg-hover);
          border-color: var(--color-primary-400);
        }

        .adv-stepper__pill--active {
          background: var(--color-primary-600);
          border-color: var(--color-primary-400);
          color: #ffffff;
          box-shadow: 0 0 12px rgba(99, 102, 241, 0.4);
        }

        .adv-stepper__pill--completed {
          border-color: var(--color-success-500);
          color: var(--color-success-400);
        }

        .adv-stepper__pill--active.adv-stepper__pill--completed {
          background: var(--color-primary-600);
          color: #ffffff;
        }

        .adv-stepper__pill-check {
          font-size: 10px;
        }

        .adv-stepper__meta {
          display: flex;
          justify-content: space-between;
          font-size: var(--text-xs);
          color: var(--text-tertiary);
          margin-top: var(--space-2);
        }

        .adv-card {
          padding: var(--space-8);
          margin-bottom: var(--space-6);
        }

        .adv-card__meta-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-4);
          flex-wrap: wrap;
        }

        .adv-card__badges {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          flex-wrap: wrap;
        }

        .adv-card__subskill {
          font-size: var(--text-xs);
          color: var(--text-secondary);
          font-weight: 500;
        }

        .adv-card__type-tag {
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .adv-card__activity-title {
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-2);
        }

        .adv-card__objective {
          font-size: var(--text-sm);
          color: var(--color-primary-200);
          margin-bottom: var(--space-3);
        }

        .adv-card__instructions-box {
          display: flex;
          align-items: flex-start;
          gap: var(--space-2);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: var(--space-3) var(--space-4);
          font-size: var(--text-sm);
          color: var(--text-secondary);
          margin-bottom: var(--space-6);
        }

        .adv-prompt-box {
          background: linear-gradient(135deg, rgba(30, 27, 75, 0.6) 0%, rgba(17, 24, 39, 0.8) 100%);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: var(--radius-lg);
          padding: var(--space-5);
          margin-bottom: var(--space-6);
        }

        .adv-prompt-box__label {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-primary-300);
          margin-bottom: var(--space-2);
          font-weight: 600;
        }

        .adv-prompt-box__quote {
          font-size: var(--text-lg);
          color: #ffffff;
          font-weight: 500;
          font-style: italic;
          margin: 0;
          line-height: var(--leading-relaxed);
        }

        .adv-workspace {
          margin-bottom: var(--space-6);
        }

        .adv-workspace__label {
          display: block;
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-2);
        }

        .adv-workspace__textarea {
          width: 100%;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: var(--space-3) var(--space-4);
          color: var(--text-primary);
          font-family: inherit;
          font-size: var(--text-base);
          line-height: var(--leading-relaxed);
          resize: vertical;
          margin-bottom: var(--space-3);
          transition: border-color var(--transition-fast);
        }

        .adv-workspace__textarea:focus {
          outline: none;
          border-color: var(--color-primary-500);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }

        .adv-workspace__actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--space-3);
          flex-wrap: wrap;
        }

        .adv-hint-box {
          margin-top: var(--space-3);
          padding: var(--space-3) var(--space-4);
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: var(--radius-md);
          font-size: var(--text-xs);
          color: var(--color-warning-400);
        }

        .adv-speaking-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px dashed rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          text-align: center;
        }

        .adv-speaking-box__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-2);
          font-size: var(--text-xs);
          color: var(--text-tertiary);
        }

        .adv-speaking-box__instructions {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          margin-bottom: var(--space-5);
        }

        .adv-speaking-box__controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-4);
        }

        .adv-speaking-btn--recording {
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6);
          }
          70% {
            box-shadow: 0 0 0 14px rgba(239, 68, 68, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }

        .adv-audio-player {
          width: 100%;
          max-width: 400px;
        }

        .adv-evaluation-box {
          margin-top: var(--space-6);
          border-top: 1px solid var(--border-color);
          padding-top: var(--space-6);
        }

        .adv-evaluation-box__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-4);
        }

        .adv-evaluation-box__badge {
          background: rgba(16, 185, 129, 0.15);
          color: var(--color-success-400);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: var(--radius-full);
          padding: var(--space-1) var(--space-3);
          font-size: var(--text-xs);
          font-weight: 600;
        }

        .adv-evaluation-box__xp {
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--color-accent-400);
          margin-left: var(--space-3);
        }

        .adv-comparison-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-4);
          margin-bottom: var(--space-4);
        }

        .adv-comparison-card {
          padding: var(--space-4);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .adv-comparison-card--user {
          background: rgba(255, 255, 255, 0.02);
        }

        .adv-comparison-card--expected {
          background: rgba(99, 102, 241, 0.08);
          border-color: rgba(99, 102, 241, 0.3);
        }

        .adv-comparison-card__label {
          display: block;
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-tertiary);
          margin-bottom: var(--space-2);
          font-weight: 600;
        }

        .adv-comparison-card__text {
          font-size: var(--text-base);
          font-weight: 500;
          color: var(--text-primary);
          line-height: var(--leading-relaxed);
          margin-bottom: var(--space-2);
        }

        .adv-target-collocation {
          font-size: var(--text-xs);
          color: var(--color-primary-300);
        }

        .collocation-tag {
          background: rgba(99, 102, 241, 0.25);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          font-family: monospace;
          color: #ffffff;
        }

        .adv-justification-box {
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: var(--radius-md);
          padding: var(--space-4);
          margin-bottom: var(--space-6);
        }

        .adv-justification-box__title {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-xs);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-primary-300);
          margin-bottom: var(--space-2);
        }

        .adv-justification-box__content {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          line-height: var(--leading-relaxed);
          margin: 0;
        }

        .adv-evaluation-box__footer {
          display: flex;
          justify-content: flex-end;
          margin-top: var(--space-4);
        }

        .adv-class-complete {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-4);
          width: 100%;
          text-align: center;
          padding: var(--space-4);
        }

        .adv-class-complete__message {
          font-size: var(--text-lg);
          color: var(--color-success-400);
        }

        .adv-linguist-card {
          padding: var(--space-4) var(--space-6);
          margin-bottom: var(--space-6);
        }

        .adv-linguist-card__toggle {
          width: 100%;
          background: none;
          border: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          padding: 0;
          color: var(--text-primary);
        }

        .adv-linguist-card__title {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-weight: 600;
          font-size: var(--text-sm);
        }

        .adv-linguist-card__chevron {
          font-size: 10px;
          color: var(--text-tertiary);
        }

        .adv-linguist-card__body {
          margin-top: var(--space-4);
          border-top: 1px solid var(--border-color);
          padding-top: var(--space-4);
          font-size: var(--text-sm);
          color: var(--text-secondary);
          line-height: var(--leading-relaxed);
        }

        .adv-linguist-card__overview {
          margin-bottom: var(--space-3);
        }

        .adv-linguist-card__deep-dive {
          background: rgba(0, 0, 0, 0.2);
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-md);
          border-left: 3px solid var(--color-primary-400);
          font-size: var(--text-xs);
        }

        .adv-footer-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .adv-footer-nav__counter {
          font-size: var(--text-xs);
          color: var(--text-tertiary);
        }
      `}</style>
    </div>
  );
}
