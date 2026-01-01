import Image from "next/image";

const images = [
  { src: "/gallery/1.jpg", span: "col-span-4", ratio: "aspect-[16/7]" },
  { src: "/gallery/2.jpg", span: "col-span-2", ratio: "aspect-[4/4]" },

  { src: "/gallery/3.jpg", span: "col-span-2", ratio: "aspect-[4/3]" },
  { src: "/gallery/4.jpg", span: "col-span-4", ratio: "aspect-[16/7]" },

  { src: "/gallery/5.jpg", span: "col-span-2", ratio: "aspect-[1/1]" },
  { src: "/gallery/6.jpg", span: "col-span-2", ratio: "aspect-[1/1]" },
  { src: "/gallery/7.jpg", span: "col-span-2", ratio: "aspect-[1/1]" },

  { src: "/gallery/8.jpg", span: "col-span-6", ratio: "aspect-[21/7]" },

  { src: "/gallery/9.jpg", span: "col-span-2", ratio: "aspect-[1/1]" },
  { src: "/gallery/10.jpg", span: "col-span-2", ratio: "aspect-[1/1]" },
  { src: "/gallery/11.jpg", span: "col-span-2", ratio: "aspect-[1/1]" },

  { src: "/gallery/12.jpg", span: "col-span-4", ratio: "aspect-[16/7]" },
  { src: "/gallery/13.jpg", span: "col-span-2", ratio: "aspect-[4/3]" },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-28 px-4 bg-linear-to-b from-[#f8efe4] via-[#fdf6ee] to-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#C47A2C]">
          Divine Moments
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-2xl mx-auto">
          Sacred rituals and timeless moments captured with devotion.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-6 gap-6">
        {images.map((img, i) => (
          <div
            key={i}
            className={`relative ${img.span} ${img.ratio}
    overflow-hidden rounded-2xl
    bg-white/80 backdrop-blur-xl
    shadow-[0_20px_60px_-15px_rgba(196,122,44,0.35)]
    hover:scale-[1.015] transition-transform`}
          >
            <Image
              src={img.src}
              alt="Gallery image"
              fill
              sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
