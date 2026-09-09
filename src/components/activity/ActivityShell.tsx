'use client';

import { useState, useCallback, useEffect } from 'react';
import { ActivityDefinition, LearnerTrack } from '@/types';
import { getActivitiesForDay, calculateProgress } from '@/lib/curriculum/engine';
import { formatDuration } from '@/hooks/useTimer';

// Activity Components
import WelcomeActivity from '@/components/activity/WelcomeActivity';
import GoalSelectionActivity from '@/components/activity/GoalSelectionActivity';
import ConfidenceCheckActivity from '@/components/activity/ConfidenceCheckActivity';
import RecordingActivity from '@/components/activity/RecordingActivity';
import FrameworkLessonActivity from '@/components/activity/FrameworkLessonActivity';
import VocabularyActivationActivity from '@/components/activity/VocabularyActivationActivity';
import ReflectionActivity from '@/components/activity/ReflectionActivity';
import MissionActivity from '@/components/activity/MissionActivity';
import ScorecardActivity from '@/components/activity/ScorecardActivity';
import InformationDisplayActivity from '@/components/activity/InformationDisplayActivity';

import type { DayDefinition } from '@/types';

interface ActivityShellProps {
  day: DayDefinition;
  mode?: 'full' | 'express';
  track?: LearnerTrack;
  initialActivityIndex?: number;
  streak?: number;
  totalXp?: number;
}

// Store all responses locally
interface ActivityResponses {
  [activityId: string]: Record<string, unknown>;
}

