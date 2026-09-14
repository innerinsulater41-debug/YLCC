import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    await db.updateEnquiryStatus(id, body.status, body.notes);
    return NextResponse.json({ success: true, message: 'Enquiry updated' });
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
    await db.deleteEnquiry(id);
    return NextResponse.json({ success: true, message: 'Enquiry deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Delete failed' }, { status: 500 });
  }
}
