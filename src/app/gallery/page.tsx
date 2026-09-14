"use client";

import { useState, useEffect } from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { Image as ImageIcon, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryAlbum, GalleryItem } from "@/types";

export default function GalleryPage() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeItems, setActiveItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        if (data.success && data.albums) {
          setAlbums(data.albums);
          // Aggregate all items
          const all = data.albums.flatMap((a: GalleryAlbum) => a.items || []);
          setActiveItems(all);
        }
      } catch (err) {
        console.error("Failed to load gallery:", err);
      }
    }
    loadGallery();
  }, []);

  useEffect(() => {
    if (selectedAlbum === "All") {
      setActiveItems(albums.flatMap((a) => a.items || []));
    } else {
      const album = albums.find((a) => a.id === selectedAlbum);
      setActiveItems(album ? album.items || [] : []);
    }
  }, [selectedAlbum, albums]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % activeItems.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + activeItems.length) % activeItems.length);
    }
  };

  return (
    <div className="bg-[#faf7f2] min-h-screen">
      {/* Header */}
      <section className="py-16 bg-[#1c1917] text-stone-200 border-b border-stone-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-900/40 text-amber-300 border border-amber-800/60 text-xs font-bold uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Campus Life & Exhibitions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Life at YLCC Campus
          </h1>
          <p className="text-stone-400 text-base leading-relaxed">
            Take a visual tour through our 48-hour hackathons, interactive coding bays, guest masterclasses, and convocation ceremonies.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Album Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          <button
            onClick={() => setSelectedAlbum("All")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              selectedAlbum === "All"
                ? "bg-stone-900 text-amber-50 shadow-xs"
                : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            All Photos ({albums.reduce((acc, a) => acc + (a.items?.length || 0), 0)})
          </button>
          {albums.map((album) => (
            <button
              key={album.id}
              onClick={() => setSelectedAlbum(album.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                selectedAlbum === album.id
                  ? "bg-stone-900 text-amber-50 shadow-xs"
                  : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              {album.title} ({album.items?.length || 0})
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {activeItems.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => openLightbox(idx)}
              className="rounded-2xl overflow-hidden bg-white border border-stone-200/80 shadow-2xs card-hover cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 space-y-1">
                <h3 className="text-sm font-bold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="text-xs text-stone-500 line-clamp-2">{item.caption}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full-Screen Lightbox Modal */}
      {lightboxIndex !== null && activeItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevLightbox}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextLightbox}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center text-center space-y-3">
            <img
              src={activeItems[lightboxIndex].imageUrl}
              alt={activeItems[lightboxIndex].title}
              className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
            <div className="text-white space-y-1">
              <h3 className="text-lg font-bold">
                {activeItems[lightboxIndex].title}
              </h3>
              {activeItems[lightboxIndex].caption && (
                <p className="text-xs text-stone-300 max-w-lg">
                  {activeItems[lightboxIndex].caption}
                </p>
              )}
              <div className="text-[11px] text-stone-400">
                Image {lightboxIndex + 1} of {activeItems.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
