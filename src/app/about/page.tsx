"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="w-full">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#5E2817] to-[#C0653E]">
        {/* texture */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "url('/home/bg-texture.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold">About AkhandBhakti</h1>
          <p className="mt-4 text-lg text-white/85 max-w-3xl mx-auto">
            A sacred spiritual platform devoted to preserving and sharing the
            timeless wisdom of Sanatana Dharma through authentic spiritual
            products, disciplined practices, and conscious devotion.
          </p>
        </div>
      </section>

      {/* ================= PHILOSOPHY ================= */}
      <section className="py-20 px-6 bg-white">
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
              src="/home/guru.jpg"
              alt="Guruji"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= ABHIMANTRIT PROCESS ================= */}
      <section className="py-20 px-6 bg-orange-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Our Abhimantrit Process
          </h2>

          <p className="mt-3 text-gray-700 max-w-3xl mx-auto">
            Every product is prepared through disciplined Vedic rituals,
            performed with mantra, sankalp, and spiritual intent.
          </p>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Vedic Rituals",
              "Namak-Chamak Rudrabhishek",
              "10–12 Hours Shiv Sadhna",
              "Mantra & Sankalp",
            ].map((step) => (
              <div
                key={step}
                className="bg-white rounded-2xl p-6 shadow-sm border"
              >
                <p className="font-semibold text-gray-900">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SEVA ================= */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Seva & Responsibility
          </h2>

          <p className="mt-4 text-gray-700 leading-relaxed">
            A fixed proportion of the amount received from devotees is dedicated
            to Namak-Chamak Rudrabhishek and Gau-Seva — ensuring that devotion
            contributes back to sacred service and dharmic responsibility.
          </p>
        </div>
      </section>

      {/* ================= WHAT WE OFFER ================= */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">What We Offer</h2>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Rudraksha Malas",
              "Spiritual Bracelets",
              "Rudraksha Beads",
              "Puja Essentials",
            ].map((item) => (
              <div
                key={item}
                className="bg-white p-6 rounded-2xl shadow-sm border"
              >
                <p className="font-semibold text-gray-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRANSPARENCY ================= */}
      <section className="py-20 px-6 bg-orange-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-800 italic leading-relaxed">
            While spiritual outcomes depend on individual faith and practice,
            our responsibility is to maintain authenticity, transparency, and
            sanctity at every step.
          </p>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>

          <p className="mt-4 text-gray-700 leading-relaxed">
            Beyond commerce, AkhandBhakti is a space for learning, guidance, and
            spiritual awareness. We aim to help seekers understand the spiritual
            significance of what they wear or worship and walk their path with
            clarity and confidence.
          </p>
        </div>
      </section>

      {/* ================= CORE COMMITMENTS ================= */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Our Core Commitments</h2>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              "Authentic Spiritual Products",
              "Transparent Sourcing",
              "Respect for Vedic Traditions",
              "Guidance Over Selling",
              "Faith with Responsibility",
            ].map((item) => (
              <div
                key={item}
                className="border border-white/20 rounded-xl p-5 text-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
