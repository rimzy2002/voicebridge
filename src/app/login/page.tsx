'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Quick helper to prefill admin demo
  const fillAdmin = () => {
    setEmail('admin@voicebridge.com');
    setPassword('AdminPass123!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Gather local guest progress to sync if available
      let guestProgress = null;
      try {
        const savedProgress = localStorage.getItem('voicebridge-progress');
        if (savedProgress) guestProgress = JSON.parse(savedProgress);
      } catch {
        // ignore
      }

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, guestProgress }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to sign in. Please verify your credentials.');
        setLoading(false);
        return;
      }

      // Check if user is admin or learner with restored activity
      if (data.redirectUrl) {
        router.push(data.redirectUrl);
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Top Simple Header */}
      <header className="auth-header">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" className="logo-link">
            <span className="logo-icon">🗣️</span>
            <span className="logo-text">Voice<strong>Bridge</strong></span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <Link href="/register" className="btn btn--outline btn--sm" style={{ fontSize: 'var(--text-xs)' }}>
              Create Account
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Card */}
      <main className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 120px)' }}>
        <div className="auth-card glass-card">
          <div className="auth-card__header">
            <div className="auth-badge">
              <span>Secure Sign In</span>
            </div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">
              Sign in to automatically restore your current day, speech recordings, and streaks.
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
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@workplace.com"
                className="form-input"
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                <label htmlFor="password" className="form-label" style={{ marginBottom: 0 }}>
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="show-pw-btn"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn--primary btn--block auth-submit-btn"
            >
              {loading ? 'Authenticating...' : 'Sign In & Restore Progress →'}
            </button>
          </form>

          {/* Quick Demo Pre-fill */}
          <div className="demo-box">
            <span className="demo-label">Admin Demo Access:</span>
            <button
              type="button"
              onClick={fillAdmin}
              className="btn btn--outline btn--sm"
              style={{ padding: '4px 10px', fontSize: 'var(--text-xs)' }}
            >
              ⚡ Fill Admin Credentials
            </button>
          </div>

          <div className="auth-footer">
            <p>
              New to VoiceBridge?{' '}
              <Link href="/register" className="auth-link">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </main>

      <style jsx>{`
        .login-wrapper {
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
          max-width: 440px;
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

        .show-pw-btn {
          background: none;
          border: none;
          color: var(--color-primary-600);
          font-size: var(--text-xs);
          font-weight: 600;
          cursor: pointer;
        }

        .auth-submit-btn {
          margin-top: var(--space-2);
          padding: var(--space-3) var(--space-5);
          font-weight: 700;
          font-size: var(--text-base);
        }

        .demo-box {
          margin-top: var(--space-5);
          padding: var(--space-3);
          background: var(--bg-surface-subtle);
          border: 1px dashed var(--border-default);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .demo-label {
          font-size: var(--text-xs);
          color: var(--text-secondary);
          font-weight: 500;
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
