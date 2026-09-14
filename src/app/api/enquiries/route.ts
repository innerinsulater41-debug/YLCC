import { NextRequest, NextResponse } from "next/server";
import { EnquirySchema } from "@/lib/validations";
import { DataStore } from "@/lib/db/store";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const enquiries = await DataStore.getEnquiries();
  return NextResponse.json({ success: true, enquiries });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = EnquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const enquiry = await DataStore.createEnquiry(parsed.data);
    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Our academic counseling team will contact you within 24 hours.",
      enquiry,
    });
  } catch (error: any) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry. Please try again later." },
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

    const updated = await DataStore.updateEnquiryStatus(id, status, adminNotes);
    if (!updated) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry: updated });
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

    const success = await DataStore.deleteEnquiry(id);
    if (!success) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Enquiry deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
