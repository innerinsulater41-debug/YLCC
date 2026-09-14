import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

const applicationSchema = z.object({
  studentName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone must be at least 8 digits'),
  dob: z.string().min(4, 'Date of birth is required'),
  address: z.string().min(5, 'Address is required'),
  qualification: z.string().min(2, 'Qualification is required'),
  commerceBackground: z.boolean().default(true),
  selectedProgram: z.string().min(1, 'Please select a program'),
  preferredMode: z.enum(['Offline Classroom', 'Online Live', 'Hybrid']).default('Offline Classroom'),
  preferredBatch: z.string().min(1, 'Preferred batch is required'),
  currentOccupation: z.string().default('Student'),
  careerGoal: z.string().default(''),
  documentUrls: z.array(z.string()).default([]),
  consent: z.boolean().refine((val) => val === true, 'Consent is mandatory'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = applicationSchema.parse(body);

    const application = await db.addApplication(validated);

    return NextResponse.json({
      success: true,
      message: 'Admission application submitted successfully. Application ID: ' + application.id,
      data: application,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.issues[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error processing application' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const applications = await db.getApplications();
    return NextResponse.json({ success: true, data: applications });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve applications' },
      { status: 500 }
    );
  }
}
