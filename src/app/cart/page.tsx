"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  return <CartContent />;
}

function CartContent() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-[#f8efe4] via-[#fdf6ee] to-white">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Your cart is empty</p>
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

  return (
    <div className="min-h-screen pt-8 px-4 bg-linear-to-b from-[#f8efe4] via-[#fdf6ee] to-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-[#C47A2C]">
          Your Cart
        </h1>

        {/* Cart Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-4 bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-xl object-cover"
              />

              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {item.currency} {item.price} × {item.quantity}
                </p>

                {/* Quantity Control */}
                <div className="mt-4">
                  <div className="inline-flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 disabled:opacity-40"
                    >
                      −
                    </button>

                    <span className="px-4 text-sm font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.stock}
                      className="px-3 py-1 disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between items-end">
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove
                </button>

                <p className="font-semibold text-gray-900">
                  {item.currency} {item.price} × {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div
          className="mt-8 bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow
          flex flex-col sm:flex-row justify-between items-center gap-4 sticky bottom-4"
        >
          <p className="text-lg font-medium">
            Subtotal: {items[0]?.currency} {getTotalPrice()}
          </p>

          <button
            onClick={() => router.push("/checkout")}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#C47A2C] text-white font-medium"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
