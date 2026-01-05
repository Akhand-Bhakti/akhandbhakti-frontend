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

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items.length, router]);

  // ✅ Safe render guard
  if (items.length === 0) return null;

  return (
    <div className="min-h-screen pt-28 px-4 bg-linear-to-b from-[#f8efe4] via-[#fdf6ee] to-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ================= LEFT: ADDRESS FORM ================= */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Shipping Address
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="input"
              value={address.fullName}
              onChange={(e) =>
                setAddress({ ...address, fullName: e.target.value })
              }
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="input"
              value={address.phone}
              onChange={(e) =>
                setAddress({ ...address, phone: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Address"
              className="input sm:col-span-2"
              value={address.addressLine}
              onChange={(e) =>
                setAddress({ ...address, addressLine: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="City"
              className="input"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />

            <input
              type="text"
              placeholder="State"
              className="input"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Pincode"
              className="input"
              value={address.pincode}
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
            />
          </div>
        </div>

        {/* ================= RIGHT: ORDER SUMMARY ================= */}
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
            disabled
            className="mt-6 w-full py-3 rounded-lg bg-gray-300 text-gray-600 font-medium cursor-not-allowed"
          >
            Place Order (Payment next)
          </button>
        </div>
      </div>
    </div>
  );
}
