"use client";

import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  ShieldCheck,
  Truck,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1F2732] text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* ============================
            DESKTOP (5 Columns)
        ============================= */}
        <div className="hidden md:grid grid-cols-5 gap-10 mb-12">
          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Products</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link href="/products/rudraksha" className="hover:text-white">
                  Rudraksha
                </Link>
              </li>
              <li>
                <Link href="/products/karungali" className="hover:text-white">
                  Karungali
                </Link>
              </li>
              <li>
                <Link href="/products/moonga" className="hover:text-white">
                  Moonga
                </Link>
              </li>
              <li>
                <Link href="/products/bracelet" className="hover:text-white">
                  Bracelet
                </Link>
              </li>
              <li>
                <Link
                  href="/products/special-combo"
                  className="hover:text-white"
                >
                  Special Combo
                </Link>
              </li>
              <li>
                <Link href="/products/kamal-gatta" className="hover:text-white">
                  Kamal Gatta Mala
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Company</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/lab-testing" className="hover:text-white">
                  Lab Testing
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-white">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Customer Support</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              {/* <li>
                <Link href="/faq" className="hover:text-white">
                  FAQs
                </Link>
              </li> */}
              {/* <li>
                <Link href="/shipping" className="hover:text-white">
                  Shipping Information
                </Link>
              </li> */}
              <li>
                <Link href="/track-order" className="hover:text-white">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/payment-options" className="hover:text-white">
                  Payment Option
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Legal</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link href="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms & Condition
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-white">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/return" className="hover:text-white">
                  Return & Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex gap-2 items-start">
                <MapPin size={38} />
                <Link
                  href="https://maps.google.com/?q=C3,+Tyagi+Market,+Makanpur,+Indirapuram,+Ghaziabad,+201020"
                  className="hover:text-white"
                >
                  C3, Tyagi Market, Makanpur, Indirapuram,
                  <br />
                  Ghaziabad, Uttar Pradesh 201020
                </Link>
              </li>
              <li className="flex gap-2 items-center">
                <Phone size={18} /> +91 88824 70657
              </li>
              <li className="flex gap-2 items-center">
                <Mail size={22} className="text-white shrink-0" />
                <Link
                  href="mailto:akhandbhaktiofficial@gmail.com"
                  className="hover:text-white"
                >
                  akhandbhaktiofficial@gmail.com
                </Link>
              </li>
            </ul>

            {/* Social Icons */}
            <h3 className="font-semibold text-lg mt-6 mb-3">Follow us</h3>
            <div className="flex gap-4">
              <Facebook size={26} className="cursor-pointer hover:opacity-80" />
              <Instagram
                size={26}
                className="cursor-pointer hover:opacity-80"
              />
              <Youtube size={26} className="cursor-pointer hover:opacity-80" />
            </div>
          </div>
        </div>

        {/* ============================
            MOBILE (2 Column Layout)
        ============================= */}
        <div className="md:hidden grid grid-cols-2 gap-8 mb-12">
          {/* Left Column */}
          <div>
            <h3 className="font-semibold mb-3">Products</h3>
            <ul className="space-y-2 text-white/80">
              <li>Rudraksha</li>
              <li>Karungali</li>
              <li>Moonga</li>
              <li>Hybrid mala</li>
              <li>Bracelet</li>
            </ul>

            <h3 className="font-semibold mt-6 mb-3">Legal</h3>
            <ul className="space-y-2 text-white/80">
              <li>Privacy Policy</li>
              <li>Terms & Condition</li>
              <li>Cookie Policy</li>
            </ul>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-white/80">
              <li>About Us</li>
              <li>Our Story</li>
              <li>Lab Testing</li>
            </ul>

            <h3 className="font-semibold mt-6 mb-3">Support</h3>
            <ul className="space-y-2 text-white/80">
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Track Order</li>
            </ul>
          </div>
        </div>

        {/* Contact + Socials for mobile */}
        <div className="md:hidden mb-12">
          <h3 className="font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-3 text-white/80 mb-6">
            <li className="flex gap-2 items-start">
              <MapPin size={18} />
              C3, Tyagi Market, Makanpur, Indirapuram, Ghaziabad, Uttar Pradesh
              201020
            </li>
            <li className="flex gap-2 items-center">
              <Phone size={18} />
              +91 88824 70657
            </li>
            <li className="flex gap-2 items-center">
              <Mail size={18} /> akhandbhaktiofficial@gmail.com
            </li>
          </ul>

          <h3 className="font-semibold mb-3">Follow us</h3>
          <div className="flex gap-4">
            <Facebook size={26} />
            <Instagram size={26} />
            <Youtube size={26} />
          </div>
        </div>

        {/* ============================
            BOTTOM BAR (Badges)
        ============================= */}
        <div className="border-t border-white/20 pt-6 mt-4 flex flex-col md:flex-row gap-6 md:gap-0 justify-between">
          {/* Badge 1 */}
          <div className="flex items-center gap-3">
            <ShieldCheck />
            <div>
              <p className="font-semibold text-sm">100% Authentic</p>
              <p className="text-white/70 text-xs">Lab Certified</p>
            </div>
          </div>

          {/* Badge 2 */}
          <div className="flex items-center gap-3">
            <Truck />
            <div>
              <p className="font-semibold text-sm">Free Shipping</p>
              <p className="text-white/70 text-xs">On every Order</p>
            </div>
          </div>

          {/* Badge 3 */}
          <div className="flex items-center gap-3">
            <CreditCard />
            <div>
              <p className="font-semibold text-sm">Secure Payment</p>
              <p className="text-white/70 text-xs">SSL Encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
