'use client';

import { use, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getAdvancedClass } from '@/lib/curriculum/advanced';
import AdvancedCollocationActivity from '@/components/activity/AdvancedCollocationActivity';

interface AdvancedClassPageProps {
  params: Promise<{
    classId: string;
  }>;
}

function AdvancedClassContent({ classId }: { classId: string }) {
  const searchParams = useSearchParams();
  const activityParam = searchParams.get('activity');
  const initialIndex = activityParam ? Math.max(0, parseInt(activityParam, 10) - 1) : 0;

  const currentClass = useMemo(() => {
    return getAdvancedClass(classId);
  }, [classId]);

  if (!currentClass) {
    return (
      <div className="container container--content" style={{ padding: 'var(--space-16) 0', textAlign: 'center' }}>
        <h2>Class Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', margin: 'var(--space-4) 0' }}>
          Could not find curriculum data for &quot;{classId}&quot;.
        </p>
        <Link href="/" className="btn btn--primary">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  if (!currentClass.isReady || currentClass.activities.length === 0) {
    return (
      <div className="container container--content" style={{ padding: 'var(--space-16) 0', textAlign: 'center' }}>
        <div className="glass-card" style={{ maxWidth: 600, margin: '0 auto', padding: 'var(--space-8)' }}>
          <span className="badge badge--warning" style={{ marginBottom: 'var(--space-3)' }}>
            Coming Soon
          </span>
          <h2>{currentClass.name}: {currentClass.title}</h2>
          <p style={{ color: 'var(--text-secondary)', margin: 'var(--space-4) 0', lineHeight: 'var(--leading-relaxed)' }}>
            {currentClass.overview}
          </p>
          <div style={{ marginTop: 'var(--space-6)', display: 'flex', justifyContent: 'center', gap: 'var(--space-3)' }}>
            <Link href="/advanced/adv-class-a" className="btn btn--primary">
              Launch Adv Class A →
            </Link>
            <Link href="/" className="btn btn--outline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main style={{ minHeight: '100vh', padding: 'var(--space-8) 0' }}>
      <div className="container container--content">
        <AdvancedCollocationActivity
          currentClass={currentClass}
          initialActivityIndex={initialIndex}
        />
      </div>
    </main>
  );
}

export default function AdvancedClassPage({ params }: AdvancedClassPageProps) {
  const resolvedParams = use(params);

  return (
    <Suspense
      fallback={
        <div className="container container--content" style={{ padding: 'var(--space-16) 0', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Loading Advanced Master Class...</p>
        </div>
      }
    >
      <AdvancedClassContent classId={resolvedParams.classId} />
    </Suspense>
  );
}
