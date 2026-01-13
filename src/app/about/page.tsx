"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function AboutPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const steps = [
    {
      title: "Vedic Rituals",
      desc: "Each item undergoes authentic Vedic rituals conducted as per scriptures, ensuring spiritual purity and sanctity.",
    },
    {
      title: "Namak-Chamak Rudrabhishek",
      desc: "A powerful Rudrabhishek performed with Namak and Chamak to invoke Lord Shiva’s blessings.",
    },
    {
      title: "12–16 Hours Shiv Sadhna",
      desc: "Extended Shiv Sadhna performed with discipline and devotion to energize the sacred item.",
    },
    {
      title: "Mantra & Sankalp",
      desc: "Personalized mantra chanting and sankalp aligned with the seeker’s spiritual intent.",
    },
  ];
  return (
    <main className="w-full">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#5E2817] to-[#C0653E]">
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
            AkhandBhakti is a sacred spiritual platform devoted to preserving
            and sharing the timeless wisdom of Sanatana Dharma through authentic
            spiritual products, disciplined practices, and conscious devotion.
          </p>

          <p className="mt-4 text-white/80 max-w-3xl mx-auto leading-relaxed">
            Founded with the belief that true spirituality is continuous, pure,
            and intentional — AkhandBhakti stands for unbroken faith, where
            devotion is not occasional, but a way of life.
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
              AkhandBhakti represents devotion that is continuous, disciplined,
              and rooted in consciousness — a spiritual path where faith is not
              driven by trend or convenience, but by dedication and inner
              awareness.
            </p>

            <p className="mt-4 text-gray-700 leading-relaxed">
              Our offerings are guided by scriptural understanding rather than
              commercial influence — ensuring that every sacred product is
              treated with reverence, purity, and intention.
            </p>

            <p className="mt-4 font-semibold text-orange-700">
              “Devotion is not an activity. It is a way of living.”
            </p>
          </div>

          <div className="relative h-[340px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/about/guru.JPG"
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

          {/* ================= DESKTOP VIEW ================= */}
          <div className="hidden lg:block mt-12">
            {/* Boxes */}
            <div className="grid grid-cols-4 gap-6">
              {steps.map((step, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={step.title}
                    onClick={() => setActiveIndex(index)}
                    className={`rounded-2xl p-6 border transition-all duration-300
                    ${
                      isActive
                        ? "bg-[#C47A2C] text-white shadow-lg"
                        : "bg-orange-100 text-gray-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <p className="font-semibold">{step.title}</p>
                  </button>
                );
              })}
            </div>

            {/* Fixed Description Area */}
            <div className="mt-10 bg-white border rounded-2xl p-8 shadow-md max-w-3xl mx-auto">
              <p className="text-gray-700 text-lg leading-relaxed">
                {steps[activeIndex].desc}
              </p>
            </div>
          </div>

          {/* ================= MOBILE VIEW ================= */}
          <div className="block lg:hidden mt-12 space-y-5 text-left">
            {steps.map((step, index) => {
              const isOpen = index === activeIndex;

              return (
                <div
                  key={step.title}
                  className="bg-[#C47A2C] rounded-2xl overflow-hidden border"
                >
                  <button
                    onClick={() => setActiveIndex(isOpen ? -1 : index)}
                    className="w-full p-6 flex justify-between items-center text-white font-semibold"
                  >
                    {step.title}
                    <ChevronDown
                      className={`transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`px-6 text-white/90 text-sm transition-all duration-300 overflow-hidden
                    ${
                      isOpen
                        ? "max-h-40 pb-6 opacity-100"
                        : "max-h-0 pb-0 opacity-0"
                    }`}
                  >
                    {step.desc}
                  </div>
                </div>
              );
            })}
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
            A fixed proportion of the amount received from devotees and
            customers is dedicated to Namak-Chamak Rudrabhishek & Gau-Seva —
            ensuring that devotion contributes back to sacred service and
            dharmic responsibility.
          </p>
        </div>
      </section>

      {/* ================= WHAT WE OFFER ================= */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">What We Offer</h2>

          <p className="mt-3 text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We specialize in genuine Rudraksha malas, beads, bracelets, puja
            essentials, and Abhimantrit spiritual products — carefully sourced
            and prepared in accordance with traditional Vedic principles.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Rudraksha Malas",
              "Spiritual Bracelets",
              "Rudraksha Beads",
              "Puja Essentials",
            ].map((item) => (
              <div
                key={item}
                className="bg-[#ebaa64] p-6 rounded-2xl shadow-sm border"
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
            Spiritual products are not accessories — they are tools for sadhana,
            discipline, inner balance, and conscious living.
          </p>

          <p className="mt-4 text-gray-800 leading-relaxed">
            Our role is not to sell belief — but to preserve sanctity, share
            knowledge, and guide seekers with responsibility and truth.
          </p>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>

          <p className="mt-4 text-gray-700 leading-relaxed">
            AkhandBhakti serves seekers across the world — connecting ancient
            Indian traditions with the modern spiritual aspirant through a
            secure and accessible platform.
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed">
            Beyond commerce, AkhandBhakti is a space for learning, guidance, and
            spiritual awareness — helping seekers understand the true
            significance of what they wear, worship, and believe.
          </p>

          <p className="mt-6 font-semibold text-gray-900">
            AkhandBhakti is not built on promises, but on purpose. <br />
            Not on superstition, but on tradition. <br />
            Not on trends, but on truth.
          </p>
        </div>
      </section>

      {/* ================= CORE COMMITMENTS ================= */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Our Core Commitments</h2>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              "Authentic & Natural Spiritual Products",
              "Transparency in Sourcing & Certification",
              "Respect for Vedic Traditions & Practices",
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
