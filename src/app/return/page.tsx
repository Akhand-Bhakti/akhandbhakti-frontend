"use client";

import Link from "next/link";

const RefundCancellationPolicy = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 px-4 py-14">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">

        {/* Decorative Top Bar */}
        <div className="h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500"></div>

        {/* Header */}
        <div className="text-center px-6 sm:px-10 py-10 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold tracking-wide text-amber-900">
            REFUND & CANCELLATION POLICY
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
            At AkhandBhakti, we deal in sacred and spiritually energized products.
            Due to their personal and ritual nature, we follow a strict but
            transparent refund and cancellation policy.
          </p>

          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-4">
              1. Order Cancellation
            </h2>

            <p className="font-semibold mb-2">✅ Before Dispatch</p>
            <ul className="list-disc pl-10 space-y-2 mb-4">
              <li>Orders can be cancelled within 12 hours of placing the order</li>
              <li>Cancellation requests must be sent via email or WhatsApp</li>
              <li>
                Full refund will be processed if the order has not entered
                processing
              </li>
            </ul>

            <p className="font-semibold mb-2">❌ After Processing / Abhimantrit</p>
            <p className="mb-2">Orders cannot be cancelled once:</p>
            <ul className="list-disc pl-10 space-y-2">
              <li>Abhimantran process has started</li>
              <li>Product has been customized or energized</li>
              <li>Order has been dispatched</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-4">
              2. Refund Policy
            </h2>

            <p className="mb-3">
              Due to the sacred and personal nature of our products:
            </p>

            <p className="font-semibold mb-2">❌ Non-Refundable Items</p>
            <ul className="list-disc pl-10 space-y-2 mb-4">
              <li>Abhimantrit / energized products</li>
              <li>Rudraksha malas, beads, bracelets once delivered</li>
              <li>Used, opened, or worn items</li>
              <li>
                Products bought during special offers or discounts
              </li>
            </ul>

            <p className="font-semibold mb-2">✅ Refund Eligible (Rare Cases)</p>
            <p className="mb-2">Refunds may be considered only if:</p>
            <ul className="list-disc pl-10 space-y-2 mb-3">
              <li>Wrong product was delivered</li>
              <li>Product arrived damaged during transit</li>
            </ul>

            <p className="font-semibold">
              📌 Such issues must be reported within 48 hours of delivery, along
              with clear photos/videos.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-4">
              3. Refund Processing
            </h2>
            <ul className="list-disc pl-10 space-y-2">
              <li>
                Approved refunds are processed within 7–10 business days
              </li>
              <li>Refunds are made to the original payment method</li>
              <li>Shipping charges are non-refundable</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-3">
              4. Contact Us
            </h2>
            <p>
              If you have any questions about our use of cookies, please contact
              us:
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p>
                📧 Email:{" "} akhandbhaktiofficial@gmail.com</p>
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

export default RefundCancellationPolicy;
