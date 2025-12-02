"use client";

import Image from "next/image";

interface ImgProps {
  src: string;
  className?: string;
}

export default function Gallery() {
  const images: string[] = [
    "/gallery1.jpg",
    "/gallery2.jpg",
    "/gallery3.jpg",
    "/gallery4.jpg",
    "/gallery5.jpg",
    "/gallery6.jpg",
    "/gallery7.jpg",
    "/gallery8.jpg",
    "/gallery9.jpg",
  ];

  return (
    <section className="w-full py-12 bg-orange-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] mb-8">
          Rooted In Tradition, Made For Today
        </h2>

        {/* -------------------------------------------------------------------
              📱 MOBILE LAYOUT (staggered)
           ------------------------------------------------------------------- */}
        <div className="flex flex-col gap-3 md:hidden">
          {/* Group 1 */}
          <div className="grid grid-cols-2 gap-3">
            <MobileSquare src={images[0]} />
            <MobileSquare src={images[1]} />
          </div>
          <MobileWide src={images[2]} />

          {/* Group 2 */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <MobileSquare src={images[3]} />
            <MobileSquare src={images[4]} />
          </div>
          <MobileWide src={images[5]} />

          {/* Group 3 */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <MobileSquare src={images[6]} />
            <MobileSquare src={images[7]} />
          </div>

          {/* Final wide */}
          <MobileWide src={images[8]} className="mt-3" />
        </div>

        {/* -------------------------------------------------------------------
     💻 DESKTOP LAYOUT (fixed 300×300 & 500×300) 
     Now properly hidden on small screens
   ------------------------------------------------------------------- */}

        <div className="hidden md:block">
          <div
            className="grid"
            style={{
              gridTemplateColumns: "300px 300px 500px",
              gap: "10px",
            }}
          >
            {/* Column 1 */}
            <div className="flex flex-col" style={{ gap: "10px" }}>
              <DesktopSquare src={images[0]} />
              <DesktopSquare src={images[1]} />
              <DesktopSquare src={images[2]} />
            </div>

            {/* Column 2 */}
            <div className="flex flex-col" style={{ gap: "10px" }}>
              <DesktopSquare src={images[3]} />
              <DesktopSquare src={images[4]} />
              <DesktopSquare src={images[5]} />
            </div>

            {/* Column 3 */}
            <div className="flex flex-col" style={{ gap: "10px" }}>
              <DesktopWide src={images[6]} />
              <DesktopWide src={images[7]} />
              <DesktopWide src={images[8]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
      Reusable Components
   ------------------------------------------------------------------ */

function MobileSquare({ src, className = "" }: ImgProps) {
  return (
    <div
      className={`relative w-full aspect-square rounded-md overflow-hidden bg-gray-200 ${className}`}
    >
      <Image src={src} alt="" fill className="object-cover" />
    </div>
  );
}

function MobileWide({ src, className = "" }: ImgProps) {
  return (
    <div
      className={`relative w-full aspect-2/1 rounded-md overflow-hidden bg-gray-200 ${className}`}
    >
      <Image src={src} alt="" fill className="object-cover" />
    </div>
  );
}

function DesktopSquare({ src }: ImgProps) {
  return (
    <div
      className="relative rounded-md overflow-hidden bg-gray-200"
      style={{ width: "300px", height: "300px" }}
    >
      <Image src={src} alt="" fill className="object-cover" />
    </div>
  );
}

function DesktopWide({ src }: ImgProps) {
  return (
    <div
      className="relative rounded-md overflow-hidden bg-gray-200"
      style={{ width: "500px", height: "300px" }}
    >
      <Image src={src} alt="" fill className="object-cover" />
    </div>
  );
}
