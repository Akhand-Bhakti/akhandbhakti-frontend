"use client";

import Link from "next/link";

const TermsAndConditions = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 px-4 py-14">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">

        {/* Decorative Top Bar */}
        <div className="h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500"></div>

        {/* Header */}
        <div className="text-center px-6 sm:px-10 py-10 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold tracking-wide text-amber-900">
            TERMS & CONDITIONS
          </h1>
          <div className="mt-3 text-xl font-bold text-gray-700">
            AkhandBhakti
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Last Updated: 15-01-2026
          </div>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-10 py-10 space-y-10 text-gray-800 leading-relaxed">

          <p className="text-base">
            By accessing or using this website, you agree to the following Terms &
            Conditions.
          </p>

          {/* Section */}
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-3">
              1. General Information
            </h2>
            <ul className="list-disc pl-10 space-y-2">
              <li>This website is operated by AkhandBhakti</li>
              <li>Services are available worldwide via the internet</li>
              <li>
                By placing an order, you confirm that you are legally capable of
                entering into a contract
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-3">
              2. Spiritual Nature Disclaimer
            </h2>
            <ul className="list-disc pl-10 space-y-2">
              <li>AkhandBhakti offers spiritual and religious products</li>
              <li>
                Any benefits described are based on traditional scriptures,
                beliefs, and practices
              </li>
              <li>
                Products are not medical, psychological, or financial remedies
              </li>
              <li>Results may vary from person to person</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-3">
              3. Product Information
            </h2>
            <ul className="list-disc pl-10 space-y-2">
              <li>
                Natural products such as Rudraksha may show slight variations in
                size, colour, and texture
              </li>
              <li>
                Product images are illustrative; natural variations are normal
                and not defects.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-3">
              4. Abhimantrit Products
            </h2>
            <ul className="list-disc pl-10 space-y-2">
              <li>
                Abhimantrit items are spiritually energized through traditional
                rituals
              </li>
              <li>Such products are prepared specifically for the buyer</li>
              <li>Once dispatched, they cannot be returned or refunded</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-3">
              5. Pricing & Payments
            </h2>
            <ul className="list-disc pl-10 space-y-2">
              <li>Prices are listed in applicable currencies</li>
              <li>We reserve the right to modify prices at any time</li>
              <li>
                Orders are processed only after successful payment confirmation
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-3">
              6. Shipping & Delivery (Worldwide)
            </h2>
            <ul className="list-disc pl-10 space-y-2">
              <li>Delivery timelines are estimates and may vary by country</li>
              <li>
                Customs duties, taxes, or import charges (if any) are the
                responsibility of the buyer
              </li>
              <li>
                We are not responsible for delays caused by customs or courier
                services
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-3">
              7. Returns & Refunds
            </h2>
            <p className="mb-3">
              Due to the sacred and personal nature of our products:
            </p>
            <ul className="list-disc pl-10 space-y-2">
              <li>Used, opened, or energized items are non-returnable</li>
              <li>
                Damaged or incorrect items must be reported within 48 hours of
                delivery
              </li>
              <li>
                Refund decisions are at AkhandBhakti’s sole discretion
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-3">
              8. Intellectual Property
            </h2>
            <p>
              All content, including text, images, designs, and logos, belongs to
              AkhandBhakti and may not be reproduced without written permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-3">
              9. Limitation of Liability
            </h2>
            <p className="mb-3">AkhandBhakti shall not be liable for:</p>
            <ul className="list-disc pl-10 space-y-2">
              <li>Individual interpretations of spiritual outcomes</li>
              <li>Indirect or consequential damages</li>
              <li>Misuse of products</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-3">
              10. Governing Law
            </h2>
            <p>
              These Terms are governed by international commercial principles,
              and where applicable, disputes shall be subject to the laws of
              India.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-3">
              11. Contact Information
            </h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p>
                📧 Email:{" "}
                  akhandbhaktiofficial@gmail.com
                
              </p>
              <p>
                🌐 Website:{" "}
                <Link
                  href={`/`}
                  className="text-orange-600 text-sm font-semibold mt-3 inline-block"
                >
                  www.akhandbhakti.com
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Footer Bar */}
        <div className="h-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500"></div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
