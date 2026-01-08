"use client";

const ShippingPolicy = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 px-4 py-14">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">

        {/* Decorative Top Bar */}
        <div className="h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500"></div>

        {/* Header */}
        <div className="text-center px-6 sm:px-10 py-10 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold tracking-wide text-amber-900">
            SHIPPING POLICY (INTERNATIONAL)
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
            AkhandBhakti ships spiritual products worldwide with care and
            devotion.
          </p>

          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-4">
              1. Order Processing Time
            </h2>
            <ul className="list-disc pl-10 space-y-2">
              <li>Orders are processed within 2–5 business days</li>
              <li>
                Abhimantrit products may require additional processing time
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-4">
              2. Estimated Delivery Time
            </h2>
            <ul className="list-disc pl-10 space-y-2 mb-3">
              <li>India: 3–7 business days</li>
              <li>
                International: 7–21 business days (depending on country & customs)
              </li>
            </ul>
            <p>
              Delivery timelines are estimates and not guaranteed.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-4">
              3. Shipping Partners
            </h2>
            <p>
              We use trusted courier and logistics partners for domestic and
              international shipping.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-4">
              4. Customs, Duties & Taxes
            </h2>
            <ul className="list-disc pl-10 space-y-2">
              <li>
                International orders may be subject to customs duties or import
                taxes
              </li>
              <li>These charges are borne by the customer</li>
              <li>
                AkhandBhakti is not responsible for customs delays or refusals
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide border-l-4 border-amber-500 pl-4 mb-4">
              5. Incorrect Address / Failed Delivery
            </h2>
            <ul className="list-disc pl-10 space-y-2">
              <li>
                Customers are responsible for providing accurate shipping
                details
              </li>
              <li>
                Failed deliveries due to incorrect information are not eligible
                for refund
              </li>
            </ul>
          </div>
        </div>

        {/* Decorative Footer Bar */}
        <div className="h-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500"></div>
      </div>
    </section>
  );
};

export default ShippingPolicy;
