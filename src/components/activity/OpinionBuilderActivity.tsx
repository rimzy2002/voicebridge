'use client';

import { useState } from 'react';
import { ActivityDefinition } from '@/types';

interface OpinionBuilderActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
}

interface OpinionStep {
  title: string;
  prompt: string;
  placeholder: string;
  stem?: string;
}

const OPINION_STEPS: OpinionStep[] = [
  {
    title: '1. Position',
    prompt: 'What do you believe? State your clear standpoint directly.',
    placeholder: 'e.g. From my perspective, remote work significantly boosts productivity.',
    stem: 'From my perspective...',
  },
  {
    title: '2. Reason',
    prompt: 'Why do you believe this? Provide the primary justification.',
    placeholder: 'e.g. One of the main reasons is that eliminating commute fatigue frees up mental focus.',
    stem: 'One of the main reasons is...',
  },
  {
    title: '3. Evidence / Example',
    prompt: 'What concrete example or observable outcome supports your claim?',
    placeholder: 'e.g. A good example is our sprint delivery rates, which increased by 20% after going hybrid.',
    stem: 'A concrete example of this is...',
  },
  {
    title: '4. Other Side',
    prompt: 'What counterargument might a skeptic or opposing stakeholder raise?',
    placeholder: 'e.g. That said, some managers worry that team cohesion and spontaneous brainstorming decrease.',
    stem: 'That said, critics often argue that...',
  },
  {
    title: '5. Response',
    prompt: 'How do you directly address that counter-perspective without dismissing it?',
    placeholder: 'e.g. I see their point, but structured weekly syncs and open channels effectively solve that concern.',
    stem: 'I can understand that concern, however...',
  },
  {
    title: '6. Conclusion',
    prompt: 'Where do you finally stand? Deliver your crisp takeaway.',
    placeholder: 'e.g. Ultimately, when supported with proper tooling, flexibility delivers superior output.',
    stem: 'Ultimately, I would argue that...',
  },
];

