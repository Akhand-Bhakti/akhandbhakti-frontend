"use client";
import Image from "next/image";
import { useState } from "react";

export default function About() {
  const [expanded, setExpanded] = useState(false);
  const shortText = `
            Since June 8, 2025, Shri Shagun Vashisht has performed the Namak
            Chamak Rudrabhishek, Bhasmarti, and Shringar rituals of Lord Shiva
            in 56 different temples. He has named this journey of worship
            "Shivotsav," attributing it to the grace of Lord Shiva. Consider
            this Shagun's second birth; such a profound transformation is
            impossible without the blessings of Lord Shiva.
            That an ordinary man can sit for 10 to 12 hours at a time and
            perform such elaborate worship of Lord Shiva is only possible
            through the powers bestowed upon him by the Lord. Witnessing such a
            grand program of worship and rigorous spiritual practice in village
            and neighborhood temples, people spontaneously accord Shagun the
            respect due to a saint.In the history of India, no saint or ascetic
            has ever performed such selfless worship in unknown village temples
            without accepting a single rupee from anyone. Shagun Vashisht
            belongs to the esteemed Vashisht gotra of Brahmins, a descendant of
            Guru Vashisht.
            `;

  const fullText = `
            How a man who led a luxurious life, taking his
            international business to its peak and giving a new dimension to
            journalism through his podcasts, suddenly transformed and dedicated
            his life solely to the devotion of Lord Shiva, has become a topic of
            discussion among the youth and general public of the country. The
            way Shagun Vashisht has incorporated devotion to Shiva into his life
            is unparalleled. Shagun Vashisht, who deeply contemplates the love
            of Shiva and Shakti and spreads positive messages to the people, is
            a gift from Lord Shiva to the world. One can learn from him how to
            incorporate devotion into life and how to reach the pinnacle of
            devotion. Shagun Vashisht has participated in six Kumbh Melas,
            meaning he has lived at the Kumbh Mela and managed arrangements on
            behalf of the Akharas (religious orders). He also served as the
            media advisor to Acharya Mahamandaleshwar Kailashanand Giri of the
            Niranjani Akhara for 15 years. Shagun Vashisht, who possesses a deep
            understanding of the akhadas (traditional wrestling arenas) both
            from within and outside, has excellent and accurate knowledge of
            subjects such as Naga Sadhus, Aghoris, Tantra, and Shiva worship. He
            also has years of experience working in the media industry. While
            serving as a Special Duty Officer in the Department of Social
            Welfare and Women and Child Development of the Delhi Government, he
            established several dimensions of social service and repeatedly set
            examples of how to help those in need, even on government holidays.
`;
  return (
    <section className="w-full py-20 bg-[#FCF7EE]">
      <div
        className="max-w-7xl mx-auto px-6 lg:px-10 
            grid grid-cols-1 lg:grid-cols-[3fr_2fr] 
            gap-12 items-center"
      >
        {/* LEFT SECTION */}
        <div className="space-y-6">
          {/* Badge */}
          <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
            🌿 Spiritual Practitioner & Shiv Shakti Sadhak
          </span>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-[#7B3F07] leading-tight">
            Shri Shagun
            <br />
            Vashishth Ji
          </h2>

          {/* Description */}
          <div className="relative">
            <div
              className={`transition-all duration-500 ${
                !expanded ? "max-h-[280px] overflow-hidden" : ""
              }`}
            >
              <p className="text-lg text-[#8B5A2B] leading-relaxed">
                {shortText}
                {expanded && <span className="block mt-4">{fullText}</span>}
              </p>
            </div>

            {!expanded && (
              <div
                className="pointer-events-none absolute bottom-0 left-0 w-full h-24 
                    bg-linear-to-t from-[#FCF7EE] to-transparent"
              />
            )}
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 text-orange-700 font-semibold hover:underline transition"
          >
            {expanded ? "Show Less" : "Know More"}
          </button>

          <div className="w-full h-px bg-orange-300/60"></div>

          {/* Quote */}
          <p className="italic text-[#6A3A09]">
            &quot;Rudraksha is not just a bead, it is a bridge between the human
            and the divine, a sacred gift from Lord Shiva himself.&quot;
          </p>
          <p className="text-[#6A3A09] font-semibold">
            – Shri Shagun Vashishth Ji
          </p>

          {/* Stats */}
          {/* <div className="flex flex-wrap gap-10 pt-6">
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
          </div> */}
        </div>

        {/* RIGHT SECTION */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden border-4 border-orange-200 shadow-xl">
            <Image
              src="/home-about/guruji.JPG"
              alt="Guruji Parameshwar Ananda"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              placeholder="blur"
              blurDataURL="/guruji-blur.jpg"
              priority
            />
          </div>

          {/* Om Icon */}
          {/* <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg">
            <p className="text-4xl text-orange-600">🕉️</p>
          </div> */}
        </div>
      </div>
    </section>
  );
}