export default function ActivityShell({
  day,
  mode = 'full',
  track = 'general',
  initialActivityIndex = 0,
  streak = 0,
  totalXp = 0,
}: ActivityShellProps) {
  const activities = getActivitiesForDay(day, mode, track);
  const [currentIndex, setCurrentIndex] = useState(initialActivityIndex);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [responses, setResponses] = useState<ActivityResponses>({});
  const [earnedXp, setEarnedXp] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(streak);
  const [showModeSwitch, setShowModeSwitch] = useState(false);

  const currentActivity = activities[currentIndex];
  const progress = calculateProgress(completedIds.size, activities.length);
  const isLastActivity = currentIndex === activities.length - 1;
  const isDayComplete = completedIds.size === activities.length;

  // Save progress to localStorage
  useEffect(() => {
    const key = `day-${day.dayNumber}-progress`;
    const data = {
      completedIds: Array.from(completedIds),
      responses,
      currentIndex,
      earnedXp,
      mode,
      track,
      lastUpdated: new Date().toISOString(),
    };
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // localStorage not available
    }
  }, [completedIds, responses, currentIndex, earnedXp, day.dayNumber, mode, track]);

  // Load saved progress
  useEffect(() => {
    const key = `day-${day.dayNumber}-progress`;
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.completedIds) {
          setCompletedIds(new Set(data.completedIds));
        }
        if (data.responses) {
          setResponses(data.responses);
        }
        if (data.currentIndex !== undefined && data.currentIndex < activities.length) {
          setCurrentIndex(data.currentIndex);
        }
        if (data.earnedXp) {
          setEarnedXp(data.earnedXp);
        }
      }
    } catch {
      // localStorage not available or corrupted
    }
  }, [day.dayNumber, activities.length]);

  const handleActivityComplete = useCallback((activityId: string, data: Record<string, unknown>) => {
    setCompletedIds(prev => new Set([...prev, activityId]));
    setResponses(prev => ({ ...prev, [activityId]: data }));

    // Award XP
    const activity = activities.find(a => a.id === activityId);
    if (activity?.xpReward) {
      setEarnedXp(prev => prev + activity.xpReward!);
    }
  }, [activities]);

  const handleNext = useCallback(() => {
    if (currentIndex < activities.length - 1) {
      setCurrentIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIndex, activities.length]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIndex]);

  const handleSkip = useCallback(() => {
    if (currentActivity && !currentActivity.isRequired) {
      handleNext();
    }
  }, [currentActivity, handleNext]);

  // Render the appropriate activity component
  const renderActivity = (activity: ActivityDefinition) => {
    const commonProps = {
      activity,
      onComplete: (data: Record<string, unknown>) => handleActivityComplete(activity.id, data),
      onNext: handleNext,
      isCompleted: completedIds.has(activity.id),
      savedResponse: responses[activity.id],
      track,
      dayNumber: day.dayNumber,
      allResponses: responses,
    };

    switch (activity.type) {
      case 'welcome':
        return <WelcomeActivity {...commonProps} dayTitle={day.title} goals={day.todayGoals} />;
      case 'goal_selection':
        return <GoalSelectionActivity {...commonProps} />;
      case 'confidence_check':
        return <ConfidenceCheckActivity {...commonProps} />;
      case 'recording':
      case 'timed_speaking':
      case 'think_in_english':
        return <RecordingActivity {...commonProps} />;
      case 'framework_lesson':
        return <FrameworkLessonActivity {...commonProps} />;
      case 'vocabulary_activation':
      case 'vocabulary_challenge':
        return <VocabularyActivationActivity {...commonProps} />;
      case 'reflection':
        return <ReflectionActivity {...commonProps} />;
      case 'mission':
        return <MissionActivity {...commonProps} />;
      case 'scorecard':
        return (
          <ScorecardActivity
            {...commonProps}
            earnedXp={earnedXp + totalXp}
            streak={currentStreak}
            completedActivities={completedIds.size}
            totalActivities={activities.length}
            speakingMinutes={0}
            dayTitle={day.title}
          />
        );
      case 'information_display':
      case 'pronunciation_lesson':
        return <InformationDisplayActivity {...commonProps} />;
      default:
        return <InformationDisplayActivity {...commonProps} />;
    }
  };

  if (!currentActivity) {
    return <div className="activity-shell"><p>No activities available.</p></div>;
  }

  return (
    <div className="activity-shell">
      {/* Header */}
      <header className="activity-header" role="banner">
        <div className="activity-header__left">
          <span className="activity-header__day">Day {day.dayNumber} of 30</span>
          <span className="activity-header__mode">
            <span className={`badge ${mode === 'express' ? 'badge--warning' : 'badge--primary'}`}>
              {mode === 'express' ? '⚡ Express' : '📖 Full'}
            </span>
          </span>
        </div>
        <div className="activity-header__right" style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
          <div className="streak-display">
            <span className="streak-display__icon" aria-hidden="true">🔥</span>
            <span className="streak-display__count">{currentStreak}</span>
          </div>
          <div className="xp-display">
            <span className="xp-display__value">{earnedXp + totalXp} XP</span>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={`Day ${day.dayNumber} progress: ${progress}%`}>
        <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
      </div>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-2)', textAlign: 'right' }}>
        {completedIds.size}/{activities.length} activities • {progress}%
      </p>

      {/* Activity counter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 'var(--space-4) 0' }}>
        <h2 className="activity-header__title">{currentActivity.title}</h2>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
          {currentIndex + 1} / {activities.length}
        </span>
      </div>

      {/* Activity description */}
      {currentActivity.description && (
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)', lineHeight: 'var(--leading-relaxed)' }}>
          {currentActivity.description}
        </p>
      )}

      {/* Activity content */}
      <div className="activity-content animate-slide-up" key={currentActivity.id}>
        {renderActivity(currentActivity)}
      </div>

      {/* Footer navigation */}
      <footer className="activity-footer">
        <button
          className="btn btn--ghost"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          aria-label="Previous activity"
        >
          ← Previous
        </button>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {!currentActivity.isRequired && !completedIds.has(currentActivity.id) && (
            <button
              className="btn btn--ghost"
              onClick={handleSkip}
              aria-label="Skip this activity"
            >
              Skip
            </button>
          )}
          {completedIds.has(currentActivity.id) && !isLastActivity && (
            <button
              className="btn btn--primary"
              onClick={handleNext}
              aria-label="Next activity"
            >
              Continue →
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
