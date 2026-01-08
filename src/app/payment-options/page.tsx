"use client";

import Link from "next/link";


const PaymentOptions = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 px-4 py-14">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">

        {/* Decorative Top Bar */}
        <div className="h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500"></div>

        {/* Header */}
        <div className="text-center px-6 sm:px-10 py-10 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold tracking-wide text-amber-900">
            PAYMENT OPTIONS
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
            AkhandBhakti offers secure and convenient payment options to ensure a
            smooth and trusted shopping experience for customers worldwide.
          </p>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-4">
              Payment Options We Accept
            </h2>
            <p className="font-semibold mb-2">🔹 Online Payments</p>
            <ul className="list-disc pl-10 space-y-2">
              <li>Credit Cards (Visa, MasterCard, American Express)</li>
              <li>Debit Cards</li>
              <li>UPI (for India)</li>
              <li>Net Banking</li>
              <li>Wallets (as supported by payment gateway)</li>
              <li>International Cards (where applicable)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-4">
              International Payments
            </h2>
            <ul className="list-disc pl-10 space-y-2">
              <li>Payments accepted via international credit or debit cards</li>
              <li>Currency conversion handled by payment gateway or bank</li>
              <li>Additional charges may apply depending on bank or country</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-4">
              Payment Security
            </h2>
            <ul className="list-disc pl-10 space-y-2">
              <li>SSL-encrypted secure transactions</li>
              <li>No storage of card or banking details</li>
              <li>Processed via authorized payment gateways</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-4">
              Payment Confirmation
            </h2>
            <ul className="list-disc pl-10 space-y-2">
              <li>Orders confirmed only after successful payment</li>
              <li>Email confirmation sent after payment</li>
              <li>Unsuccessful payments do not create orders</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-4">
              Failed or Pending Payments
            </h2>
            <ul className="list-disc pl-10 space-y-2">
              <li>
                Debited amounts usually reversed within 3–7 business days
              </li>
              <li>
                Contact support if reversal is delayed
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-4">
              Pricing & Taxes
            </h2>
            <ul className="list-disc pl-10 space-y-2">
              <li>Prices listed in applicable currencies</li>
              <li>Taxes calculated at checkout</li>
              <li>Customs duties (if any) borne by customer</li>
            </ul>
          </div>

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

        {/* Decorative Footer Bar */}
        <div className="h-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500"></div>
      </div>
    </section>
  );
};

export default PaymentOptions;
