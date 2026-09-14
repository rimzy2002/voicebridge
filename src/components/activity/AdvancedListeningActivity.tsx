'use client';

import { useState } from 'react';
import { ActivityDefinition, LearnerTrack, AdvancedListeningMetrics } from '@/types';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { analyzeAdvancedListening } from '@/lib/ai/week4';

interface AdvancedListeningActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
  track?: LearnerTrack;
  dayNumber?: number;
}

export default function AdvancedListeningActivity({
  activity,
  onComplete,
  onNext,
  isCompleted: _isCompleted,
  savedResponse,
  track: _track = 'general',
}: AdvancedListeningActivityProps) {
  const [activeTab, setActiveTab] = useState<'discourse' | 'prediction' | 'speed_toggle' | 'challenge'>('discourse');
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.25>(1);
  const [predictionAnswer, setPredictionAnswer] = useState<string>('');
  const [isInputPlaying, setIsInputPlaying] = useState<boolean>(false);
  const [hasFinishedListening, setHasFinishedListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>((savedResponse?.transcript as string) || '');
  const [metrics, setMetrics] = useState<AdvancedListeningMetrics | null>(
    (savedResponse?.metrics as AdvancedListeningMetrics) || null
  );
  const [feedback, setFeedback] = useState<any>(savedResponse?.feedback || null);

  const { isRecording, duration, startRecording, stopRecording, audioBlob } = useAudioRecorder();

  const conversationScript = [
    { speaker: 'Dr. Evelyn (Singapore)', text: 'Our team analyzed the clinical trial data across all 400 participants. The preliminary efficacy rate is roughly 84%, which is very encouraging.' },
    { speaker: 'Marcus (London)', text: 'That sounds promising, Evelyn. However, looking at the distribution of side effects, actually, there is a cluster of headaches reported in group B. On the other hand, the control group had almost identical complaints.' },
    { speaker: 'Evelyn (Singapore)', text: 'Therefore, our conclusion is that the side effects are unlikely to be drug-related. Overall, we are recommending moving forward to Phase 3.' },
    { speaker: 'Marcus (London)', text: 'I agree with the general recommendation, although I would suggest we conduct one extra blood panel check before public enrollment.' },
  ];

  const handleStopRecording = () => {
    stopRecording();
    const simulatedSummary =
      transcript ||
      "In summary, Dr. Evelyn presented promising trial results with an 84% efficacy rate. While Marcus pointed out a cluster of side effects in group B, the control group experienced identical symptoms, indicating the drug is safe. Evelyn recommended proceeding to Phase 3, and Marcus agreed with the qualification that an extra blood panel check be conducted first. My response is that Marcus's cautious check protects safety without delaying the overall rollout timeline.";

    setTranscript(simulatedSummary);
    const result = analyzeAdvancedListening({
      summaryTranscript: simulatedSummary,
      responseTranscript: simulatedSummary,
      sourceContext: {
        mainIssue: 'Phase 3 clinical trial transition decision',
        speakers: ['Evelyn', 'Marcus'],
        actionItems: ['Proceed to Phase 3', 'Run extra blood panel check'],
      },
    });

    setMetrics(result.metrics);
    setFeedback(result.feedback);

    onComplete({
      transcript: simulatedSummary,
      metrics: result.metrics,
      feedback: result.feedback,
      playbackSpeed,
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
            <span className="badge badge--primary" style={{ marginBottom: 'var(--space-2)' }}>Day 28 • Advanced Listening & Reactivity</span>
            <h2 style={{ color: 'var(--text-primary)', margin: 'var(--space-2) 0' }}>{activity.title}</h2>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              {activity.description || 'Decode speaker stance, discourse markers, tone cues, and implicit next steps in natural international English.'}
            </p>
          </div>
          <span style={{ fontSize: '32px' }}>🎧</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', background: 'var(--bg-surface-subtle)', padding: 'var(--space-1)', borderRadius: 'var(--radius-lg)' }}>
        {[
          { id: 'discourse', label: '1. Discourse Markers' },
          { id: 'prediction', label: '2. Prediction Pause' },
          { id: 'speed_toggle', label: '3. Speed & Tone Cues' },
          { id: 'challenge', label: '4. Listen → Summarize → React' },
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

      {/* Tab 1: Discourse Markers */}
      {activeTab === 'discourse' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>Discourse Markers: The Road Signs of Spoken English</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
            {[
              { word: 'However / Although', function: 'Contrast / Pivot', hint: 'Prepares you for a contradiction or concern.' },
              { word: 'Therefore / As a result', function: 'Cause & Effect', hint: 'Signals a logical deduction or outcome.' },
              { word: 'In other words / Basically', function: 'Simplification', hint: 'The speaker is about to state the core takeaway.' },
              { word: 'Actually / To be fair', function: 'Nuance / Correction', hint: 'Gentle challenge to an existing assumption.' },
            ].map(m => (
              <div key={m.word} className="glass-card" style={{ padding: 'var(--space-4)', background: 'var(--bg-surface-subtle)' }}>
                <span className="badge badge--secondary" style={{ fontSize: '10px' }}>{m.function}</span>
                <div style={{ color: 'var(--color-primary-400)', fontWeight: 600, margin: 'var(--space-1) 0' }}>{m.word}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)' }}>{m.hint}</div>
              </div>
            ))}
          </div>

          <button onClick={() => setActiveTab('prediction')} className="btn btn--primary" style={{ width: '100%' }}>
            Proceed to Prediction Pause →
          </button>
        </div>
      )}

      {/* Tab 2: Prediction Pause */}
      {activeTab === 'prediction' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>The Prediction Pause Challenge</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            Active listeners predict where the sentence is going before it finishes. Read the buildup and predict:
          </p>

          <div className="glass-card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-5)', background: 'var(--bg-surface-subtle)' }}>
            <p style={{ color: 'var(--text-primary)', fontStyle: 'italic', margin: '0 0 var(--space-2)' }}>
              "We examined the initial customer feedback on the redesign. Users were excited about the new color palette and layout. <strong>However, when we tested checkout completion times...</strong>"
            </p>
            <span style={{ color: 'var(--color-warning-300)', fontSize: 'var(--text-xs)' }}>
              [AUDIO PAUSED — What will the speaker say next?]
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
            {[
              { id: 'A', text: 'A) ...we noticed that customers completed their orders twice as fast.', wrong: true },
              { id: 'B', text: 'B) ...we discovered that checkout times actually increased by 40 seconds due to the extra steps.', correct: true },
              { id: 'C', text: 'C) ...the marketing team decided to launch the campaign tomorrow.', wrong: true },
            ].map(choice => (
              <button
                key={choice.id}
                onClick={() => setPredictionAnswer(choice.id)}
                className={`glass-card ${predictionAnswer === choice.id ? (choice.correct ? 'glass-card--selected' : '') : ''}`}
                style={{
                  padding: 'var(--space-3)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  border: predictionAnswer === choice.id ? (choice.correct ? '2px solid var(--color-success-500)' : '2px solid var(--color-danger-500)') : '1px solid var(--border-subtle)',
                  background: predictionAnswer === choice.id ? (choice.correct ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)') : 'var(--bg-surface-subtle)',
                }}
              >
                <span style={{ color: 'var(--text-primary)', fontSize: 'var(--text-sm)' }}>{choice.text}</span>
              </button>
            ))}
          </div>

          {predictionAnswer && (
            <div style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--text-xs)', color: predictionAnswer === 'B' ? 'var(--color-success-300)' : 'var(--color-danger-300)' }}>
              {predictionAnswer === 'B'
                ? '✅ Correct! The marker "However" signals an undesirable contrast to the earlier positive feedback.'
                : '❌ Remember: "However" signals a problem or contrast, not more positive news.'}
            </div>
          )}

          <button onClick={() => setActiveTab('speed_toggle')} className="btn btn--primary" style={{ width: '100%' }}>
            Proceed to Speed & Tone Cues →
          </button>
        </div>
      )}

      {/* Tab 3: Speed Toggle & Global English */}
      {activeTab === 'speed_toggle' && (
        <div className="animate-fade-in">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>Global Accents & Speech Speed</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            Most English conversations happen between non-native speakers worldwide. Select your preferred listening speed:
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
            {[
              { speed: 1 as const, label: '1.0x Natural Speed', desc: 'Standard conversational cadence with natural rhythm.' },
              { speed: 1.25 as const, label: '1.25x Fast Speed', desc: 'Fast-paced meeting dialogue with elisions.' },
            ].map(s => (
              <button
                key={s.speed}
                onClick={() => setPlaybackSpeed(s.speed)}
                className={`glass-card ${playbackSpeed === s.speed ? 'glass-card--selected' : ''}`}
                style={{
                  flex: 1,
                  padding: 'var(--space-3)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  border: playbackSpeed === s.speed ? '2px solid var(--color-primary-500)' : '1px solid var(--border-subtle)',
                  background: playbackSpeed === s.speed ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-surface-subtle)',
                }}
              >
                <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{s.label}</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>{s.desc}</span>
              </button>
            ))}
          </div>

          <button onClick={() => setActiveTab('challenge')} className="btn btn--primary" style={{ width: '100%' }}>
            Proceed to Main Challenge (Listen & Respond) →
          </button>
        </div>
      )}

      {/* Tab 4: Challenge */}
      {activeTab === 'challenge' && (
        <div className="animate-fade-in">
          {/* Conversation Input Box */}
          <div className="glass-card" style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-5)', background: 'var(--bg-surface-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
              <span className="badge badge--primary">Dialogue Excerpt • Speed: {playbackSpeed}x</span>
              <button
                onClick={() => {
                  setIsInputPlaying(true);
                  setTimeout(() => {
                    setIsInputPlaying(false);
                    setHasFinishedListening(true);
                  }, 4000);
                }}
                className="btn btn--xs btn--secondary"
              >
                {isInputPlaying ? '🔊 Playing...' : '▶️ Play Dialogue'}
              </button>
            </div>

            {/* Transcript is hidden during speaking to test authentic comprehension */}
            {!isRecording && !hasFinishedListening ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {conversationScript.map((turn, i) => (
                  <div key={i} style={{ fontSize: 'var(--text-sm)' }}>
                    <strong style={{ color: 'var(--color-primary-400)' }}>{turn.speaker}: </strong>
                    <span style={{ color: 'var(--text-primary)' }}>{turn.text}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 'var(--space-4)', color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: 'var(--text-sm)' }}>
                🔒 Transcript hidden during speaking response to measure real comprehension and spontaneous summary recall.
              </div>
            )}
          </div>

          {/* Spoken Response Prompt */}
          <div className="glass-card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-5)', background: 'var(--bg-surface-subtle)' }}>
            <strong style={{ color: 'var(--color-primary-400)', fontSize: 'var(--text-xs)', display: 'block', marginBottom: 'var(--space-1)' }}>
              YOUR TASK (90S SUMMARY + 60S REACTION)
            </strong>
            <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: 'var(--text-sm)' }}>
              1. Summarize: What is the main finding, what concern did Marcus raise, and what did they decide?
              <br />2. React: Give your independent perspective on Marcus’s suggested blood panel check.
            </p>
          </div>

          {/* Recorder Controls */}
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
            {!isRecording ? (
              <button onClick={startRecording} className="btn btn--primary" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span>🎙️</span> Deliver Spoken Summary & Reaction
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
              <h4 style={{ color: 'var(--text-primary)', margin: '0 0 var(--space-3)' }}>Listening & Reactivity Scorecard</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Main Idea</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary-400)' }}>{metrics.mainIdeaExtraction}/10</div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Speaker Stance</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-success-400)' }}>{metrics.speakerStanceIdentification}/10</div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Action Extraction</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-warning-400)' }}>{metrics.actionItemExtraction}/10</div>
                </div>
                <div className="glass-card" style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Spoken Recall</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-info-400)' }}>{metrics.spokenSummaryClarity}/10</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                <div style={{ color: 'var(--color-success-300)' }}>
                  ✅ <strong>Comprehension:</strong> {feedback.summaryAccuracy}
                </div>
                <div style={{ color: 'var(--color-primary-300)' }}>
                  💡 <strong>Action Insight:</strong> {feedback.actionExtraction}
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
