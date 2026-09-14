'use client';

import { useState } from 'react';
import { ActivityDefinition, LearnerTrack, NuanceMetrics } from '@/types';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { analyzeNuance } from '@/lib/ai/week4';

interface NuanceDiplomacyActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
  track?: LearnerTrack;
  dayNumber?: number;
}

export default function NuanceDiplomacyActivity({
  activity,
  onComplete,
  onNext,
  isCompleted: _isCompleted,
  savedResponse,
  track = 'general',
}: NuanceDiplomacyActivityProps) {
  const [activeTab, setActiveTab] = useState<'certainty' | 'hedging_drill' | 'understatement' | 'roleplay'>('certainty');
  const [certaintyLevel, setCertaintyLevel] = useState<number>(3);
  const [revealedRewrites, setRevealedRewrites] = useState<Record<number, boolean>>({});
  const [transcript, setTranscript] = useState<string>((savedResponse?.transcript as string) || '');
  const [metrics, setMetrics] = useState<NuanceMetrics | null>(
    (savedResponse?.metrics as NuanceMetrics) || null
  );
  const [feedback, setFeedback] = useState<any>(savedResponse?.feedback || null);

  const { isRecording, duration, startRecording, stopRecording, audioBlob } = useAudioRecorder();

  const certaintyTiers = [
    { level: 1, title: 'Limited Evidence', phrase: '"Based on the preliminary data available..."', desc: 'Use when information is incomplete.' },
    { level: 2, title: 'Caution', phrase: '"It appears that we may encounter..."', desc: 'Signals tentative observations.' },
    { level: 3, title: 'Possibility', phrase: '"One possibility worth investigating is..."', desc: 'Open-ended exploration.' },
    { level: 4, title: 'Moderate Confidence', phrase: '"It seems likely that this will resolve..."', desc: 'Probable, but allows for variance.' },
    { level: 5, title: 'Strong Certainty', phrase: '"I am confident that our findings confirm..."', desc: 'Reserve for verified facts and commitments.' },
  ];

  const bluntRewrites = [
    {
      blunt: '"Your proposal has fatal flaws and will definitely fail."',
      diplomatic: '"I can see the reasoning behind this proposal; however, there are a few operational risks that may require reconsideration."',
    },
    {
      blunt: '"You clearly did not understand what the client asked for."',
      diplomatic: '"My impression is that the client was hoping for a slightly different emphasis, particularly around reporting."',
    },
    {
      blunt: '"This budget is ridiculous. We cannot afford it."',
      diplomatic: '"While I appreciate the scope outlined here, based on our current financial constraints, this plan might benefit from phased funding."',
    },
  ];

  const handleStopRecording = () => {
    stopRecording();
    const simulatedText =
      transcript ||
      "I agree with the general direction of this project, although it seems likely that our testing timeline may need reconsideration. Based on the information available, there may be an integration issue with the legacy database. I have some reservations about launching next week, but we could address that by doing a staged rollout with a small cohort.";

    setTranscript(simulatedText);
    const result = analyzeNuance({
      transcript: simulatedText,
      track,
    });

    setMetrics(result.metrics);
    setFeedback(result.feedback);

    onComplete({
      transcript: simulatedText,
      metrics: result.metrics,
      feedback: result.feedback,
      audioSize: audioBlob?.size,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="glass-card glass-card--elevated animate-scale-in" style={{ padding: 'var(--space-8)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="badge badge--primary" style={{ marginBottom: 'var(--space-2)' }}>Day 25 • Nuance, Hedging & Diplomacy</span>
            <h2 style={{ color: 'var(--text-primary)', margin: 'var(--space-2) 0' }}>{activity.title}</h2>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              {activity.description || 'Express uncertainty, probability, partial agreement, and soft disagreement without sounding absolute or aggressive.'}
            </p>
          </div>
          <span style={{ fontSize: '32px' }}>🕊️</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', background: 'var(--bg-surface-subtle)', padding: 'var(--space-1)', borderRadius: 'var(--radius-lg)' }}>
        {[
          { id: 'certainty', label: '1. Certainty Scale' },
          { id: 'hedging_drill', label: '2. Soften Direct Messages' },
          { id: 'understatement', label: '3. Cultural Understatement' },
          { id: 'roleplay', label: '4. Nuance Speaking Roleplay' },
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

      {/* Tab 1: Certainty Scale */}
      {activeTab === 'certainty' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>The 5-Level Certainty Scale</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            Never speak in black and white when the real world is grey. Match your language to your actual degree of evidence:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
            {certaintyTiers.map(tier => (
              <div
                key={tier.level}
                onClick={() => setCertaintyLevel(tier.level)}
                className={`glass-card ${certaintyLevel === tier.level ? 'glass-card--selected' : ''}`}
                style={{
                  padding: 'var(--space-3)',
                  cursor: 'pointer',
                  border: certaintyLevel === tier.level ? '2px solid var(--color-primary-500)' : '1px solid var(--border-subtle)',
                  background: certaintyLevel === tier.level ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-surface-subtle)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Level {tier.level}: {tier.title}</strong>
                  <span style={{ color: 'var(--color-primary-400)', fontSize: 'var(--text-xs)', fontStyle: 'italic' }}>{tier.phrase}</span>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', marginTop: 'var(--space-1)' }}>{tier.desc}</div>
              </div>
            ))}
          </div>

          <button onClick={() => setActiveTab('hedging_drill')} className="btn btn--primary" style={{ width: '100%' }}>
            Next: Soften Direct Messages →
          </button>
        </div>
      )}

      {/* Tab 2: Hedging Drill */}
      {activeTab === 'hedging_drill' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Transforming Blunt Messages into Diplomatic Clarity</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            Directness does not mean roughness. See how experienced diplomats convey the exact same concern respectfully:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            {bluntRewrites.map((item, idx) => (
              <div key={idx} className="glass-card" style={{ padding: 'var(--space-4)', background: 'var(--bg-surface-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span style={{ color: 'var(--color-danger-300)', fontSize: 'var(--text-xs)' }}>Too Blunt / Hostile</span>
                  <button
                    className="btn btn--xs btn--secondary"
                    onClick={() => setRevealedRewrites(prev => ({ ...prev, [idx]: !prev[idx] }))}
                  >
                    {revealedRewrites[idx] ? 'Hide' : 'Reveal Diplomatic Form'}
                  </button>
                </div>
                <div style={{ color: 'var(--color-danger-200)', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                  ❌ {item.blunt}
                </div>
                {revealedRewrites[idx] && (
                  <div style={{ color: 'var(--color-success-300)', fontSize: 'var(--text-sm)', fontWeight: 500 }} className="animate-fade-in">
                    ✅ {item.diplomatic}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button onClick={() => setActiveTab('understatement')} className="btn btn--primary" style={{ width: '100%' }}>
            Next: Cultural Understatement & Tone →
          </button>
        </div>
      )}

      {/* Tab 3: Understatement & Tone */}
      {activeTab === 'understatement' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Deciphering Understatement in Global English</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            In international business, mild language often carries serious operational weight. Context and tone provide the real meaning:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
            {[
              { phrase: '"That is not ideal."', literal: 'A minor imperfection', real: 'Seriously problematic; needs immediate rethinking.' },
              { phrase: '"With all due respect..."', literal: 'A polite compliment', real: 'I strongly disagree and will now challenge your premise.' },
              { phrase: '"I have a few small comments."', literal: '1 or 2 quick notes', real: 'Significant structural revisions are required.' },
              { phrase: '"That is an interesting idea."', literal: 'Curious & fascinating', real: 'Impractical or unviable in current circumstances.' },
            ].map(u => (
              <div key={u.phrase} className="glass-card" style={{ padding: 'var(--space-3)' }}>
                <strong style={{ color: 'var(--color-primary-400)', display: 'block', fontSize: 'var(--text-sm)' }}>{u.phrase}</strong>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 'var(--space-1) 0' }}>Literal: {u.literal}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-warning-300)', fontWeight: 500 }}>Actual Meaning: {u.real}</div>
              </div>
            ))}
          </div>

          <button onClick={() => setActiveTab('roleplay')} className="btn btn--primary" style={{ width: '100%' }}>
            Proceed to Nuance Roleplay →
          </button>
        </div>
      )}

      {/* Tab 4: Nuance Roleplay Challenge */}
      {activeTab === 'roleplay' && (
        <div className="animate-fade-in">
          <div className="glass-card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-5)', background: 'var(--bg-surface-subtle)' }}>
            <strong style={{ color: 'var(--color-primary-400)', fontSize: 'var(--text-xs)', display: 'block', marginBottom: 'var(--space-1)' }}>
              ROLEPLAY SCENARIO: DIPLOMATIC PUSHBACK
            </strong>
            <p style={{ color: 'var(--text-primary)', margin: '0 0 var(--space-2)', fontWeight: 500 }}>
              An influential stakeholder proposes: <em>"Let's skip user acceptance testing for this release so we can hit our public launch date."</em>
            </p>
            <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)' }}>
              Deliver a 60–90 second response that includes:
              <br />1. One qualified agreement ("I agree with the general goal of hitting our launch...")
              <br />2. One hedged concern ("My reservation is that skipping QA might introduce...")
              <br />3. One calibrated recommendation ("Could we consider a closed beta trial instead?")
            </div>
          </div>

          {/* Recorder Controls */}
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
            {!isRecording ? (
              <button onClick={startRecording} className="btn btn--primary" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span>🎙️</span> Deliver Nuanced Response (90s)
              </button>
            ) : (
              <button onClick={handleStopRecording} className="btn btn--danger" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span className="recording-pulse" /> Stop & Analyze ({Math.round(duration)}s)
              </button>
            )}
          </div>

          {/* Results */}
          {metrics && feedback && (
            <div className="glass-card animate-fade-in" style={{ padding: 'var(--space-5)', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
              <h4 style={{ color: 'var(--text-primary)', margin: '0 0 var(--space-3)' }}>Diplomacy & Nuance Scorecard</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Hedging Quality</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary-400)' }}>{metrics.hedgingAppropriateness}/10</div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Certainty Fit</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-success-400)' }}>{metrics.certaintyCalibration}/10</div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Soft Disagreement</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-warning-400)' }}>{metrics.diplomaticDisagreement}/10</div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Diplomacy</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-info-400)' }}>{metrics.qualifiedAgreement}/10</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                <div style={{ color: 'var(--color-success-300)' }}>
                  ✅ <strong>Diplomacy:</strong> {feedback.diplomacyAssessment}
                </div>
                <div style={{ color: 'var(--color-primary-300)' }}>
                  💡 <strong>Hedging Tip:</strong> {feedback.hedgingTip}
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
