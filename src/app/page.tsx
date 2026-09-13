'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ADVANCED_CLASSES } from '@/lib/curriculum/advanced';

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => {
    setIsLoading(true);
    router.push('/day/1');
  };

  return (
    <main className="landing">
      <div className="landing__hero">
        <div className="container container--content">
          {/* Badge */}
          <div className="landing__badge animate-slide-up">
            <span className="badge badge--primary">30-Day Program</span>
          </div>

          {/* Headline */}
          <h1 className="landing__title animate-slide-up" style={{ animationDelay: '50ms' }}>
            30 Days to More Confident, Fluent, Clear and Professional{' '}
            <span className="text-gradient">English Communication</span>
          </h1>

          {/* Subtitle */}
          <p className="landing__subtitle animate-slide-up" style={{ animationDelay: '100ms' }}>
            Don&apos;t study English for 30 days.{' '}
            <strong>Use English for 30 days.</strong>
          </p>

          {/* Key stats */}
          <div className="landing__stats animate-slide-up" style={{ animationDelay: '150ms' }}>
            <div className="landing__stat">
              <span className="landing__stat-value">20%</span>
              <span className="landing__stat-label">Instruction</span>
            </div>
            <div className="landing__stat-divider" />
            <div className="landing__stat">
              <span className="landing__stat-value">80%</span>
              <span className="landing__stat-label">Application</span>
            </div>
            <div className="landing__stat-divider" />
            <div className="landing__stat">
              <span className="landing__stat-value">35-45</span>
              <span className="landing__stat-label">Minutes/Day</span>
            </div>
          </div>

          {/* CTA */}
          <div className="landing__cta animate-slide-up" style={{ animationDelay: '200ms' }}>
            <button
              className="btn btn--primary btn--lg"
              onClick={handleStart}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Start Day 1 — Free'}
              {!isLoading && <span aria-hidden="true">→</span>}
            </button>
            <p className="landing__cta-note">No credit card required • Express mode available</p>
          </div>

          {/* Target audience */}
          <div className="landing__audience animate-slide-up" style={{ animationDelay: '250ms' }}>
            <p className="landing__audience-title">Built for intermediate learners who struggle with:</p>
            <div className="landing__problems">
              {[
                { icon: '⏱️', text: 'Speaking quickly' },
                { icon: '🔄', text: 'Mental translation' },
                { icon: '😰', text: 'Hesitation & fear' },
                { icon: '📖', text: 'Vocabulary retrieval' },
                { icon: '🔊', text: 'Pronunciation clarity' },
                { icon: '📝', text: 'Grammar under pressure' },
                { icon: '🧩', text: 'Answer organization' },
                { icon: '📏', text: 'Short answers' },
                { icon: '👂', text: 'Understanding fast speech' },
                { icon: '💪', text: 'Confidence' },
              ].map((problem) => (
                <div key={problem.text} className="landing__problem">
                  <span className="landing__problem-icon">{problem.icon}</span>
                  <span className="landing__problem-text">{problem.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Week overview */}
      <section className="landing__weeks">
        <div className="container container--content">
          <h2 className="landing__section-title">Your 30-Day Journey</h2>
          <div className="landing__week-grid">
            {[
              {
                week: 1,
                title: 'Activate English',
                subtitle: 'Diagnostic & De-fossilization',
                description: 'Remove hesitation, identify recurring problems, establish speaking habits, improve thought organization.',
                days: '1-7',
                active: true,
              },
              {
                week: 2,
                title: 'Build Fluency',
                subtitle: 'Structural Expansion',
                description: 'Longer opinions, vocabulary activation, paraphrasing, narrative development, pronunciation.',
                days: '8-14',
                active: false,
              },
              {
                week: 3,
                title: 'Communicate Professionally',
                subtitle: 'Real-World Application',
                description: 'Meetings, interviews, presentations, workplace communication, negotiation.',
                days: '15-21',
                active: false,
              },
              {
                week: 4,
                title: 'Advanced Communication',
                subtitle: 'Nuance & Refinement',
                description: 'Persuasion, complex ideas, leadership, difficult conversations, final assessment.',
                days: '22-30',
                active: false,
              },
            ].map((week) => (
              <div
                key={week.week}
                className={`landing__week-card glass-card ${week.active ? 'landing__week-card--active' : 'landing__week-card--locked'}`}
              >
                <div className="landing__week-number">
                  <span className={`badge ${week.active ? 'badge--primary' : 'badge--warning'}`}>
                    Week {week.week}
                  </span>
                  <span className="landing__week-days">Days {week.days}</span>
                </div>
                <h3 className="landing__week-title">{week.title}</h3>
                <p className="landing__week-subtitle">{week.subtitle}</p>
                <p className="landing__week-description">{week.description}</p>
                {!week.active && (
                  <div className="landing__week-lock">
                    <span>🔒</span> Complete previous week to unlock
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced C1-C2 Master Classes (Adv Class A – J) */}
      <section className="landing__advanced">
        <div className="container container--content">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span className="badge badge--accent" style={{ marginBottom: 'var(--space-3)' }}>
              100 Collocations Master Guide • C1–C2
            </span>
            <h2 className="landing__section-title">10 Advanced Master Classes (Adv Class A – J)</h2>
            <p className="landing__section-subtitle" style={{ maxWidth: '720px', margin: '0 auto' }}>
              Master performative legal notices, high-impact media shorthand, corporate strategy phrasing, and executive register elevation across 10 specialized modules.
            </p>
          </div>

          <div className="landing__adv-grid">
            {ADVANCED_CLASSES.map((advClass) => (
              <div
                key={advClass.id}
                className={`landing__adv-card glass-card ${
                  advClass.isReady ? 'landing__adv-card--ready' : 'landing__adv-card--locked'
                }`}
              >
                <div className="landing__adv-card-header">
                  <span className={`badge ${advClass.isReady ? 'badge--primary' : 'badge--outline'}`}>
                    {advClass.name}
                  </span>
                  <span className="landing__adv-cefr">{advClass.cefrRange}</span>
                </div>

                <h3 className="landing__adv-card-title">{advClass.title}</h3>
                <p className="landing__adv-card-theme">{advClass.theme}</p>
                <p className="landing__adv-card-desc">{advClass.overview}</p>

                <div className="landing__adv-card-footer">
                  <span className="landing__adv-count">10 Activities</span>
                  {advClass.isReady ? (
                    <Link href={`/advanced/${advClass.id}`} className="btn btn--primary btn--sm">
                      Enter {advClass.name} →
                    </Link>
                  ) : (
                    <span className="badge badge--secondary" style={{ opacity: 0.7 }}>
                      🔒 Coming Soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three tracks */}
      <section className="landing__tracks">
        <div className="container container--content">
          <h2 className="landing__section-title">Three Personalization Tracks</h2>
          <p className="landing__section-subtitle">Same curriculum engine. Different prompts, vocabulary, and scenarios.</p>
          <div className="landing__track-grid">
            {[
              {
                icon: '🎓',
                title: 'Student',
                examples: ['Academic discussions', 'Class presentations', 'Assignments', 'Interviews'],
              },
              {
                icon: '💼',
                title: 'Professional',
                examples: ['Meetings', 'Client communication', 'Presentations', 'Leadership'],
              },
              {
                icon: '🗣️',
                title: 'General English',
                examples: ['Travel', 'Social conversations', 'Relationships', 'Confidence'],
              },
            ].map((track) => (
              <div key={track.title} className="landing__track-card glass-card">
                <span className="landing__track-icon">{track.icon}</span>
                <h3 className="landing__track-title">{track.title}</h3>
                <ul className="landing__track-list">
                  {track.examples.map((ex) => (
                    <li key={ex}>{ex}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily loop */}
      <section className="landing__loop">
        <div className="container container--content">
          <h2 className="landing__section-title">The Learning Loop</h2>
          <div className="landing__loop-flow">
            {['Learn', 'Speak', 'Analyze', 'Feedback', 'Retry', 'Compare', 'Apply', 'Reflect'].map((step, i) => (
              <div key={step} className="landing__loop-step">
                <div className="landing__loop-step-number">{i + 1}</div>
                <span className="landing__loop-step-label">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="landing__footer-cta">
        <div className="container container--content">
          <h2 className="landing__footer-title">
            Ready to transform your communication?
          </h2>
          <p className="landing__footer-subtitle">
            Day 1 takes about 35-45 minutes. Express mode is available at 10-15 minutes.
          </p>
          <button
            className="btn btn--primary btn--lg"
            onClick={handleStart}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Begin Day 1'}
            {!isLoading && <span aria-hidden="true">→</span>}
          </button>
        </div>
      </section>

      <style jsx>{`
        .landing {
          min-height: 100vh;
        }

        .landing__hero {
          padding: var(--space-20) 0 var(--space-16);
          text-align: center;
        }

        .landing__badge {
          margin-bottom: var(--space-6);
        }

        .landing__title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, var(--text-5xl));
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: var(--space-6);
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .landing__subtitle {
          font-size: var(--text-xl);
          color: var(--text-secondary);
          margin-bottom: var(--space-8);
          line-height: var(--leading-relaxed);
        }

        .landing__subtitle strong {
          color: var(--text-primary);
        }

        .landing__stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-6);
          margin-bottom: var(--space-10);
          flex-wrap: wrap;
        }

        .landing__stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-1);
        }

        .landing__stat-value {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 800;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .landing__stat-label {
          font-size: var(--text-sm);
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
        }

        .landing__stat-divider {
          width: 1px;
          height: 40px;
          background: var(--border-default);
        }

        .landing__cta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-12);
        }

        .landing__cta-note {
          font-size: var(--text-sm);
          color: var(--text-tertiary);
        }

        .landing__audience {
          text-align: center;
        }

        .landing__audience-title {
          font-size: var(--text-sm);
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          margin-bottom: var(--space-4);
        }

        .landing__problems {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--space-2);
        }

        .landing__problem {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-3);
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .landing__problem-icon {
          font-size: var(--text-base);
        }

        /* Sections */
        .landing__weeks,
        .landing__advanced,
        .landing__tracks,
        .landing__loop {
          padding: var(--space-16) 0;
        }

        .landing__advanced {
          background: linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.04) 50%, transparent 100%);
        }

        .landing__adv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-5);
        }

        .landing__adv-card {
          display: flex;
          flex-direction: column;
          padding: var(--space-6);
          border-radius: var(--radius-xl);
          transition: transform var(--transition-normal), border-color var(--transition-normal);
        }

        .landing__adv-card--ready {
          border-color: rgba(99, 102, 241, 0.35);
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%);
        }

        .landing__adv-card--ready:hover {
          transform: translateY(-4px);
          border-color: var(--color-primary-400);
          box-shadow: 0 12px 28px rgba(99, 102, 241, 0.15);
        }

        .landing__adv-card--locked {
          opacity: 0.65;
        }

        .landing__adv-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-3);
        }

        .landing__adv-cefr {
          font-size: var(--text-xs);
          font-weight: 700;
          color: var(--color-primary-300);
          background: rgba(99, 102, 241, 0.1);
          padding: 2px 8px;
          border-radius: var(--radius-full);
        }

        .landing__adv-card-title {
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-1);
          line-height: var(--leading-tight);
        }

        .landing__adv-card-theme {
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--color-accent-400);
          margin-bottom: var(--space-3);
        }

        .landing__adv-card-desc {
          font-size: var(--text-xs);
          color: var(--text-secondary);
          line-height: var(--leading-relaxed);
          flex-grow: 1;
          margin-bottom: var(--space-4);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .landing__adv-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--space-3);
          border-top: 1px solid var(--border-color);
        }

        .landing__adv-count {
          font-size: var(--text-xs);
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .landing__section-title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 800;
          text-align: center;
          margin-bottom: var(--space-3);
        }

        .landing__section-subtitle {
          font-size: var(--text-lg);
          color: var(--text-secondary);
          text-align: center;
          margin-bottom: var(--space-8);
        }

        .landing__week-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-4);
        }

        .landing__week-card {
          position: relative;
        }

        .landing__week-card--active {
          border-color: rgba(99, 102, 241, 0.3);
          box-shadow: var(--shadow-glow-primary);
        }

        .landing__week-card--locked {
          opacity: 0.6;
        }

        .landing__week-number {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-3);
        }

        .landing__week-days {
          font-size: var(--text-xs);
          color: var(--text-tertiary);
        }

        .landing__week-title {
          font-size: var(--text-xl);
          font-weight: 700;
          margin-bottom: var(--space-1);
        }

        .landing__week-subtitle {
          font-size: var(--text-sm);
          color: var(--color-primary-400);
          margin-bottom: var(--space-2);
        }

        .landing__week-description {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          line-height: var(--leading-relaxed);
        }

        .landing__week-lock {
          margin-top: var(--space-3);
          font-size: var(--text-xs);
          color: var(--text-tertiary);
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .landing__track-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: var(--space-4);
        }

        .landing__track-card {
          text-align: center;
          padding: var(--space-8) var(--space-6);
        }

        .landing__track-icon {
          font-size: var(--text-4xl);
          display: block;
          margin-bottom: var(--space-3);
        }

        .landing__track-title {
          font-size: var(--text-xl);
          font-weight: 700;
          margin-bottom: var(--space-3);
        }

        .landing__track-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .landing__loop-flow {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: var(--space-2);
        }

        .landing__loop-step {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-4);
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
        }

        .landing__loop-step-number {
          width: 24px;
          height: 24px;
          border-radius: var(--radius-full);
          background: var(--gradient-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--text-xs);
          font-weight: 700;
          flex-shrink: 0;
        }

        .landing__loop-step-label {
          font-size: var(--text-sm);
          font-weight: 600;
        }

        .landing__footer-cta {
          padding: var(--space-16) 0;
          text-align: center;
          background: var(--gradient-primary-subtle);
          border-top: 1px solid var(--border-subtle);
        }

        .landing__footer-title {
          font-size: var(--text-3xl);
          margin-bottom: var(--space-3);
        }

        .landing__footer-subtitle {
          font-size: var(--text-lg);
          color: var(--text-secondary);
          margin-bottom: var(--space-8);
        }

        @media (max-width: 768px) {
          .landing__hero {
            padding: var(--space-12) 0 var(--space-10);
          }

          .landing__stats {
            gap: var(--space-4);
          }

          .landing__stat-divider {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}
