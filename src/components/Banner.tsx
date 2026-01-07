"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
      slug: "1234",
    },
    {
      id: 2,
      title: "Abhimantrit Hanuman Mala",
      desc: "Powerful Hanuman mala energised for courage and strength.",
      price: "₹599.00",
      image: "/prod2.png",
      thumb: "/prod2.png",
      bg: "linear-gradient(135deg,#be4a1c,#842d14)",
      slug: "1234",
    },
    {
      id: 3,
      title: "Abhimantrit Jal",
      desc: "Sacred Abhimantrit Jal for devotion and purity.",
      price: "₹799.00",
      image: "/prod3.png",
      thumb: "/prod3.png",
      bg: "linear-gradient(135deg,#1e54e2,#1440b3)",
      slug: "1234",
    },
    {
      id: 4,
      title: "Abhimantrit Bhimseni Kapoor",
      desc: "Pure Bhimseni Kapoor for spiritual purification.",
      price: "₹599.00",
      image: "/prod4.png",
      thumb: "/prod4.png",
      bg: "linear-gradient(135deg,#666c73,#3e4349)",
      slug: "1234",
    },
  ];

  const [active, setActive] = useState(0);
  const p = products[active];
  const activeProduct = products[active];
  const router = useRouter();

  return (
    <section
      className="relative px-6 lg:px-16 py-12 w-full overflow-hidden min-h-screen flex items-center"
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
              src="/home/guru.jpg"
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
          <div className="relative -mt-60 flex flex-col items-center">
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
    relative translate-y-50
    bg-orange-500 text-white text-sm font-semibold
    px-6 py-2 rounded-full shadow-md
    active:scale-95 transition
  "
            >
              Shop Now →
            </button>
          </div>

          {/* product card */}
          <div className="bg-white p-6 rounded-2xl shadow-xl -mt-10 max-w-md text-center w-105">
            <h3 className="text-lg font-bold">{activeProduct.title}</h3>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-yellow-500">★★★★☆</div>
              <span className="text-lg font-bold">{activeProduct.price}</span>
            </div>
          </div>
          {/* BOTTOM BAR — centered and compact */}
          <div
            className="
  relative z-20 mx-auto mt-4
  bg-orange-200 rounded-2xl shadow-xl
  px-3 py-2
  flex gap-3
  overflow-x-auto
  max-w-full
  md:max-w-4xl
"
          >
            {products.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActive(i)}
                className={`
        shrink-0
        rounded-xl transition-all
        ${active === i ? "bg-orange-300 scale-105" : "bg-white"}
        p-2
        md:p-3
        w-16
        md:w-[150px]
      `}
              >
                {/* image */}
                <div className="relative w-8 h-8 md:w-10 md:h-10 mx-auto">
                  <Image
                    src={item.thumb}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* title & price — desktop only */}
                <div className="hidden md:block">
                  <p className="text-xs font-semibold mt-2 text-gray-800 text-center">
                    {item.title.length > 22
                      ? item.title.slice(0, 22) + "..."
                      : item.title}
                  </p>

                  <p className="text-xs font-bold text-gray-800 text-center mt-1">
                    {item.price}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
