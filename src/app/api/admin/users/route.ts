import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { getAllUsers, updateUserRole, deleteUser, findUserById } from '@/lib/db';

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden: Admin access required.' }, { status: 403 });
  }

  try {
    const users = getAllUsers();
    // Return sanitized users (omit password hashes)
    const sanitized = users.map(u => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      track: u.track || 'general',
      currentDay: u.currentDay || 1,
      xpTotal: u.xpTotal || 0,
      streak: u.streak || 0,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    }));

    return NextResponse.json({ users: sanitized });
  } catch (error: any) {
    console.error('Admin get users error:', error);
    return NextResponse.json({ error: 'Failed to retrieve users.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden: Admin access required.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { userId, role } = body;

    if (!userId || !role) {
      return NextResponse.json({ error: 'Missing userId or role.' }, { status: 400 });
    }

    if (role !== 'learner' && role !== 'admin') {
      return NextResponse.json({ error: 'Invalid role.' }, { status: 400 });
    }

    const user = findUserById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Protect last admin from demoting self
    if (admin.userId === userId && role !== 'admin') {
      return NextResponse.json({ error: 'You cannot demote your own admin account.' }, { status: 400 });
    }

    updateUserRole(userId, role);

    return NextResponse.json({ success: true, message: `User role updated to ${role}.` });
  } catch (error: any) {
    console.error('Admin update user error:', error);
    return NextResponse.json({ error: 'Failed to update user.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden: Admin access required.' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter.' }, { status: 400 });
    }

    if (admin.userId === userId) {
      return NextResponse.json({ error: 'You cannot delete your own admin account.' }, { status: 400 });
    }

    deleteUser(userId);

    return NextResponse.json({ success: true, message: 'User deleted successfully.' });
  } catch (error: any) {
    console.error('Admin delete user error:', error);
    return NextResponse.json({ error: 'Failed to delete user.' }, { status: 500 });
  }
}
