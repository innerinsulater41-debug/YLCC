import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { StudentAuthSchema } from "@/lib/validations";
import { DataStore } from "@/lib/db/store";

const STUDENT_COOKIE_NAME = "ylcc_student_session";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = StudentAuthSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email } = parsed.data;
    let student = await DataStore.findStudentByEmail(email);

    // If student doesn't exist, create a default active student session
    if (!student) {
      const nameFromEmail = email.split("@")[0].replace(/[._]/g, " ");
      const formattedName =
        nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
      student = await DataStore.createStudentUser({
        email,
        fullName: formattedName,
        role: "student",
        enrolledCourses: ["course-1"],
      });
    }

    // Set student session cookie
    const sessionData = {
      id: student.id,
      email: student.email,
      fullName: student.fullName,
      role: student.role,
      enrolledCourses: student.enrolledCourses,
    };

    const cookieStore = await cookies();
    cookieStore.set(STUDENT_COOKIE_NAME, JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json({
      success: true,
      message: `Welcome back, ${student.fullName}!`,
      user: sessionData,
    });
  } catch (error: any) {
    console.error("Student login error:", error);
    return NextResponse.json({ error: error.message || "Failed to log in" }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(STUDENT_COOKIE_NAME);
  return NextResponse.json({ success: true, message: "Logged out successfully" });
}

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(STUDENT_COOKIE_NAME);

  if (!sessionCookie || !sessionCookie.value) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  try {
    const user = JSON.parse(sessionCookie.value);
    return NextResponse.json({ authenticated: true, user });
  } catch {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }
}
