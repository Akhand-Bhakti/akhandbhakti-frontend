"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import RequireAuth from "@/components/auth/RequireAuth";
import { currencySymbol } from "../../../utils/currency";

export default function OrdersPage() {
  return (
    <RequireAuth>
      <OrdersContent />
    </RequireAuth>
  );
}

function OrdersContent() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders", {
          withCredentials: true,
        });
        setOrders(data.orders || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <p className="pt-32 text-center text-gray-500">Loading your orders…</p>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <p className="text-gray-600 mb-4">You haven’t placed any orders yet.</p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 rounded-lg bg-[#C47A2C] text-white"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 px-4 bg-gradient-to-b from-[#f8efe4] to-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">
          🧾 Your Orders
        </h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              {/* Left */}
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium break-all">{order._id}</p>

                <p className="mt-2 text-sm text-gray-600">
                  Items: {order.orderItems.length}
                </p>

                <p className="text-sm text-gray-600">
                  Status:{" "}
                  <span className="font-medium text-green-600">
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                </p>

                {/* Future-ready */}
                {order.trackingId && (
                  <p className="text-sm text-gray-600 mt-1">
                    Tracking ID:{" "}
                    <span className="font-medium">{order.trackingId}</span>
                  </p>
                )}
              </div>

              {/* Right */}
              <div className="flex flex-col items-start md:items-end gap-3">
                <p className="text-lg font-semibold">
                  {currencySymbol(order.currency)}
                  {order.totalPrice}
                </p>

                <button
                  onClick={() => router.push(`/order/${order._id}`)}
                  className="px-5 py-2 rounded-lg border border-[#C47A2C] text-[#C47A2C] hover:bg-[#C47A2C] hover:text-white transition"
                >
                  View Details
                </button>

                {/* Future: Track button */}
                {order.trackingId && (
                  <button className="text-sm underline text-gray-600">
                    Track Shipment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
