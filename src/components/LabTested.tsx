"use client";

import Image from "next/image";

export default function LabTested() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#7B3F07] mb-4">
          Certified & Lab Tested Rudraksha
        </h2>

        {/* Subtitle */}
        <p className="text-[#8B5A2B] text-lg max-w-2xl mb-10">
          Every Rudraksha bead is rigorously examined and verified through
          advanced laboratory testing to ensure authenticity, purity, and
          structural integrity.
        </p>

        {/* Big Grey Placeholder Rectangle */}
        <div className="w-full rounded-2xl bg-gray-200 overflow-hidden shadow-md border border-gray-300">
          {/* Replace image inside when you get the lab-tested document */}
          <div className="relative w-full h-[250px] md:h-[400px] bg-gray-200">
            <Image
              src="/lab-tested.jpg"
              alt="Lab Tested Certificate"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
