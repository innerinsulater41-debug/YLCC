import { NextRequest, NextResponse } from "next/server";
import { FacultySchema } from "@/lib/validations";
import { DataStore } from "@/lib/db/store";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET() {
  const faculty = await DataStore.getFaculty();
  return NextResponse.json({ success: true, faculty });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = FacultySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const created = await DataStore.createFaculty(parsed.data);
    return NextResponse.json({ success: true, faculty: created });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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
    if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

    const updated = await DataStore.updateFaculty(id, data);
    if (!updated) return NextResponse.json({ error: "Faculty not found" }, { status: 404 });

    return NextResponse.json({ success: true, faculty: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id parameter is required" }, { status: 400 });

  const success = await DataStore.deleteFaculty(id);
  if (!success) return NextResponse.json({ error: "Faculty not found" }, { status: 404 });

  return NextResponse.json({ success: true, message: "Faculty deleted successfully" });
}
