"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RequireAuth from "@/components/auth/RequireAuth";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutPage() {
  return (
    <RequireAuth>
      <CheckoutContent />
    </RequireAuth>
  );
}

function CheckoutContent() {
  const router = useRouter();
  const { items, getTotalPrice } = useCartStore();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items.length, router]);

  if (items.length === 0) return null;

  /* ================= VALIDATION ================= */
  const validateShipping = () => {
    if (!shippingInfo.fullName.trim()) return "Full name is required";
    if (!/^[6-9]\d{9}$/.test(shippingInfo.phone))
      return "Enter a valid 10-digit phone number";
    if (!shippingInfo.address.trim()) return "Address is required";
    if (!shippingInfo.city.trim()) return "City is required";
    if (!shippingInfo.state.trim()) return "State is required";
    if (!/^\d{6}$/.test(shippingInfo.pincode))
      return "Enter a valid 6-digit pincode";
    return null;
  };

  /* ================= PLACE ORDER (NO API YET) ================= */
  const placeOrderHandler = () => {
    setError("");

    const errorMsg = validateShipping();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    // NEXT STEP: API call will go here
    console.log("Address OK, ready to create order");
  };

  return (
    <div className="min-h-screen pt-18 px-4 bg-linear-to-b from-[#f8efe4] via-[#fdf6ee] to-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Shipping Address
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="input"
              value={shippingInfo.fullName}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, fullName: e.target.value })
              }
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="input"
              value={shippingInfo.phone}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, phone: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Address"
              className="input sm:col-span-2"
              value={shippingInfo.address}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, address: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="City"
              className="input"
              value={shippingInfo.city}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, city: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="State"
              className="input"
              value={shippingInfo.state}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, state: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Pincode"
              className="input"
              value={shippingInfo.pincode}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, pincode: e.target.value })
              }
            />
          </div>

          {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
        </div>

        {/* ================= RIGHT ================= */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow h-fit sticky top-32">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Order Summary
          </h2>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.variant}`}
                className="flex gap-4 items-center"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.variant} × {item.quantity}
                  </p>
                </div>

                <p className="text-sm font-medium">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t mt-6 pt-4 flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>₹{getTotalPrice()}</span>
          </div>

          <button
            onClick={placeOrderHandler}
            className="mt-6 w-full py-3 rounded-lg bg-[#C47A2C] text-white font-medium"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
