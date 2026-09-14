import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Program } from '@/types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const publishedOnly = searchParams.get('status') === 'published';
    const programs = await db.getPrograms(publishedOnly);
    return NextResponse.json({ success: true, data: programs });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve programs' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.title || !body.category) {
      return NextResponse.json(
        { success: false, message: 'Title and Category are required' },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const newProgram: Program = {
      id: body.id || `prog-${Date.now()}`,
      slug,
      title: body.title,
      category: body.category,
      shortDescription: body.shortDescription || '',
      detailedDescription: body.detailedDescription || '',
      duration: body.duration || '2 Months',
      mode: body.mode || 'Offline Classroom',
      fees: Number(body.fees) || 15000,
      discountedFees: body.discountedFees ? Number(body.discountedFees) : undefined,
      eligibility: body.eligibility || 'Commerce graduate or Class 12th',
      softwareTools: Array.isArray(body.softwareTools) ? body.softwareTools : ['Tally Prime', 'Excel 365'],
      facultyName: body.facultyName || 'CA Alok Maheshwari',
      batchTiming: body.batchTiming || 'Morning / Evening Flexible',
      availableSeats: Number(body.availableSeats) || 15,
      startDate: body.startDate || '1st & 15th of Every Month',
      brochureUrl: body.brochureUrl || '',
      certificateInfo: body.certificateInfo || 'YLCC Practical Skill Certification',
      isFeatured: Boolean(body.isFeatured),
      status: body.status || 'published',
      displayOrder: Number(body.displayOrder) || 1,
      modules: Array.isArray(body.modules) ? body.modules : [],
      learningOutcomes: Array.isArray(body.learningOutcomes) ? body.learningOutcomes : [],
      seoTitle: body.seoTitle,
      seoDescription: body.seoDescription,
    };

    const saved = await db.saveProgram(newProgram);

    return NextResponse.json({
      success: true,
      message: 'Program created successfully',
      data: saved,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create program' },
      { status: 500 }
    );
  }
}
