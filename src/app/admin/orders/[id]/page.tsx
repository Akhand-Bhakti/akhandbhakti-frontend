"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Delhivery {
  status?: "pending" | "created" | "failed";
  waybill?: string;
  trackingUrl?: string;
  error?: string;
}

export default function AdminOrderDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<(any & { delhivery?: Delhivery }) | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [updating, setUpdating] = useState(false);
  const [delhiveryOrderId, setDelhiveryOrderId] = useState("");

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
        setDelhiveryOrderId(data.order.delhiveryOrderId || "");
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
  const finalStatus =
    order.delhivery?.status === "created"
      ? "Shipped"
      : trackingId
        ? "Shipped"
        : status;
  const isUnchanged =
    status === order.orderStatus &&
    trackingId === (order.trackingId || "") &&
    delhiveryOrderId === (order.delhiveryOrderId || "");

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

      {/* Delhivery Shipment */}
      <div className="bg-white p-4 rounded-xl border space-y-3">
        <h2 className="font-semibold">Delhivery Shipment</h2>

        <p>
          <strong>Status:</strong> {order.delhivery?.status || "Not Created"}
        </p>

        {order.delhivery?.waybill && (
          <p>
            <strong>Waybill:</strong>{" "}
            <span className="font-mono text-sm">{order.delhivery.waybill}</span>
          </p>
        )}

        {order.delhivery?.trackingUrl && (
          <a
            href={order.delhivery.trackingUrl}
            target="_blank"
            className="text-blue-600 underline text-sm"
          >
            Track Shipment
          </a>
        )}

        {order.delhivery?.error && (
          <p className="text-red-600 text-sm">Error: {order.delhivery.error}</p>
        )}

        {/* Retry Button */}
        {order.delhivery?.status === "created" && (
          <button
            disabled={updating}
            onClick={async () => {
              try {
                setUpdating(true);

                const { data } = await api.put(
                  `/orders/admin/orders/${order._id}/retry-shipment`,
                  {},
                  { withCredentials: true },
                );

                setOrder(data.order);
                setStatus(data.order.orderStatus);
                alert("Shipment retried successfully");
              } catch (err) {
                console.error(err);
                alert("Retry failed");
              } finally {
                setUpdating(false);
              }
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm disabled:opacity-50"
          >
            Retry Shipment
          </button>
        )}
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
            disabled={
              order.orderStatus === "Delivered" ||
              order.delhivery?.status === "created"
            }
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
            disabled={
              order.orderStatus === "Delivered" ||
              order.delhivery?.status === "created"
            }
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter tracking ID"
            className="w-full border rounded-lg px-3 py-2 text-sm disabled:bg-gray-100"
          />
        </div>
        {/* Delhivery Order ID */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Delhivery Order ID
          </label>
          <input
            value={delhiveryOrderId}
            disabled={
              order.orderStatus === "Delivered" ||
              order.delhivery?.status === "created"
            }
            onChange={(e) => setDelhiveryOrderId(e.target.value)}
            placeholder="Enter Delhivery Order ID"
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
                  delhiveryOrderId,
                },
                { withCredentials: true },
              );

              setOrder(data.order);
              setStatus(data.order.orderStatus);
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
