import { NextRequest, NextResponse } from "next/server";
import { LoginSchema } from "@/lib/validations";
import { verifyCredentials, createSessionToken, setSessionCookie } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = LoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    const user = await verifyCredentials(email, password);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password. Please check your credentials." },
        { status: 401 }
      );
    }

    const token = await createSessionToken(user);
    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during login" },
      { status: 500 }
    );
  }
}
