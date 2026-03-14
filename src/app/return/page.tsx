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
            At AkhandBhakti, we deal in sacred, spiritual, and Abhimantrit
            (energized) products. All items are specially prepared after the
            order is placed. Therefore, all orders are considered final once
            placed and we follow a strict no-cancellation and no-return policy.
          </p>

          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-4">
              1. Order Cancellation
            </h2>

            <p className="font-semibold mb-2">❌ No Cancellation Policy</p>
            <ul className="list-disc pl-10 space-y-2 mb-4">
              <li>Orders cannot be cancelled once they are placed</li>
              <li>All orders are processed immediately after confirmation</li>
              <li>
                Cancellation is not allowed for any reason after order placement
              </li>
              <li>This applies to all domestic and international orders</li>
            </ul>

            <p className="mb-2">
              Since our products are religious, Abhimantrit, and prepared
              specially for the customer, once the order is placed it is
              considered final.
            </p>

            <ul className="list-disc pl-10 space-y-2">
              <li>No cancellation after order confirmation</li>
              <li>No cancellation after packing</li>
              <li>No cancellation after dispatch</li>
              <li>No cancellation after Abhimantran / energizing</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-4">
              2. Refund Policy
            </h2>

            <p className="mb-3">
              Due to the sacred and personalized nature of our products, refunds
              are not provided once the order is placed, processed, or
              dispatched.
            </p>

            <p className="font-semibold mb-2">❌ Non-Refundable Items</p>
            <ul className="list-disc pl-10 space-y-2 mb-4">
              <li>All Abhimantrit / energized products</li>
              <li>
                Rudraksha malas, beads, bracelets, kavach, or spiritual items
              </li>
              <li>Orders once placed on the website</li>
              <li>Orders once dispatched from our office</li>
              <li>Orders refused or not accepted by customer</li>
              <li>Incorrect address provided by customer</li>
              <li>International shipments once shipped</li>
              <li>Products bought during special offers or discounts</li>
            </ul>

            <p className="font-semibold mb-2">
              ✅ Refund Eligible (Very Rare Cases)
            </p>
            <p className="mb-2">Refund may be considered only if:</p>
            <ul className="list-disc pl-10 space-y-2 mb-3">
              <li>Wrong product was sent by our team</li>
            </ul>

            <p className="font-semibold">
              📌 Issue must be reported within 24 hours of delivery with photo /
              video proof.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-4">
              3. Refund Processing
            </h2>
            <ul className="list-disc pl-10 space-y-2">
              <li>
                Refund will only be processed if approved after verification
              </li>
              <li>No refund will be given after order placement</li>
              <li>No refund after dispatch under any condition</li>
              <li>Shipping and payment charges are non-refundable</li>
              <li>
                Courier delay, customs hold, or non-acceptance is not eligible
                for refund
              </li>
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
              <p>📧 Email: akhandbhaktiofficial@gmail.com</p>
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