export default function OpinionBuilderActivity({
  activity,
  onComplete,
  onNext,
  isCompleted,
  savedResponse,
}: OpinionBuilderActivityProps) {
  const config = activity.config || {};
  const isAgreementGame = activity.type === 'agreement_disagreement' || config.isGame;
  const isCounterargument = activity.type === 'counterargument' || config.isCounter;

  // State for step-by-step opinion builder
  const [stepData, setStepData] = useState<Record<number, string>>(
    (savedResponse?.stepData as Record<number, string>) || {}
  );
  const [activeStep, setActiveStep] = useState(0);

  // State for agreement spectrum game
  const statements = (config.statements as string[]) || [
    'Remote work is superior to office-based work for most knowledge industries.',
    'University degrees should be completely publicly funded.',
    'Artificial Intelligence will augment rather than eliminate knowledge workers.',
    'Fast-paced communication channels like Slack reduce deep cognitive work.',
  ];
  const [statementIndex, setStatementIndex] = useState(0);
  const [selectedStance, setSelectedStance] = useState<string | null>(null);
  const [gameExplanation, setGameExplanation] = useState('');

  // Counterargument state
  const [counterResponse, setCounterResponse] = useState(
    (savedResponse?.counterResponse as string) || ''
  );

  const handleStepChange = (index: number, value: string) => {
    setStepData(prev => ({ ...prev, [index]: value }));
  };

  const handleApplyStem = (stem: string) => {
    const current = stepData[activeStep] || '';
    if (!current.startsWith(stem)) {
      setStepData(prev => ({ ...prev, [activeStep]: `${stem} ${current}`.trim() }));
    }
  };

  const handleComplete = () => {
    onComplete({
      stepData,
      isGame: isAgreementGame,
      counterResponse,
      completedAt: new Date().toISOString(),
    });
    onNext();
  };

  return (
    <div className="glass-card glass-card--elevated animate-scale-in">
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
          <span className="badge badge--primary">
            {isAgreementGame ? '🤝 Agreement Spectrum' : isCounterargument ? '⚔️ Counterargument Lab' : '📐 Structured Opinion'}
          </span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            Est. {activity.durationMinutes || 4} min
          </span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
          {activity.title}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
          {activity.instructions}
        </p>
      </div>

      {/* Mode A: Step-by-Step Opinion Builder */}
      {!isAgreementGame && !isCounterargument && (
        <div>
          {/* Step tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
            {OPINION_STEPS.map((s, idx) => (
              <button
                key={idx}
                className={`btn btn--sm ${activeStep === idx ? 'btn--primary' : stepData[idx] ? 'btn--outline' : 'btn--ghost'}`}
                onClick={() => setActiveStep(idx)}
                style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-2) var(--space-1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {s.title.split('. ')[1]}
              </button>
            ))}
          </div>

          {/* Current Active Step */}
          <div style={{
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6)',
            marginBottom: 'var(--space-6)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--primary)' }}>
                {OPINION_STEPS[activeStep].title}
              </h3>
              {OPINION_STEPS[activeStep].stem && (
                <button
                  className="btn btn--outline btn--sm"
                  onClick={() => handleApplyStem(OPINION_STEPS[activeStep].stem!)}
                >
                  Insert Phrase: &ldquo;{OPINION_STEPS[activeStep].stem}&rdquo;
                </button>
              )}
            </div>

            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
              {OPINION_STEPS[activeStep].prompt}
            </p>

            <textarea
              className="input-textarea"
              rows={3}
              value={stepData[activeStep] || ''}
              onChange={e => handleStepChange(activeStep, e.target.value)}
              placeholder={OPINION_STEPS[activeStep].placeholder}
              style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}
            />
          </div>

          {/* Complete Opinion Preview */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4)',
            marginBottom: 'var(--space-6)',
          }}>
            <h4 style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)', fontWeight: 600 }}>
              Your Assembled 6-Stage Argument Flow:
            </h4>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 'var(--leading-relaxed)' }}>
              {Object.values(stepData).filter(Boolean).join(' ') || '(Write your steps above to see the unified opinion draft...)'}
            </p>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              className="btn btn--ghost"
              disabled={activeStep === 0}
              onClick={() => setActiveStep(prev => prev - 1)}
            >
              ← Previous Step
            </button>
            {activeStep < OPINION_STEPS.length - 1 ? (
              <button className="btn btn--outline" onClick={() => setActiveStep(prev => prev + 1)}>
                Next Step →
              </button>
            ) : (
              <button className="btn btn--primary" onClick={handleComplete}>
                {isCompleted ? 'Update Opinion' : 'Complete Structured Opinion'} →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mode B: Agreement / Disagreement Spectrum Game */}
      {isAgreementGame && (
        <div>
          <div style={{
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6)',
            marginBottom: 'var(--space-6)',
            textAlign: 'center',
          }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 600 }}>
              Statement {statementIndex + 1} of {statements.length}
            </span>
            <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, margin: 'var(--space-3) 0 var(--space-6)' }}>
              &ldquo;{statements[statementIndex]}&rdquo;
            </h3>

            {/* Stance Selector */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
              {[
                { id: 'strong_agree', label: 'Strongly Agree', phrase: 'I completely agree because...' },
                { id: 'partial_agree', label: 'Partially Agree', phrase: 'I agree to some extent, although...' },
                { id: 'qualified', label: 'Qualified View', phrase: 'I agree with the general idea, however...' },
                { id: 'disagree', label: 'Respectful Disagree', phrase: 'I see your point, but my concern would be...' },
              ].map(stance => (
                <button
                  key={stance.id}
                  className={`btn ${selectedStance === stance.id ? 'btn--primary' : 'btn--outline'}`}
                  onClick={() => {
                    setSelectedStance(stance.id);
                    setGameExplanation(stance.phrase);
                  }}
                  style={{ fontSize: 'var(--text-xs)' }}
                >
                  {stance.label}
                </button>
              ))}
            </div>

            {selectedStance && (
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', textAlign: 'left' }}>
                  Speak / Formulate your 45-second justification:
                </label>
                <textarea
                  className="input-textarea"
                  rows={3}
                  value={gameExplanation}
                  onChange={e => setGameExplanation(e.target.value)}
                  style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}
                />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
            {statementIndex < statements.length - 1 ? (
              <button
                className="btn btn--outline"
                disabled={!selectedStance}
                onClick={() => {
                  setStatementIndex(prev => prev + 1);
                  setSelectedStance(null);
                  setGameExplanation('');
                }}
              >
                Next Statement →
              </button>
            ) : (
              <button className="btn btn--primary" onClick={handleComplete}>
                Complete Stance Drill →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mode C: Counterargument Response Builder */}
      {isCounterargument && (
        <div>
          <div style={{
            background: 'rgba(239, 68, 68, 0.05)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-5)',
            marginBottom: 'var(--space-6)',
          }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: '#ef4444', textTransform: 'uppercase' }}>
              Opposing Perspective Raised by Stakeholder:
            </span>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-primary)', marginTop: 'var(--space-2)', fontStyle: 'italic' }}>
              &ldquo;{config.counterargumentText || 'While your proposal sounds modern, the implementation cost and training overhead will severely interrupt our quarterly deliverables.'}&rdquo;
            </p>
          </div>

          <div style={{ marginBottom: 'var(--space-6)' }}>
            <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
              Construct your response (Acknowledge → Pivot → Justify):
            </label>
            <textarea
              className="input-textarea"
              rows={4}
              value={counterResponse}
              onChange={e => setCounterResponse(e.target.value)}
              placeholder="e.g. That is a legitimate concern regarding short-term velocity. However, phased rollout in sprint 1 will isolate any downtime while delivering long-term efficiency..."
              style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              className="btn btn--primary"
              disabled={!counterResponse.trim()}
              onClick={handleComplete}
            >
              Submit & Proceed →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
