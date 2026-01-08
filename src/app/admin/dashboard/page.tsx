"use client";

import { ShoppingCart, Package, Users, IndianRupee } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
}

function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>

      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
        <Icon size={20} />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">Overview of your store activity</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total Orders" value="128" icon={ShoppingCart} />
        <StatCard title="Total Revenue" value="₹1,24,500" icon={IndianRupee} />
        <StatCard title="Products" value="32" icon={Package} />
        <StatCard title="Users" value="540" icon={Users} />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Recent Orders</h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">Order ID</th>
              <th className="text-left px-4 py-3">Customer</th>
              <th className="text-left px-4 py-3">Amount</th>
              <th className="text-left px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {[
              { id: "#1023", name: "Rahul", amount: "₹1,200", status: "Paid" },
              { id: "#1024", name: "Amit", amount: "₹850", status: "Pending" },
              { id: "#1025", name: "Sita", amount: "₹2,100", status: "Paid" },
            ].map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-3">{order.id}</td>
                <td className="px-4 py-3">{order.name}</td>
                <td className="px-4 py-3">{order.amount}</td>
                <td className="px-4 py-3">
                  <span
                    className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${
                        order.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
