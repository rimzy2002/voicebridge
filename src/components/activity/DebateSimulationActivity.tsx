'use client';

import { useState } from 'react';
import { ActivityDefinition, LearnerTrack, DebateMetrics } from '@/types';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { analyzeDebate } from '@/lib/ai/week4';

interface DebateSimulationActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
  track?: LearnerTrack;
  dayNumber?: number;
}

export default function DebateSimulationActivity({
  activity,
  onComplete,
  onNext,
  isCompleted: _isCompleted,
  savedResponse,
  track = 'general',
}: DebateSimulationActivityProps) {
  const [activeTab, setActiveTab] = useState<'structure' | 'steelman' | 'timed_rounds' | 'debate_sim'>('structure');
  const [steelmanText, setSteelmanText] = useState('');
  const [transcript, setTranscript] = useState<string>((savedResponse?.transcript as string) || '');
  const [metrics, setMetrics] = useState<DebateMetrics | null>(
    (savedResponse?.metrics as DebateMetrics) || null
  );
  const [feedback, setFeedback] = useState<any>(savedResponse?.feedback || null);

  const { isRecording, duration, startRecording, stopRecording, audioBlob } = useAudioRecorder();

  const handleStopRecording = () => {
    stopRecording();
    const simulatedText =
      transcript ||
      "The strongest version of the opposing argument is that remote work reduces serendipitous encounters and spontaneous mentoring for junior employees. That is a completely valid point. However, the evidence I would point to shows that deep engineering productivity increases by over 25% when interruptions are eliminated. The key distinction is between scheduled collaboration and unstructured distraction. Overall, a hybrid approach with designated co-working days solves both challenges.";

    setTranscript(simulatedText);
    const result = analyzeDebate({
      transcript: simulatedText,
      opponentViewpoint: 'In-office presence is required for cultural alignment.',
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
      <div style={{ marginBottom: 'var(--space-6)', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="badge badge--primary" style={{ marginBottom: 'var(--space-2)' }}>Day 26 • Debate & Defend Ideas</span>
            <h2 style={{ color: 'var(--text-primary)', margin: 'var(--space-2) 0' }}>{activity.title}</h2>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              {activity.description || 'Defend your ideas, steelman opposing views, and debate respectfully without turning conversations into confrontations.'}
            </p>
          </div>
          <span style={{ fontSize: '32px' }}>⚔️</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', background: 'rgba(255,255,255,0.03)', padding: 'var(--space-1)', borderRadius: 'var(--radius-lg)' }}>
        {[
          { id: 'structure', label: '1. Debate Architecture' },
          { id: 'steelman', label: '2. The Steelman Drill' },
          { id: 'timed_rounds', label: '3. Timed Argument (60/45/30)' },
          { id: 'debate_sim', label: '4. AI Debate Simulation' },
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

      {/* Tab 1: Structure */}
      {activeTab === 'structure' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>The 6-Part Argument Structure</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
            {[
              { step: 'CLAIM', title: 'Your Position', desc: 'Clear thesis statement without ambiguity.', icon: '🚩' },
              { step: 'REASON', title: 'The Mechanism', desc: 'Why this holds true in principle.', icon: '🧠' },
              { step: 'EVIDENCE', title: 'Concrete Proof', desc: 'Data point, study, or direct observation.', icon: '📊' },
              { step: 'COUNTER', title: 'Opponent View', desc: 'Acknowledge the strongest objection.', icon: '🛡️' },
              { step: 'RESPONSE', title: 'Your Rebuttal', desc: 'Distinguish your premise from the counter.', icon: '⚡' },
              { step: 'CONCLUSION', title: 'Synthesis', desc: 'Overall resolution of the argument.', icon: '🏁' },
            ].map(s => (
              <div key={s.step} className="glass-card" style={{ padding: 'var(--space-4)', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontSize: '20px', marginBottom: 'var(--space-1)' }}>{s.icon}</div>
                <strong style={{ color: 'var(--color-primary-400)', fontSize: 'var(--text-xs)' }}>{s.step}</strong>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600, margin: 'var(--space-1) 0' }}>{s.title}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)' }}>{s.desc}</div>
              </div>
            ))}
          </div>

          <button onClick={() => setActiveTab('steelman')} className="btn btn--primary" style={{ width: '100%' }}>
            Proceed to the Steelman Drill →
          </button>
        </div>
      )}

      {/* Tab 2: Steelman Drill */}
      {activeTab === 'steelman' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>The Steelman: Strengthen Before You Disagree</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            A "strawman" attacks a silly caricature of the opponent. A "steelman" describes the other side so well that they would say: <em>"Yes, that is exactly what I believe."</em>
          </p>

          <div className="glass-card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-5)', background: 'rgba(255,255,255,0.02)' }}>
            <strong style={{ color: 'var(--color-warning-400)', fontSize: 'var(--text-xs)', display: 'block', marginBottom: 'var(--space-1)' }}>
              OPPOSING PREMISE
            </strong>
            <p style={{ color: 'var(--text-primary)', margin: 0, fontWeight: 500 }}>
              "AI code generation tools should be banned in junior engineering workflows because they prevent new developers from learning core computer science fundamentals."
            </p>
          </div>

          <div style={{ marginBottom: 'var(--space-5)' }}>
            <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Type or speak the strongest possible version of this argument before disagreeing:
            </label>
            <textarea
              value={steelmanText}
              onChange={e => setSteelmanText(e.target.value)}
              placeholder='Start with: "The strongest reason to support this ban is that..."'
              rows={3}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                padding: 'var(--space-3)',
                fontSize: 'var(--text-sm)',
              }}
            />
          </div>

          <button onClick={() => setActiveTab('timed_rounds')} className="btn btn--primary" style={{ width: '100%' }}>
            Proceed to Timed Rounds →
          </button>
        </div>
      )}

      {/* Tab 3: Timed Argument */}
      {activeTab === 'timed_rounds' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>The 3-Round Timed Cadence</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            Professional debates require crisp pacing. Train yourself across three disciplined timing tiers:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            <div className="glass-card" style={{ padding: 'var(--space-4)' }}>
              <div style={{ fontSize: '20px', marginBottom: 'var(--space-1)' }}>⏱️ 60s</div>
              <strong style={{ color: 'var(--color-primary-400)' }}>Round 1: The Position</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', marginTop: 'var(--space-2)' }}>
                State your claim, primary mechanism, and supporting evidence.
              </p>
            </div>
            <div className="glass-card" style={{ padding: 'var(--space-4)' }}>
              <div style={{ fontSize: '20px', marginBottom: 'var(--space-1)' }}>⚡ 45s</div>
              <strong style={{ color: 'var(--color-warning-400)' }}>Round 2: The Steelman & Rebuttal</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', marginTop: 'var(--space-2)' }}>
                Acknowledge the counter-argument and highlight the key operational distinction.
              </p>
            </div>
            <div className="glass-card" style={{ padding: 'var(--space-4)' }}>
              <div style={{ fontSize: '20px', marginBottom: 'var(--space-1)' }}>🎯 30s</div>
              <strong style={{ color: 'var(--color-success-400)' }}>Round 3: The Bottom Line</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', marginTop: 'var(--space-2)' }}>
                Synthesize both views into a forward-looking recommendation.
              </p>
            </div>
          </div>

          <button onClick={() => setActiveTab('debate_sim')} className="btn btn--primary" style={{ width: '100%' }}>
            Proceed to AI Debate Simulation →
          </button>
        </div>
      )}

      {/* Tab 4: Debate Simulation */}
      {activeTab === 'debate_sim' && (
        <div className="animate-fade-in">
          <div className="glass-card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-5)', background: 'rgba(255,255,255,0.02)' }}>
            <strong style={{ color: 'var(--color-primary-400)', fontSize: 'var(--text-xs)', display: 'block', marginBottom: 'var(--space-1)' }}>
              DEBATE MOTION
            </strong>
            <p style={{ color: 'var(--text-primary)', margin: '0 0 var(--space-2)', fontWeight: 500 }}>
              {track === 'professional'
                ? '"Should companies mandate fixed in-office days, or remain completely flexible?"'
                : track === 'student'
                ? '"Should generative AI assistance be mandatory in high-level university courses?"'
                : '"Should repetitive human administrative tasks be automated by default wherever feasible?"'}
            </p>
            <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)' }}>
              Target: State your view (60s), steelman the opposite side, and provide the key distinction without attacking identity.
            </div>
          </div>

          {/* Recorder Controls */}
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
            {!isRecording ? (
              <button onClick={startRecording} className="btn btn--primary" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span>🎙️</span> Defend Your Position (2m)
              </button>
            ) : (
              <button onClick={handleStopRecording} className="btn btn--danger" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span className="recording-pulse" /> Stop & Score ({Math.round(duration)}s)
              </button>
            )}
          </div>

          {/* Results */}
          {metrics && feedback && (
            <div className="glass-card animate-fade-in" style={{ padding: 'var(--space-5)', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
              <h4 style={{ color: 'var(--text-primary)', margin: '0 0 var(--space-3)' }}>Debate & Defense Scorecard</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Clarity</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary-400)' }}>{metrics.argumentClarity}/10</div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Steelman Skill</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-success-400)' }}>{metrics.listeningAndSteelman}/10</div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Logic Coherence</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-warning-400)' }}>{metrics.logicalCoherence}/10</div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Respectful Tone</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-info-400)' }}>{metrics.respectfulTone}/10</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                <div style={{ color: 'var(--color-success-300)' }}>
                  ✅ <strong>Steelman Review:</strong> {feedback.steelmanQuality}
                </div>
                <div style={{ color: 'var(--color-primary-300)' }}>
                  💡 <strong>Coherence:</strong> {feedback.argumentCoherence}
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
