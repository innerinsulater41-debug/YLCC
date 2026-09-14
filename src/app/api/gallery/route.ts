import { NextRequest, NextResponse } from "next/server";
import { DataStore } from "@/lib/db/store";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET() {
  const albums = await DataStore.getGalleryAlbums();
  return NextResponse.json({ success: true, albums });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { action, albumId, itemData, albumData } = body;

    if (action === "create_album") {
      if (!albumData || !albumData.title || !albumData.slug || !albumData.coverImageUrl) {
        return NextResponse.json({ error: "Missing required album fields" }, { status: 400 });
      }
      const album = await DataStore.createGalleryAlbum(albumData);
      return NextResponse.json({ success: true, album });
    }

    if (action === "add_item") {
      if (!albumId || !itemData || !itemData.imageUrl) {
        return NextResponse.json({ error: "albumId and itemData with imageUrl required" }, { status: 400 });
      }
      const album = await DataStore.addGalleryItem(albumId, itemData);
      return NextResponse.json({ success: true, album });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const albumId = searchParams.get("albumId");
  const itemId = searchParams.get("itemId");

  if (!albumId || !itemId) {
    return NextResponse.json({ error: "albumId and itemId are required" }, { status: 400 });
  }

  const success = await DataStore.deleteGalleryItem(albumId, itemId);
  return NextResponse.json({ success });
}
