'use client';

import { useState } from 'react';
import { ActivityDefinition, LearnerTrack } from '@/types';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { analyzeComplexExplanation, ComplexityScorecard } from '@/lib/ai/week4';

interface ComplexExplanationActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
  track?: LearnerTrack;
  dayNumber?: number;
}

export default function ComplexExplanationActivity({
  activity,
  onComplete,
  onNext,
  isCompleted: _isCompleted,
  savedResponse,
  track = 'general',
}: ComplexExplanationActivityProps) {
  const [selectedAudience, setSelectedAudience] = useState<'beginner' | 'peer' | 'expert'>('beginner');
  const [transcript, setTranscript] = useState<string>(
    (savedResponse?.transcript as string) || ''
  );
  const [scorecard, setScorecard] = useState<ComplexityScorecard | null>(
    (savedResponse?.scorecard as ComplexityScorecard) || null
  );
  const [activeTab, setActiveTab] = useState<'framework' | 'jargon' | 'analogies' | 'practice'>('framework');
  const [simplifiedJargon, setSimplifiedJargon] = useState<Record<number, string>>({});
  const [showConfusionPrompt, setShowConfusionPrompt] = useState(false);

  const {
    isRecording,
    duration,
    startRecording,
    stopRecording,
    audioBlob,
  } = useAudioRecorder();

  const handleStopRecording = () => {
    stopRecording();
    // In browser speech simulation or real audio
    const simulatedText =
      transcript ||
      (selectedAudience === 'beginner'
        ? "Think of this like a post office. When you send an order, instead of delivering it directly to the customer right away, we put it into a queue so the delivery drivers don't get overwhelmed. Does that make sense?"
        : "We decouple the ingestion layer from the execution workers using an event queue, which keeps response latency under 50ms while ensuring backpressure tolerance.");

    setTranscript(simulatedText);

    const result = analyzeComplexExplanation({
      transcript: simulatedText,
      audience: selectedAudience,
      topic: activity.config?.topic || 'System Process',
      track,
    });

    setScorecard(result);

    onComplete({
      transcript: simulatedText,
      audience: selectedAudience,
      scorecard: result,
      audioBlobSize: audioBlob?.size,
      timestamp: new Date().toISOString(),
    });
  };

  const jargonExamples = [
    {
      original: 'Implementation requires cross-functional stakeholder alignment.',
      simpler: 'We need the different teams involved to agree on the plan.',
      context: 'Team Coordination',
    },
    {
      original: 'We must leverage synergistic paradigms to optimize bandwidth.',
      simpler: 'We should combine our efforts so we do not waste time.',
      context: 'Efficiency',
    },
    {
      original: 'Our deliverable is currently gatekept by infrastructural latency constraints.',
      simpler: 'Our release is delayed because the database servers are responding slowly.',
      context: 'Project Status',
    },
  ];

  return (
    <div className="glass-card glass-card--elevated animate-scale-in" style={{ padding: 'var(--space-8)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="badge badge--primary" style={{ marginBottom: 'var(--space-2)' }}>Day 22 • Complexity Reduction</span>
            <h2 style={{ color: 'var(--text-primary)', margin: 'var(--space-2) 0' }}>{activity.title}</h2>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              {activity.description || 'Break down high-complexity ideas into clear, digestible explanations for any audience.'}
            </p>
          </div>
          <span style={{ fontSize: '32px' }}>💡</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', background: 'var(--bg-surface-subtle)', padding: 'var(--space-1)', borderRadius: 'var(--radius-lg)' }}>
        {[
          { id: 'framework', label: '1. What / Why / How' },
          { id: 'jargon', label: '2. Jargon Simplifier' },
          { id: 'analogies', label: '3. Analogy & Listener Checks' },
          { id: 'practice', label: '4. 3-Audience Speaking Challenge' },
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
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>The 5-Step Complexity Reduction Formula</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
            {[
              { step: 'WHAT?', title: 'The Central Idea', desc: 'State the core concept in 10 plain words.', icon: '📌' },
              { step: 'WHY?', title: 'Why It Matters', desc: 'Why should the listener care right now?', icon: '🎯' },
              { step: 'HOW?', title: 'How It Works', desc: '1-2 operational steps without edge cases.', icon: '⚙️' },
              { step: 'EXAMPLE', title: 'Concrete Analogy', desc: '"You can think of it like..."', icon: '🔍' },
              { step: 'BOTTOM LINE', title: 'Key Takeaway', desc: 'What single phrase must they remember?', icon: '🏁' },
            ].map(card => (
              <div key={card.step} className="glass-card" style={{ padding: 'var(--space-4)', background: 'var(--bg-surface-subtle)' }}>
                <div style={{ fontSize: '20px', marginBottom: 'var(--space-1)' }}>{card.icon}</div>
                <strong style={{ color: 'var(--color-primary-400)', display: 'block', fontSize: 'var(--text-xs)' }}>{card.step}</strong>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600, margin: 'var(--space-1) 0' }}>{card.title}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)' }}>{card.desc}</div>
              </div>
            ))}
          </div>

          <button onClick={() => setActiveTab('jargon')} className="btn btn--primary" style={{ width: '100%' }}>
            Proceed to Jargon Simplifier →
          </button>
        </div>
      )}

      {/* Tab 2: Jargon */}
      {activeTab === 'jargon' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Jargon Detector: Translate to Plain Language</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            Corporate buzzwords create distance. See how easily these sentences transform into clear communication:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            {jargonExamples.map((ex, idx) => (
              <div key={idx} className="glass-card" style={{ padding: 'var(--space-4)', background: 'var(--bg-surface-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span className="badge badge--secondary" style={{ fontSize: '11px' }}>{ex.context}</span>
                  <button
                    className="btn btn--xs btn--secondary"
                    onClick={() => setSimplifiedJargon(prev => ({ ...prev, [idx]: ex.simpler }))}
                  >
                    Reveal Simpler Version
                  </button>
                </div>
                <div style={{ color: 'var(--color-danger-300)', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                  ❌ <em>"{ex.original}"</em>
                </div>
                {simplifiedJargon[idx] ? (
                  <div style={{ color: 'var(--color-success-300)', fontSize: 'var(--text-sm)', fontWeight: 500 }} className="animate-fade-in">
                    ✅ <strong>"{simplifiedJargon[idx]}"</strong>
                  </div>
                ) : (
                  <div style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
                    (Try explaining this without using the words 'leverage', 'alignment', or 'latency')
                  </div>
                )}
              </div>
            ))}
          </div>

          <button onClick={() => setActiveTab('analogies')} className="btn btn--primary" style={{ width: '100%' }}>
            Next: Analogy Builder & Listener Checks →
          </button>
        </div>
      )}

      {/* Tab 3: Analogies & Listener Checks */}
      {activeTab === 'analogies' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Analogy Anchors & Listener Checks</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            Great communicators check whether their listener is following along and bridge abstract concepts using vivid metaphors.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            <div className="glass-card" style={{ padding: 'var(--space-4)' }}>
              <h4 style={{ color: 'var(--color-primary-400)', margin: '0 0 var(--space-3)' }}>Metaphor Starters</h4>
              <ul style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', paddingLeft: 'var(--space-4)', margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <li><strong>"It is very similar to..."</strong></li>
                <li><strong>"You can think of it as..."</strong></li>
                <li><strong>"A simple everyday example would be..."</strong></li>
                <li><strong>"Imagine you are running a restaurant..."</strong></li>
              </ul>
            </div>
            <div className="glass-card" style={{ padding: 'var(--space-4)' }}>
              <h4 style={{ color: 'var(--color-warning-400)', margin: '0 0 var(--space-3)' }}>Comprehension Checks</h4>
              <ul style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', paddingLeft: 'var(--space-4)', margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <li><strong>"Does that make sense so far?"</strong></li>
                <li><strong>"Would you like an example of that in action?"</strong></li>
                <li><strong>"Should I explain that in another way?"</strong></li>
                <li><strong>"The key takeaway to keep in mind is..."</strong></li>
              </ul>
            </div>
          </div>

          <button onClick={() => setActiveTab('practice')} className="btn btn--primary" style={{ width: '100%' }}>
            Proceed to Speaking Challenge →
          </button>
        </div>
      )}

      {/* Tab 4: Practice & Recording */}
      {activeTab === 'practice' && (
        <div className="animate-fade-in">
          {/* Audience Selector */}
          <div style={{ marginBottom: 'var(--space-5)' }}>
            <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Select Your Target Audience:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)' }}>
              {[
                { id: 'beginner', title: 'Beginner / Newcomer', desc: 'No background knowledge. Zero jargon, maximum analogies.' },
                { id: 'peer', title: 'Peer / Colleague', desc: 'Familiar with general context. Clear workflow focus.' },
                { id: 'expert', title: 'Executive / Professor', desc: 'Needs bottom line, strategic trade-offs, and ROI.' },
              ].map(aud => (
                <button
                  key={aud.id}
                  onClick={() => setSelectedAudience(aud.id as any)}
                  className={`glass-card ${selectedAudience === aud.id ? 'glass-card--selected' : ''}`}
                  style={{
                    padding: 'var(--space-3)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    border: selectedAudience === aud.id ? '2px solid var(--color-primary-500)' : '1px solid var(--border-subtle)',
                    background: selectedAudience === aud.id ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-surface-subtle)',
                  }}
                >
                  <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{aud.title}</strong>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>{aud.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt card */}
          <div className="glass-card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-5)', background: 'var(--bg-surface-subtle)' }}>
            <strong style={{ color: 'var(--color-primary-400)', fontSize: 'var(--text-xs)', display: 'block', marginBottom: 'var(--space-1)' }}>
              SPEAKING PROMPT (2 MINUTES)
            </strong>
            <p style={{ color: 'var(--text-primary)', margin: '0 0 var(--space-2)', fontWeight: 500 }}>
              {track === 'professional'
                ? 'Explain a process or technical concept from your work so that a brand-new employee understands it instantly.'
                : track === 'student'
                ? 'Explain a difficult topic or theory from your studies to someone who has never taken a single class in your field.'
                : 'Explain how a complex system or appliance you know well operates (e.g. how search engines work, how GPS functions).'}
            </p>
            <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)' }}>
              Target: State WHAT it is, WHY it matters, HOW it works, provide ONE analogy, and conclude with the BOTTOM LINE.
            </div>
          </div>

          {/* AI Confusion Simulator button */}
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <button
              onClick={() => setShowConfusionPrompt(!showConfusionPrompt)}
              className="btn btn--xs btn--secondary"
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}
            >
              <span>🤖</span> {showConfusionPrompt ? 'Hide AI Clarification Interruption' : 'Simulate Listener Confusion ("I am not sure what you mean by...")'}
            </button>
            {showConfusionPrompt && (
              <div className="glass-card animate-fade-in" style={{ padding: 'var(--space-3)', marginTop: 'var(--space-2)', borderLeft: '3px solid var(--color-warning-500)', background: 'rgba(245, 158, 11, 0.08)' }}>
                <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: 'var(--text-sm)' }}>
                  <em>"I understand the first part about why it matters, but I am not quite sure how the data actually gets transferred. Could you give a simpler example?"</em>
                </p>
                <span style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>
                  → Recovery: Use "Let me put that another way" or "Think of it as..."
                </span>
              </div>
            )}
          </div>

          {/* Recorder Controls */}
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
            {!isRecording ? (
              <button onClick={startRecording} className="btn btn--primary" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span>🎙️</span> Start Speaking (2m)
              </button>
            ) : (
              <button onClick={handleStopRecording} className="btn btn--danger" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span className="recording-pulse" /> Stop & Analyze ({Math.round(duration)}s)
              </button>
            )}
          </div>

          {/* Scorecard Results */}
          {scorecard && (
            <div className="glass-card animate-fade-in" style={{ padding: 'var(--space-5)', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
              <h4 style={{ color: 'var(--text-primary)', margin: '0 0 var(--space-3)' }}>Complexity Reduction Scorecard</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Core Clarity</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary-400)' }}>{scorecard.coreIdeaClarity}/10</div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Audience Fit</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-success-400)' }}>{scorecard.audienceAdaptation}/10</div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Jargon Control</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-warning-400)' }}>{scorecard.jargonControl}/10</div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Analogies</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-info-400)' }}>{scorecard.examplesAndAnalogies}/10</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                <div style={{ color: 'var(--color-success-300)' }}>
                  ✅ <strong>Strongest Aspect:</strong> {scorecard.feedback.strongestAspect}
                </div>
                <div style={{ color: 'var(--color-warning-300)' }}>
                  ⚠️ <strong>Clarity Target:</strong> {scorecard.feedback.clarityIssue}
                </div>
                <div style={{ color: 'var(--color-primary-300)' }}>
                  💡 <strong>Upgrade:</strong> {scorecard.feedback.vocabularyUpgrade}
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
