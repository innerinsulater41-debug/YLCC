import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

const ALLOWED_EXTENSIONS = ['.pdf', '.xlsx', '.xls', '.docx', '.doc', '.pptx', '.ppt', '.zip', '.png', '.jpg', '.jpeg', '.webp'];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: 'File exceeds 50MB maximum size limit' },
        { status: 400 }
      );
    }

    const originalName = file.name;
    const ext = path.extname(originalName).toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        {
          success: false,
          message: `Unsupported file type "${ext}". Supported types: PDF, Excel, Word, PPT, ZIP, PNG, JPG.`,
        },
        { status: 400 }
      );
    }

    // Generate unique sanitized filename
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const cleanBaseName = path
      .basename(originalName, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .substring(0, 50);
    const uniqueFileName = `${cleanBaseName}_${timestamp}_${randomSuffix}${ext}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    // 1. Try Supabase Storage if configured
    if (isSupabaseConfigured && supabaseAdmin) {
      try {
        const { data, error } = await supabaseAdmin.storage
          .from('ylcc-files')
          .upload(uniqueFileName, buffer, {
            contentType: file.type || 'application/octet-stream',
            upsert: true,
          });

        if (!error && data) {
          const { data: publicUrlData } = supabaseAdmin.storage
            .from('ylcc-files')
            .getPublicUrl(uniqueFileName);

          const formattedSize =
            file.size > 1024 * 1024
              ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
              : `${(file.size / 1024).toFixed(0)} KB`;

          return NextResponse.json({
            success: true,
            url: publicUrlData.publicUrl,
            name: originalName,
            type: ext.replace('.', ''),
            size: formattedSize,
            storageEngine: 'supabase',
          });
        }
      } catch (err) {
        console.warn('Supabase storage upload failed, falling back to local storage:', err);
      }
    }

    // 2. Local File System Fallback (Works 100% offline & out-of-the-box!)
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, uniqueFileName);
      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/${uniqueFileName}`;
      const formattedSize =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${(file.size / 1024).toFixed(0)} KB`;

      return NextResponse.json({
        success: true,
        url: publicUrl,
        name: originalName,
        type: ext.replace('.', ''),
        size: formattedSize,
        storageEngine: 'local',
      });
    } catch (fsErr) {
      console.warn('Local filesystem write failed (read-only environment), falling back to data URI:', fsErr);
      const mimeType = file.type || 'application/octet-stream';
      const base64Data = buffer.toString('base64');
      const dataUri = `data:${mimeType};base64,${base64Data}`;
      const formattedSize =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${(file.size / 1024).toFixed(0)} KB`;

      return NextResponse.json({
        success: true,
        url: dataUri,
        name: originalName,
        type: ext.replace('.', ''),
        size: formattedSize,
        storageEngine: 'data-uri',
      });
    }
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'File upload failed' },
      { status: 500 }
    );
  }
}
