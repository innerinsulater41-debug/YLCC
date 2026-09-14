import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Project } from '@/types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const publishedOnly = searchParams.get('status') === 'published';
    const projects = await db.getProjects(publishedOnly);
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve projects' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.title || !body.industryCategory) {
      return NextResponse.json(
        { success: false, message: 'Title and Industry Category are required' },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const newProject: Project = {
      id: body.id || `proj-${Date.now()}`,
      slug,
      title: body.title,
      shortDescription: body.shortDescription || '',
      detailedDescription: body.detailedDescription || '',
      industryCategory: body.industryCategory,
      accountingCategory: body.accountingCategory || 'General Accounting',
      difficultyLevel: body.difficultyLevel || 'Intermediate',
      skillsCovered: Array.isArray(body.skillsCovered) ? body.skillsCovered : [],
      softwareUsed: Array.isArray(body.softwareUsed) ? body.softwareUsed : ['Tally Prime 4.0', 'Excel 365'],
      learningObjectives: Array.isArray(body.learningObjectives) ? body.learningObjectives : [],
      businessScenario: body.businessScenario || '',
      tasksToComplete: Array.isArray(body.tasksToComplete) ? body.tasksToComplete : [],
      expectedOutcomes: Array.isArray(body.expectedOutcomes) ? body.expectedOutcomes : [],
      coverImageUrl: body.coverImageUrl || '/images/ylcc_tds_brochure_slate_copper.png',
      media: Array.isArray(body.media) ? body.media : [],
      resources: Array.isArray(body.resources) ? body.resources : [],
      videoUrl: body.videoUrl || '',
      practiceTimeHours: Number(body.practiceTimeHours) || 20,
      academicYear: body.academicYear || '2025-26',
      facultyMentor: body.facultyMentor || 'CA Alok Maheshwari',
      isFeatured: Boolean(body.isFeatured),
      status: body.status || 'published',
      displayOrder: Number(body.displayOrder) || 1,
      seoTitle: body.seoTitle,
      seoDescription: body.seoDescription,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const saved = await db.saveProject(newProject);

    return NextResponse.json({
      success: true,
      message: 'Project created successfully',
      data: saved,
    });
  } catch (error: any) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create project' },
      { status: 500 }
    );
  }
}
