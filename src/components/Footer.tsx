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
                <Link
                  href="/products?category=rudraksha%20malas"
                  className="hover:text-white"
                >
                  Rudraksha malas
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=wearables"
                  className="hover:text-white"
                >
                  Wearables
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=rudraksha%20beads"
                  className="hover:text-white"
                >
                  Rudraksha Beads
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=puja%20essentials"
                  className="hover:text-white"
                >
                  Puja essentials
                </Link>
              </li>
              {/* <li>
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
              </li> */}
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
                <Link href="#lab-testing" className="hover:text-white">
                  Lab Testing
                </Link>
              </li>
              {/* <li>
                <Link href="/testimonials" className="hover:text-white">
                  Testimonials
                </Link>
              </li> */}
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
              {/* <li>
                <Link href="/track-order" className="hover:text-white">
                  Track Your Order
                </Link>
              </li> */}
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
                  href="https://maps.app.goo.gl/zuCrcR6aiqg8u1iZA"
                  className="hover:text-white"
                >
                  Shiv shakti sadhna sthal, Makanpur
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
                  care@akhandbhakti.com
                </Link>
              </li>
            </ul>

            {/* Social Icons */}
            <h3 className="font-semibold text-lg mt-6 mb-3">Follow us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/akhandbhaktiofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition"
              >
                <Facebook size={26} />
              </a>
              <a
                href="https://www.instagram.com/akhandbhaktiofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition"
              >
                <Instagram size={26} />
              </a>
              <a
                href="https://www.youtube.com/@akhandbhaktiofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition"
              >
                <Youtube size={26} />
              </a>
            </div>
          </div>
        </div>

        {/* ============================
    MOBILE (STACKED – SAME AS DESKTOP)
============================= */}
        <div className="md:hidden space-y-10 mb-12">
          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Products</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link href="/products?category=rudraksha%20malas">
                  Rudraksha malas
                </Link>
              </li>
              <li>
                <Link href="/products?category=wearables">Wearables</Link>
              </li>
              <li>
                <Link href="/products?category=rudraksha%20beads">
                  Rudraksha Beads
                </Link>
              </li>
              <li>
                <Link href="/products?category=puja%20essentials">
                  Puja essentials
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Company</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="#lab-testing">Lab Testing</Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Customer Support</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/payment-options">Payment Option</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Legal</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms & Condition</Link>
              </li>
              <li>
                <Link href="/cookie-policy">Cookie Policy</Link>
              </li>
              <li>
                <Link href="/shipping">Shipping Policy</Link>
              </li>
              <li>
                <Link href="/return">Return & Refund Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex gap-2 items-start">
                <MapPin size={20} />
                <Link href="https://maps.app.goo.gl/zuCrcR6aiqg8u1iZA">
                  Shiv shakti sadhna sthal, Makanpur <br />
                  Ghaziabad, Uttar Pradesh 201020
                </Link>
              </li>
              <li className="flex gap-2 items-center">
                <Phone size={18} /> +91 88824 70657
              </li>
              <li className="flex gap-2 items-center">
                <Mail size={18} />
                <Link href="mailto:akhandbhaktiofficial@gmail.com">
                  care@akhandbhakti.com
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Follow us</h3>
            <div className="flex gap-5">
              <a
                href="https://www.facebook.com/akhandbhaktiofficial"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={26} />
              </a>
              <a
                href="https://www.instagram.com/akhandbhaktiofficial"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={26} />
              </a>
              <a
                href="https://www.youtube.com/@akhandbhaktiofficial"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube size={26} />
              </a>
            </div>
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
