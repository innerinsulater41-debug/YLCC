"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Upload,
  X,
  Eye,
  Calendar,
  FolderPlus,
  Folder,
} from "lucide-react";
import { GalleryAlbum, GalleryItem } from "@/types";
import { slugify } from "@/lib/utils";

export default function AdminGalleryPage() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>("");
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // New Album Form
  const [albumForm, setAlbumForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "Campus Life" as GalleryAlbum["category"],
    coverImageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
  });

  // New Photo Form
  const [photoForm, setPhotoForm] = useState({
    title: "",
    imageUrl: "",
    caption: "",
    takenAt: new Date().toISOString().split("T")[0],
  });

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.success && data.albums) {
        setAlbums(data.albums);
        if (data.albums.length > 0 && !selectedAlbumId) {
          setSelectedAlbumId(data.albums[0].id);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_album",
          albumData: {
            ...albumForm,
            slug: albumForm.slug || slugify(albumForm.title),
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatusMessage({ type: "success", text: "New album created!" });
        setIsAlbumModalOpen(false);
        await fetchAlbums();
        setSelectedAlbumId(data.album.id);
      } else {
        setStatusMessage({ type: "error", text: data.error || "Failed to create album" });
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Request failed" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlbumId) return;

    setSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_item",
          albumId: selectedAlbumId,
          itemData: photoForm,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatusMessage({ type: "success", text: "Photo uploaded to album!" });
        setIsPhotoModalOpen(false);
        setPhotoForm({
          title: "",
          imageUrl: "",
          caption: "",
          takenAt: new Date().toISOString().split("T")[0],
        });
        fetchAlbums();
      } else {
        setStatusMessage({ type: "error", text: data.error || "Failed to add photo" });
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Request failed" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePhoto = async (albumId: string, itemId: string) => {
    if (!confirm("Are you sure you want to remove this photo?")) return;

    try {
      const res = await fetch(`/api/gallery?albumId=${albumId}&itemId=${itemId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        fetchAlbums();
      } else {
        alert(data.error || "Failed to delete photo");
      }
    } catch (err: any) {
      alert(err.message || "Request error");
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append("file", file);
    body.append("type", "image");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (data.success && data.fileUrl) {
        setAlbumForm((prev) => ({ ...prev, coverImageUrl: data.fileUrl }));
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err: any) {
      alert(err.message || "Upload error");
    } finally {
      setUploading(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append("file", file);
    body.append("type", "image");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (data.success && data.fileUrl) {
        setPhotoForm((prev) => ({ ...prev, imageUrl: data.fileUrl }));
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err: any) {
      alert(err.message || "Upload error");
    } finally {
      setUploading(false);
    }
  };

  const selectedAlbum = albums.find((a) => a.id === selectedAlbumId) || albums[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#e8e2d8] pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1c1917]">Campus Life & Gallery</h1>
          <p className="text-sm text-[#78716c] mt-1">
            Organize photo albums of smart classrooms, workshops, hackathons, and student convocations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAlbumModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-[#e8e2d8] text-[#1c1917] text-sm font-semibold hover:bg-[#faf7f2] transition shadow-sm"
          >
            <FolderPlus className="w-4 h-4 text-[#a16207]" /> New Album
          </button>
          <button
            onClick={() => setIsPhotoModalOpen(true)}
            disabled={!selectedAlbum}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#a16207] text-white text-sm font-semibold hover:bg-[#854d0e] transition shadow-sm disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Upload Photo
          </button>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-sm ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          }`}
        >
          <span>{statusMessage.text}</span>
          <button onClick={() => setStatusMessage(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Album Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {albums.map((album) => {
          const isActive = album.id === (selectedAlbum?.id || "");
          return (
            <button
              key={album.id}
              onClick={() => setSelectedAlbumId(album.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                isActive
                  ? "bg-[#a16207] text-white border-[#a16207] shadow-sm"
                  : "bg-white text-[#57534e] border-[#e8e2d8] hover:bg-[#faf7f2] hover:text-[#1c1917]"
              }`}
            >
              <Folder className="w-3.5 h-3.5" />
              <span>{album.title}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive ? "bg-white/20 text-white" : "bg-[#faf7f2] text-[#78716c]"
                }`}
              >
                {album.items?.length || 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Album Showcase */}
      {loading ? (
        <div className="bg-white border border-[#e8e2d8] rounded-2xl p-12 text-center animate-pulse">
          <p className="text-sm text-[#78716c]">Loading gallery albums...</p>
        </div>
      ) : !selectedAlbum ? (
        <div className="bg-white border border-[#e8e2d8] rounded-2xl p-12 text-center">
          <ImageIcon className="w-12 h-12 text-[#a8a29e] mx-auto mb-3" />
          <h3 className="text-base font-serif font-bold text-[#1c1917]">No gallery albums available</h3>
          <p className="text-sm text-[#78716c] mt-1">Create an album to start curating campus photographs.</p>
        </div>
      ) : (
        <div className="bg-white border border-[#e8e2d8] rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#e8e2d8] mb-6">
            <div>
              <span className="text-xs font-bold text-[#a16207] uppercase tracking-wider">
                {selectedAlbum.category}
              </span>
              <h2 className="text-xl font-serif font-bold text-[#1c1917] mt-0.5">{selectedAlbum.title}</h2>
              <p className="text-xs text-[#78716c] mt-1">{selectedAlbum.description}</p>
            </div>
            <div className="text-xs text-[#78716c]">
              <span className="font-semibold text-[#1c1917]">{selectedAlbum.items?.length || 0}</span> photographs in this album
            </div>
          </div>

          {/* Photo Grid */}
          {!selectedAlbum.items || selectedAlbum.items.length === 0 ? (
            <div className="border-2 border-dashed border-[#e8e2d8] rounded-2xl p-12 text-center">
              <ImageIcon className="w-10 h-10 text-[#a8a29e] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#1c1917]">Album has no photos yet</p>
              <p className="text-xs text-[#78716c] mt-1 mb-4">Upload high-resolution event or campus photos</p>
              <button
                onClick={() => setIsPhotoModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#a16207] text-white text-xs font-semibold hover:bg-[#854d0e] transition"
              >
                <Plus className="w-3.5 h-3.5" /> Upload First Photo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {selectedAlbum.items.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-2xl overflow-hidden border border-[#e8e2d8] bg-[#faf7f2] shadow-sm hover:shadow-md transition aspect-square"
                >
                  <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDeletePhoto(selectedAlbum.id, item.id)}
                        className="p-1.5 rounded-lg bg-red-600/90 hover:bg-red-700 text-white shadow transition"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white leading-tight">{item.title}</h4>
                      {item.caption && <p className="text-[11px] text-zinc-300 mt-0.5 line-clamp-1">{item.caption}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Create Album Modal */}
      {isAlbumModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#e8e2d8] shadow-2xl max-w-lg w-full p-6 sm:p-8 my-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#e8e2d8] mb-6">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#1c1917]">Create Photo Album</h2>
                <p className="text-xs text-[#78716c] mt-0.5">Categorize memories and campus facilities</p>
              </div>
              <button
                onClick={() => setIsAlbumModalOpen(false)}
                className="p-2 text-[#78716c] hover:text-[#1c1917] rounded-xl hover:bg-[#faf7f2] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAlbum} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Album Title *</label>
                <input
                  type="text"
                  required
                  value={albumForm.title}
                  onChange={(e) =>
                    setAlbumForm({
                      ...albumForm,
                      title: e.target.value,
                      slug: slugify(e.target.value),
                    })
                  }
                  placeholder="e.g. National Hackathon 2025"
                  className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Category *</label>
                <select
                  value={albumForm.category}
                  onChange={(e) =>
                    setAlbumForm({
                      ...albumForm,
                      category: e.target.value as GalleryAlbum["category"],
                    })
                  }
                  className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                >
                  <option value="Campus Life">Campus Life</option>
                  <option value="Classrooms">Classrooms & Labs</option>
                  <option value="Workshops">Workshops & Seminars</option>
                  <option value="Hackathons">Hackathons & Coding Arenas</option>
                  <option value="Convocations">Convocations & Graduations</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Cover Image *</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    required
                    value={albumForm.coverImageUrl}
                    onChange={(e) => setAlbumForm({ ...albumForm, coverImageUrl: e.target.value })}
                    className="flex-1 px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                  <label className="cursor-pointer px-3 py-2 bg-white border border-[#e8e2d8] hover:bg-[#faf7f2] rounded-xl text-xs font-semibold text-[#1c1917] inline-flex items-center gap-1.5 shadow-sm transition">
                    <Upload className="w-3.5 h-3.5 text-[#a16207]" />
                    <span>{uploading ? "..." : "Upload"}</span>
                    <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Album Description</label>
                <textarea
                  rows={2}
                  value={albumForm.description}
                  onChange={(e) => setAlbumForm({ ...albumForm, description: e.target.value })}
                  placeholder="Highlights of the event or campus environment..."
                  className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e8e2d8]">
                <button
                  type="button"
                  onClick={() => setIsAlbumModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-[#78716c] hover:text-[#1c1917] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-[#a16207] text-white text-sm font-semibold hover:bg-[#854d0e] transition shadow-sm disabled:opacity-50"
                >
                  {submitting ? "Creating..." : "Create Album"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Photo Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#e8e2d8] shadow-2xl max-w-lg w-full p-6 sm:p-8 my-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#e8e2d8] mb-6">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#1c1917]">Add Photo to Album</h2>
                <p className="text-xs text-[#78716c] mt-0.5">
                  Uploading to: <span className="font-semibold text-[#a16207]">{selectedAlbum?.title}</span>
                </p>
              </div>
              <button
                onClick={() => setIsPhotoModalOpen(false)}
                className="p-2 text-[#78716c] hover:text-[#1c1917] rounded-xl hover:bg-[#faf7f2] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPhoto} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={photoForm.title}
                  onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                  placeholder="e.g. Award Ceremony Finalists"
                  className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Select Photo File / URL *</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    required
                    value={photoForm.imageUrl}
                    onChange={(e) => setPhotoForm({ ...photoForm, imageUrl: e.target.value })}
                    placeholder="https://... or upload"
                    className="flex-1 px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                  <label className="cursor-pointer px-3 py-2 bg-white border border-[#e8e2d8] hover:bg-[#faf7f2] rounded-xl text-xs font-semibold text-[#1c1917] inline-flex items-center gap-1.5 shadow-sm transition">
                    <Upload className="w-3.5 h-3.5 text-[#a16207]" />
                    <span>{uploading ? "..." : "Upload"}</span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Caption</label>
                <input
                  type="text"
                  value={photoForm.caption}
                  onChange={(e) => setPhotoForm({ ...photoForm, caption: e.target.value })}
                  placeholder="Brief note about the picture..."
                  className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e8e2d8]">
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-[#78716c] hover:text-[#1c1917] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !photoForm.imageUrl}
                  className="px-6 py-2.5 rounded-xl bg-[#a16207] text-white text-sm font-semibold hover:bg-[#854d0e] transition shadow-sm disabled:opacity-50"
                >
                  {submitting ? "Uploading..." : "Add to Album"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
