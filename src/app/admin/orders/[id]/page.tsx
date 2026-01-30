"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdminOrderDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/admin/orders/${id}`, {
          withCredentials: true,
        });
        setOrder(data.order);
      } catch (err) {
        console.error(err);
        router.push("/admin/orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, router]);

  if (loading) return <p>Loading order details...</p>;
  if (!order) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Order Details</h1>

      {/* Customer */}
      <div className="bg-white p-4 rounded-xl border">
        <h2 className="font-semibold mb-2">Customer</h2>
        <p>{order.user?.name}</p>
        <p className="text-sm text-gray-500">{order.user?.email}</p>
      </div>

      {/* Shipping */}
      <div className="bg-white p-4 rounded-xl border">
        <h2 className="font-semibold mb-2">Shipping Address</h2>
        <p>{order.shippingInfo.address}</p>
        <p>
          {order.shippingInfo.city}, {order.shippingInfo.state} –{" "}
          {order.shippingInfo.pincode}
        </p>
        <p>{order.shippingInfo.country}</p>
        <p className="mt-1">📞 {order.shippingInfo.phoneNo}</p>
      </div>

      {/* Items */}
      <div className="bg-white p-4 rounded-xl border">
        <h2 className="font-semibold mb-3">Items</h2>
        <div className="space-y-2">
          {order.orderItems.map((item: any, i: number) => (
            <div key={i} className="flex justify-between text-sm">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment */}
      <div className="bg-white p-4 rounded-xl border">
        <h2 className="font-semibold mb-2">Payment</h2>
        <p>Status: {order.paymentInfo?.status}</p>
        <p>Total: ₹{order.totalPrice}</p>
      </div>

      {/* Order Status + Future Tracking */}
      <div className="bg-white p-4 rounded-xl border">
        <h2 className="font-semibold mb-2">Order Status</h2>
        <p>Current: {order.orderStatus}</p>

        {/* FUTURE: trackingId input */}
        {/* <input placeholder="Enter Tracking ID" /> */}
      </div>

      <button
        onClick={() => router.push("/admin/orders")}
        className="px-4 py-2 rounded-lg border"
      >
        Back to Orders
      </button>
    </div>
  );
}
