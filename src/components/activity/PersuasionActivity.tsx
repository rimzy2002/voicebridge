'use client';

import { useState } from 'react';
import { ActivityDefinition, LearnerTrack, PersuasionMetrics } from '@/types';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { analyzePersuasion } from '@/lib/ai/week4';

interface PersuasionActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
  track?: LearnerTrack;
  dayNumber?: number;
}

export default function PersuasionActivity({
  activity,
  onComplete,
  onNext,
  isCompleted: _isCompleted,
  savedResponse,
  track = 'general',
}: PersuasionActivityProps) {
  const [activeTab, setActiveTab] = useState<'framework' | 'evidence_drill' | 'pitch_rotation' | 'stakeholder_sim'>('framework');
  const [pitchTier, setPitchTier] = useState<30 | 60 | 120>(60);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [transcript, setTranscript] = useState<string>((savedResponse?.transcript as string) || '');
  const [metrics, setMetrics] = useState<PersuasionMetrics | null>(
    (savedResponse?.metrics as PersuasionMetrics) || null
  );
  const [aiFeedback, setAiFeedback] = useState<{ strength: string; objectionHandlingTip: string; toneCalibration: string } | null>(
    (savedResponse?.aiFeedback as any) || null
  );

  const { isRecording, duration, startRecording, stopRecording, audioBlob } = useAudioRecorder();

  // Evidence vs Opinion Drill items
  const drillItems = [
    {
      statement: '"Our customer onboarding is completely broken and nobody likes it."',
      correct: 'Opinion',
      explanation: 'Exaggerated emotional generalization without verifiable metrics.',
    },
    {
      statement: '"In Q3, 42% of users dropped off on step 2 of the registration flow."',
      correct: 'Evidence',
      explanation: 'Concrete, verifiable quantitative data.',
    },
    {
      statement: '"Users probably get confused because the password field is too strict."',
      correct: 'Assumption',
      explanation: 'A plausible hypothesis that has not yet been validated with user testing.',
    },
    {
      statement: '"I noticed three separate support tickets mentioning the missing verification email yesterday."',
      correct: 'Observation',
      explanation: 'Factual personal observation of recent events without extrapolated claims.',
    },
  ];

  const handleStopRecording = () => {
    stopRecording();
    const simulatedText =
      transcript ||
      "I'd recommend that we simplify our user onboarding down to three steps. The main benefit would be reducing our 40% drop-off rate, which we observed last month. One concern might be that we collect less profile data upfront, but we can address that by asking for optional details later during profile setup. For that reason, I suggest we run an A/B test starting next sprint.";

    setTranscript(simulatedText);
    const result = analyzePersuasion({
      transcript: simulatedText,
      topic: activity.config?.topic || 'Process Recommendation',
      learnerTrack: track,
    });

    setMetrics(result.metrics);
    setAiFeedback(result.feedback);

    onComplete({
      transcript: simulatedText,
      pitchTier,
      metrics: result.metrics,
      aiFeedback: result.feedback,
      audioSize: audioBlob?.size,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="glass-card glass-card--elevated animate-scale-in" style={{ padding: 'var(--space-8)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="badge badge--primary" style={{ marginBottom: 'var(--space-2)' }}>Day 23 • Persuasion Without Pressure</span>
            <h2 style={{ color: 'var(--text-primary)', margin: 'var(--space-2) 0' }}>{activity.title}</h2>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              {activity.description || 'Persuade listeners using evidence, respect, and trade-off acknowledgement rather than emotional pressure.'}
            </p>
          </div>
          <span style={{ fontSize: '32px' }}>🎯</span>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', background: 'rgba(255,255,255,0.03)', padding: 'var(--space-1)', borderRadius: 'var(--radius-lg)' }}>
        {[
          { id: 'framework', label: '1. Persuasion Structure' },
          { id: 'evidence_drill', label: '2. Evidence vs Opinion' },
          { id: 'pitch_rotation', label: '3. Tiered Pitch (30s/60s/2m)' },
          { id: 'stakeholder_sim', label: '4. Stakeholder Simulation' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`btn btn--sm ${activeTab === tab.id ? 'btn--primary' : 'btn--secondary'}`}
            style={{ flex: 1 }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Framework */}
      {activeTab === 'framework' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>The 7-Part Persuasion Flow</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
            {[
              { num: '1', title: 'RECOMMENDATION', phrase: '"I\'d recommend that we..."', desc: 'State the proposal clearly upfront.' },
              { num: '2', title: 'REASON', phrase: '"The rationale behind this is..."', desc: 'Why this action is needed now.' },
              { num: '3', title: 'BENEFIT', phrase: '"The primary advantage would be..."', desc: 'Who gains and what improves.' },
              { num: '4', title: 'EVIDENCE', phrase: '"The data we observed indicates..."', desc: 'Metrics, case studies, or observations.' },
              { num: '5', title: 'CONCERN', phrase: '"One reasonable objection might be..."', desc: 'Acknowledge the main limitation.' },
              { num: '6', title: 'RESPONSE', phrase: '"We could mitigate that by..."', desc: 'Offer a practical counter-measure.' },
              { num: '7', title: 'ACTION', phrase: '"For that reason, I propose we start with..."', desc: 'Specific, low-friction next step.' },
            ].map(step => (
              <div key={step.num} className="glass-card" style={{ padding: 'var(--space-4)', background: 'rgba(255,255,255,0.02)' }}>
                <span className="badge badge--secondary" style={{ fontSize: '10px' }}>Step {step.num}</span>
                <div style={{ color: 'var(--color-primary-400)', fontWeight: 600, margin: 'var(--space-1) 0' }}>{step.title}</div>
                <div style={{ color: 'var(--text-primary)', fontSize: 'var(--text-xs)', fontStyle: 'italic', marginBottom: 'var(--space-1)' }}>{step.phrase}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)' }}>{step.desc}</div>
              </div>
            ))}
          </div>

          <button onClick={() => setActiveTab('evidence_drill')} className="btn btn--primary" style={{ width: '100%' }}>
            Proceed to Evidence vs Opinion Drill →
          </button>
        </div>
      )}

      {/* Tab 2: Evidence vs Opinion Drill */}
      {activeTab === 'evidence_drill' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Evidence vs Opinion: Never Present Assumptions as Facts</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            Credibility is destroyed when speakers state subjective feelings as objective evidence. Classify each statement:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            {drillItems.map((item, idx) => (
              <div key={idx} className="glass-card" style={{ padding: 'var(--space-4)', background: 'rgba(255,255,255,0.02)' }}>
                <p style={{ color: 'var(--text-primary)', margin: '0 0 var(--space-3)', fontWeight: 500 }}>
                  {item.statement}
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-2)' }}>
                  {['Evidence', 'Observation', 'Assumption', 'Opinion'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setUserAnswers(prev => ({ ...prev, [idx]: opt }))}
                      className={`btn btn--xs ${userAnswers[idx] === opt ? (opt === item.correct ? 'btn--success' : 'btn--danger') : 'btn--secondary'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {userAnswers[idx] && (
                  <div style={{ fontSize: 'var(--text-xs)', color: userAnswers[idx] === item.correct ? 'var(--color-success-300)' : 'var(--color-warning-300)' }}>
                    {userAnswers[idx] === item.correct ? '✅ Correct! ' : `❌ Correct answer: ${item.correct}. `}
                    {item.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button onClick={() => setActiveTab('pitch_rotation')} className="btn btn--primary" style={{ width: '100%' }}>
            Proceed to Tiered Elevator Pitch →
          </button>
        </div>
      )}

      {/* Tab 3: Tiered Pitch Rotation */}
      {activeTab === 'pitch_rotation' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Tiered Pitch Rotation: Same Idea, 3 Speeds</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            Adapt your proposal to the time available. Toggle between 30 seconds, 60 seconds, and 2 minutes:
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
            {[
              { sec: 30 as const, label: '⚡ 30s High-Level', focus: 'Recommendation + Single Core Benefit' },
              { sec: 60 as const, label: '⏱️ 60s Balanced', focus: 'Recommendation + Evidence + Objection Response + Action' },
              { sec: 120 as const, label: '📖 120s Comprehensive', focus: 'Full 7-Step Persuasion Architecture with Trade-Offs' },
            ].map(tier => (
              <button
                key={tier.sec}
                onClick={() => setPitchTier(tier.sec)}
                className={`glass-card ${pitchTier === tier.sec ? 'glass-card--selected' : ''}`}
                style={{
                  flex: 1,
                  padding: 'var(--space-3)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  border: pitchTier === tier.sec ? '2px solid var(--color-primary-500)' : '1px solid rgba(255,255,255,0.06)',
                  background: pitchTier === tier.sec ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255,255,255,0.02)',
                }}
              >
                <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: 'var(--text-sm)' }}>{tier.label}</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>{tier.focus}</span>
              </button>
            ))}
          </div>

          <div className="glass-card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-5)', background: 'rgba(255,255,255,0.02)' }}>
            <strong style={{ color: 'var(--color-primary-400)', fontSize: 'var(--text-xs)', display: 'block', marginBottom: 'var(--space-1)' }}>
              CURRENT TARGET DURATION: {pitchTier} SECONDS
            </strong>
            <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: 'var(--text-sm)' }}>
              {pitchTier === 30 && '"I recommend we switch our team updates to asynchronous text briefs. It saves us 2 hours weekly and lets everyone focus on deep work. Can we trial it next week?"'}
              {pitchTier === 60 && '"I\'d recommend trialing asynchronous daily standups for two weeks. Currently, daily 30-minute meetings cost us over 10 engineering hours per week. While some might worry about missing urgent blockers, we can mitigate that with a dedicated escalation tag in chat. Would you be open to trialing this starting Monday?"'}
              {pitchTier === 120 && '"I would like to recommend restructuring our sprint planning meetings. Over the past three months, data shows our sprint completion rate is 78%, mainly due to mid-sprint scope creep. While I recognize the concern that strict scope limits reduce flexibility, we can address this by maintaining a 10% buffer for urgent client bugs. The trade-off is clear: predictable delivery beats erratic overcommitment. Let us approve this trial for sprint 14."'}
            </p>
          </div>

          <button onClick={() => setActiveTab('stakeholder_sim')} className="btn btn--primary" style={{ width: '100%' }}>
            Proceed to Speaking Challenge & AI Stakeholder →
          </button>
        </div>
      )}

      {/* Tab 4: Stakeholder Simulation */}
      {activeTab === 'stakeholder_sim' && (
        <div className="animate-fade-in">
          <div className="glass-card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-5)', background: 'rgba(255,255,255,0.02)' }}>
            <strong style={{ color: 'var(--color-primary-400)', fontSize: 'var(--text-xs)', display: 'block', marginBottom: 'var(--space-1)' }}>
              PROPOSAL PROMPT
            </strong>
            <p style={{ color: 'var(--text-primary)', margin: '0 0 var(--space-2)', fontWeight: 500 }}>
              {track === 'professional'
                ? 'Recommend one procedural, technological, or policy change that would meaningfully improve your team or workplace.'
                : track === 'student'
                ? 'Recommend a change to your university curriculum, study group workflow, or campus resource allocation.'
                : 'Recommend one practical improvement for your local community or an organization you belong to.'}
            </p>
            <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)' }}>
              Requirement: State your recommendation, explain 2 benefits, acknowledge 1 limitation, and request a concrete next step.
            </div>
          </div>

          {/* Recorder Controls */}
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
            {!isRecording ? (
              <button onClick={startRecording} className="btn btn--primary" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span>🎙️</span> Deliver Your Proposal ({pitchTier}s)
              </button>
            ) : (
              <button onClick={handleStopRecording} className="btn btn--danger" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span className="recording-pulse" /> Stop & Analyze ({Math.round(duration)}s)
              </button>
            )}
          </div>

          {/* Analysis Feedback */}
          {metrics && aiFeedback && (
            <div className="glass-card animate-fade-in" style={{ padding: 'var(--space-5)', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
              <h4 style={{ color: 'var(--text-primary)', margin: '0 0 var(--space-3)' }}>Persuasion Scorecard</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Recommendation</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary-400)' }}>{metrics.recommendationClarity}/10</div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Evidence Use</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-success-400)' }}>{metrics.evidenceUse}/10</div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Trade-Offs</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-warning-400)' }}>{metrics.limitationAcknowledgement}/10</div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Tone</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-info-400)' }}>{metrics.calibratedTone}/10</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                <div style={{ color: 'var(--color-success-300)' }}>
                  ✅ <strong>Strength:</strong> {aiFeedback.strength}
                </div>
                <div style={{ color: 'var(--color-warning-300)' }}>
                  🛡️ <strong>Objection Handling:</strong> {aiFeedback.objectionHandlingTip}
                </div>
                <div style={{ color: 'var(--color-primary-300)' }}>
                  ⚖️ <strong>Tone Calibration:</strong> {aiFeedback.toneCalibration}
                </div>
              </div>

              <div style={{ marginTop: 'var(--space-5)', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={onNext} className="btn btn--primary">
                  Continue to Next Activity →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
