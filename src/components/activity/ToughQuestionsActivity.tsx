'use client';

import { useState } from 'react';
import { ActivityDefinition, LearnerTrack, ToughQuestionMetrics } from '@/types';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { analyzeToughQuestion } from '@/lib/ai/week4';

interface ToughQuestionsActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
  track?: LearnerTrack;
  dayNumber?: number;
}

export default function ToughQuestionsActivity({
  activity,
  onComplete,
  onNext,
  isCompleted: _isCompleted,
  savedResponse,
  track = 'general',
}: ToughQuestionsActivityProps) {
  const [activeTab, setActiveTab] = useState<'mindset' | 'techniques' | 'rapid_qa' | 'pressure_sim'>('mindset');
  const [rapidIndex, setRapidIndex] = useState(0);
  const [transcript, setTranscript] = useState<string>((savedResponse?.transcript as string) || '');
  const [metrics, setMetrics] = useState<ToughQuestionMetrics | null>(
    (savedResponse?.metrics as ToughQuestionMetrics) || null
  );
  const [feedback, setFeedback] = useState<any>(savedResponse?.feedback || null);

  const { isRecording, duration, startRecording, stopRecording, audioBlob } = useAudioRecorder();

  const rapidQuestions = [
    {
      q: '"Why is your team consistently running over budget this quarter?"',
      tip: 'Separate emotional framing ("consistently running over") from core fact. Buffer: "That is a fair question regarding our Q3 spend..."',
    },
    {
      q: '"Are you certain this architecture won\'t collapse when traffic triples on Black Friday?"',
      tip: 'Honest uncertainty: "Based on our load testing up to 2.5x traffic, it held steady. What I can verify before Friday is..."',
    },
    {
      q: '"Who is personally to blame for the missed client deadline yesterday?"',
      tip: 'Redirect from blame to accountability: "As project lead, I take full ownership of our delivery schedule..."',
    },
    {
      q: '"Can you guarantee 100% uptime with zero bugs for this new release?"',
      tip: 'Calibrate absolute demands: "No production system can honestly guarantee zero bugs; what we guarantee is 24/7 observability and rapid rollbacks."',
    },
    {
      q: '"Isn\'t it true that your competitor has already built a better version of this?"',
      tip: 'Acknowledge competitor strength, anchor unique value: "Our competitor has built a solid interface; our core advantage is in automated security."',
    },
  ];

  const handleStopRecording = () => {
    stopRecording();
    const simulatedText =
      transcript ||
      "That is a very useful question. Let me take a moment to address both parts. First, regarding the Q3 budget variance: the immediate factor was our unexpected server migration, which required parallel infrastructure for three weeks. Second, regarding future cost control: we have already decommissioned the old cluster, which reduces run-rate costs by 22% starting next month. What I can commit to right now is sharing the audited reconciliation by end of day.";

    setTranscript(simulatedText);
    const result = analyzeToughQuestion({
      transcript: simulatedText,
      responseStartDelaySeconds: 3.2,
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
            <span className="badge badge--primary" style={{ marginBottom: 'var(--space-2)' }}>Day 27 • Tough Questions & Pressure</span>
            <h2 style={{ color: 'var(--text-primary)', margin: 'var(--space-2) 0' }}>{activity.title}</h2>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              {activity.description || 'Master the Pause → Understand → Structure → Respond sequence when facing unexpected or hostile questions.'}
            </p>
          </div>
          <span style={{ fontSize: '32px' }}>🧘</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', background: 'rgba(255,255,255,0.03)', padding: 'var(--space-1)', borderRadius: 'var(--radius-lg)' }}>
        {[
          { id: 'mindset', label: '1. The 4-Step Sequence' },
          { id: 'techniques', label: '2. Buffer & Clarification' },
          { id: 'rapid_qa', label: '3. Rapid-Fire Tough Q&A' },
          { id: 'pressure_sim', label: '4. High-Pressure Challenge' },
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

      {/* Tab 1: Mindset */}
      {activeTab === 'mindset' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>The Composure Flow: Pause → Understand → Structure → Respond</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
            {[
              { step: '1. PAUSE', title: 'Breathe in Silence', desc: 'Take 2-4 seconds. Silence sounds like executive control.', icon: '⏸️' },
              { step: '2. UNDERSTAND', title: 'Strip Emotion', desc: 'Separate hostile tone from the underlying question.', icon: '🔍' },
              { step: '3. STRUCTURE', title: 'Dissect Parts', desc: 'Identify Part 1 and Part 2 before speaking.', icon: '📐' },
              { step: '4. RESPOND', title: 'Answer What You Know', desc: 'Never guess or fabricate. Commit to next steps.', icon: '💬' },
            ].map(s => (
              <div key={s.step} className="glass-card" style={{ padding: 'var(--space-4)', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontSize: '20px', marginBottom: 'var(--space-1)' }}>{s.icon}</div>
                <strong style={{ color: 'var(--color-primary-400)', fontSize: 'var(--text-xs)' }}>{s.step}</strong>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600, margin: 'var(--space-1) 0' }}>{s.title}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)' }}>{s.desc}</div>
              </div>
            ))}
          </div>

          <button onClick={() => setActiveTab('techniques')} className="btn btn--primary" style={{ width: '100%' }}>
            Proceed to Buffer Techniques →
          </button>
        </div>
      )}

      {/* Tab 2: Techniques */}
      {activeTab === 'techniques' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Buffer Phrases & Professional Uncertainty</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            Equip yourself with ready-to-use verbal buffers so your brain has time to formulate an answer:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            <div className="glass-card" style={{ padding: 'var(--space-4)' }}>
              <h4 style={{ color: 'var(--color-primary-400)', margin: '0 0 var(--space-3)' }}>Thinking Buffers</h4>
              <ul style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', paddingLeft: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <li><strong>"That's an important question. Let me address X first."</strong></li>
                <li><strong>"Let me think about the best way to frame that."</strong></li>
                <li><strong>"There are two key components to consider here."</strong></li>
                <li><strong>"When you ask about X, are you referring to timing or cost?"</strong></li>
              </ul>
            </div>
            <div className="glass-card" style={{ padding: 'var(--space-4)' }}>
              <h4 style={{ color: 'var(--color-warning-400)', margin: '0 0 var(--space-3)' }}>Honest Uncertainty (Integrity Anchors)</h4>
              <ul style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', paddingLeft: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <li><strong>"I don't have that exact number right in front of me."</strong></li>
                <li><strong>"I'd want to verify that with the team before confirming."</strong></li>
                <li><strong>"Based on what we know right now, the answer is yes."</strong></li>
                <li><strong>"The immediate issue is X, and your point on Y is also critical."</strong></li>
              </ul>
            </div>
          </div>

          <button onClick={() => setActiveTab('rapid_qa')} className="btn btn--primary" style={{ width: '100%' }}>
            Proceed to Rapid-Fire Q&A →
          </button>
        </div>
      )}

      {/* Tab 3: Rapid QA */}
      {activeTab === 'rapid_qa' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Rapid-Fire Pressure Drills (5 Questions)</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            Practice pausing 3 seconds before responding. Step through each question:
          </p>

          <div className="glass-card" style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-5)', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
              <span className="badge badge--warning">Question {rapidIndex + 1} of {rapidQuestions.length}</span>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <button
                  disabled={rapidIndex === 0}
                  onClick={() => setRapidIndex(prev => prev - 1)}
                  className="btn btn--xs btn--secondary"
                >
                  ← Prev
                </button>
                <button
                  disabled={rapidIndex === rapidQuestions.length - 1}
                  onClick={() => setRapidIndex(prev => prev + 1)}
                  className="btn btn--xs btn--secondary"
                >
                  Next →
                </button>
              </div>
            </div>

            <p style={{ color: 'var(--text-primary)', fontSize: 'var(--text-md)', fontWeight: 600, margin: '0 0 var(--space-3)' }}>
              {rapidQuestions[rapidIndex].q}
            </p>

            <div style={{ color: 'var(--color-primary-300)', fontSize: 'var(--text-xs)', background: 'rgba(99, 102, 241, 0.08)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
              💡 <strong>Strategy:</strong> {rapidQuestions[rapidIndex].tip}
            </div>
          </div>

          <button onClick={() => setActiveTab('pressure_sim')} className="btn btn--primary" style={{ width: '100%' }}>
            Proceed to High-Pressure Challenge →
          </button>
        </div>
      )}

      {/* Tab 4: High-Pressure Challenge */}
      {activeTab === 'pressure_sim' && (
        <div className="animate-fade-in">
          <div className="glass-card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-5)', background: 'rgba(255,255,255,0.02)' }}>
            <strong style={{ color: 'var(--color-primary-400)', fontSize: 'var(--text-xs)', display: 'block', marginBottom: 'var(--space-1)' }}>
              HIGH-PRESSURE SCENARIO: EXECUTIVE CHALLENGE
            </strong>
            <p style={{ color: 'var(--text-primary)', margin: '0 0 var(--space-2)', fontWeight: 500 }}>
              {track === 'professional'
                ? '"Your project is 20% over budget and behind schedule. How can we possibly justify continuing funding when we haven\'t seen a return on investment?"'
                : track === 'student'
                ? '"Your research methodology seems to overlook several major studies published this year. How can your conclusions be valid under these omissions?"'
                : '"You promised this community initiative would be finished last month, but nothing seems to have changed. Why should anyone trust your timeline now?"'}
            </p>
            <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)' }}>
              Apply the 4 steps: (1) Deliberate 3-sec pause, (2) Buffer phrase, (3) Dissect the problem into immediate cause and corrective action, (4) State what you can verify.
            </div>
          </div>

          {/* Recorder Controls */}
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
            {!isRecording ? (
              <button onClick={startRecording} className="btn btn--primary" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span>🎙️</span> Answer Under Pressure (90s)
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
              <h4 style={{ color: 'var(--text-primary)', margin: '0 0 var(--space-3)' }}>Tough Question Scorecard</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Composure</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary-400)' }}>{metrics.composureBehavior}/10</div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Pause Timing</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-success-400)' }}>{metrics.responseStartDelay}s</div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Honesty</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-warning-400)' }}>{metrics.honestyAboutUncertainty}/10</div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Redirection</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-info-400)' }}>{metrics.redirectionWithoutEvasion}/10</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                <div style={{ color: 'var(--color-success-300)' }}>
                  ✅ <strong>Composure:</strong> {feedback.pauseEffectiveness}
                </div>
                <div style={{ color: 'var(--color-primary-300)' }}>
                  💡 <strong>Integrity:</strong> {feedback.uncertaintyHandling}
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
