import { NextRequest, NextResponse } from "next/server";
import { DataStore } from "@/lib/db/store";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET() {
  const statistics = await DataStore.getStatistics();
  return NextResponse.json({ success: true, statistics });
}

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { id, ...data } = body;
    if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

    const updated = await DataStore.updateStatistic(id, data);
    if (!updated) return NextResponse.json({ error: "Statistic not found" }, { status: 404 });

    return NextResponse.json({ success: true, statistic: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const stat = await DataStore.addStatistic(body);
    return NextResponse.json({ success: true, statistic: stat });
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

  const success = await DataStore.deleteStatistic(id);
  if (!success) return NextResponse.json({ error: "Statistic not found" }, { status: 404 });

  return NextResponse.json({ success: true, message: "Statistic deleted successfully" });
}

