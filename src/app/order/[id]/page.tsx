"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import RequireAuth from "@/components/auth/RequireAuth";

export default function OrderPage() {
  return (
    <RequireAuth>
      <OrderContent />
    </RequireAuth>
  );
}

function OrderContent() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`, {
          withCredentials: true,
        });
        setOrder(data.order);
      } catch (err) {
        console.error(err);
        router.push("/orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, router]);

  if (loading) return <p className="pt-32 text-center">Loading order…</p>;
  if (!order) return null;

  return (
    <div className="min-h-screen pt-28 px-4 bg-linear-to-b from-[#f8efe4] to-white">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 shadow">
        <h1 className="text-2xl font-semibold text-green-600 mb-4">
          🎉 Order Placed Successfully
        </h1>

        <p className="text-sm text-gray-600 mb-6">
          Order ID: <span className="font-medium">{order._id}</span>
        </p>

        <div className="space-y-3 text-sm">
          {order.orderItems.map((item: any, idx: number) => (
            <div key={idx} className="flex justify-between">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{order.totalPrice}</span>
        </div>

        <button
          onClick={() => router.push("/orders")}
          className="mt-6 w-full py-3 rounded-lg bg-[#C47A2C] text-white"
        >
          View All Orders
        </button>
      </div>
    </div>
  );
}
