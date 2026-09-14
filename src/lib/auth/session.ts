import { cookies } from "next/headers";
import { AdminUser } from "@/types";
import { DataStore } from "@/lib/db/store";

const SESSION_COOKIE_NAME = "ylcc_admin_session";
const SESSION_SECRET = process.env.SESSION_SECRET || "ylcc-super-secure-dev-session-key-2026";

// Built-in credentials for local administrative access
export const TEST_ADMIN_CREDENTIALS = {
  admin: {
    email: "admin@ylcc.edu.in",
    password: "Admin@YLCC2026!",
    role: "super_admin" as const,
    name: "YLCC Super Admin",
  },
  editor: {
    email: "editor@ylcc.edu.in",
    password: "Editor@YLCC2026!",
    role: "editor" as const,
    name: "YLCC Content Editor",
  },
};

export async function verifyCredentials(email: string, password: string): Promise<AdminUser | null> {
  const normalizedEmail = email.trim().toLowerCase();
  
  // Check against test admin credentials
  if (
    normalizedEmail === TEST_ADMIN_CREDENTIALS.admin.email.toLowerCase() &&
    password === TEST_ADMIN_CREDENTIALS.admin.password
  ) {
    const admin = await DataStore.findAdminByEmail(normalizedEmail);
    return (
      admin || {
        id: "admin-user-001",
        email: TEST_ADMIN_CREDENTIALS.admin.email,
        name: TEST_ADMIN_CREDENTIALS.admin.name,
        role: TEST_ADMIN_CREDENTIALS.admin.role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
  }

  if (
    normalizedEmail === TEST_ADMIN_CREDENTIALS.editor.email.toLowerCase() &&
    password === TEST_ADMIN_CREDENTIALS.editor.password
  ) {
    const editor = await DataStore.findAdminByEmail(normalizedEmail);
    return (
      editor || {
        id: "admin-user-002",
        email: TEST_ADMIN_CREDENTIALS.editor.email,
        name: TEST_ADMIN_CREDENTIALS.editor.name,
        role: TEST_ADMIN_CREDENTIALS.editor.role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
  }

  return null;
}

export async function createSessionToken(user: AdminUser): Promise<string> {
  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  const payloadStr = JSON.stringify(payload);
  const base64Payload = Buffer.from(payloadStr).toString("base64url");
  
  // Create signature
  const signature = Buffer.from(
    `${base64Payload}.${SESSION_SECRET}`
  ).toString("base64url");

  return `${base64Payload}.${signature}`;
}

export async function verifySessionToken(token: string): Promise<AdminUser | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [base64Payload, signature] = parts;
    const expectedSignature = Buffer.from(
      `${base64Payload}.${SESSION_SECRET}`
    ).toString("base64url");

    if (signature !== expectedSignature) return null;

    const payloadJson = Buffer.from(base64Payload, "base64url").toString("utf-8");
    const payload = JSON.parse(payloadJson);

    if (Date.now() > payload.exp) return null;

    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
      createdAt: new Date(payload.iat).toISOString(),
      updatedAt: new Date(payload.iat).toISOString(),
    };
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie || !sessionCookie.value) return null;

    return await verifySessionToken(sessionCookie.value);
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function removeSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
