"use client";

import Link from "next/link";

export default function privacy() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-linear-to-br from-amber-50 via-white to-amber-100">
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-md shadow-2xl border border-amber-200 rounded-2xl p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-wide text-amber-900">
            Privacy Policy
          </h1>

          <p className="text-lg font-semibold text-gray-700 mt-1">
            AkhandBhakti
          </p>

          <p className="text-sm text-gray-600 mt-2">
            <span className="font-semibold">Last Updated:</span> 15-01-2026
          </p>
        </div>

        {/* Intro */}
        <p className="text-gray-700 leading-relaxed mb-6 text-center">
          Welcome to <span className="font-semibold">AkhandBhakti</span>. Your
          privacy is sacred to us. This Privacy Policy explains how we collect,
          use, protect, and share your information when you visit or make a
          purchase from our website.
        </p>

        {/* Section Wrapper */}
        <div className="space-y-6 text-gray-800">
          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-bold text-amber-900 mb-2">
              1. Information We Collect
            </h2>

            <h3 className="font-semibold mb-1">a) Personal Information</h3>
            <p>When you interact with our website, we may collect:</p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone / WhatsApp number</li>
              <li>Billing and shipping address</li>
              <li>Order details</li>
            </ul>

            <p className="mt-2 text-gray-700">
              Payment information is processed securely via third-party
              gateways. We do not store card or bank details.
            </p>

            <h3 className="font-semibold mt-3 mb-1">
              b) Automatically Collected Information
            </h3>

            <ul className="list-disc ml-6 space-y-1">
              <li>IP address</li>
              <li>Browser type &amp; device details</li>
              <li>Pages visited, time spent, referral source</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-bold text-amber-900 mb-2">
              2. How We Use Your Information
            </h2>

            <p>We use your information to:</p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Process and deliver orders worldwide</li>
              <li>Communicate order updates and support queries</li>
              <li>Provide spiritual consultation (if requested)</li>
              <li>Improve website experience and performance</li>
              <li>Meet legal and regulatory requirements</li>
            </ul>

            <p className="mt-2 font-medium text-green-700">
              We never sell or trade your personal data.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-bold text-amber-900 mb-2">
              3. International Data Usage
            </h2>
            <p>
              As AkhandBhakti serves customers globally, your information may be
              processed in countries outside your location. We ensure reasonable
              security measures are in place to protect your data at all times.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-bold text-amber-900 mb-2">
              4. Cookies &amp; Tracking Technologies
            </h2>

            <p>We use cookies to:</p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Enable essential site functionality</li>
              <li>Analyze website traffic</li>
              <li>Remember user preferences</li>
            </ul>

            <p className="mt-2">
              You may disable cookies through your browser settings.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-bold text-amber-900 mb-2">
              5. Data Security
            </h2>
            <p>
              We use industry-standard safeguards to protect your personal
              information from unauthorized access, misuse, or disclosure.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-xl font-bold text-amber-900 mb-2">
              6. Your Rights
            </h2>

            <p>Depending on your location, you may have the right to:</p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Withdraw consent for marketing communications</li>
            </ul>

            <p className="mt-2">
              To exercise your rights, contact us using the details below.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-xl font-bold text-amber-900 mb-2">
              7. Contact Us
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
      </div>
    </div>
  );
}
