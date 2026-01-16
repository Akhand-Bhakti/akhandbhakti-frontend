"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Banner() {
  const products = [
    {
      id: 1,
      title: "Abhimantrit 5 Mukhi Rudraksha Mala (5mm) 108+1 Beads",
      desc: "Blessed Panchmukhi Rudraksha made for divine protection and peace.",
      price: "₹1551.00",
      image: "/prod11.png",
      thumb: "/prod11.png",
      bg: "linear-gradient(135deg,#5E2817,#C0653E)",
      slug: "abhimantrit-5-mukhi-rudraksha-mala-5mm-1081-beads",
    },
    {
      id: 2,
      title: "Abhimantrit 5 Mukhi Rudraksha Sumerni 27+1 Beads",
      desc: "Powerful Hanuman mala energised for courage and strength.",
      price: "₹1151.00",
      image: "/prod12.png",
      thumb: "/prod12.png",
      bg: "linear-gradient(135deg,#be4a1c,#842d14)",
      slug: "abhimantrit-5-mukhi-rudraksha-sumerni-271-beads",
    },
    {
      id: 3,
      title: "Abhimantrit 7 Mukhi Rudraksha Bead",
      desc: "Sacred Abhimantrit Jal for devotion and purity.",
      price: "₹1551.00",
      image: "/prod13.png",
      thumb: "/prod13.png",
      bg: "linear-gradient(135deg, #e0662e, #8c3519)",
      slug: "abhimantrit-7-mukhi-rudraksha-bead",
    },
    {
      id: 4,
      title: "Fresh Bhasm Potli 450 gm",
      desc: "Pure Bhimseni Kapoor for spiritual purification.",
      price: "₹551.00",
      image: "/prod14.png",
      thumb: "/prod14.png",
      bg: "linear-gradient(135deg,#666c73,#3e4349)",
      slug: "fresh-bhasm-potli-450-gm",
    },
  ];

  const [active, setActive] = useState(0);
  const p = products[active];
  const activeProduct = products[active];
  const router = useRouter();

  return (
    <section
      className="relative -mt-16 px-6 lg:px-16 py-12 w-full overflow-hidden min-h-screen flex items-center"
      style={{ background: p.bg }}
    >
      {/* static background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: "url('/home/bg-texture.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      {/* global-background-glow  */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0) 70%)",
        }}
      />

      <div
        className="relative z-10 mx-auto w-full
    max-w-6xl
    2xl:max-w-[1400px]
    grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10"
      >
        {/* LEFT COLUMN — fully centered */}
        <div className="flex flex-col items-center text-center">
          <div
            className="relative rounded-full overflow-hidden ring-10 ring-white/15 mt-10
  w-72 h-72
  2xl:w-[420px] 2xl:h-[420px]"
          >
            <Image
              src="/home/guru.JPG"
              alt="Guru"
              fill
              className="object-cover"
            />
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-white mt-6">
            A Step Towards Divine
          </h2>
          <p className="text-white/85 mt-2 max-w-sm">
            Bringing peace , growth and spritual connection to your life
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
            Divine Abhimantrit Prasad
          </h2>

          <p className="text-white/80 text-sm mt-1">
            Sacred items for divine protection, peace, and spiritual growth
          </p>

          {/* circular backdrop */}
          <div className="relative mt-6 w-[300px] h-[220px] bg-white/15 rounded-full"></div>

          {/* product image */}
          <div className="relative -mt-62 flex flex-col items-center">
            <div className="relative w-60 h-60 2xl:w-72 2xl:h-72">
              <Image
                src={activeProduct.image}
                alt={activeProduct.title}
                fill
                className="object-contain drop-shadow-2xl transition-all duration-500"
              />

              {/* SHOP NOW button */}
              <button
                onClick={() => router.push(`/product/${activeProduct.slug}`)}
                className="hidden md:flex absolute right-[-120px] top-[72%] -translate-y-1/2
    bg-orange-500 text-white text-sm font-semibold
    px-4 py-2 rounded-full shadow-lg
    hover:bg-orange-600 transition"
              >
                Shop Now →
              </button>
            </div>
            <button
              onClick={() => router.push(`/product/${activeProduct.slug}`)}
              className="
    md:hidden
    relative translate-y-57
    bg-orange-500 text-white text-sm font-semibold
    px-6 py-2 rounded-full shadow-md
    active:scale-95 transition
  "
            >
              Shop Now →
            </button>
          </div>

          {/* product card */}
          <div className="bg-white rounded-xl shadow-md -mt-8 mx-auto px-3 py-3 sm:px-4 sm:py-3 md:px-5 md:py-4 max-w-[90%] sm:max-w-sm md:max-w-md text-center">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 leading-tight">
              {activeProduct.title}
            </h3>

            {/* <div className="mt-4 flex items-center justify-between"> */}
            {/* <div className="text-yellow-500">★★★★☆</div> */}
            {/* <span className="text-lg font-bold">{activeProduct.price}</span> */}
            {/* </div> */}
          </div>
          {/* BOTTOM BAR — centered and compact */}
          <div
            className="
    relative z-20 mx-auto mt-3
    bg-orange-200 rounded-xl shadow-md
    px-2 py-2

    flex items-center gap-2
    overflow-x-auto

    max-w-full
    md:max-w-3xl

    scrollbar-hide
  "
          >
            {products.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActive(i)}
                title={item.title}
                className={`
    group
    flex-shrink-0
    rounded-lg
    transition-all duration-150

    ${active === i ? "bg-orange-300 scale-[1.06]" : "bg-white"}

    px-2 py-2
    sm:px-3 sm:py-2
    md:px-3 md:py-3

    min-w-[52px]
    sm:min-w-[72px]
    md:min-w-[110px]
  `}
              >
                {/* image */}
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 mx-auto">
                  <Image
                    src={item.thumb}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* title — minimal */}
                <p
                  className="
          mt-1
    text-[9px] sm:text-[10px] md:text-xs
    font-medium
    text-gray-800
    text-center

    max-w-[48px]
    sm:max-w-[68px]
    md:max-w-[100px]

    truncate
  
        "
                >
                  {item.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
