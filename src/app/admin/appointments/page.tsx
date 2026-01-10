"use client";

import { useEffect, useState } from "react";

interface Appointment {
  _id: string;
  inquiryType: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Appointment | null>(null);
  const handleStatusChange = async (id: string, newStatus: string) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/contact/appointment/${id}/status`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      }
    );

    setAppointments((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status: newStatus } : a))
    );

    if (selected && selected._id === id) {
      setSelected({ ...selected, status: newStatus });
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact/appointment`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      setAppointments(data.appointments || []);
      setLoading(false);
    };

    fetchAppointments();
  }, []);

  if (loading) return <p>Loading appointments...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Appointments / Messages</h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Inquiry</th>
              <th className="p-3">Message</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((a) => (
              <tr
                key={a._id}
                className="border-t cursor-pointer hover:bg-gray-50"
                onClick={() => {
                  setSelected(a);

                  if (a.status === "pending") {
                    handleStatusChange(a._id, "viewed");
                  }
                }}
              >
                <td className="p-3 font-medium">{a.name}</td>
                <td className="p-3">{a.phone}</td>
                <td className="p-3">{a.inquiryType}</td>
                <td className="p-3 max-w-xs truncate">{a.message}</td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-700">
                    {a.status}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(a.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Appointment Details</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <b>Name:</b> {selected.name}
              </p>
              <p>
                <b>Phone:</b> {selected.phone}
              </p>
              <p>
                <b>Email:</b> {selected.email}
              </p>
              <p>
                <b>Inquiry:</b> {selected.inquiryType}
              </p>
              <p>
                <b>Date:</b> {new Date(selected.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="mt-4">
              <p className="font-semibold mb-1">Message</p>
              <p className="text-gray-600 whitespace-pre-wrap bg-gray-50 p-3 rounded-lg">
                {selected.message}
              </p>
            </div>

            {/* Status */}
            <div className="mt-6">
              <label className="text-sm font-medium">Status</label>
              <select
                value={selected.status}
                onChange={(e) =>
                  handleStatusChange(selected._id, e.target.value)
                }
                className="w-full mt-1 p-2 border rounded-lg"
              >
                <option value="pending">Pending</option>
                <option value="viewed">Viewed</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
