import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { getAdminDashboardStats } from '@/lib/db';

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden: Admin access required.' }, { status: 403 });
  }

  try {
    const stats = getAdminDashboardStats();
    return NextResponse.json({ stats });
  } catch (error: any) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'Failed to retrieve stats.' }, { status: 500 });
  }
}
