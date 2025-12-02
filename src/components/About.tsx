"use client";
import Image from "next/image";

export default function About() {
  return (
    <section className="w-full py-20 bg-[#FCF7EE]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT SECTION */}
        <div className="space-y-6">
          {/* Badge */}
          <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
            🌿 Spiritual Guide & Master
          </span>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-[#7B3F07] leading-tight">
            Guruji Parameshwar
            <br />
            Ananda
          </h2>

          {/* Description */}
          <p className="text-lg text-[#8B5A2B] leading-relaxed">
            A beacon of divine wisdom who has dedicated his life to spreading
            the ancient knowledge of Rudraksha and its transformative powers.
          </p>

          <div className="w-full h-px bg-orange-300/60"></div>

          {/* Quote */}
          <p className="italic text-[#6A3A09]">
            &quot;Rudraksha is not just a bead, it is a bridge between the human
            and the divine, a sacred gift from Lord Shiva himself.&quot;
          </p>
          <p className="text-[#6A3A09] font-semibold">
            – Guruji Parameshwar Ananda
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 pt-6">
            <div>
              <p className="text-3xl font-bold text-[#7B3F07]">35+</p>
              <p className="text-sm text-[#6A3A09]">Years of Service</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#7B3F07]">50,000+</p>
              <p className="text-sm text-[#6A3A09]">Lives Transformed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#7B3F07]">108+</p>
              <p className="text-sm text-[#6A3A09]">Sacred Ceremonies</p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden border-4 border-orange-200 shadow-xl">
            <Image
              src="/guruji.jpg"
              alt="Guruji Parameshwar Ananda"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              placeholder="blur"
              blurDataURL="/guruji-blur.jpg" // optional low-quality image
              priority
            />
          </div>

          {/* Om Icon */}
          <div className="absolute bottom-4 right-4 bg-white shadow-lg p-3 rounded-xl">
            <Image src="/om-icon.png" alt="Om Icon" width={32} height={32} />
          </div>
        </div>
      </div>
    </section>
  );
}
