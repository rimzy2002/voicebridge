'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
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
import OpinionBuilderActivity from '@/components/activity/OpinionBuilderActivity';
import ConnectorActivationActivity from '@/components/activity/ConnectorActivationActivity';
import ListeningInteractiveActivity from '@/components/activity/ListeningInteractiveActivity';
import WeeklyDiagnosticV2Activity from '@/components/activity/WeeklyDiagnosticV2Activity';
import MeetingSimulationActivity from '@/components/activity/MeetingSimulationActivity';
import InterviewSimulationActivity from '@/components/activity/InterviewSimulationActivity';
import NetworkingRoleplayActivity from '@/components/activity/NetworkingRoleplayActivity';
import DataNarrationActivity from '@/components/activity/DataNarrationActivity';
import FeedbackActivity from '@/components/activity/FeedbackActivity';
import EmailToVoiceActivity from '@/components/activity/EmailToVoiceActivity';
import NegotiationActivity from '@/components/activity/NegotiationActivity';
import ProfessionalDiagnosticActivity from '@/components/activity/ProfessionalDiagnosticActivity';
import ComplexExplanationActivity from '@/components/activity/ComplexExplanationActivity';
import PersuasionActivity from '@/components/activity/PersuasionActivity';
import LeadershipSimulationActivity from '@/components/activity/LeadershipSimulationActivity';
import NuanceDiplomacyActivity from '@/components/activity/NuanceDiplomacyActivity';
import DebateSimulationActivity from '@/components/activity/DebateSimulationActivity';
import ToughQuestionsActivity from '@/components/activity/ToughQuestionsActivity';
import AdvancedListeningActivity from '@/components/activity/AdvancedListeningActivity';
import IndependentRehearsalActivity from '@/components/activity/IndependentRehearsalActivity';
import FinalTransformationActivity from '@/components/activity/FinalTransformationActivity';
import { getPersonalizedFocusBanner } from '@/lib/curriculum/diagnostic';
import ThemeToggle from '@/components/ThemeToggle';

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

  const isLoadedRef = useRef(false);

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
        if (initialActivityIndex > 0) {
          setCurrentIndex(initialActivityIndex);
        } else if (data.currentIndex !== undefined && data.currentIndex < activities.length) {
          setCurrentIndex(data.currentIndex);
        }
        if (data.earnedXp) {
          setEarnedXp(data.earnedXp);
        }
      }
    } catch {
      // localStorage not available or corrupted
    } finally {
      isLoadedRef.current = true;
    }
  }, [day.dayNumber, activities.length, initialActivityIndex]);

  // Save progress to localStorage
  useEffect(() => {
    if (!isLoadedRef.current) return;
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

  // Handle activity completion
  const handleActivityComplete = useCallback((activityId: string, responseData: Record<string, unknown>) => {
    setCompletedIds(prev => new Set([...prev, activityId]));
    setResponses(prev => ({
      ...prev,
      [activityId]: responseData,
    }));

    // Award XP
    const activity = activities.find(a => a.id === activityId);
    const xp = activity?.xpReward || 10;
    setEarnedXp(prev => prev + xp);
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
      case 'midpoint_confidence_snapshot':
        return <ConfidenceCheckActivity {...commonProps} />;
      case 'recording':
      case 'timed_speaking':
      case 'think_in_english':
      case 'impromptu_prompt':
      case 'five_second_prompt':
      case 'story_cube':
      case 'rubber_duck':
      case 'devil_advocate':
      case 'elevator_pitch_rotation':
      case 'mini_presentation':
      case 'retelling_321':
      case 'conditional_scenario':
      case 'consequence_builder':
      case 'paraphrase_multi_round':
        return <RecordingActivity {...commonProps} />;
      case 'opinion_builder':
      case 'agreement_disagreement':
      case 'counterargument':
        return <OpinionBuilderActivity {...commonProps} />;
      case 'connector_activation':
      case 'lexical_chunk_activation':
      case 'structural_expansion':
      case 'sentence_surgery':
        return <ConnectorActivationActivity {...commonProps} />;
      case 'dictogloss':
      case 'listening_speed_adaptation':
      case 'summary_reconstruction':
      case 'discourse_marker_detection':
      case 'listening_response':
        return <ListeningInteractiveActivity {...commonProps} />;
      case 'framework_lesson':
        return <FrameworkLessonActivity {...commonProps} />;
      case 'vocabulary_activation':
      case 'vocabulary_challenge':
        return <VocabularyActivationActivity {...commonProps} />;
      case 'reflection':
        return <ReflectionActivity {...commonProps} />;
      case 'mission':
        return <MissionActivity {...commonProps} />;
      case 'meeting_simulation':
      case 'meeting_contribution':
      case 'polite_interruption':
        return <MeetingSimulationActivity {...commonProps} />;
      case 'interview_simulation':
      case 'star_response':
        return <InterviewSimulationActivity {...commonProps} />;
      case 'networking_roleplay':
      case 'professional_small_talk':
      case 'elevator_pitch_pro':
        return <NetworkingRoleplayActivity {...commonProps} />;
      case 'data_narration':
      case 'presentation_qa':
        return <DataNarrationActivity {...commonProps} />;
      case 'constructive_feedback':
      case 'sbi_feedback':
      case 'difficult_conversation':
      case 'apology_explanation':
      case 'hostile_question':
        return <FeedbackActivity {...commonProps} />;
      case 'email_to_voice':
      case 'register_switch':
        return <EmailToVoiceActivity {...commonProps} />;
      case 'negotiation_roleplay':
        return <NegotiationActivity {...commonProps} />;
      // Day 22: Explain Complex Ideas Simply
      case 'complexity_reduction':
      case 'jargon_detector':
      case 'audience_adaptation':
      case 'analogy_builder':
      case 'circumlocution_recycle':
      case 'listener_check':
      case 'ai_confusion_simulation':
      case 'explanation_scorecard':
        return <ComplexExplanationActivity {...commonProps} />;
      // Day 23: Persuade with Reasons, Evidence and Respect
      case 'persuasion_structure':
      case 'evidence_vs_opinion':
      case 'objection_handling':
      case 'persuasion_calibration':
      case 'compare_options':
      case 'persuasive_pitch_rotation':
      case 'persuasion_simulation':
      case 'persuasion_scorecard':
        return <PersuasionActivity {...commonProps} />;
      // Day 24: Leadership Communication
      case 'leadership_framework':
      case 'delegation_drill':
      case 'decision_explanation':
      case 'direction_uncertainty':
      case 'practical_motivation':
      case 'listening_leadership':
      case 'decision_meeting':
      case 'leadership_simulation':
      case 'leadership_scorecard':
        return <LeadershipSimulationActivity {...commonProps} />;
      // Day 25: Nuance, Hedging and Diplomacy
      case 'certainty_scale':
      case 'hedging_drill':
      case 'diplomatic_disagreement':
      case 'understatement_awareness':
      case 'tone_detection':
      case 'sarcasm_awareness':
      case 'rewrite_direct_message':
      case 'nuance_roleplay':
      case 'nuance_scorecard':
        return <NuanceDiplomacyActivity {...commonProps} />;
      // Day 26: Debate and Defend Ideas
      case 'argument_structure':
      case 'steelman_activity':
      case 'evidence_challenge':
      case 'logical_connection':
      case 'debate_language':
      case 'timed_argument':
      case 'debate_simulation':
      case 'debate_scorecard':
        return <DebateSimulationActivity {...commonProps} />;
      // Day 27: Handle Tough Questions and Pressure
      case 'thinking_pause':
      case 'clarify_question':
      case 'answer_what_you_know':
      case 'hostile_conversion':
      case 'multipart_question':
      case 'redirect_avoiding':
      case 'rapid_qa':
      case 'high_pressure_simulation':
      case 'tough_question_scorecard':
        return <ToughQuestionsActivity {...commonProps} />;
      // Day 28: Advanced Listening and Reactive Communication
      case 'discourse_markers':
      case 'tone_cues':
      case 'prediction_pause':
      case 'global_english':
      case 'fast_listening':
      case 'listen_summarize_react':
      case 'meeting_listening':
      case 'advanced_listening_challenge':
      case 'listening_scorecard':
        return <AdvancedListeningActivity {...commonProps} />;
      // Day 29: Final Rehearsal: Independent Communication (No Hints)
      case 'independent_priority_warmup':
      case 'independent_impromptu':
      case 'independent_story':
      case 'independent_listening':
      case 'independent_persuasion':
      case 'independent_difficult_convo':
      case 'independent_presentation':
      case 'communication_rescue':
      case 'personalized_error_review':
      case 'pronunciation_priority_review':
      case 'active_vocab_spontaneous':
        return <IndependentRehearsalActivity {...commonProps} />;
      // Day 30: Final Communication Transformation Assessment
      case 'final_confidence_assessment':
      case 'baseline_repeat':
      case 'side_by_side_comparison':
      case 'objective_metrics_comparison':
      case 'final_fluency_challenge':
      case 'final_structured_opinion':
      case 'final_story_experience':
      case 'final_listening':
      case 'final_vocab_activation':
      case 'final_pronunciation_clarity':
      case 'final_track_challenge':
      case 'final_persuasion':
      case 'final_tough_question':
      case 'final_integrated_simulation':
      case 'final_communication_scorecard':
      case 'final_transformation_report':
      case 'personal_phrasebook':
      case 'post_program_plan':
      case 'final_mission':
        return (
          <FinalTransformationActivity
            {...commonProps}
            earnedXp={earnedXp + totalXp}
            streak={currentStreak}
          />
        );
      case 'professional_weekly_diagnostic':
        return (
          <ProfessionalDiagnosticActivity
            {...commonProps}
            earnedXp={earnedXp + totalXp}
            streak={currentStreak}
            allResponses={responses}
          />
        );
      case 'weekly_diagnostic_v2':
      case 'weekly_challenge':
        return (
          <WeeklyDiagnosticV2Activity
            {...commonProps}
            earnedXp={earnedXp + totalXp}
            streak={currentStreak}
          />
        );
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
      case 'weekly_review':
      case 'weekly_report':
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
          <ThemeToggle />
        </div>
      </header>

      {/* Progress bar */}
      <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={`Day ${day.dayNumber} progress: ${progress}%`}>
        <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
      </div>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-2)', textAlign: 'right' }}>
        {completedIds.size}/{activities.length} activities • {progress}%
      </p>

      {/* Week 2 & Week 3 Personalized Priority Focus Banner */}
      {day.dayNumber >= 8 && day.dayNumber <= 21 && (
        <div style={{
          background: 'rgba(99, 102, 241, 0.08)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-3) var(--space-4)',
          margin: 'var(--space-3) 0',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          fontSize: 'var(--text-xs)',
          color: 'var(--text-primary)',
        }}>
          <span style={{ fontSize: 'var(--text-base)' }}>🎯</span>
          <div>
            <strong>Personalized Focus:</strong> {getPersonalizedFocusBanner(day.dayNumber, track)}
          </div>
        </div>
      )}

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
