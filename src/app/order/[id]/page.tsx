"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import RequireAuth from "@/components/auth/RequireAuth";
import { currencySymbol } from "../../../../utils/currency";

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

  const statusColor = (status: string) => {
    if (status === "Delivered") return "text-green-600";
    if (status === "Shipped") return "text-orange-600";
    return "text-gray-600";
  };

  if (loading)
    return (
      <p className="pt-32 text-center text-gray-500">
        Fetching your order details…
      </p>
    );

  if (!order) return null;

  return (
    <div className="min-h-screen pt-28 px-4 bg-gradient-to-b from-[#f8efe4] to-white">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-green-600">
            🙏 Order Confirmed
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Thank you for your purchase. Your devotion is on its way.
          </p>
        </div>

        {/* Order Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-[#faf7f2] rounded-xl p-4 mb-6">
          <div>
            <p className="text-gray-500">Order ID</p>
            <p className="font-medium break-all">{order._id}</p>
          </div>
          <div>
            <p className="text-gray-500">Payment Status</p>
            <p className="font-medium text-green-600">Paid</p>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-4">
          {order.orderItems.map((item: any, idx: number) => (
            <div
              key={idx}
              className="flex justify-between items-start border-b pb-3"
            >
              <div>
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p className="font-medium">
                {currencySymbol(order.currency)}
                {item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 flex justify-between text-lg font-semibold border-t pt-4">
          <span>Total Amount</span>
          <span>
            {currencySymbol(order.currency)}
            {order.totalPrice}
          </span>
        </div>

        {/* Order Status & Tracking */}
        <div className="mt-6 bg-[#faf7f2] rounded-xl p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Order Status</span>
            <span className={`font-medium ${statusColor(order.orderStatus)}`}>
              {order.orderStatus}
            </span>
          </div>

          {order.trackingId ? (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Tracking ID</span>
              <span className="font-medium">{order.trackingId}</span>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              🚚 Tracking details will be shared once your order is shipped.
            </p>
          )}

          {/* FUTURE: Delhivery link */}
          {order.trackingId &&
            (order.orderStatus === "Shipped" ||
              order.orderStatus === "Delivered") && (
              <button
                className="mt-2 w-full py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-900 transition"
                onClick={() => {
                  window.open(
                    `https://www.delhivery.com/track/package/${order.trackingId}`,
                    "_blank",
                  );
                }}
              >
                Track Shipment
              </button>
            )}
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-3">
          <button
            onClick={() => router.push("/orders")}
            className="w-full py-3 rounded-xl bg-[#C47A2C] text-white font-medium hover:bg-[#b06d26] transition"
          >
            View All Orders
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
