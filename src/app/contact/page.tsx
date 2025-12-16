"use client";

import Image from "next/image";
import { Phone, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="w-full bg-orange-200 pb-24">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 pt-26">
        <p className="text-orange-600 font-semibold mb-2">Om Namah Shivaya</p>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left: Text + Contact Cards */}
          <div>
            <h1 className="text-4xl font-bold text-[#7B3F07] leading-tight mb-4">
              Connect With Divine
              <br />
              Rudraksha
            </h1>

            <p className="text-gray-600 mb-8 max-w-md">
              Reach out to Guruji for personalized spiritual guidance, Rudraksha
              consultations, or any questions about your sacred journey.
            </p>

            {/* Call Card */}
            <div className="bg-white border rounded-xl p-5 shadow-md mb-5 flex items-center gap-4 hover:shadow-lg transition">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Phone className="text-orange-500" size={26} />
              </div>
              <div>
                <p className="font-semibold text-gray-700">Call Us</p>
                <p className="text-gray-600 text-sm">+91 98765 43210</p>
                <p className="text-gray-400 text-xs">
                  Mon - Sat, 9 AM - 7 PM IST
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white border rounded-xl p-5 shadow-md flex items-center gap-4 hover:shadow-lg transition">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Mail className="text-orange-500" size={26} />
              </div>
              <div>
                <p className="font-semibold text-gray-700">Email Us</p>
                <p className="text-gray-600 text-sm">
                  guruji@rudrakshaseva.com
                </p>
                <p className="text-gray-400 text-xs">
                  We respond within 24 hours
                </p>
              </div>
            </div>
          </div>

          {/* Right: Image Card */}
          <div className="bg-linear-to-b from-orange-200/40 to-orange-200/10 rounded-xl overflow-hidden shadow-lg absolute right-55">
            <Image
              src="/guruji.jpg"
              alt="Guruji"
              width={700}
              height={600}
              className="object-contain w-full h-[480px]"
            />

            {/* Quote Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-linear-to-t from-black/60 to-transparent">
              <p className="text-white text-lg italic">
                “Every question is a step towards enlightenment. We are here to
                guide you.”
              </p>
              <p className="text-white/80 text-sm mt-2">
                — Guruji Parameshwar Ananda
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="max-w-4xl mx-auto px-6 mt-24">
        <h2 className="text-3xl font-bold text-center text-[#7B3F07] mb-3">
          Send Your Message
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Fill out the form below and our spiritual team will get back to you
          with divine blessings
        </p>

        {/* Form Card */}
        <div className="bg-white border rounded-2xl shadow-lg p-8">
          <form className="space-y-5">
            {/* Inquiry Type */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Type of Inquiry
              </label>
              <select className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400">
                <option>General Inquiry</option>
                <option>Rudraksha Consultation</option>
                <option>Order Related</option>
              </select>
            </div>

            {/* Name + Phone */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter Your Name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                  placeholder="+91"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                placeholder="example@gmail.com"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                placeholder="What is your inquiry?"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Your Message
              </label>
              <textarea
                rows={5}
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                placeholder="Share your question or concern with us..."
              ></textarea>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition flex justify-center items-center gap-2"
            >
              Send Message
            </button>
          </form>

          <p className="text-center text-gray-500 mt-4 text-sm">
            Your message is safe with us — protected by our sacred guidance
          </p>
        </div>
      </div>
    </section>
  );
}
