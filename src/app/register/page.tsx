'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

type LearnerTrack = 'general' | 'professional' | 'student';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [track, setTrack] = useState<LearnerTrack>('general');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Gather local guest progress to sync
      let guestProgress = null;
      try {
        const savedProgress = localStorage.getItem('voicebridge-progress');
        if (savedProgress) guestProgress = JSON.parse(savedProgress);
      } catch {
        // ignore
      }

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, track, guestProgress }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create account. Please check your information.');
        setLoading(false);
        return;
      }

      // Auto-redirect to designated learning day
      if (data.redirectUrl) {
        router.push(data.redirectUrl);
      } else {
        router.push('/day/1');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      {/* Header */}
      <header className="auth-header">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" className="logo-link">
            <span className="logo-icon">🗣️</span>
            <span className="logo-text">Voice<strong>Bridge</strong></span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <Link href="/" className="btn btn--ghost" style={{ fontSize: 'var(--text-sm)' }}>
              ← Return to Dashboard
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 'var(--space-8) 0' }}>
        <div className="auth-card glass-card">
          <div className="auth-card__header">
            <div className="auth-badge">
              <span>30-Day Communication Transformation</span>
            </div>
            <h1 className="auth-title">Create Learner Account</h1>
            <p className="auth-subtitle">
              Securely save your speech recordings, track streak points, and unlock full diagnostic history.
            </p>
          </div>

          {error && (
            <div className="auth-alert auth-alert--error" role="alert">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Alex Morgan"
                className="form-input"
                autoComplete="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Work or Personal Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="form-input"
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Create Password <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>(min 6 characters)</span>
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
                autoComplete="new-password"
              />
            </div>

            {/* Learner Track Selection */}
            <div className="form-group">
              <label className="form-label">
                Select Your Focus Track
              </label>
              <div className="track-grid">
                <button
                  type="button"
                  onClick={() => setTrack('professional')}
                  className={`track-pill ${track === 'professional' ? 'track-pill--active' : ''}`}
                >
                  <span className="track-icon">💼</span>
                  <div className="track-text">
                    <strong>Professional</strong>
                    <small>Meetings & Executive Clarity</small>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTrack('student')}
                  className={`track-pill ${track === 'student' ? 'track-pill--active' : ''}`}
                >
                  <span className="track-icon">🎓</span>
                  <div className="track-text">
                    <strong>Academic / Student</strong>
                    <small>Seminars & Presentations</small>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTrack('general')}
                  className={`track-pill ${track === 'general' ? 'track-pill--active' : ''}`}
                >
                  <span className="track-icon">🌐</span>
                  <div className="track-text">
                    <strong>General Fluency</strong>
                    <small>Everyday Confidence</small>
                  </div>
                </button>
              </div>
            </div>

            <div className="save-notice">
              <span>✨</span>
              <span>Any speech exercises completed today will be automatically linked to this account.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn--primary btn--block auth-submit-btn"
            >
              {loading ? 'Creating Account...' : 'Get Started & Save Progress →'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link href="/login" className="auth-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>

      <style jsx>{`
        .register-wrapper {
          min-height: 100vh;
          background: var(--bg-primary);
          display: flex;
          flex-direction: column;
        }

        .auth-header {
          padding: var(--space-4) 0;
          border-bottom: 1px solid var(--border-subtle);
          background: var(--bg-surface);
          backdrop-filter: blur(12px);
        }

        .logo-link {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          text-decoration: none;
          color: var(--text-primary);
          font-weight: 700;
          font-size: var(--text-lg);
        }

        .logo-text strong {
          color: var(--color-primary-600);
        }

        .auth-card {
          width: 100%;
          max-width: 500px;
          padding: var(--space-8);
          border-radius: var(--radius-xl);
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          box-shadow: var(--shadow-xl);
        }

        .auth-card__header {
          text-align: center;
          margin-bottom: var(--space-6);
        }

        .auth-badge {
          display: inline-block;
          font-size: var(--text-xs);
          font-weight: 600;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          background: rgba(99, 102, 241, 0.1);
          color: var(--color-primary-600);
          margin-bottom: var(--space-3);
        }

        .auth-title {
          font-size: var(--text-2xl);
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: var(--space-2);
        }

        .auth-subtitle {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          line-height: var(--leading-relaxed);
        }

        .auth-alert {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-md);
          font-size: var(--text-sm);
          margin-bottom: var(--space-5);
        }

        .auth-alert--error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: var(--color-danger-500);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-2);
        }

        .form-input {
          width: 100%;
          padding: var(--space-3) var(--space-4);
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: var(--text-base);
          transition: all var(--transition-fast);
        }

        .form-input:focus {
          outline: none;
          border-color: var(--color-primary-500);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
          background: var(--bg-surface);
        }

        .track-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-2);
        }

        .track-pill {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3);
          border: 1px solid var(--border-default);
          background: var(--bg-surface-subtle);
          border-radius: var(--radius-md);
          cursor: pointer;
          text-align: left;
          transition: all var(--transition-fast);
        }

        .track-pill:hover {
          background: var(--bg-surface);
          border-color: var(--color-primary-400);
        }

        .track-pill--active {
          background: rgba(99, 102, 241, 0.08);
          border-color: var(--color-primary-500);
          box-shadow: 0 0 0 1px var(--color-primary-500);
        }

        .track-icon {
          font-size: var(--text-xl);
        }

        .track-text {
          display: flex;
          flex-direction: column;
        }

        .track-text strong {
          font-size: var(--text-sm);
          color: var(--text-primary);
        }

        .track-text small {
          font-size: var(--text-xs);
          color: var(--text-secondary);
        }

        .save-notice {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-3);
          border-radius: var(--radius-md);
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.2);
          font-size: var(--text-xs);
          color: var(--color-success-600);
          font-weight: 500;
        }

        .auth-submit-btn {
          margin-top: var(--space-2);
          padding: var(--space-3) var(--space-5);
          font-weight: 700;
          font-size: var(--text-base);
        }

        .auth-footer {
          margin-top: var(--space-6);
          padding-top: var(--space-5);
          border-top: 1px solid var(--border-subtle);
          text-align: center;
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .auth-link {
          color: var(--color-primary-600);
          font-weight: 600;
          text-decoration: none;
        }

        .auth-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
