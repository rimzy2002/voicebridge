import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'voicebridge_session';

/**
 * Validates JWT session token structure and expiration.
 * Uses Web standard APIs (atob, JSON) compatible with Edge and Node.js runtimes.
 */
function isValidSession(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonStr = atob(base64);
    const payload = JSON.parse(jsonStr);
    const now = Math.floor(Date.now() / 1000);
    return Boolean(payload && payload.exp && payload.exp > now);
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const isAuthenticated = isValidSession(token);

  const isAuthPage = pathname === '/login' || pathname === '/register';

  // If user is already authenticated and tries to visit login or register,
  // redirect them directly to their Dashboard (/)
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is not authenticated and trying to access any app page (dashboard, day activities, admin, etc.)
  // redirect them to /login
  if (!isAuthenticated && !isAuthPage) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes (/api/*)
     * - static files (_next/static, _next/image, favicon.ico)
     * - files with file extensions (e.g. .png, .jpg, .svg, .css, .js)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
