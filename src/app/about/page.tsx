"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function AboutPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const steps = [
    {
      title: "Vedic Rituals",
      desc: "Vedic rituals are sacred spiritual practices rooted in the ancient Vedas, performed to maintain harmony between humans, nature, and the divine. They involve precise chanting of mantras, offerings (ahuti), abhishek, and disciplined procedures guided by Vedic principles. These rituals invoke cosmic energies to purify the mind, body, and environment, remove obstacles, and attract peace, prosperity, and spiritual growth. Performed with faith, purity, and correct pronunciation, Vedic rituals strengthen dharma, enhance positive vibrations, and deepen the connection with higher consciousness. They are conducted for worship, healing, protection, gratitude, and important life events, preserving timeless spiritual wisdom and divine balance passed down through generations.",
    },
    {
      title: "Namak-Chamak Rudrabhishek",
      desc: "Namak Chamak Rudrabhishek is a highly revered Vedic ritual dedicated to Lord Shiva, performed by chanting the sacred Namakam and Chamakam hymns from the Shukla Yajurveda. During this abhishek, the Shivling is bathed with pure water, milk, honey, ghee, and sandalwood while mantras are recited continuously. This powerful worship helps remove negative energies, doshas, and obstacles, and brings peace, mental clarity, health, prosperity, and spiritual growth. It is especially auspicious on Mondays, during Shravan month, Pradosh, and Maha Shivratri, and is ideal for seeking divine grace, protection, and fulfillment of righteous desires.",
    },
    {
      title: "12–16 Hours Shiv Sadhna",
      desc: "Shiv Sadhana of 12–16 hours is an intense spiritual practice dedicated to Lord Shiva, performed with continuous mantra japa, dhyan (meditation), abhishek, and silence. The sadhak remains focused, disciplined, and detached from worldly distractions, often observing fasting and purity. This prolonged sadhana helps dissolve negative karmas, awaken inner consciousness, and deepen devotion. Continuous chanting of Shiva mantras like Om Namah Shivaya creates powerful spiritual vibrations, bringing mental clarity, inner peace, and divine grace. Such extended Shiv Sadhana is considered highly transformative and is usually undertaken on auspicious days like Maha Shivratri or during the Shravan month.",
    },
    {
      title: "Mantra & Sankalp",
      desc: "Mantra and Sankalp are the foundation of all Vedic rituals and spiritual practices. A mantra is a sacred sound vibration chanted to invoke divine energy, purify the mind, and focus consciousness. A sankalp is a clear, heartfelt intention taken before the ritual, stating the purpose of worship. Together, they align thought, speech, and action, making the ritual spiritually effective. While mantras activate cosmic energies through sound, sankalp directs those energies toward a specific goal such as peace, health, prosperity, or spiritual growth. When performed with faith, discipline, and purity, mantra and sankalp transform worship into a powerful spiritual process, ensuring divine blessings and fulfillment of righteous desires.",
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
          <h1 className="text-4xl lg:text-5xl font-bold">
            About Akhand Bhakti
          </h1>

          <p className="mt-4 text-lg text-white/85 max-w-3xl mx-auto">
            Akhand Bhakti is a sacred spiritual platform devoted to preserving
            and sharing the timeless wisdom of Sanatana Dharma through authentic
            spiritual products, disciplined practices, and conscious devotion.
          </p>

          <p className="mt-4 text-white/80 max-w-3xl mx-auto leading-relaxed">
            Founded with the belief that true spirituality is continuous, pure,
            and intentional — Akhand Bhakti stands for unbroken faith, where
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
              Akhand Bhakti represents devotion that is continuous, disciplined,
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
              src="/about/guru.jpeg"
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
              {activeIndex !== null && (
                <p className="text-gray-700 text-lg leading-relaxed">
                  {steps[activeIndex].desc}
                </p>
              )}
            </div>
          </div>

          {/* ================= MOBILE VIEW ================= */}
          <div className="block lg:hidden mt-12 space-y-5 text-left">
            {steps.map((step, index) => {
              if (!step || !step.desc) return null;

              const isOpen = index === activeIndex;

              return (
                <div
                  key={step.title || index}
                  className="bg-[#C47A2C] rounded-2xl overflow-hidden border"
                >
                  <button
                    onClick={() => setActiveIndex(isOpen ? null : index)}
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
        ${isOpen ? "max-h-40 pb-6 opacity-100" : "max-h-0 pb-0 opacity-0"}`}
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
            Akhand Bhakti serves seekers across the world — connecting ancient
            Indian traditions with the modern spiritual aspirant through a
            secure and accessible platform.
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed">
            Beyond commerce, Akhand Bhakti is a space for learning, guidance,
            and spiritual awareness — helping seekers understand the true
            significance of what they wear, worship, and believe.
          </p>

          <p className="mt-6 font-semibold text-gray-900">
            Akhand Bhakti is not built on promises, but on purpose. <br />
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
