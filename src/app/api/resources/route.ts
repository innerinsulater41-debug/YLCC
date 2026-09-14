import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ResourceItem } from '@/types';

export async function GET() {
  try {
    const resources = await db.getResources('admin');
    return NextResponse.json({ success: true, data: resources });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch resources' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newRes: ResourceItem = {
      id: body.id || `res-${Date.now()}`,
      title: body.title,
      category: body.category || 'Sample Accounting Formats',
      description: body.description || '',
      fileUrl: body.fileUrl,
      fileType: body.fileType || 'pdf',
      fileSize: body.fileSize || '100 KB',
      accessLevel: body.accessLevel || 'public',
      downloadCount: 0,
      createdAt: new Date().toISOString(),
    };

    const saved = await db.saveResource(newRes);
    return NextResponse.json({ success: true, data: saved });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Failed to create resource' }, { status: 500 });
  }
}
