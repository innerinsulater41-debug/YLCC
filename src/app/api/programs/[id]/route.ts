import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const programs = await db.getPrograms();
    const program = programs.find((p) => p.id === id || p.slug === id);

    if (!program) {
      return NextResponse.json(
        { success: false, message: 'Program not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: program });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch program' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const programs = await db.getPrograms();
    const existing = programs.find((p) => p.id === id);

    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Program not found' },
        { status: 404 }
      );
    }

    const updated = {
      ...existing,
      ...body,
      id: existing.id,
    };

    await db.saveProgram(updated);

    return NextResponse.json({
      success: true,
      message: 'Program updated successfully',
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update program' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.deleteProgram(id);
    return NextResponse.json({
      success: true,
      message: 'Program deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete program' },
      { status: 500 }
    );
  }
}
