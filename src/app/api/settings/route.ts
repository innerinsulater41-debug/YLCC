import { NextRequest, NextResponse } from "next/server";
import { DataStore } from "@/lib/db/store";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET() {
  const settings = await DataStore.getSettings();
  return NextResponse.json({ success: true, settings });
}

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const updated = await DataStore.updateSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
