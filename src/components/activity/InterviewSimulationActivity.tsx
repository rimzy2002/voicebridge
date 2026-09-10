'use client';

import { useState, useCallback } from 'react';
import { ActivityDefinition, LearnerTrack } from '@/types';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { formatDuration } from '@/hooks/useTimer';

interface InterviewSimulationActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
  track?: LearnerTrack;
  dayNumber?: number;
}

type InterviewDifficulty = 'supportive' | 'neutral' | 'challenging';

interface InterviewQuestion {
  id: string;
  question: string;
  type: 'intro' | 'behavioral' | 'strength' | 'weakness' | 'unexpected';
  followUp?: string;
  hint?: string;
}

const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  { id: 'intro', question: 'Tell me about yourself.', type: 'intro', hint: 'PRESENT → RELEVANT PAST → VALUE → DIRECTION. Avoid autobiography — keep it under 90 seconds.' },
  { id: 'challenge', question: 'Tell me about a time you handled a difficult challenge.', type: 'behavioral', followUp: 'What would you have done differently?', hint: 'Use the STAR framework: Situation → Task → Action → Result.' },
  { id: 'strength', question: 'What would you say is your greatest strength?', type: 'strength', followUp: 'Can you give me a specific example of that in action?', hint: 'Strength + Evidence + Relevance. Show, don\'t just tell.' },
  { id: 'weakness', question: 'What area are you currently working to improve?', type: 'weakness', followUp: 'What specific steps have you taken?', hint: 'Real manageable area + Action taken + Improvement shown. Avoid fake weaknesses.' },
  { id: 'teamwork', question: 'Describe a time you worked effectively as part of a team.', type: 'behavioral', followUp: 'What was your specific contribution?', hint: 'STAR: Focus on YOUR actions and the team outcome.' },
  { id: 'deadline', question: 'Tell me about a time you had to meet a tight deadline.', type: 'behavioral', hint: 'STAR: Emphasize how you prioritized and what the result was.' },
  { id: 'disagree', question: 'Describe a situation where you disagreed with a colleague.', type: 'behavioral', followUp: 'How did you resolve it?', hint: 'STAR: Show respectful disagreement and constructive resolution.' },
  { id: 'unexpected', question: 'If you could change one thing about your field or industry, what would it be?', type: 'unexpected', hint: 'Take a moment to organize. Clear position → Reasoning → Brief evidence.' },
];

const DIFFICULTY_STYLES: Record<InterviewDifficulty, { label: string; icon: string; description: string }> = {
  supportive: { label: 'Supportive', icon: '😊', description: 'Clear questions, extra thinking time, encouraging responses' },
  neutral: { label: 'Realistic', icon: '🤝', description: 'Natural follow-ups, standard expectations' },
  challenging: { label: 'Challenging', icon: '🔥', description: 'Unexpected questions, probing follow-ups, time pressure' },
};

