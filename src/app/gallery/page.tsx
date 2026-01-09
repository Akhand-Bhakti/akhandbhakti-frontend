"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const images = [
  "/gallery/h1.jpg",
  "/gallery/h2.jpg",
  "/gallery/h3.jpg",
  "/gallery/h4.jpg",
  "/gallery/h5.jpg",
  "/gallery/h6.jpg",
  "/gallery/v1.jpg",
  "/gallery/v2.jpg",
  "/gallery/v3.jpg",
  "/gallery/v4.jpg",
  "/gallery/v5.jpg",
  "/gallery/v6.jpg",
  "/gallery/v7.jpg",
  "/gallery/v8.jpg",
  "/gallery/v9.jpg",
];

export default function GalleryPage() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-14 px-4 mb-20 bg-linear-to-b from-[#f8efe4] via-[#fdf6ee] to-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-14 text-center">
        <h1 className="text-4xl sm:text-5xl font-semibold text-[#C47A2C] tracking-wide">
          Divine Moments
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Sacred rituals, timeless traditions, and divine energy captured
          through moments of devotion and grace.
        </p>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((src, index) => (
          <div
            key={index}
            onClick={() => setActiveImage(src)}
            className="relative overflow-hidden rounded-2xl cursor-pointer group shadow-lg"
          >
            <Image
              src={src}
              alt="Gallery image"
              width={600}
              height={800}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-500" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 text-white hover:scale-110 transition"
          >
            <X size={32} />
          </button>

          <div className="relative max-w-6xl max-h-[85vh]">
            <Image
              src={activeImage}
              alt="Preview"
              width={1200}
              height={800}
              className="max-h-[85vh] w-auto object-contain mx-auto rounded-xl"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
