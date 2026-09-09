'use client';

import { useState } from 'react';
import { ActivityDefinition } from '@/types';

interface ConnectorActivationActivityProps {
  activity: ActivityDefinition;
  onComplete: (data: Record<string, unknown>) => void;
  onNext: () => void;
  isCompleted: boolean;
  savedResponse?: Record<string, unknown>;
}

interface ConnectorFamily {
  name: string;
  connectors: string[];
  purpose: string;
  example: string;
}

const CONNECTOR_FAMILIES: ConnectorFamily[] = [
  {
    name: '➕ Adding',
    connectors: ['in addition', 'furthermore', 'moreover', 'along with this'],
    purpose: 'Adds secondary evidence without repetitive "and".',
    example: 'The interface is intuitive. In addition, response latency dropped by 40%.',
  },
  {
    name: '⚖️ Contrast',
    connectors: ['however', 'on the other hand', 'that said', 'while', 'although'],
    purpose: 'Balances points and shows mature, nuanced reasoning.',
    example: 'The timeline is aggressive. That said, our automated testing prevents regressions.',
  },
  {
    name: '🎯 Result',
    connectors: ['as a result', 'therefore', 'which means that', 'consequently'],
    purpose: 'Links cause to business outcome or clear impact.',
    example: 'We refactored the core loop. As a result, memory consumption decreased.',
  },
  {
    name: '💡 Example',
    connectors: ['for example', 'for instance', 'specifically', 'to illustrate'],
    purpose: 'Grounds abstract claims in concrete reality.',
    example: 'Our stakeholders need transparency. For instance, a weekly demo builds confidence.',
  },
  {
    name: '🔍 Perspective',
    connectors: ['from my perspective', 'in my experience', 'as far as I can see'],
    purpose: 'Introduces professional opinions with executive composure.',
    example: 'From my perspective, simplicity in architecture always outlasts clever tricks.',
  },
  {
    name: '🏁 Conclusion',
    connectors: ['ultimately', 'overall', 'in short', 'the bottom line is'],
    purpose: 'Synthesizes points into an undeniable takeaway.',
    example: 'Ultimately, user satisfaction remains our true north metric.',
  },
];

const DEFAULT_REPAIR_CHALLENGE = {
  original:
    'We started the project last month and we had some problems with the API and the team was stressed and we talked to the customer and we fixed the bug and now everything is running well.',
  guidance: 'Replace the repeated "and" with 2–3 targeted connectors (e.g. "however", "as a result", "ultimately").',
  sampleSolution:
    'We started the project last month. However, we initially encountered API bottlenecks, which created team stress. After conferring directly with the client, we resolved the issue. As a result, the system is now operating smoothly.',
};

export default function ConnectorActivationActivity({
  activity,
  onComplete,
  onNext,
  isCompleted,
  savedResponse,
}: ConnectorActivationActivityProps) {
  const [activeFamilyIndex, setActiveFamilyIndex] = useState(0);
  const [repairText, setRepairText] = useState(
    (savedResponse?.repairText as string) || ''
  );
  const [cleftSentence, setCleftSentence] = useState(
    (savedResponse?.cleftSentence as string) || ''
  );

  const currentFamily = CONNECTOR_FAMILIES[activeFamilyIndex];

  const handleComplete = () => {
    onComplete({
      repairText,
      cleftSentence,
      completedAt: new Date().toISOString(),
    });
    onNext();
  };

  return (
    <div className="glass-card glass-card--elevated animate-scale-in">
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
          <span className="badge badge--success">🔗 Discourse Connectors</span>
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

      {/* Connector Families Explorer */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
          {CONNECTOR_FAMILIES.map((family, idx) => (
            <button
              key={idx}
              className={`btn btn--sm ${activeFamilyIndex === idx ? 'btn--primary' : 'btn--outline'}`}
              onClick={() => setActiveFamilyIndex(idx)}
            >
              {family.name}
            </button>
          ))}
        </div>

        <div style={{
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-5)',
        }}>
          <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--primary)', marginBottom: 'var(--space-1)' }}>
            {currentFamily.name}
          </h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
            {currentFamily.purpose}
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
            {currentFamily.connectors.map((c, i) => (
              <span
                key={i}
                style={{
                  background: 'rgba(99, 102, 241, 0.12)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  color: 'var(--text-primary)',
                  padding: 'var(--space-1) var(--space-3)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                }}
              >
                {c}
              </span>
            ))}
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderLeft: '3px solid var(--primary)',
            padding: 'var(--space-3) var(--space-4)',
            borderRadius: '0 var(--radius-md) var(--radius-md) 0',
            fontSize: 'var(--text-sm)',
            fontStyle: 'italic',
          }}>
            &ldquo;{currentFamily.example}&rdquo;
          </div>
        </div>
      </div>

      {/* Section 2: Connector Repair Challenge */}
      <div style={{
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-5)',
        marginBottom: 'var(--space-6)',
      }}>
        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', color: '#f59e0b' }}>
          🛠️ Flow Surgery: Eliminate the &ldquo;And... And... And...&rdquo; Loop
        </span>
        <div style={{
          background: 'rgba(239, 68, 68, 0.05)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-3)',
          margin: 'var(--space-3) 0',
          fontSize: 'var(--text-sm)',
          color: 'var(--text-secondary)',
          fontStyle: 'italic',
        }}>
          &ldquo;{DEFAULT_REPAIR_CHALLENGE.original}&rdquo;
        </div>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)' }}>
          {DEFAULT_REPAIR_CHALLENGE.guidance}
        </p>
        <textarea
          className="input-textarea"
          rows={3}
          value={repairText}
          onChange={e => setRepairText(e.target.value)}
          placeholder="Rewrite with mature transitions: We started the project last month. However..."
          style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}
        />
      </div>

      {/* Section 3: Cleft Sentence Emphasis Drill */}
      <div style={{
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-5)',
        marginBottom: 'var(--space-6)',
      }}>
        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)' }}>
          ⚡ Spoken Emphasis (Cleft Structures)
        </span>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 'var(--space-2) 0 var(--space-3)' }}>
          Transform plain statements into authoritative emphasis structures using <strong>&ldquo;What matters most is...&rdquo;</strong> or <strong>&ldquo;The reason why I prefer this is...&rdquo;</strong>.
        </p>
        <input
          type="text"
          className="input-text"
          value={cleftSentence}
          onChange={e => setCleftSentence(e.target.value)}
          placeholder='e.g. "What matters most is delivering dependable reliability for our clients."'
          style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)' }}
        />
      </div>

      {/* Completion */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn--primary" onClick={handleComplete}>
          {isCompleted ? 'Update Connectors' : 'Save & Continue'} →
        </button>
      </div>
    </div>
  );
}
