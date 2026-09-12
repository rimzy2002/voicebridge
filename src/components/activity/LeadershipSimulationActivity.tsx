'use client';

import { useState } from 'react';
import { ActivityDefinition, LearnerTrack, LeadershipMetrics } from '@/types';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { analyzeLeadership } from '@/lib/ai/week4';

interface LeadershipSimulationActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
  track?: LearnerTrack;
  dayNumber?: number;
}

export default function LeadershipSimulationActivity({
  activity,
  onComplete,
  onNext,
  isCompleted: _isCompleted,
  savedResponse,
  track = 'general',
}: LeadershipSimulationActivityProps) {
  const [activeTab, setActiveTab] = useState<'framework' | 'delegation' | 'decisions' | 'simulation'>('framework');
  const [transcript, setTranscript] = useState<string>((savedResponse?.transcript as string) || '');
  const [metrics, setMetrics] = useState<LeadershipMetrics | null>(
    (savedResponse?.metrics as LeadershipMetrics) || null
  );
  const [feedback, setFeedback] = useState<{ clarity: string; delegationTip: string; decisionRationale: string } | null>(
    (savedResponse?.feedback as any) || null
  );

  const { isRecording, duration, startRecording, stopRecording, audioBlob } = useAudioRecorder();

  const handleStopRecording = () => {
    stopRecording();
    const simulatedText =
      transcript ||
      "Team, where we are right now is that the release deadline moved up by one week. What matters most is maintaining our payment security standards without burning out the team. Let's divide this: Sarah, could you take responsibility for the database verification, while I handle the third-party auditor review? The reason we chose this option is that cutting security features is not acceptable. At this stage, if our testing shows zero blockers by Thursday, we launch. Does everyone understand, or are there any immediate concerns?";

    setTranscript(simulatedText);
    const result = analyzeLeadership({
      transcript: simulatedText,
      scenario: 'Urgent Project Re-prioritization',
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
            <span className="badge badge--primary" style={{ marginBottom: 'var(--space-2)' }}>Day 24 • Leadership Communication</span>
            <h2 style={{ color: 'var(--text-primary)', margin: 'var(--space-2) 0' }}>{activity.title}</h2>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              {activity.description || 'Communicate with clarity, accountability, honest uncertainty, and respectful delegation — inspiring confidence without dominance.'}
            </p>
          </div>
          <span style={{ fontSize: '32px' }}>👑</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', background: 'rgba(255,255,255,0.03)', padding: 'var(--space-1)', borderRadius: 'var(--radius-lg)' }}>
        {[
          { id: 'framework', label: '1. Leadership Framework' },
          { id: 'delegation', label: '2. Respectful Delegation' },
          { id: 'decisions', label: '3. Direction & Uncertainty' },
          { id: 'simulation', label: '4. Main Leadership Simulation' },
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
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>The 6-Step Leadership Message Framework</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
            {[
              { step: 'SITUATION', title: 'Where are we?', phrase: '"Where we are currently is..."', icon: '📍' },
              { step: 'PRIORITY', title: 'What matters most?', phrase: '"Our #1 priority right now is..."', icon: '🎯' },
              { step: 'ACTION', title: 'What needs to happen?', phrase: '"The immediate action required is..."', icon: '⚡' },
              { step: 'RESPONSIBILITY', title: 'Who owns what?', phrase: '"Could you take ownership of..."', icon: '🤝' },
              { step: 'REASON', title: 'Why this path?', phrase: '"The reason we chose this is..."', icon: '💡' },
              { step: 'CHECK', title: 'Does everyone understand?', phrase: '"What questions or concerns do you have?"', icon: '👂' },
            ].map(f => (
              <div key={f.step} className="glass-card" style={{ padding: 'var(--space-4)', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontSize: '20px', marginBottom: 'var(--space-1)' }}>{f.icon}</div>
                <strong style={{ color: 'var(--color-primary-400)', fontSize: 'var(--text-xs)' }}>{f.step}</strong>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600, margin: 'var(--space-1) 0' }}>{f.title}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '11px', fontStyle: 'italic' }}>{f.phrase}</div>
              </div>
            ))}
          </div>

          <button onClick={() => setActiveTab('delegation')} className="btn btn--primary" style={{ width: '100%' }}>
            Proceed to Respectful Delegation →
          </button>
        </div>
      )}

      {/* Tab 2: Delegation */}
      {activeTab === 'delegation' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Delegation: Empowering vs Authoritarian</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            Real leadership invites ownership instead of barking commands. Notice how phrasing changes reception:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            <div className="glass-card" style={{ padding: 'var(--space-4)', borderLeft: '3px solid var(--color-danger-400)' }}>
              <h4 style={{ color: 'var(--color-danger-400)', margin: '0 0 var(--space-3)' }}>❌ Authoritarian & Demanding</h4>
              <ul style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', paddingLeft: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <li>"You must do this by tomorrow morning."</li>
                <li>"I need you to fix this immediately."</li>
                <li>"Why isn't this completed yet?"</li>
                <li>"Don't ask questions, just do it."</li>
              </ul>
            </div>
            <div className="glass-card" style={{ padding: 'var(--space-4)', borderLeft: '3px solid var(--color-success-400)' }}>
              <h4 style={{ color: 'var(--color-success-400)', margin: '0 0 var(--space-3)' }}>✅ Empowering & Collaborative</h4>
              <ul style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', paddingLeft: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <li><strong>"Could you take responsibility for X?"</strong></li>
                <li><strong>"I'd like you to focus on Y while I coordinate Z."</strong></li>
                <li><strong>"Can you handle the client sync on this?"</strong></li>
                <li><strong>"Let's divide this so neither of us is overwhelmed."</strong></li>
              </ul>
            </div>
          </div>

          <button onClick={() => setActiveTab('decisions')} className="btn btn--primary" style={{ width: '100%' }}>
            Proceed to Direction & Uncertainty →
          </button>
        </div>
      )}

      {/* Tab 3: Direction Under Uncertainty */}
      {activeTab === 'decisions' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Honest Direction Under Uncertainty</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            Weak leaders fake 100% certainty. Strong leaders state what is known, establish the pivot condition, and encourage the team.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            <div className="glass-card" style={{ padding: 'var(--space-4)' }}>
              <h4 style={{ color: 'var(--color-primary-400)', margin: '0 0 var(--space-3)' }}>Framing Uncertainty</h4>
              <ul style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', paddingLeft: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <li><strong>"Based on what we know now..."</strong></li>
                <li><strong>"At this stage, our best working hypothesis is..."</strong></li>
                <li><strong>"If the client requirements shift, we will adjust."</strong></li>
                <li><strong>"We considered Option A, but chose Option B because..."</strong></li>
              </ul>
            </div>
            <div className="glass-card" style={{ padding: 'var(--space-4)' }}>
              <h4 style={{ color: 'var(--color-warning-400)', margin: '0 0 var(--space-3)' }}>Practical Encouragement (No Clichés)</h4>
              <ul style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', paddingLeft: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <li><strong>"We solved a very similar bottleneck last sprint."</strong></li>
                <li><strong>"We've already completed the hardest technical hurdle."</strong></li>
                <li><strong>"The next step is completely manageable."</strong></li>
                <li><strong>"The priority right now is clarity over speed."</strong></li>
              </ul>
            </div>
          </div>

          <button onClick={() => setActiveTab('simulation')} className="btn btn--primary" style={{ width: '100%' }}>
            Proceed to Main Leadership Simulation →
          </button>
        </div>
      )}

      {/* Tab 4: Simulation */}
      {activeTab === 'simulation' && (
        <div className="animate-fade-in">
          <div className="glass-card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-5)', background: 'rgba(255,255,255,0.02)' }}>
            <strong style={{ color: 'var(--color-primary-400)', fontSize: 'var(--text-xs)', display: 'block', marginBottom: 'var(--space-1)' }}>
              SIMULATION SCENARIO: PROJECT PIVOT UNDER PRESSURE
            </strong>
            <p style={{ color: 'var(--text-primary)', margin: '0 0 var(--space-2)', fontWeight: 500 }}>
              {track === 'professional'
                ? 'Your project timeline has suddenly been compressed by 10 days. Team members are anxious and confused about what to drop. Give clear direction, delegate ownership, explain the trade-offs, and verify understanding.'
                : track === 'student'
                ? 'Your group project submission deadline was unexpectedly brought forward. Members are disagreeing on what parts to finish. Take the lead, set priorities, delegate tasks respectfully, and calm the group.'
                : 'A community or club event you are organizing is facing bad weather / budget cuts. Step up and communicate a clear contingency plan to everyone involved.'}
            </p>
            <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)' }}>
              Speak for 90–120 seconds. Use: Situation → Priority → Delegation → Reason & Trade-Off → Comprehension Check.
            </div>
          </div>

          {/* Recorder Controls */}
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
            {!isRecording ? (
              <button onClick={startRecording} className="btn btn--primary" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span>🎙️</span> Give Direction (90s)
              </button>
            ) : (
              <button onClick={handleStopRecording} className="btn btn--danger" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span className="recording-pulse" /> Stop & Analyze ({Math.round(duration)}s)
              </button>
            )}
          </div>

          {/* Metrics Results */}
          {metrics && feedback && (
            <div className="glass-card animate-fade-in" style={{ padding: 'var(--space-5)', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
              <h4 style={{ color: 'var(--text-primary)', margin: '0 0 var(--space-3)' }}>Leadership Communication Scorecard</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Priority Clarity</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary-400)' }}>{metrics.priorityClarity}/10</div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Delegation</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-success-400)' }}>{metrics.delegation}/10</div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Decision "Why"</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-warning-400)' }}>{metrics.decisionExplanation}/10</div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Team Alignment</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-info-400)' }}>{metrics.summary}/10</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                <div style={{ color: 'var(--color-success-300)' }}>
                  ✅ <strong>Direction:</strong> {feedback.clarity}
                </div>
                <div style={{ color: 'var(--color-warning-300)' }}>
                  🤝 <strong>Delegation Tone:</strong> {feedback.delegationTip}
                </div>
                <div style={{ color: 'var(--color-primary-300)' }}>
                  💡 <strong>Decision Rationale:</strong> {feedback.decisionRationale}
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
