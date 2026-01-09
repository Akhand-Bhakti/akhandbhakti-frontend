"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Package, Users, IndianRupee } from "lucide-react";
import { getDashboardStats } from "@/services/dashboardService";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

interface StatCardProps {
  title: string;
  value: string | number;
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
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  if (!stats) return <p className="p-10">Loading dashboard...</p>;

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Overview of your store performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={stats.stats.totalOrders}
          icon={ShoppingCart}
        />
        <StatCard
          title="Total Revenue"
          value={`₹${stats.stats.totalRevenue}`}
          icon={IndianRupee}
        />
        <StatCard title="Users" value={stats.stats.totalUsers} icon={Users} />
        <StatCard
          title="Products"
          value={stats.stats.totalProducts}
          icon={Package}
        />
        <StatCard
          title="Today Revenue"
          value={`₹${stats.stats.todayRevenue}`}
          icon={IndianRupee}
        />
        <StatCard
          title="Monthly Revenue"
          value={`₹${stats.stats.monthlyRevenue}`}
          icon={IndianRupee}
        />
        <StatCard
          title="Pending Orders"
          value={stats.stats.pendingOrders}
          icon={ShoppingCart}
        />
        <StatCard
          title="Delivered Orders"
          value={stats.stats.deliveredOrders}
          icon={ShoppingCart}
        />
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-xl p-5 border">
        <h2 className="font-semibold mb-4">Last 7 Days Sales</h2>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.salesLast7Days}>
              <XAxis dataKey="_id" />
              <Tooltip />
              <Line type="monotone" dataKey="total" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Recent Orders</h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">Order</th>
              <th className="text-left px-4 py-3">Customer</th>
              <th className="text-left px-4 py-3">Amount</th>
              <th className="text-left px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {stats.recentOrders.map((order: any) => (
              <tr key={order._id} className="border-t">
                <td className="px-4 py-3">#{order._id.slice(-6)}</td>
                <td className="px-4 py-3">{order.user?.name}</td>
                <td className="px-4 py-3">₹{order.totalPrice}</td>
                <td className="px-4 py-3">{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
