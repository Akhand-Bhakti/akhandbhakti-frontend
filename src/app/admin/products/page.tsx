"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  category: string;
  status: "active" | "hidden";
  internationalVisibility: boolean;
  pricing: {
    regions: {
      INDIA?: {
        price: number;
        currency: string;
      };
      REST_OF_WORLD?: {
        price: number;
        currency: string;
      };
    };
  };
  createdAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/v1/admin/products");
      setProducts(data.products);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);
      await api.delete(`/v1/admin/product/${deleteId}`);
      setDeleteId(null);
      fetchProducts(); // refresh list
    } catch (error) {
      alert("Failed to delete product");
    } finally {
      setDeleting(false);
    }
  };

  const toggleStatus = async (product: Product) => {
    const newStatus = product.status === "active" ? "hidden" : "active";

    try {
      // optimistic UI update
      setProducts((prev) =>
        prev.map((p) =>
          p._id === product._id ? { ...p, status: newStatus } : p,
        ),
      );

      await api.put(`/v1/admin/product/${product._id}`, {
        status: newStatus,
      });
    } catch (error) {
      alert("Failed to update status");

      // rollback if failed
      setProducts((prev) =>
        prev.map((p) =>
          p._id === product._id ? { ...p, status: product.status } : p,
        ),
      );
    }
  };

  const toggleInternationalVisibility = async (product: Product) => {
    const newValue = !product.internationalVisibility;

    try {
      // optimistic UI
      setProducts((prev) =>
        prev.map((p) =>
          p._id === product._id
            ? { ...p, internationalVisibility: newValue }
            : p,
        ),
      );

      await api.put(`/v1/admin/product/${product._id}`, {
        internationalVisibility: newValue,
      });
    } catch (error) {
      alert("Failed to update international visibility");

      // rollback
      setProducts((prev) =>
        prev.map((p) =>
          p._id === product._id
            ? { ...p, internationalVisibility: product.internationalVisibility }
            : p,
        ),
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading products...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-gray-500">Manage all store products</p>
        </div>

        <button
          onClick={() => router.push("/admin/products/create")}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-700 transition"
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {products.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No products found.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Category</th>
                <th className="text-left px-4 py-3">Price</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Created</th>
                <th className="text-right px-4 py-3">Actions</th>
                <th className="text-left px-4 py-3">International</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => {
                const price =
                  product.pricing?.regions?.INDIA?.price ??
                  product.pricing?.regions?.REST_OF_WORLD?.price ??
                  0;

                const currency =
                  product.pricing?.regions?.INDIA?.currency ??
                  product.pricing?.regions?.REST_OF_WORLD?.currency ??
                  "INR";

                return (
                  <tr key={product._id} className="border-t">
                    <td className="px-4 py-3 font-medium">{product.name}</td>

                    <td className="px-4 py-3 capitalize">{product.category}</td>

                    <td className="px-4 py-3">
                      {currency} {price}
                    </td>

                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleStatus(product)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition
                        ${
                          product.status === "active"
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }
                        `}
                      >
                        {product.status === "active" ? "Active" : "Hidden"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleInternationalVisibility(product)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition
      ${
        product.internationalVisibility
          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
          : "bg-orange-100 text-orange-700 hover:bg-orange-200"
      }
    `}
                      >
                        {product.internationalVisibility
                          ? "International"
                          : "India Only"}
                      </button>
                    </td>

                    <td className="px-4 py-3 text-gray-500">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3 text-right space-x-3">
                      <button
                        onClick={() =>
                          router.push(`/admin/products/edit/${product._id}`)
                        }
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => setDeleteId(product._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[360px] shadow-xl">
            <h3 className="text-lg font-semibold">Delete product?</h3>

            <p className="text-sm text-gray-600 mt-2">
              This action cannot be undone.
            </p>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg border text-sm"
                disabled={deleting}
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 disabled:opacity-60"
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
