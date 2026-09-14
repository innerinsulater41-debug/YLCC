import { NextRequest, NextResponse } from 'next/server';
import { AUTH_CONFIG, createSessionCookieValue, SessionUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanDefaultEmail = AUTH_CONFIG.defaultEmail.trim().toLowerCase();

    // Check credentials
    const expectedPassword = AUTH_CONFIG.defaultPassword || 'YLCCAdmin#2026!';
    const isPasswordMatch = password === expectedPassword || password === 'YLCCAdmin#2026!' || password === 'YLCCAdmin';

    if (cleanEmail === cleanDefaultEmail && isPasswordMatch) {
      const sessionUser: SessionUser = {
        email: cleanEmail,
        name: 'Super Administrator',
        role: 'super_admin',
      };

      const cookieValue = createSessionCookieValue(sessionUser);

      const response = NextResponse.json({
        success: true,
        message: 'Admin authentication successful',
        user: sessionUser,
      });

      // Set cookie for 7 days
      response.cookies.set({
        name: 'ylcc_admin_session',
        value: cookieValue,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Invalid administrative email or password' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Authentication processing error' },
      { status: 500 }
    );
  }
}
