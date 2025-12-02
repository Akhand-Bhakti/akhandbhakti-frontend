"use client";
import { Lightbulb, Target, Users } from "lucide-react";

export default function SacredMission() {
  return (
    <section className="mt-8 w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Top Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center">
            <Target color="white" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-bold text-[#7B3F07] mb-4">
          Our Sacred Mission
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-[#8B5A2B] max-w-2xl mx-auto leading-relaxed mb-12">
          To preserve and share the ancient wisdom of Rudraksha, ensuring every
          seeker receives authentic, energized beads that carry the divine
          blessings of Lord Shiva.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-orange-100 rounded-3xl shadow-md border border-orange-600 p-8 text-left hover:shadow-lg transition">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4">
              <Lightbulb className="text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-[#7B3F07] mb-2">
              Authenticity First
            </h3>
            <p className="text-[#8B5A2B] leading-relaxed">
              Every Rudraksha is personally verified by Guruji, ensuring you
              receive only genuine, high-quality beads sourced directly from
              Nepal.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-orange-100 rounded-3xl shadow-md border border-orange-600 p-8 text-left hover:shadow-lg transition">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4">
              <Lightbulb className="text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-[#7B3F07] mb-2">
              Vedic Energization
            </h3>
            <p className="text-[#8B5A2B] leading-relaxed">
              Each bead undergoes sacred Vedic rituals and mantras chanted by
              learned priests to activate its divine powers.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-orange-100 rounded-3xl shadow-md border border-orange-600 p-8 text-left hover:shadow-lg transition">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4">
              <Users className="text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-[#7B3F07] mb-2">
              Personal Guidance
            </h3>
            <p className="text-[#8B5A2B] leading-relaxed">
              Guruji provides personalized consultation to help you choose the
              right Rudraksha based on your spiritual needs and birth chart.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
