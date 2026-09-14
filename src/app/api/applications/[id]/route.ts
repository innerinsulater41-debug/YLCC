import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    await db.updateApplicationStatus(id, body.status, body.adminNotes);
    return NextResponse.json({ success: true, message: 'Application updated' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.deleteApplication(id);
    return NextResponse.json({ success: true, message: 'Application deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Delete failed' }, { status: 500 });
  }
}
