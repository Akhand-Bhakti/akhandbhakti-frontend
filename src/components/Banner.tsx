"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Banner() {
  const products = [
    {
      id: 1,
      title: "Abhimantrit 5 Mukhi Rudraksha Mala (5mm) 108+1 Beads",
      image: "/prod11.png",
      thumb: "/prod11.png",
      bg: "linear-gradient(135deg,#5E2817,#C0653E)",
      slug: "abhimantrit-5-mukhi-rudraksha-mala-5mm-1081-beads",
    },
    {
      id: 2,
      title: "Abhimantrit 5 Mukhi Rudraksha Sumerni 27+1 Beads",
      image: "/prod12.png",
      thumb: "/prod12.png",
      bg: "linear-gradient(135deg,#be4a1c,#842d14)",
      slug: "abhimantrit-5-mukhi-rudraksha-sumerni-271-beads",
    },
    {
      id: 3,
      title: "Abhimantrit 7 Mukhi Rudraksha Bead",
      image: "/prod13.png",
      thumb: "/prod13.png",
      bg: "linear-gradient(135deg,#e0662e,#8c3519)",
      slug: "abhimantrit-7-mukhi-rudraksha-bead",
    },
    {
      id: 4,
      title: "Fresh Bhasm Potli 450 gm",
      image: "/prod14.png",
      thumb: "/prod14.png",
      bg: "linear-gradient(135deg,#666c73,#3e4349)",
      slug: "fresh-bhasm-potli-450-gm",
    },
  ];

  const [active, setActive] = useState(0);
  const product = products[active];
  const router = useRouter();

  return (
    <section
      className="relative -mt-16 w-full min-h-screen overflow-hidden flex items-center py-12"
      style={{ background: product.bg }}
    >
      {/* Background layers */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "url('/home/bg-pattern.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0 opacity-50 mix-blend-overlay"
        style={{
          backgroundImage: "url('/home/bg-texture.png')",
          backgroundSize: "cover",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0) 70%)",
        }}
      />

      {/* CONTENT */}
      <div
        className="
          relative z-10 mx-auto w-full
          max-w-6xl 2xl:max-w-[1400px]
          px-4 sm:px-6 lg:px-8
          grid grid-cols-1 lg:grid-cols-2
          gap-12 mt-10
        "
      >
        {/* LEFT */}
        <div className="flex flex-col items-center text-center">
          <div
            className="
              relative mt-10 rounded-full overflow-hidden
              ring-10 ring-white/15
              w-72 h-72 sm:w-80 sm:h-80
    2xl:w-[460px] 2xl:h-[460px]
            "
          >
            <Image
              src="/home/guru.JPG"
              alt="Guru"
              fill
              className="object-cover object-[center_30%]"
            />
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-white mt-6">
            A Step Towards Divine
          </h2>
          <p className="text-white/85 mt-2 max-w-sm">
            Bringing peace, growth and spiritual connection to your life
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-white">
            Divine Abhimantrit Prasad
          </h2>
          <p className="text-white/80 text-sm mt-1">
            Sacred items for divine protection, peace, and spiritual growth
          </p>

          {/* Backdrop */}
          <div className="relative mt-6 w-64 sm:w-72 md:w-80 h-44 sm:h-52 bg-white/15 rounded-full" />

          {/* Product */}
          <div className="relative -mt-46 sm:-mt-50 md:-mt-58 flex flex-col items-center">
            <div className="relative w-56 h-56 sm:w-60 sm:h-60 2xl:w-72 2xl:h-72">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain drop-shadow-2xl transition-all duration-500"
              />

              <button
                onClick={() => router.push(`/product/${product.slug}`)}
                className="
                  hidden md:flex absolute right-[-120px] top-[72%]
                  -translate-y-1/2
                  bg-orange-500 text-white text-sm font-semibold
                  px-4 py-2 rounded-full shadow-lg
                  hover:bg-orange-600 transition
                "
              >
                Shop Now →
              </button>
            </div>

            <button
              onClick={() => router.push(`/product/${product.slug}`)}
              className="
                md:hidden mb-10
                bg-orange-500 text-white text-sm font-semibold
                px-6 py-2 rounded-full shadow-md
                active:scale-95 transition
              "
            >
              Shop Now →
            </button>
          </div>

          {/* Product Card */}
          <div
            className="
              bg-white rounded-xl shadow-md
              -mt-6 sm:-mt-8
              mx-auto
              px-3 py-3 sm:px-4 md:px-5
              max-w-[90%] sm:max-w-sm md:max-w-md
              text-center
            "
          >
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 leading-tight">
              {product.title}
            </h3>
          </div>

          {/* Thumbnails */}
          <div
            className="relative z-20 mx-auto mt-4
    bg-orange-200 rounded-xl shadow-md
    px-2 py-2 sm:px-3 sm:py-3 lg:px-5 lg:py-4
    flex gap-2 sm:gap-3 lg:gap-4
    overflow-x-auto scrollbar-hide"
          >
            {products.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActive(i)}
                className={`rounded-lg px-2 py-2 sm:px-3 sm:py-2 lg:px-4 lg:py-3 transition ${
                  active === i ? "bg-orange-300 scale-105" : "bg-white"
                }`}
              >
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 lg:w-15 lg:h-15 mx-auto">
                  <Image src={item.thumb} alt={item.title} fill />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
