"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ravi Kishan",
    text: "Very Good Product",
    image: "/testimonial1.jpg",
  },
  {
    id: 2,
    name: "Amit Sharma",
    text: "Awesome Quality",
    image: "/testimonial2.jpg",
  },
  {
    id: 3,
    name: "Neha Verma",
    text: "Genuine Rudraksha",
    image: "/testimonial3.jpg",
  },
  {
    id: 4,
    name: "Suresh Patel",
    text: "Highly Recommended",
    image: "/testimonial4.jpg",
  },
];

//  Duplicate for infinite effect
const infiniteData = [...testimonials, ...testimonials];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  //  Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // eslint-disable-next-line react-hooks/immutability
      next();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const next = () => {
    setIndex((prev) => prev + 1);
  };

  const prev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // ✅ Reset smoothly for infinite loop
  useEffect(() => {
    if (index === testimonials.length) {
      setTimeout(() => {
        sliderRef.current!.style.transition = "none";
        setIndex(0);
        sliderRef.current!.style.transform = `translateX(0px)`;

        setTimeout(() => {
          sliderRef.current!.style.transition = "transform 0.6s ease";
        }, 50);
      }, 600);
    }
  }, [index]);

  return (
    <section className="w-full py-20 bg-[#FFF8EA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Heading */}
        <p className="text-center text-sm tracking-widest font-semibold mb-2">
          TESTIMONIAL
        </p>
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-2">
          Over 8,000 Happy Customers
        </h2>
        <p className="text-center text-gray-600 mb-4">
          with thousands of 5-star reviews
        </p>
        <div className="flex justify-center gap-1 mb-5">
          {[...Array(5)].map((_, idx) => (
            <Star
              key={idx}
              size={45}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-0 top-2/3 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={next}
          className="absolute right-0 top-2/3 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
        >
          <ChevronRight size={20} />
        </button>

        <div className="overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-6 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${index * 280}px)`,
            }}
          >
            {infiniteData.map((item, i) => (
              <div
                key={i}
                className="min-w-[260px] bg-white rounded-2xl p-5 text-center shadow-md"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="mx-auto rounded-xl mb-3"
                />

                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <h4 className="font-semibold text-sm">{item.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
