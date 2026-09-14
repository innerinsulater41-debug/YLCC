import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { getCurrentUser } from "@/lib/auth/session";

// Allowed MIME types
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
  "application/pdf",
  "application/zip",
  "application/x-zip-compressed",
]);

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

export async function POST(req: NextRequest) {
  try {
    // Note: Public admission forms might upload resumes/documents; admin uploads images/code
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Size validation
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds the 25MB maximum limit" },
        { status: 400 }
      );
    }

    // MIME type validation
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          error: `File type ${file.type} is not supported. Allowed formats: PNG, JPG, WebP, SVG, PDF, ZIP.`,
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const rawExtension = path.extname(file.name).toLowerCase() || ".bin";
    // Sanitize extension
    const extension = rawExtension.replace(/[^a-z0-9.]/g, "");
    const baseName = path
      .basename(file.name, rawExtension)
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .slice(0, 30);

    const uniqueFileName = `${baseName}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${extension}`;

    // 1. Check if Supabase Storage is configured
    const supabaseAdmin = getSupabaseAdminClient();
    if (supabaseAdmin) {
      try {
        const { data, error } = await supabaseAdmin.storage
          .from("ylcc-assets")
          .upload(`uploads/${uniqueFileName}`, buffer, {
            contentType: file.type,
            upsert: false,
          });

        if (!error && data) {
          const { data: publicUrlData } = supabaseAdmin.storage
            .from("ylcc-assets")
            .getPublicUrl(`uploads/${uniqueFileName}`);

          return NextResponse.json({
            success: true,
            url: publicUrlData.publicUrl,
            filename: uniqueFileName,
            size: file.size,
            mimeType: file.type,
          });
        }
      } catch (sbError) {
        console.warn("Supabase upload skipped or failed, falling back to local storage:", sbError);
      }
    }

    // 2. Fallback to local persistent storage in public/uploads
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, uniqueFileName);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueFileName,
      size: file.size,
      mimeType: file.type,
    });
  } catch (error: any) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process file upload" },
      { status: 500 }
    );
  }
}
