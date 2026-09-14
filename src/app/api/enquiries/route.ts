import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone must be at least 8 digits'),
  programOfInterest: z.string().optional().default('General Commerce Enquiry'),
  preferredBatch: z.string().optional().default('Any Batch'),
  message: z.string().optional().default(''),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = enquirySchema.parse(body);

    const enquiry = await db.addEnquiry(validated);

    return NextResponse.json({
      success: true,
      message: 'Enquiry received successfully. Our counselor will reach out shortly.',
      data: enquiry,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.issues[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error processing enquiry' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const enquiries = await db.getEnquiries();
    return NextResponse.json({ success: true, data: enquiries });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve enquiries' },
      { status: 500 }
    );
  }
}
