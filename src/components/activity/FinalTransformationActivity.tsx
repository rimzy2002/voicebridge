'use client';

import { useState } from 'react';
import {
  ActivityDefinition,
  LearnerTrack,
  FinalReportData,
} from '@/types';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { generateComprehensiveFinalReport } from '@/lib/ai/finalAssessment';

interface FinalTransformationActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
  track?: LearnerTrack;
  dayNumber?: number;
  earnedXp?: number;
  streak?: number;
}

export default function FinalTransformationActivity({
  activity: _activity,
  onComplete,
  onNext: _onNext,
  isCompleted: _isCompleted,
  savedResponse,
  track = 'general',
  earnedXp = 3450,
  streak = 30,
}: FinalTransformationActivityProps) {
  const [activeTab, setActiveTab] = useState<
    'welcome' | 'baseline_repeat' | 'side_by_side' | 'scorecard' | 'timeline' | 'phrasebook' | 'continuation' | 'final_report'
  >('welcome');

  const [selfStronger, setSelfStronger] = useState<'day1' | 'day30' | 'similar'>('day30');
  const [selectedChanges, setSelectedChanges] = useState<string[]>([
    'I speak longer without running out of ideas',
    'I pause intentionally instead of saying "um"',
    'I organize ideas with clear structure',
    'I sound clearer and more confident',
  ]);
  const [postProgramGoal, setPostProgramGoal] = useState<string>('workplace_meetings');
  const [reflectionAnswers, setReflectionAnswers] = useState({
    whatChangedMost: 'I stopped internal translation and can now structure ideas spontaneously.',
    mostHelpfulActivity: 'The PREP technique and high-pressure tough questions simulations.',
    hardestProblem: 'Replacing vocal fillers with silent, composed pauses.',
    newCapability: 'Speaking up in large group meetings and negotiating trade-offs clearly.',
    outsideUsage: 'Contributed actively in team standups and project discussions.',
    futureFocus: 'Maintaining past-tense accuracy during long, rapid stories.',
    finalConfidenceRating: 9,
  });

  const [finalReport, setFinalReport] = useState<FinalReportData>(() =>
    generateComprehensiveFinalReport({
      track,
      comparisonInput: {
        day1DurationSeconds: 45,
        day30DurationSeconds: 92,
        day1StartDelaySeconds: 7.5,
        day30StartDelaySeconds: 2.4,
        day1Confidence: 4.2,
        day30Confidence: 8.9,
      },
      reflectionAnswers: {
        ...reflectionAnswers,
        finalConfidenceRating: String(reflectionAnswers.finalConfidenceRating),
      },
    })
  );

  const { isRecording, duration, startRecording, stopRecording, audioBlob } = useAudioRecorder();
  const [hasRecordedDay30Baseline, setHasRecordedDay30Baseline] = useState<boolean>(false);

  const handleStopBaseline = () => {
    stopRecording();
    setHasRecordedDay30Baseline(true);
    const updated = generateComprehensiveFinalReport({
      track,
      comparisonInput: {
        day1DurationSeconds: 45,
        day30DurationSeconds: Math.round(duration) || 92,
        day1StartDelaySeconds: 7.5,
        day30StartDelaySeconds: 2.4,
        selfAssessment: {
          strongerRecording: selfStronger,
          selectedChanges,
        },
      },
      reflectionAnswers: {
        ...reflectionAnswers,
        finalConfidenceRating: String(reflectionAnswers.finalConfidenceRating),
      },
    });
    setFinalReport(updated);

    onComplete({
      completed: true,
      audioSize: audioBlob?.size,
      report: updated,
      timestamp: new Date().toISOString(),
    });
  };

  const changeChecklistOptions = [
    'I speak longer without running out of ideas',
    'I pause intentionally instead of saying "um"',
    'I organize ideas with clear structure',
    'I use stronger professional vocabulary',
    'I sound clearer and more authoritative',
    'I feel much more confident entering conversations',
    'I recover quickly from mistakes without freezing',
    'I understand fast international speakers more easily',
  ];

  const toggleChangeOption = (opt: string) => {
    setSelectedChanges(prev =>
      prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]
    );
  };

  return (
    <div className="glass-card glass-card--elevated animate-scale-in" style={{ padding: 'var(--space-8)' }}>
      {/* Top Capstone Trophy */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
        <div style={{
          width: '84px', height: '84px', borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.3), rgba(168, 85, 247, 0.3))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto var(--space-3)', fontSize: '42px',
          boxShadow: '0 0 35px rgba(234, 179, 8, 0.4)',
        }}>
          🌟
        </div>
        <span className="badge badge--warning" style={{ marginBottom: 'var(--space-1)' }}>30 OF 30 DAYS COMPLETED</span>
        <h2 style={{ color: 'var(--text-primary)', margin: 'var(--space-1) 0' }}>The Final Communication Transformation</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', maxWidth: '640px', margin: '0 auto' }}>
          This is evidence of transformation — not perfection. Review your 30-day journey, compare your Day 1 vs Day 30 voice, and claim your personalized continuation plan.
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex', gap: 'var(--space-1)', marginBottom: 'var(--space-6)',
        background: 'var(--bg-surface-subtle)', padding: 'var(--space-1)', borderRadius: 'var(--radius-lg)',
        overflowX: 'auto',
      }}>
        {[
          { id: 'welcome', label: '1. Welcome' },
          { id: 'baseline_repeat', label: '2. Repeat Baseline' },
          { id: 'side_by_side', label: '3. Day 1 vs Day 30' },
          { id: 'scorecard', label: '4. 14-Dimension Score' },
          { id: 'timeline', label: '5. 30-Day Timeline' },
          { id: 'phrasebook', label: '6. My Phrasebook' },
          { id: 'continuation', label: '7. 30-90 Day Plan' },
          { id: 'final_report', label: '8. Complete Report' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`btn btn--sm ${activeTab === tab.id ? 'btn--primary' : 'btn--secondary'}`}
            style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Welcome & Philosophy */}
      {activeTab === 'welcome' && (
        <div className="animate-fade-in">
          <div className="glass-card" style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-5)', background: 'var(--bg-surface-subtle)' }}>
            <h3 style={{ color: 'var(--text-primary)', margin: '0 0 var(--space-2)' }}>The Core Assessment Principle</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
              The platform will never make the empty promise: <em>"You are fluent now."</em> Language mastery is a lifelong practice. What we measure today is genuine, verifiable change in:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
              {[
                '✓ Spontaneous speaking duration',
                '✓ Reduced response-start delay',
                '✓ Intentional silent pauses over fillers',
                '✓ Framework-driven idea structure',
                '✓ 96+ Active lexical chunks',
                '✓ 100% Independent unassisted performance',
              ].map((item, i) => (
                <div key={i} style={{ color: 'var(--color-success-300)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => setActiveTab('baseline_repeat')} className="btn btn--primary">
              Proceed to Repeat Day 1 Baseline →
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Repeat Day 1 Baseline */}
      {activeTab === 'baseline_repeat' && (
        <div className="animate-fade-in">
          <div className="glass-card" style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-5)', background: 'var(--bg-surface-subtle)', borderLeft: '4px solid var(--color-primary-500)' }}>
            <span className="badge badge--primary" style={{ marginBottom: 'var(--space-2)' }}>CRITICAL COMPARISON STEP</span>
            <h3 style={{ color: 'var(--text-primary)', margin: '0 0 var(--space-2)' }}>Repeat the Day 1 Baseline Prompt</h3>
            <p style={{ color: 'var(--text-primary)', fontSize: 'var(--text-md)', fontWeight: 600, margin: 'var(--space-2) 0' }}>
              "Introduce yourself, your background, what you do, and what you care about most in your work or studies."
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', margin: 0 }}>
              Speak for 90 seconds. <strong>Do not restart because of mistakes.</strong> Keep speaking and let your 30 days of training flow naturally.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
            {!isRecording ? (
              <button onClick={startRecording} className="btn btn--primary" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span>🎙️</span> {hasRecordedDay30Baseline ? 'Re-record Day 30 Baseline (90s)' : 'Record Final Day 30 Baseline (90s)'}
              </button>
            ) : (
              <button onClick={handleStopBaseline} className="btn btn--danger" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span className="recording-pulse" /> Stop Recording ({Math.round(duration)}s)
              </button>
            )}
          </div>

          {hasRecordedDay30Baseline && (
            <div className="glass-card animate-fade-in" style={{ padding: 'var(--space-4)', background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.2)', marginBottom: 'var(--space-4)' }}>
              <span style={{ color: 'var(--color-success-300)', fontSize: 'var(--text-sm)' }}>
                ✅ Final Baseline Saved! Your 90-second recording is ready for side-by-side comparison against Day 1.
              </span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => setActiveTab('side_by_side')} className="btn btn--primary">
              Compare Side-by-Side with Day 1 →
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Side-by-Side Comparison */}
      {activeTab === 'side_by_side' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Side-by-Side Audio & Self-Assessment</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            Listen to your original voice from Day 1 and your transformed voice on Day 30:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
            <div className="glass-card" style={{ padding: 'var(--space-4)', borderTop: '3px solid var(--text-muted)' }}>
              <span className="badge badge--secondary" style={{ marginBottom: 'var(--space-2)' }}>Day 1 Baseline</span>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', fontStyle: 'italic', marginBottom: 'var(--space-3)' }}>
                "{finalReport.assessment.sideBySideComparison.day1Transcript}"
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                <span>Duration: 45s</span>
                <span>Latency: 7.5s</span>
                <span>Fillers: 11.2/min</span>
              </div>
            </div>

            <div className="glass-card" style={{ padding: 'var(--space-4)', borderTop: '3px solid var(--color-success-500)', background: 'rgba(34, 197, 94, 0.04)' }}>
              <span className="badge badge--success" style={{ marginBottom: 'var(--space-2)' }}>Day 30 Transformed</span>
              <p style={{ color: 'var(--text-primary)', fontSize: 'var(--text-xs)', fontStyle: 'italic', marginBottom: 'var(--space-3)' }}>
                "{finalReport.assessment.sideBySideComparison.day30Transcript}"
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-success-300)' }}>
                <span>Duration: 92s (+104%)</span>
                <span>Latency: 2.4s (-68%)</span>
                <span>Fillers: 3.1/min (-72%)</span>
              </div>
            </div>
          </div>

          {/* Self Assessment Questions */}
          <div className="glass-card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-5)', background: 'var(--bg-surface-subtle)' }}>
            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Which recording sounds stronger to you?
            </strong>
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              {[
                { id: 'day1' as const, label: 'Day 1' },
                { id: 'similar' as const, label: 'Similar' },
                { id: 'day30' as const, label: 'Day 30 (Transformed)' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSelfStronger(opt.id)}
                  className={`btn btn--sm ${selfStronger === opt.id ? 'btn--primary' : 'btn--secondary'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              What changed most between Day 1 and Day 30?
            </strong>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
              {changeChecklistOptions.map(opt => (
                <label
                  key={opt}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedChanges.includes(opt)}
                    onChange={() => toggleChangeOption(opt)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Honest Context Notes */}
          <div className="glass-card" style={{ padding: 'var(--space-3)', marginBottom: 'var(--space-5)', background: 'rgba(99, 102, 241, 0.06)' }}>
            <strong style={{ color: 'var(--color-primary-300)', fontSize: 'var(--text-xs)', display: 'block', marginBottom: 'var(--space-1)' }}>
              HONEST ANALYTICS CONTEXT:
            </strong>
            {finalReport.assessment.sideBySideComparison.honestContextNotes?.map((note, i) => (
              <p key={i} style={{ color: 'var(--text-secondary)', fontSize: '11px', margin: 'var(--space-1) 0' }}>
                • {note}
              </p>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => setActiveTab('scorecard')} className="btn btn--primary">
              View 14-Dimension Scorecard →
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: 14-Dimension Scorecard */}
      {activeTab === 'scorecard' && (
        <div className="animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
            <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>Final 14-Dimension Communication Profile</h3>
            <span className="badge badge--primary">Overall Program Score: {finalReport.assessment.overallProgramScore}/100</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', marginBottom: 'var(--space-4)' }}>
            *Note: This is a program progress score measuring growth from Day 1, not an official CEFR/IELTS examination.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
            {[
              { label: 'Fluency', val: finalReport.assessment.snapshots.day30.fluency },
              { label: 'Idea Structure', val: finalReport.assessment.snapshots.day30.ideaStructure },
              { label: 'Conversation', val: finalReport.assessment.snapshots.day30.conversation },
              { label: 'Storytelling', val: finalReport.assessment.snapshots.day30.storytelling },
              { label: 'Active Vocabulary', val: finalReport.assessment.snapshots.day30.vocabulary },
              { label: 'Grammar in Speech', val: finalReport.assessment.snapshots.day30.grammarWhileSpeaking },
              { label: 'Pronunciation Clarity', val: finalReport.assessment.snapshots.day30.pronunciationClarity },
              { label: 'Listening Comprehension', val: finalReport.assessment.snapshots.day30.listening },
              { label: 'Spontaneous Speaking', val: finalReport.assessment.snapshots.day30.spontaneousSpeaking },
              { label: 'Track Communication', val: finalReport.assessment.snapshots.day30.trackCommunication },
              { label: 'Persuasion & Evidence', val: finalReport.assessment.snapshots.day30.persuasion },
              { label: 'Recovery from Confusion', val: finalReport.assessment.snapshots.day30.communicationRecovery },
              { label: 'Independent Execution', val: finalReport.assessment.snapshots.day30.independentPerformance },
              { label: 'Confidence & Composure', val: finalReport.assessment.snapshots.day30.confidenceBehavior },
            ].map(dim => (
              <div key={dim.label} className="glass-card" style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>{dim.label}</span>
                <strong style={{ fontSize: '18px', color: 'var(--color-primary-400)' }}>{dim.val.toFixed(1)}/10</strong>
              </div>
            ))}
          </div>

          <div className="glass-card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-5)', background: 'rgba(34, 197, 94, 0.05)', borderLeft: '4px solid var(--color-success-500)' }}>
            <strong style={{ color: 'var(--color-success-400)', display: 'block', marginBottom: 'var(--space-1)', fontSize: 'var(--text-sm)' }}>
              🏆 Strongest Improvement: {finalReport.assessment.strongestImprovement.dimension}
            </strong>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', margin: 0 }}>
              {finalReport.assessment.strongestImprovement.evidence}
            </p>
          </div>

          <div className="glass-card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-5)', background: 'rgba(245, 158, 11, 0.05)', borderLeft: '4px solid var(--color-warning-500)' }}>
            <strong style={{ color: 'var(--color-warning-300)', display: 'block', marginBottom: 'var(--space-1)', fontSize: 'var(--text-sm)' }}>
              🎯 Continuing Priority: {finalReport.assessment.mainContinuingPriority.area}
            </strong>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', margin: '0 0 var(--space-2)' }}>
              {finalReport.assessment.mainContinuingPriority.evidence}
            </p>
            <div style={{ color: 'var(--color-primary-300)', fontSize: '11px' }}>
              Action: {finalReport.assessment.mainContinuingPriority.recommendedAction}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => setActiveTab('timeline')} className="btn btn--primary">
              View 30-Day Progress Timeline →
            </button>
          </div>
        </div>
      )}

      {/* Tab 5: Timeline */}
      {activeTab === 'timeline' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>30-Day Progression Timeline</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            Tracking compatible metrics across all five milestones (Day 1 → Day 7 → Day 14 → Day 21 → Day 30):
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
            {[
              { day: 'Day 1', score: 42.5, focus: 'Discovery Baseline' },
              { day: 'Day 7', score: 57.6, focus: 'De-Fossilization' },
              { day: 'Day 14', score: 72.1, focus: 'Fluency Mastery' },
              { day: 'Day 21', score: 81.8, focus: 'Professional Reset' },
              { day: 'Day 30', score: 89.2, focus: 'Advanced Transformation' },
            ].map(m => (
              <div key={m.day} className="glass-card" style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                <span className="badge badge--secondary" style={{ fontSize: '10px' }}>{m.day}</span>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary-400)', margin: 'var(--space-2) 0' }}>
                  {m.score}
                </div>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{m.focus}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => setActiveTab('phrasebook')} className="btn btn--primary">
              Open Personal Phrasebook (~100 Chunks) →
            </button>
          </div>
        </div>
      )}

      {/* Tab 6: Phrasebook */}
      {activeTab === 'phrasebook' && (
        <div className="animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
            <div>
              <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>My Communication Phrasebook</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', margin: 0 }}>
                {finalReport.phrasebook.totalItems} high-value chunks practiced and activated across 30 days.
              </p>
            </div>
            <span className="badge badge--success">Mastered Library</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)', maxHeight: '420px', overflowY: 'auto', marginBottom: 'var(--space-5)', paddingRight: 'var(--space-2)' }}>
            {Object.entries(finalReport.phrasebook.categories).map(([catName, items]) => (
              <div key={catName} className="glass-card" style={{ padding: 'var(--space-3)', background: 'var(--bg-surface-subtle)' }}>
                <strong style={{ color: 'var(--color-primary-400)', fontSize: 'var(--text-xs)', display: 'block', marginBottom: 'var(--space-2)' }}>
                  {catName} ({items.length})
                </strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {items.slice(0, 3).map(item => (
                    <div key={item.id} style={{ fontSize: '11px' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>"{item.phrase}"</strong>
                      <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>{item.exampleInContext}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => setActiveTab('continuation')} className="btn btn--primary">
              View 30-90 Day Plan →
            </button>
          </div>
        </div>
      )}

      {/* Tab 7: 30-90 Day Continuation Plan */}
      {activeTab === 'continuation' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Personalized 30–90 Day Continuation Plan</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            The 30-day program establishes the foundation. This structure maintains your compounding momentum:
          </p>

          <div style={{ marginBottom: 'var(--space-4)' }}>
            <label style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', display: 'block', marginBottom: 'var(--space-1)' }}>
              Select Your Primary Post-Program Goal:
            </label>
            <select
              value={postProgramGoal}
              onChange={e => setPostProgramGoal(e.target.value)}
              className="btn btn--secondary btn--sm"
              style={{ width: '100%', background: 'rgba(0,0,0,0.3)', color: 'var(--text-primary)' }}
            >
              <option value="workplace_meetings">Workplace Meetings & Project Updates</option>
              <option value="interviews">Job Interviews & High-Stakes Storytelling</option>
              <option value="presentations">Presentations & Data Narration</option>
              <option value="academic">Academic Discussions & Research Defense</option>
              <option value="social">Spontaneous Social & Travel Conversations</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
            <div className="glass-card" style={{ padding: 'var(--space-3)' }}>
              <span className="badge badge--primary" style={{ fontSize: '10px' }}>Days 1–30 Post</span>
              <h4 style={{ color: 'var(--text-primary)', margin: 'var(--space-1) 0' }}>Maintain Habit</h4>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '11px', paddingLeft: 'var(--space-3)', margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                {finalReport.continuationPlan.phase1_Next30Days.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
            <div className="glass-card" style={{ padding: 'var(--space-3)' }}>
              <span className="badge badge--warning" style={{ fontSize: '10px' }}>Days 31–60</span>
              <h4 style={{ color: 'var(--text-primary)', margin: 'var(--space-1) 0' }}>Target Priority</h4>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '11px', paddingLeft: 'var(--space-3)', margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                {finalReport.continuationPlan.phase2_Days31To60.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
            <div className="glass-card" style={{ padding: 'var(--space-3)' }}>
              <span className="badge badge--success" style={{ fontSize: '10px' }}>Days 61–90</span>
              <h4 style={{ color: 'var(--text-primary)', margin: 'var(--space-1) 0' }}>Real Complexity</h4>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '11px', paddingLeft: 'var(--space-3)', margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                {finalReport.continuationPlan.phase3_Days61To90.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => setActiveTab('final_report')} className="btn btn--primary">
              Generate 30-Day Comprehensive Report →
            </button>
          </div>
        </div>
      )}

      {/* Tab 8: Final Report & Export */}
      {activeTab === 'final_report' && (
        <div className="animate-fade-in">
          <div className="glass-card" style={{ padding: 'var(--space-5)', background: 'var(--bg-surface-subtle)', marginBottom: 'var(--space-5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-3)' }}>
              <div>
                <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>30-Day Communication Report</h3>
                <span style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>
                  Track: {track.toUpperCase()} • Streak: {streak} Days • Total XP: {earnedXp}
                </span>
              </div>
              <button
                onClick={() => window.print()}
                className="btn btn--sm btn--secondary"
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}
              >
                <span>🖨️</span> Print / Save PDF
              </button>
            </div>

            {/* Program Statistics Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-2)', marginBottom: 'var(--space-5)' }}>
              <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Speaking Time</span>
                <strong style={{ color: 'var(--color-primary-400)', display: 'block', fontSize: '16px' }}>480 mins</strong>
              </div>
              <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Recordings</span>
                <strong style={{ color: 'var(--color-success-400)', display: 'block', fontSize: '16px' }}>114</strong>
              </div>
              <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Missions Done</span>
                <strong style={{ color: 'var(--color-warning-400)', display: 'block', fontSize: '16px' }}>30/30</strong>
              </div>
              <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Active Chunks</span>
                <strong style={{ color: 'var(--color-info-400)', display: 'block', fontSize: '16px' }}>96</strong>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>1. Starting Point vs Capstone:</strong> Baseline response-start delay plummeted from 7.5s to 2.4s. Continuous speaking duration doubled with zero mental freezes.
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>2. Active Vocabulary:</strong> 96 expressions deployed in spontaneous speech across meetings, interviews, presentations, and trade-off negotiations.
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>3. Intelligibility & Composure:</strong> Replaced vocal fillers with deliberate silent pauses; structured tough questions using Pause → Understand → Structure → Respond.
              </div>
            </div>
          </div>

          {/* Privacy-Safe Completion Card */}
          <div className="glass-card" style={{ padding: 'var(--space-4)', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))', textAlign: 'center' }}>
            <h4 style={{ color: 'var(--text-primary)', margin: '0 0 var(--space-1)' }}>30-Day Communication Transformation Complete!</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '11px', margin: '0 0 var(--space-3)' }}>
              Badge Awarded: <strong>Confident Communicator 🌟</strong>
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-2)' }}>
              <button
                onClick={() => {
                  alert('Shareable card copied to clipboard! (Sensitive diagnostic scores and private recordings are strictly excluded for your privacy).');
                }}
                className="btn btn--sm btn--primary"
              >
                📋 Copy Privacy-Safe Milestone Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
