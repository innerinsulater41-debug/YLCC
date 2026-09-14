import { NextRequest, NextResponse } from "next/server";
import { TestimonialSchema } from "@/lib/validations";
import { DataStore } from "@/lib/db/store";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all") === "true";

  if (all) {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const testimonials = await DataStore.getTestimonials(false);
    return NextResponse.json({ success: true, testimonials });
  }

  const testimonials = await DataStore.getTestimonials(true);
  return NextResponse.json({ success: true, testimonials });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = TestimonialSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const created = await DataStore.createTestimonial(parsed.data);
    return NextResponse.json({ success: true, testimonial: created });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { id, ...data } = body;
    if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

    const updated = await DataStore.updateTestimonial(id, data);
    if (!updated) return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });

    return NextResponse.json({ success: true, testimonial: updated });
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

  const success = await DataStore.deleteTestimonial(id);
  if (!success) return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });

  return NextResponse.json({ success: true, message: "Testimonial deleted successfully" });
}
