import { NextRequest, NextResponse } from "next/server";
import { CorporateConsultationSchema } from "@/lib/validations";
import { DataStore } from "@/lib/db/store";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const consultations = await DataStore.getConsultations();
  return NextResponse.json({ success: true, consultations });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CorporateConsultationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const consultation = await DataStore.createConsultation(parsed.data);
    return NextResponse.json({
      success: true,
      message:
        "Thank you! Your business consultation request has been received. Our Enterprise Advisory Director will reach out to schedule your discovery call.",
      consultation,
    });
  } catch (error: any) {
    console.error("Consultation submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit business consultation. Please try again." },
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

    const updated = await DataStore.updateConsultationStatus(id, status, adminNotes);
    if (!updated) {
      return NextResponse.json({ error: "Consultation not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, consultation: updated });
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

    const success = await DataStore.deleteConsultation(id);
    if (!success) {
      return NextResponse.json({ error: "Consultation not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Consultation deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
