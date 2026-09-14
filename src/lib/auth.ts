import { cookies } from 'next/headers';

const SESSION_COOKIE = 'ylcc_admin_session';

export interface SessionUser {
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'editor';
}

export async function getAdminSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE);

  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(sessionCookie.value, 'base64').toString('utf-8')
    );
    if (parsed.email && parsed.role) {
      return parsed as SessionUser;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export function createSessionCookieValue(user: SessionUser): string {
  return Buffer.from(JSON.stringify(user)).toString('base64');
}

export const AUTH_CONFIG = {
  defaultEmail: process.env.ADMIN_EMAIL || 'admin@ylcccommerce.in',
  defaultPassword: process.env.ADMIN_PASSWORD || 'YLCCAdmin#2026!',
};
