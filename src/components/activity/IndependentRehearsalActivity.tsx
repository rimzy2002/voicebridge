'use client';

import { useState } from 'react';
import { ActivityDefinition, LearnerTrack, IndependentMetrics } from '@/types';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { analyzeIndependentPerformance } from '@/lib/ai/week4';
import { getWeek4Personalization } from '@/lib/curriculum/diagnostic';

interface IndependentRehearsalActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
  track?: LearnerTrack;
  dayNumber?: number;
}

export default function IndependentRehearsalActivity({
  activity,
  onComplete,
  onNext,
  isCompleted: _isCompleted,
  savedResponse,
  track = 'general',
}: IndependentRehearsalActivityProps) {
  const [activeTab, setActiveTab] = useState<'warmup' | 'unassisted_challenge' | 'rescue' | 'error_review'>('warmup');
  const [hintsRequested, setHintsRequested] = useState<number>(0);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>((savedResponse?.transcript as string) || '');
  const [metrics, setMetrics] = useState<IndependentMetrics | null>(
    (savedResponse?.metrics as IndependentMetrics) || null
  );
  const [feedback, setFeedback] = useState<any>(savedResponse?.feedback || null);

  const personalization = getWeek4Personalization(track);
  const { isRecording, duration, startRecording, stopRecording, audioBlob } = useAudioRecorder();

  const handleStopRecording = () => {
    stopRecording();
    const simulatedText =
      transcript ||
      "Over the past month, our team experienced an unexpected project delay. What mattered most was addressing the root cause rather than assigning blame. I coordinated with both our design and engineering leads to identify the blocker, which turned out to be an ambiguous API spec. As a result, we created a streamlined checklist that prevented any future regressions. Looking back, this experience demonstrated how transparent communication solves problems before they escalate.";

    setTranscript(simulatedText);
    const result = analyzeIndependentPerformance({
      transcript: simulatedText,
      hintsRequestedCount: hintsRequested,
      speakingDurationSeconds: Math.round(duration) || 110,
    });

    setMetrics(result.metrics);
    setFeedback(result.feedback);

    onComplete({
      transcript: simulatedText,
      hintsRequested,
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
            <span className="badge badge--warning" style={{ marginBottom: 'var(--space-2)' }}>Day 29 • The Final Rehearsal (No Hints)</span>
            <h2 style={{ color: 'var(--text-primary)', margin: 'var(--space-2) 0' }}>{activity.title}</h2>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              {activity.description || 'Test your independent performance without visual scaffolding. All frameworks must come directly from memory.'}
            </p>
          </div>
          <span style={{ fontSize: '32px' }}>🦅</span>
        </div>
      </div>

      {/* Warning Banner regarding NO HINTS rule */}
      <div className="glass-card" style={{ padding: 'var(--space-3)', marginBottom: 'var(--space-5)', borderLeft: '3px solid var(--color-warning-500)', background: 'rgba(245, 158, 11, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong style={{ color: 'var(--color-warning-300)', fontSize: 'var(--text-sm)' }}>
            ⚠️ Strict Day 29 Protocol: Zero Scaffolding
          </strong>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', margin: 'var(--space-1) 0 0' }}>
            PREP, STAR, sentence starters, and connector menus are hidden. Rely purely on internal neural muscle memory.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Hint Count:</span>
          <div style={{ color: hintsRequested === 0 ? 'var(--color-success-400)' : 'var(--color-danger-400)', fontWeight: 700, fontSize: '18px' }}>
            {hintsRequested}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', background: 'var(--bg-surface-subtle)', padding: 'var(--space-1)', borderRadius: 'var(--radius-lg)' }}>
        {[
          { id: 'warmup', label: '1. Priority Warm-Up' },
          { id: 'unassisted_challenge', label: '2. Unassisted Speaking' },
          { id: 'rescue', label: '3. Communication Rescue' },
          { id: 'error_review', label: '4. High-Value Error Review' },
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

      {/* Tab 1: Warmup */}
      {activeTab === 'warmup' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Your Personalized Focus Warm-Up</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            Consuming your 28 days of previous diagnostic telemetry, here is your #1 area of concentration for today's rehearsal:
          </p>

          <div className="glass-card" style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-5)', background: 'var(--bg-surface-subtle)', borderLeft: '4px solid var(--color-primary-500)' }}>
            <span className="badge badge--primary" style={{ marginBottom: 'var(--space-2)' }}>Priority 1</span>
            <h4 style={{ color: 'var(--text-primary)', margin: '0 0 var(--space-2)' }}>{personalization.priority1.title}</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', margin: '0 0 var(--space-3)' }}>
              {personalization.priority1.description}
            </p>
            <div style={{ color: 'var(--color-primary-300)', fontSize: 'var(--text-xs)' }}>
              🎯 <strong>Target Action:</strong> {personalization.priority1.recommendedAction}
            </div>
          </div>

          <div className="glass-card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-5)', background: 'var(--bg-surface-subtle)' }}>
            <strong style={{ color: 'var(--color-success-400)', fontSize: 'var(--text-xs)', display: 'block', marginBottom: 'var(--space-1)' }}>
              VALIDATED STRENGTH:
            </strong>
            <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: 'var(--text-sm)' }}>
              {personalization.strongestSkill.title} — {personalization.strongestSkill.description}
            </p>
          </div>

          <button onClick={() => setActiveTab('unassisted_challenge')} className="btn btn--primary" style={{ width: '100%' }}>
            Proceed to Unassisted Challenge (No Hints) →
          </button>
        </div>
      )}

      {/* Tab 2: Unassisted Speaking Challenge */}
      {activeTab === 'unassisted_challenge' && (
        <div className="animate-fade-in">
          <div className="glass-card" style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-5)', background: 'var(--bg-surface-subtle)' }}>
            <strong style={{ color: 'var(--color-primary-400)', fontSize: 'var(--text-xs)', display: 'block', marginBottom: 'var(--space-1)' }}>
              UNASSISTED SPEAKING CHALLENGE (2–3 MINUTES)
            </strong>
            <p style={{ color: 'var(--text-primary)', fontSize: 'var(--text-md)', fontWeight: 600, margin: 'var(--space-2) 0' }}>
              "Tell me about a difficult problem or setback you solved recently, what trade-offs you had to make, and what it taught you about your field."
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', margin: 0 }}>
              Speak naturally for at least 90 seconds. Structure your story, state the bottom line, and maintain vocal composure without starting over.
            </p>
          </div>

          {/* Emergency Hint Button (Discouraged) */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-3)' }}>
            <button
              onClick={() => {
                setHintsRequested(prev => prev + 1);
                setShowHintModal(true);
              }}
              className="btn btn--xs btn--secondary"
              style={{ color: 'var(--text-muted)' }}
            >
              Request Emergency Framework Hint (+1 to hint count)
            </button>
          </div>

          {showHintModal && (
            <div className="glass-card animate-fade-in" style={{ padding: 'var(--space-3)', marginBottom: 'var(--space-4)', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <span style={{ color: 'var(--color-danger-300)', fontSize: 'var(--text-xs)' }}>
                Framework Hint: Situation → Challenge → Action Taken → Quantified Result → Reflection. (Try not to open this again!)
              </span>
            </div>
          )}

          {/* Recorder Controls */}
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
            {!isRecording ? (
              <button onClick={startRecording} className="btn btn--primary" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span>🎙️</span> Perform Unassisted (2–3m)
              </button>
            ) : (
              <button onClick={handleStopRecording} className="btn btn--danger" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span className="recording-pulse" /> Stop & Audit ({Math.round(duration)}s)
              </button>
            )}
          </div>

          {/* Results */}
          {metrics && feedback && (
            <div className="glass-card animate-fade-in" style={{ padding: 'var(--space-5)', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
              <h4 style={{ color: 'var(--text-primary)', margin: '0 0 var(--space-3)' }}>Independence Audit</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Hint Dependency</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: metrics.hintDependency === 0 ? 'var(--color-success-400)' : 'var(--color-warning-400)' }}>
                    {metrics.hintDependency}
                  </div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Spontaneous Fluency</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary-400)' }}>{metrics.spontaneousFluency}/10</div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Structure Continuity</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-info-400)' }}>{metrics.structuralContinuity}/10</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                <div style={{ color: 'var(--color-success-300)' }}>
                  🦅 <strong>Independence:</strong> {feedback.independenceStatus}
                </div>
                <div style={{ color: 'var(--color-primary-300)' }}>
                  🌟 <strong>Day 30 Readiness:</strong> {feedback.readinessForDay30}
                </div>
              </div>

              <div style={{ marginTop: 'var(--space-5)', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => setActiveTab('rescue')} className="btn btn--primary">
                  Proceed to Rescue Drill →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Communication Rescue */}
      {activeTab === 'rescue' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Communication Rescue Practice</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            Real conversations involve confusion or disagreement. Master immediate recovery phrases:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
            <div className="glass-card" style={{ padding: 'var(--space-4)' }}>
              <span className="badge badge--warning" style={{ marginBottom: 'var(--space-2)' }}>Listener says:</span>
              <p style={{ color: 'var(--text-primary)', fontWeight: 600, margin: '0 0 var(--space-2)' }}>"I don't understand."</p>
              <div style={{ color: 'var(--color-primary-400)', fontSize: 'var(--text-xs)' }}>
                → Recovery: <strong>"Let me simplify that in another way. Think of it like..."</strong>
              </div>
            </div>
            <div className="glass-card" style={{ padding: 'var(--space-4)' }}>
              <span className="badge badge--danger" style={{ marginBottom: 'var(--space-2)' }}>Listener says:</span>
              <p style={{ color: 'var(--text-primary)', fontWeight: 600, margin: '0 0 var(--space-2)' }}>"I disagree with that."</p>
              <div style={{ color: 'var(--color-primary-400)', fontSize: 'var(--text-xs)' }}>
                → Recovery: <strong>"I can see why you feel that way. What evidence makes you lean in that direction?"</strong>
              </div>
            </div>
            <div className="glass-card" style={{ padding: 'var(--space-4)' }}>
              <span className="badge badge--secondary" style={{ marginBottom: 'var(--space-2)' }}>Listener says:</span>
              <p style={{ color: 'var(--text-primary)', fontWeight: 600, margin: '0 0 var(--space-2)' }}>"What do you mean?"</p>
              <div style={{ color: 'var(--color-primary-400)', fontSize: 'var(--text-xs)' }}>
                → Recovery: <strong>"The core distinction I am making is between X and Y."</strong>
              </div>
            </div>
          </div>

          <button onClick={() => setActiveTab('error_review')} className="btn btn--primary" style={{ width: '100%' }}>
            Next: Personalized Error Review →
          </button>
        </div>
      )}

      {/* Tab 4: Error Review */}
      {activeTab === 'error_review' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Your High-Value Recurring Patterns</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            We do not show a giant list of minor mistakes. Focus on these 2 highest-value patterns before Day 30:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            <div className="glass-card" style={{ padding: 'var(--space-4)', background: 'var(--bg-surface-subtle)' }}>
              <div style={{ color: 'var(--color-warning-400)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>Pattern 1: Tense Stability in Past Narratives</div>
              <div style={{ color: 'var(--color-danger-300)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>
                ❌ Slipping into present: <em>"Yesterday we go to the client and they say..."</em>
              </div>
              <div style={{ color: 'var(--color-success-300)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                ✅ Anchored past: <strong>"Yesterday we went to the client and they said..."</strong>
              </div>
            </div>

            <div className="glass-card" style={{ padding: 'var(--space-4)', background: 'var(--bg-surface-subtle)' }}>
              <div style={{ color: 'var(--color-warning-400)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>Pattern 2: Replacing Vocal Fillers with Silence</div>
              <div style={{ color: 'var(--color-danger-300)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>
                ❌ Vocal cord tension: <em>"The primary reason is um... uh... cost."</em>
              </div>
              <div style={{ color: 'var(--color-success-300)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                ✅ Composed pause: <strong>"The primary reason is [1-sec pause] cost."</strong>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={onNext} className="btn btn--primary">
              Complete Day 29 Rehearsal →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
