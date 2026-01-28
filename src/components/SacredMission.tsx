"use client";

import Image from "next/image";
import Link from "next/link";

export default function SacredMission() {
  return (
    <section className="mt-8 w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              The Meaning of Akhand Bhakti
            </h2>

            <p className="mt-4 text-gray-700 leading-relaxed">
              Founded with the belief that true spirituality is continuous,
              pure, and intentional, AkhandBhakti stands for unbroken faith — a
              path where devotion is not occasional, but a way of life.
            </p>

            <p className="mt-4 font-semibold text-orange-700">
              “Devotion is not an activity. It is a way of living.”
            </p>
          </div>

          <div className="relative h-[340px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/about/guru.jpeg"
              alt="Guruji"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex justify-center mt-14">
          <Link
            href="/about"
            className="px-8 py-3 border border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition"
          >
            Know More About AkhandBhakti
          </Link>
        </div>
      </div>
    </section>
  );
}
