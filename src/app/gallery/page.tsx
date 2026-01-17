"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const images = [
  "/gallery/h1.JPG",
  "/gallery/h2.JPG",
  "/gallery/h3.JPG",
  "/gallery/h4.JPG",
  "/gallery/h5.JPG",
  "/gallery/h6.JPG",
  "/gallery/v1.JPG",
  "/gallery/v2.JPG",
  "/gallery/v3.JPG",
  "/gallery/v4.JPG",
  "/gallery/v5.JPG",
  "/gallery/v6.JPG",
  "/gallery/v7.jpg",
  "/gallery/v8.jpg",
  "/gallery/v9.jpg",
];

export default function GalleryPage() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section className="min-h-screen bg-linear-to-b from-[#f8efe4] via-[#fdf6ee] to-white">
      {/* CONTENT CONTAINER */}
      <div
        className="
          mx-auto w-full
          max-w-6xl 2xl:max-w-[1400px]
          px-4 sm:px-6 lg:px-8
          pt-24 pb-20
        "
      >
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#C47A2C] tracking-wide">
            Divine Moments
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Sacred rituals, timeless traditions, and divine energy captured
            through moments of devotion and grace.
          </p>
        </div>

        {/* Gallery */}
        <div
          className="
            columns-1
            sm:columns-2
            lg:columns-3
            gap-6
            space-y-6
          "
        >
          {images.map((src, index) => (
            <div
              key={index}
              onClick={() => setActiveImage(src)}
              className="
                relative overflow-hidden rounded-2xl
                cursor-pointer group
                shadow-lg break-inside-avoid
              "
            >
              <Image
                src={src}
                alt="Gallery image"
                width={600}
                height={800}
                className="
                  w-full h-auto object-cover
                  transition-transform duration-700
                  group-hover:scale-110
                "
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white hover:scale-110 transition"
          >
            <X size={32} />
          </button>

          <div className="relative w-full max-w-6xl max-h-[90vh] flex items-center justify-center">
            <Image
              src={activeImage}
              alt="Preview"
              width={1600}
              height={1000}
              className="
                max-h-[90vh]
                max-w-full
                object-contain
                rounded-xl
              "
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}
