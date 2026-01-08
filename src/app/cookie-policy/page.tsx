"use client";

import Link from "next/link";

const CookiePolicy = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 px-4 py-14">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">

        {/* Decorative Top Bar */}
        <div className="h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500"></div>

        {/* Header */}
        <div className="text-center px-6 sm:px-10 py-10 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold tracking-wide text-amber-900">
            COOKIE POLICY
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

          <p>
            This Cookie Policy explains how AkhandBhakti uses cookies and similar
            technologies when you visit our website.
          </p>

          <p>
            By continuing to browse or use our website, you consent to the use of
            cookies as described in this policy, unless you choose to disable
            them through your browser or cookie settings.
          </p>

          {/* Section */}
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-3">
              1. What Are Cookies?
            </h2>
            <p className="mb-3">
              Cookies are small text files stored on your device (computer,
              mobile, tablet) when you visit a website. They help websites:
            </p>
            <ul className="list-disc pl-10 space-y-2">
              <li>Function properly</li>
              <li>Remember user preferences</li>
              <li>Improve performance and security</li>
              <li>Analyze traffic and usage behavior</li>
            </ul>
            <p className="mt-3">
              Cookies do not contain personal information such as passwords or
              payment details.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-3">
              2. Why We Use Cookies
            </h2>
            <p className="mb-3">AkhandBhakti uses cookies to:</p>
            <ul className="list-disc pl-10 space-y-2">
              <li>Ensure smooth and secure website operation</li>
              <li>
                Enable essential features like cart, checkout, and login
              </li>
              <li>
                Understand how visitors interact with our website
              </li>
              <li>
                Improve content, layout, and user experience
              </li>
              <li>
                Remember language, region, and preference settings
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-3">
              3. Types of Cookies We Use
            </h2>

            <p className="font-semibold mt-4 mb-2">🔹 Essential Cookies</p>
            <p className="mb-2">
              These cookies are necessary for the website to function properly
              and cannot be disabled.
            </p>
            <p className="mb-2">They help with:</p>
            <ul className="list-disc pl-10 space-y-2 mb-3">
              <li>Page navigation</li>
              <li>Secure checkout</li>
              <li>Fraud prevention</li>
              <li>Session management</li>
            </ul>
            <p className="mb-4">
              Without these cookies, some parts of the website may not work
              correctly.
            </p>

            <p className="font-semibold mt-4 mb-2">🔹 Analytics Cookies</p>
            <p className="mb-2">These cookies help us understand:</p>
            <ul className="list-disc pl-10 space-y-2 mb-3">
              <li>Number of visitors</li>
              <li>Pages viewed</li>
              <li>Time spent on the website</li>
              <li>Traffic sources</li>
            </ul>
            <p className="mb-4">
              This information is aggregated and anonymous and helps us improve
              website performance and usability.
            </p>

            <p className="font-semibold mt-4 mb-2">🔹 Preference Cookies</p>
            <p className="mb-2">These cookies remember:</p>
            <ul className="list-disc pl-10 space-y-2 mb-4">
              <li>Language selection</li>
              <li>Country or region</li>
              <li>Display preferences</li>
            </ul>
            <p className="mb-4">
              They allow the website to provide a more personalized experience.
            </p>

            <p className="font-semibold mt-4 mb-2">
              🔹 Marketing & Third-Party Cookies (If Applicable)
            </p>
            <p className="mb-2">
              We may use limited third-party cookies from services such as:
            </p>
            <ul className="list-disc pl-10 space-y-2 mb-3">
              <li>Analytics tools</li>
              <li>Advertising platforms</li>
              <li>Social media integrations</li>
            </ul>
            <p className="mb-2">These cookies may be used to:</p>
            <ul className="list-disc pl-10 space-y-2 mb-3">
              <li>Show relevant advertisements</li>
              <li>Measure campaign effectiveness</li>
            </ul>
            <p>
              AkhandBhakti does not control third-party cookies, and their use is
              governed by the respective provider’s privacy policies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-3">
              4. How Long Cookies Are Stored
            </h2>
            <p className="mb-2">Cookies may be:</p>
            <ul className="list-disc pl-10 space-y-2">
              <li>
                Session cookies – deleted when you close your browser
              </li>
              <li>
                Persistent cookies – stored for a defined period or until
                manually deleted
              </li>
            </ul>
            <p className="mt-3">
              The duration depends on the purpose of each cookie.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-3">
              5. Managing or Disabling Cookies
            </h2>
            <p className="mb-2">
              You can manage or disable cookies at any time through your browser
              settings:
            </p>
            <ul className="list-disc pl-10 space-y-2 mb-3">
              <li>Accept or reject cookies</li>
              <li>Delete existing cookies</li>
              <li>Set alerts when cookies are being used</li>
            </ul>
            <p className="font-semibold mb-2">Please note:</p>
            <p>
              Disabling certain cookies may affect website functionality,
              including checkout, login, and personalized features.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-3">
              6. Changes to This Cookie Policy
            </h2>
            <p className="mb-2">
              We may update this Cookie Policy periodically to reflect:
            </p>
            <ul className="list-disc pl-10 space-y-2 mb-3">
              <li>Legal or regulatory changes</li>
              <li>Website functionality updates</li>
              <li>Technology changes</li>
            </ul>
            <p>
              Any updates will be posted on this page with a revised “Last
              Updated” date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-3">
              7. Contact Us
            </h2>
            <p>
              If you have any questions about our use of cookies, please contact
              us:
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p>
                📧 Email:{" "}
                  akhandbhaktiofficial@gmail.com</p>
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

export default CookiePolicy;