export default function InterviewSimulationActivity({
  activity,
  onComplete,
  onNext,
  isCompleted,
  savedResponse,
  track = 'general',
}: InterviewSimulationActivityProps) {
  const config = activity.config || {};
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [difficulty, setDifficulty] = useState<InterviewDifficulty>('supportive');
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [questionResponses, setQuestionResponses] = useState<Record<string, string>>({});
  const [showScorecard, setShowScorecard] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [completed, setCompleted] = useState(isCompleted);

  const questions = config.interviewQuestions
    ? (config.interviewQuestions as InterviewQuestion[])
    : INTERVIEW_QUESTIONS.slice(0, difficulty === 'challenging' ? 6 : difficulty === 'neutral' ? 5 : 4);

  const currentQuestion = questions[currentQuestionIndex];

  const {
    isRecording, duration, startRecording, stopRecording,
    isPaused, pauseRecording, resumeRecording, audioUrl, error: recorderError,
  } = useAudioRecorder({ maxDuration: 180 });

  const handleSaveResponse = useCallback(() => {
    if (audioUrl && currentQuestion) {
      setQuestionResponses(prev => ({
        ...prev,
        [currentQuestion.id + (showFollowUp ? '_followup' : '')]: audioUrl,
      }));
    }
  }, [audioUrl, currentQuestion, showFollowUp]);

  const handleNextQuestion = () => {
    handleSaveResponse();

    if (showFollowUp || !currentQuestion.followUp) {
      setShowFollowUp(false);
      setShowHint(false);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setShowScorecard(true);
      }
    } else {
      setShowFollowUp(true);
      setShowHint(false);
    }
  };

  const handleFinish = () => {
    setCompleted(true);
    onComplete({
      interviewResponses: questionResponses,
      totalQuestions: questions.length,
      answeredQuestions: Object.keys(questionResponses).length,
      difficulty,
      track,
      timestamp: new Date().toISOString(),
    });
  };

  if (completed || isCompleted) {
    return (
      <div className="glass-card glass-card--elevated animate-scale-in" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>🎯</div>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Interview Complete</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          You answered {Object.keys(savedResponse?.interviewResponses || questionResponses || {}).length} interview questions.
        </p>
        <button className="btn btn--primary" onClick={onNext} style={{ marginTop: 'var(--space-6)' }}>Continue →</button>
      </div>
    );
  }

  // Difficulty selection screen
  if (!interviewStarted) {
    return (
      <div className="glass-card glass-card--elevated animate-scale-in" style={{ padding: 'var(--space-8)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <div style={{ fontSize: '40px', marginBottom: 'var(--space-3)' }}>🎤</div>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Interview Simulation</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
            Choose a difficulty level. Each level adds more pressure and follow-up questions.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
          {(Object.entries(DIFFICULTY_STYLES) as [InterviewDifficulty, typeof DIFFICULTY_STYLES['supportive']][]).map(([key, style]) => (
            <button
              key={key}
              onClick={() => setDifficulty(key)}
              style={{
                padding: 'var(--space-4)',
                background: difficulty === key ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.03)',
                border: difficulty === key ? '2px solid rgba(99, 102, 241, 0.5)' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer', textAlign: 'left', color: 'var(--text-primary)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                <span style={{ fontSize: 'var(--text-xl)' }}>{style.icon}</span>
                <strong>{style.label}</strong>
              </div>
              <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{style.description}</p>
            </button>
          ))}
        </div>

        <button className="btn btn--primary" onClick={() => setInterviewStarted(true)} style={{ width: '100%' }}>
          Start Interview
        </button>
      </div>
    );
  }

  // Scorecard
  if (showScorecard) {
    return (
      <div className="glass-card glass-card--elevated animate-scale-in" style={{ padding: 'var(--space-8)' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>Interview Scorecard</h3>

        <div style={{ display: 'grid', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
          {questions.map(q => (
            <div key={q.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: 'var(--space-3) var(--space-4)',
              background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  {q.question.length > 50 ? q.question.slice(0, 50) + '...' : q.question}
                </span>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                  {q.type === 'behavioral' ? '📋 Behavioral (STAR)' : q.type === 'intro' ? '👋 Introduction' : q.type === 'unexpected' ? '⚡ Unexpected' : `💡 ${q.type}`}
                </div>
              </div>
              <span style={{ color: questionResponses[q.id] ? 'var(--color-success)' : 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>
                {questionResponses[q.id] ? '✓' : '—'}
              </span>
            </div>
          ))}
        </div>

        <div style={{
          background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', marginBottom: 'var(--space-6)',
        }}>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
            <strong>Key takeaway:</strong> Strong interview answers use evidence, not adjectives. Instead of &quot;I am a great leader,&quot; say &quot;I led a team of 5 that delivered the project 2 weeks early.&quot;
          </p>
        </div>

        <button className="btn btn--primary" onClick={handleFinish} style={{ width: '100%' }}>
          Complete Interview Activity
        </button>
      </div>
    );
  }

  // Main interview flow
  return (
    <div className="glass-card glass-card--elevated animate-slide-up" style={{ padding: 'var(--space-6)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: 'var(--text-xl)' }}>👩‍💼</span>
            <div>
              <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>Sarah — Interviewer</div>
              <div style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)' }}>
                {DIFFICULTY_STYLES[difficulty].icon} {DIFFICULTY_STYLES[difficulty].label} Mode
              </div>
            </div>
          </div>
        </div>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
          Q{currentQuestionIndex + 1} / {questions.length}
        </span>
      </div>

      {/* Progress */}
      <div className="progress-bar" style={{ height: '4px', marginBottom: 'var(--space-4)' }}>
        <div className="progress-bar__fill" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`, transition: 'width 0.5s ease' }} />
      </div>

      {/* Question */}
      <div style={{
        background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)', marginBottom: 'var(--space-4)',
        borderLeft: '3px solid rgba(99, 102, 241, 0.5)',
      }}>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' }}>
          {currentQuestion.type === 'behavioral' ? '📋 Behavioral Question' : currentQuestion.type === 'intro' ? '👋 Introduction' : currentQuestion.type === 'unexpected' ? '⚡ Unexpected Question' : `💡 ${currentQuestion.type} Question`}
        </div>
        <p style={{ color: 'var(--text-primary)', fontSize: 'var(--text-base)', margin: 0, fontWeight: 500 }}>
          {showFollowUp && currentQuestion.followUp ? currentQuestion.followUp : currentQuestion.question}
        </p>
        {showFollowUp && (
          <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)', margin: 'var(--space-2) 0 0', fontStyle: 'italic' }}>
            (Follow-up question based on your previous answer)
          </p>
        )}
      </div>

      {/* Hint Toggle */}
      {currentQuestion.hint && !showHint && (
        <button
          className="btn btn--ghost"
          onClick={() => setShowHint(true)}
          style={{ fontSize: 'var(--text-xs)', marginBottom: 'var(--space-3)', width: '100%' }}
        >
          💡 Show Hint
        </button>
      )}
      {showHint && currentQuestion.hint && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)',
          borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)',
          marginBottom: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)',
        }}>
          💡 {currentQuestion.hint}
        </div>
      )}

      {/* Recording */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
        {recorderError && (
          <p style={{ color: 'var(--color-error)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>{recorderError}</p>
        )}

        {!isRecording && !audioUrl && (
          <button className="btn btn--primary" onClick={startRecording} style={{ minWidth: '200px' }}>
            🎤 Record Your Answer
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
              <button className="btn btn--primary" onClick={handleNextQuestion}>
                {currentQuestionIndex < questions.length - 1 || (!showFollowUp && currentQuestion.followUp) ? 'Next →' : 'View Results'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
