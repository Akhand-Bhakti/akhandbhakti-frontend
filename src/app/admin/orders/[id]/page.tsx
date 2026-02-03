"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdminOrderDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/admin/orders/${id}`, {
          withCredentials: true,
        });
        setOrder(data.order);
        setStatus(data.order.orderStatus);
        setTrackingId(data.order.trackingId || "");
      } catch (err) {
        console.error(err);
        router.push("/admin/orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, router]);

  const finalStatus = trackingId ? "Shipped" : status;

  if (loading) return <p>Loading order details...</p>;
  if (!order) return null;
  const isUnchanged =
    status === order.orderStatus && trackingId === (order.trackingId || "");

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
        <p className="mt-1">📞 {order.shippingInfo.phone || "N/A"}</p>
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
      {/* Order Fulfilment */}
      <div className="bg-white p-4 rounded-xl border space-y-4">
        <h2 className="font-semibold">Order Fulfilment</h2>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Order Status</label>
          <select
            value={status}
            disabled={order.orderStatus === "Delivered"}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm disabled:bg-gray-100"
          >
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        {/* Tracking ID */}
        <div>
          <label className="block text-sm font-medium mb-1">Tracking ID</label>
          <input
            value={trackingId}
            disabled={order.orderStatus === "Delivered"}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter tracking ID"
            className="w-full border rounded-lg px-3 py-2 text-sm disabled:bg-gray-100"
          />
        </div>

        {/* Save Button */}
        <button
          disabled={
            updating || order.orderStatus === "Delivered" || isUnchanged
          }
          onClick={async () => {
            try {
              setUpdating(true);

              const { data } = await api.put(
                `/orders/admin/orders/${order._id}`,
                {
                  orderStatus: finalStatus,
                  trackingId,
                },
                { withCredentials: true },
              );

              setOrder(data.order);
              alert("Order updated successfully");
            } catch (err) {
              console.error(err);
              alert("Failed to update order");
            } finally {
              setUpdating(false);
            }
          }}
          className="w-full py-2 rounded-lg bg-black text-white disabled:opacity-50"
        >
          {updating ? "Updating..." : "Save Changes"}
        </button>

        {order.orderStatus === "Delivered" && (
          <p className="text-sm text-green-600">
            ✅ Order delivered and locked
          </p>
        )}
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
