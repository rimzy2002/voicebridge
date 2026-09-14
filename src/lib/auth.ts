// Lightweight Secure JWT & Session Manager for VoiceBridge
// Zero external crypto libraries needed - uses Node.js standard crypto
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { findUserById, DbUser } from '@/lib/db';

const SESSION_COOKIE_NAME = 'voicebridge_session';
const SECRET_KEY = process.env.NEXTAUTH_SECRET || 'voicebridge-dev-secret-key-998877665544332211';
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 days

export interface SessionPayload {
  userId: string;
  email: string;
  role: 'learner' | 'admin' | 'coach';
  name: string | null;
  exp: number; // Unix timestamp in seconds
}

// Base64URL encode/decode
function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return Buffer.from(str, 'base64').toString('utf8');
}

// Sign a session payload using HMAC-SHA256
export function createSessionToken(user: Pick<DbUser, 'id' | 'email' | 'role' | 'name'>): string {
  const header = JSON.stringify({ alg: 'HS256', typ: 'JWT' });
  const payload: SessionPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const data = `${encodedHeader}.${encodedPayload}`;

  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(data)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${data}.${signature}`;
}

// Verify and decode a session token
export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, signature] = parts;
    const data = `${encodedHeader}.${encodedPayload}`;

    const expectedSignature = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(data)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    // Constant-time comparison
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const payload: SessionPayload = JSON.parse(base64UrlDecode(encodedPayload));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp < now) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

// Get the current user session from Request cookies or Next.js headers
export async function getCurrentSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    return verifySessionToken(token);
  } catch {
    return null;
  }
}

// Get current full DbUser from session
export async function getCurrentUser(): Promise<DbUser | null> {
  const session = await getCurrentSession();
  if (!session) return null;
  return findUserById(session.userId);
}

// Verify if the current session is an Admin
export async function requireAdmin(): Promise<SessionPayload | null> {
  const session = await getCurrentSession();
  if (!session || session.role !== 'admin') {
    return null;
  }
  return session;
}

export { SESSION_COOKIE_NAME, SESSION_DURATION_SECONDS };
