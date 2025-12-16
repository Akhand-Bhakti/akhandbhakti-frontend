"use client";

import Image from "next/image";
import { useState } from "react";

export default function Banner() {
  const products = [
    {
      id: 1,
      title: "Abhimantrit Nepali Panchmukhi Rudraksha",
      desc: "Blessed Panchmukhi Rudraksha made for divine protection and peace.",
      price: "₹599.00",
      image: "/prod1.png",
      thumb: "/prod1.png",
      bg: "linear-gradient(135deg,#5E2817,#C0653E)",
    },
    {
      id: 2,
      title: "Abhimantrit Hanuman Mala",
      desc: "Powerful Hanuman mala energised for courage and strength.",
      price: "₹599.00",
      image: "/prod2.png",
      thumb: "/prod2.png",
      bg: "linear-gradient(135deg,#be4a1c,#842d14)",
    },
    {
      id: 3,
      title: "Abhimantrit Jal",
      desc: "Sacred Abhimantrit Jal for devotion and purity.",
      price: "₹799.00",
      image: "/prod3.png",
      thumb: "/prod3.png",
      bg: "linear-gradient(135deg,#1e54e2,#1440b3)",
    },
    {
      id: 4,
      title: "Abhimantrit Bhimseni Kapoor",
      desc: "Pure Bhimseni Kapoor for spiritual purification.",
      price: "₹599.00",
      image: "/prod4.png",
      thumb: "/prod4.png",
      bg: "linear-gradient(135deg,#666c73,#3e4349)",
    },
  ];

  const [active, setActive] = useState(0);
  const p = products[active];

  return (
    <section
      className="relative px-6 lg:px-16 py-12 w-full overflow-hidden"
      style={{ background: p.bg }}
    >
      {/* global-background-glow  */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0) 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mt-15">
        {/* LEFT COLUMN — fully centered */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-72 h-72 lg:w-[380px] lg:h-[380px] rounded-full overflow-hidden ring-10 ring-white/15 mt-10">
            <Image src="/guru.png" alt="Guru" fill className="object-cover" />
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-white mt-6">
            Divine Guidance
          </h2>
          <p className="text-white/85 mt-2 max-w-sm">
            Bringing peace and spiritual enlightenment to your life
          </p>

          {/* <div className="flex gap-12 mt-1 text-white">
            <div className="text-center">
              <h3 className="text-2xl font-bold">10+</h3>
              <p className="text-sm text-white/75">Years</p>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold">80k+</h3>
              <p className="text-sm text-white/75">Devotees</p>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold">100+</h3>
              <p className="text-sm text-white/75">Blessings</p>
            </div>
          </div> */}
        </div>

        {/* RIGHT COLUMN — fully centered */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-white">
            Sacred Spiritual Products
          </h2>

          <p className="text-white/80 text-sm mt-1">
            Blessed items for divine protection, peace, and spiritual growth
          </p>

          {/* solid circular backdrop */}
          <div className="relative mt-6 w-[300px] h-[220px] bg-white/15 rounded-full"></div>

          <div className="relative -mt-60 w-60 h-60">
            <Image
              src={p.image}
              alt=""
              fill
              className="object-contain drop-shadow-2xl transition-all duration-500"
            />
          </div>

          {/* product card */}
          <div className="bg-white p-6 rounded-2xl shadow-xl -mt-10 max-w-md text-center w-105">
            <h3 className="text-lg font-bold">{p.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{p.desc}</p>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-yellow-500">★★★★☆</div>
              <span className="text-lg font-bold">{p.price}</span>
            </div>
          </div>
          {/* BOTTOM BAR — centered and compact */}
          <div className="relative z-20 max-w-4xl mx-auto mt-3 bg-orange-200 rounded-2xl shadow-xl p-3 flex gap-4 justify-center right-15">
            {products.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActive(i)}
                className={`w-[150px] p-3 rounded-2xl transition-all ${
                  active === i ? "bg-orange-300 scale-105" : "bg-white"
                }`}
              >
                <div className="relative w-10 h-5 mx-auto">
                  <Image
                    src={item.thumb}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>

                <p className="text-xs font-semibold mt-2 text-gray-800 text-center">
                  {item.title.length > 22
                    ? item.title.slice(0, 22) + "..."
                    : item.title}
                </p>

                <p className="text-xs font-bold text-gray-800 text-center mt-1">
                  {item.price}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
