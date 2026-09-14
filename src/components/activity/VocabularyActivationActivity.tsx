'use client';

import { useState } from 'react';
import { ActivityDefinition } from '@/types';

interface VocabularyActivationActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
}

interface VocabItem {
  phrase: string;
  meaning: string;
  example: string;
  tip?: string;
}

export default function VocabularyActivationActivity({
  activity,
  onComplete,
  onNext,
  isCompleted,
  savedResponse,
}: VocabularyActivationActivityProps) {
  const config = activity.config || {};
  const items: VocabItem[] = (config.items as VocabItem[]) || [
    {
      phrase: 'From my perspective',
      meaning: 'A polite, professional way to introduce your opinion without sounding dogmatic.',
      example: 'From my perspective, focusing on user onboarding will yield higher retention than adding more features.',
      tip: 'Pause slightly after the phrase for authoritative delivery.',
    },
    {
      phrase: 'To align our expectations',
      meaning: 'Used to ensure everyone shares the same assumptions, timelines, and deliverables.',
      example: 'Before we dive into development, let us align our expectations on the delivery timeline.',
      tip: 'Great opener for project kickoffs and sprint reviews.',
    },
    {
      phrase: 'Could you elaborate on...',
      meaning: 'An assertive yet collaborative invitation for more context or clarification.',
      example: 'Could you elaborate on how this change affects the existing database schema?',
      tip: 'Replaces abrupt questions like "What do you mean?".',
    },
  ];

  const [sentences, setSentences] = useState<Record<string, string>>(
    (savedResponse?.sentences as Record<string, string>) || {}
  );
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const handleSentenceChange = (phrase: string, val: string) => {
    setSentences(prev => ({ ...prev, [phrase]: val }));
  };

  const handleComplete = () => {
    onComplete({
      sentences,
      completedAt: new Date().toISOString(),
    });
    onNext();
  };

  const currentItem = items[activeItemIndex];

  return (
    <div className="glass-card glass-card--elevated animate-scale-in">
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
          <span className="badge badge--primary">✨ Vocabulary & Phrasing</span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            {activeItemIndex + 1} of {items.length} phrases
          </span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
          {activity.title}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
          {activity.instructions}
        </p>
      </div>

      {/* Phrase Carousel Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
        {items.map((item, idx) => (
          <button
            key={idx}
            className={`btn btn--sm ${activeItemIndex === idx ? 'btn--primary' : 'btn--outline'}`}
            onClick={() => setActiveItemIndex(idx)}
          >
            {item.phrase}
          </button>
        ))}
      </div>

      {/* Current Active Phrase Card */}
      {currentItem && (
        <div style={{
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-6)',
          marginBottom: 'var(--space-6)',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
            <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--primary)' }}>
              &ldquo;{currentItem.phrase}&rdquo;
            </h3>
            <button
              className="btn btn--ghost btn--sm"
              onClick={() => {
                if ('speechSynthesis' in window) {
                  const utter = new SpeechSynthesisUtterance(currentItem.phrase);
                  utter.lang = 'en-US';
                  window.speechSynthesis.speak(utter);
                }
              }}
              title="Listen to native pronunciation"
            >
              🔊 Listen
            </button>
          </div>

          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
            <strong>Usage Context:</strong> {currentItem.meaning}
          </p>

          <div style={{
            background: 'var(--bg-surface-subtle)',
            borderLeft: '3px solid var(--primary)',
            padding: 'var(--space-3) var(--space-4)',
            borderRadius: '0 var(--radius-md) var(--radius-md) 0',
            marginBottom: 'var(--space-5)',
          }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-tertiary)', display: 'block' }}>
              Example in context:
            </span>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', marginTop: 'var(--space-1)' }}>
              &ldquo;{currentItem.example}&rdquo;
            </p>
          </div>

          {currentItem.tip && (
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-5)' }}>
              💡 <strong>Pro Delivery Tip:</strong> {currentItem.tip}
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
              Activate It: Write a sentence you would actually say in your work:
            </label>
            <input
              type="text"
              className="input-text"
              value={sentences[currentItem.phrase] || ''}
              onChange={e => handleSentenceChange(currentItem.phrase, e.target.value)}
              placeholder={`e.g. ${currentItem.example}`}
              style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}
            />
          </div>
        </div>
      )}

      {/* Pagination & Next */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          className="btn btn--ghost"
          disabled={activeItemIndex === 0}
          onClick={() => setActiveItemIndex(prev => prev - 1)}
        >
          ← Previous Phrase
        </button>

        {activeItemIndex < items.length - 1 ? (
          <button
            className="btn btn--outline"
            onClick={() => setActiveItemIndex(prev => prev + 1)}
          >
            Next Phrase →
          </button>
        ) : (
          <button className="btn btn--primary" onClick={handleComplete}>
            {isCompleted ? 'Save & Proceed' : 'Complete Activation'} →
          </button>
        )}
      </div>
    </div>
  );
}
