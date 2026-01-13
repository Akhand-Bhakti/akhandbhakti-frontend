"use client";

import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      inquiryType: formData.get("inquiryType"),
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/appointment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("Message sent!");
  };

  const [loading, setLoading] = useState(false);

  return (
    <section className="w-full bg-orange-200 pb-16 md:pb-24">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 md:pt-16">
        <p className="text-orange-600 font-semibold mb-2 text-center md:text-left">
          Om Namah Shivaya
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-[#7B3F07] leading-tight mb-4">
              Connect With Akhand
              <br className="hidden md:block" />
              Bhakti
            </h1>

            <p className="text-gray-600 mb-8 max-w-md mx-auto md:mx-0">
              Reach out to Guruji for personalized spiritual guidance, Rudraksha
              consultations, or any questions about your sacred journey.
            </p>

            {/* Call Card */}
            <div className="bg-white border rounded-xl p-4 shadow-md mb-5 flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Phone className="text-orange-500" size={24} />
              </div>
              <div>
                <p className="font-semibold text-gray-700">Text Us</p>
                <p className="text-gray-600 text-sm">+91 88824 70657</p>
                <p className="text-gray-400 text-xs">
                  Mon - Sat, 9 AM - 7 PM IST
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white border rounded-xl p-4 shadow-md flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Mail className="text-orange-500" size={24} />
              </div>
              <div>
                <p className="font-semibold text-gray-700">Email Us</p>
                <p className="text-gray-600 text-sm break-all">
                  akhandbhaktioffical@gmail.com
                </p>
                <p className="text-gray-400 text-xs">
                  We respond within 24 hours
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative bg-gradient-to-b from-orange-200/40 to-orange-200/10 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/contact/contact.jpg"
              alt="Guruji"
              width={700}
              height={600}
              className="object-cover w-full h-[260px] sm:h-[320px] md:h-[480px]"
            />

            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white/80 text-sm">
                — Shri Shagun Vashishth Ji
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#7B3F07] mb-3">
          Connect with Us / Book Appointment
        </h2>

        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Fill out the form below and our spiritual team will get back to you
        </p>

        <div className="bg-white border rounded-2xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <select
              name="inquiryType"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            >
              <option>General Inquiry</option>
              <option>Book an Appointment</option>
              <option>Order Related</option>
              <option>Book Pujan</option>
            </select>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
              />

              <input
                type="text"
                name="phone"
                placeholder="+91"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            />

            <textarea
              rows={4}
              name="message"
              placeholder="Share your question or concern..."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-4 text-xs md:text-sm">
            Your message is safe with us
          </p>
        </div>
      </div>
    </section>
  );
}
