"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RequireAuth from "@/components/auth/RequireAuth";
import { useCartStore } from "@/store/cartStore";
import api from "@/lib/api";

export default function CheckoutPage() {
  return (
    <RequireAuth>
      <CheckoutContent />
    </RequireAuth>
  );
}

function CheckoutContent() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
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

  /* ================= PLACE ORDER (RAZORPAY STEP) ================= */
  const placeOrderHandler = async () => {
    setError("");

    const errorMsg = validateShipping();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    if (getTotalPrice() <= 0) {
      setError("Invalid cart total. Please refresh and try again.");
      return;
    }

    try {
      // 1️⃣ Create Razorpay order (backend)
      const { data } = await api.post(
        "/payment/create-order",
        {
          amount: getTotalPrice(), // backend expects amount
        },
        { withCredentials: true },
      );

      if (!data?.success) {
        throw new Error("Failed to initiate payment");
      }

      // 2️⃣ Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "Akhand Bhakti",
        description: "Spiritual Products Order",
        order_id: data.order.id,

        handler: async function (response: any) {
          try {
            const payload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,

              shippingInfo,
              orderItems: items.map((item) => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
                product: item.productId,
              })),

              totalPrice: getTotalPrice(),
            };

            const res = await api.post("/payment/verify-payment", payload, {
              withCredentials: true,
            });
            console.log("VERIFY RESPONSE 👉", res.data);
            if (data.success) {
              console.log("ORDER ID 👉", res.data.order?._id);
              clearCart(); // 🧹 clear cart
              router.push(`/order/${data.order._id}`); // 🎉 success page
            }
          } catch (err) {
            console.error(err);
            setError("Payment verification failed");
          }
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err: any) {
      console.error(err);
      setError("Payment initiation failed. Please try again.");
    }
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
            <input
              type="text"
              placeholder="Country"
              className="input"
              value={shippingInfo.country}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, country: e.target.value })
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
              <div key={item.productId} className="flex gap-4 items-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">Qty × {item.quantity}</p>
                </div>

                <p className="text-sm font-medium">
                  {item.currency} {item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t mt-6 pt-4 flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>
              {items[0]?.currency} {getTotalPrice()}
            </span>
          </div>

          <button
            onClick={placeOrderHandler}
            className="mt-6 w-full py-3 rounded-lg bg-[#C47A2C] text-white font-medium"
          >
            Place Order
          </button>
        </div>
      </div>
      <div className="mt-20 mb-20 flex items-center justify-center bg-linear-to-b">
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 rounded-lg bg-[#C47A2C] text-white"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
