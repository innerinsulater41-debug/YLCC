import { NextRequest, NextResponse } from "next/server";
import { CourseSchema } from "@/lib/validations";
import { DataStore } from "@/lib/db/store";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const includeUnpublished = searchParams.get("all") === "true";

  if (includeUnpublished) {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const courses = await DataStore.getCourses(true);
    return NextResponse.json({ success: true, courses });
  }

  const courses = await DataStore.getCourses(false);
  return NextResponse.json({ success: true, courses });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = CourseSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const course = await DataStore.createCourse(parsed.data);
    return NextResponse.json({ success: true, course });
  } catch (error: any) {
    console.error("Create course error:", error);
    return NextResponse.json({ error: error.message || "Failed to create course" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const updated = await DataStore.updateCourse(id, data);
    if (!updated) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, course: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id parameter is required" }, { status: 400 });
    }

    const success = await DataStore.deleteCourse(id);
    if (!success) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Course deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
