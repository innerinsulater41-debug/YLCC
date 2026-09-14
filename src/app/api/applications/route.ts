import { NextRequest, NextResponse } from "next/server";
import { ApplicationSchema } from "@/lib/validations";
import { DataStore } from "@/lib/db/store";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const applications = await DataStore.getApplications();
  return NextResponse.json({ success: true, applications });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ApplicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const application = await DataStore.createApplication(parsed.data);
    return NextResponse.json({
      success: true,
      message: "Application submitted successfully! Your application reference ID is " + application.id,
      application,
    });
  } catch (error: any) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit admission application. Please try again." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, adminNotes } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "id and status are required" }, { status: 400 });
    }

    const updated = await DataStore.updateApplicationStatus(id, status, adminNotes);
    if (!updated) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, application: updated });
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

    const success = await DataStore.deleteApplication(id);
    if (!success) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Application deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
