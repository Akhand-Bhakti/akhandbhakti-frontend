"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";

/* ---------------- Types ---------------- */

type Category =
  | "rudraksha malas"
  | "wearables"
  | "rudraksha beads"
  | "puja essentials";

interface ImageField {
  public_id: string;
  url: string;
}

interface Pricing {
  regions: {
    INDIA?: {
      price: number;
      currency: "INR";
    };
    EUROPE?: {
      price: number;
      currency: "EUR";
    };
    MIDDLE_EAST?: {
      price: number;
      currency: "AED";
    };
    NORTH_AMERICA?: {
      price: number;
      currency: "USD";
    };
    REST_OF_WORLD?: {
      price: number;
      currency: "USD";
    };
  };
  countries: Record<
    string,
    {
      price: number;
      currency: string;
    }
  >;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: Category;
  stock: number;
  tags: string[];
  mainImage: ImageField;
  gallery: ImageField[];
  pricing: Pricing;
}

/* ---------------- Component ---------------- */

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const [form, setForm] = useState<Product | null>(null);

  /* ---------- Fetch product ---------- */

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/v1/product/${id}`);
      const product: Product = data.product;

      // Ensure pricing structure exists
      product.pricing = product.pricing || {
        regions: {},
        countries: {},
      };

      setForm(product);
    } catch (error) {
      alert("Failed to load product");
      router.push("/admin/products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading || !form) {
    return <p className="text-gray-500">Loading product...</p>;
  }

  /* ---------- Helpers ---------- */

  const updateRegionPrice = (
    region: keyof Pricing["regions"],
    field: "price",
    value: number
  ) => {
    setForm((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        pricing: {
          ...prev.pricing,
          regions: {
            ...prev.pricing.regions,
            [region]: {
              ...(prev.pricing.regions[region] || {
                currency:
                  region === "EUROPE"
                    ? "EUR"
                    : region === "MIDDLE_EAST"
                    ? "AED"
                    : region === "NORTH_AMERICA"
                    ? "USD"
                    : region === "REST_OF_WORLD"
                    ? "USD"
                    : "INR",
              }),
              [field]: value,
            },
          },
        },
      };
    });
  };

  /* ---------- Tags ---------- */

  const addTag = () => {
    if (!tagInput.trim()) return;
    if (form.tags.includes(tagInput.trim())) return;

    setForm({
      ...form,
      tags: [...form.tags, tagInput.trim()],
    });

    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setForm({
      ...form,
      tags: form.tags.filter((t) => t !== tag),
    });
  };

  /* ---------- Gallery ---------- */

  const updateGallery = (
    index: number,
    field: keyof ImageField,
    value: string
  ) => {
    const updated = [...form.gallery];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setForm({ ...form, gallery: updated });
  };

  const addGalleryImage = () => {
    if (form.gallery.length >= 5) return;

    setForm({
      ...form,
      gallery: [...form.gallery, { public_id: "", url: "" }],
    });
  };

  const removeGalleryImage = (index: number) => {
    if (form.gallery.length <= 1) return;

    setForm({
      ...form,
      gallery: form.gallery.filter((_, i) => i !== index),
    });
  };

  /* ---------- Submit ---------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.pricing?.regions?.INDIA?.price) {
      alert("India price is mandatory");
      return;
    }

    if (!form.pricing?.regions?.REST_OF_WORLD?.price) {
      alert("Default International (USD) price is mandatory");
      return;
    }

    try {
      setSaving(true);
      await api.put(`/v1/admin/product/${id}`, form);
      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold">Edit Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border p-6 space-y-6"
      >
        {/* Basic */}
        <div className="grid md:grid-cols-2 gap-5">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input"
          />

          <input
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="input"
          />

          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value as Category })
            }
            className="input"
          >
            <option>rudraksha malas</option>
            <option>wearables</option>
            <option>rudraksha beads</option>
            <option>puja essentials</option>
          </select>

          <input
            type="number"
            value={form.stock}
            onChange={(e) =>
              setForm({ ...form, stock: Number(e.target.value) })
            }
            className="input"
          />
        </div>

        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={5}
          className="input"
        />

        {/* ---------------- Pricing Section ---------------- */}

        <div className="space-y-4">
          <h3 className="font-semibold">Region Pricing</h3>

          {/* INDIA */}
          <div>
            <label className="text-sm font-medium">
              India (INR) — Required
            </label>
            <input
              type="number"
              value={form.pricing.regions.INDIA?.price || ""}
              onChange={(e) =>
                updateRegionPrice("INDIA", "price", Number(e.target.value))
              }
              className="input"
              required
            />
          </div>

          {/* EUROPE */}
          <div>
            <label className="text-sm font-medium">Europe (EUR)</label>
            <input
              type="number"
              value={form.pricing.regions.EUROPE?.price || ""}
              onChange={(e) =>
                updateRegionPrice("EUROPE", "price", Number(e.target.value))
              }
              className="input"
            />
          </div>

          {/* MIDDLE EAST */}
          <div>
            <label className="text-sm font-medium">Middle East (AED)</label>
            <input
              type="number"
              value={form.pricing.regions.MIDDLE_EAST?.price || ""}
              onChange={(e) =>
                updateRegionPrice(
                  "MIDDLE_EAST",
                  "price",
                  Number(e.target.value)
                )
              }
              className="input"
            />
          </div>

          {/* NORTH AMERICA */}
          <div>
            <label className="text-sm font-medium">North America (USD)</label>
            <input
              type="number"
              value={form.pricing.regions.NORTH_AMERICA?.price || ""}
              onChange={(e) =>
                updateRegionPrice(
                  "NORTH_AMERICA",
                  "price",
                  Number(e.target.value)
                )
              }
              className="input"
            />
          </div>
          {/* REST OF WORLD */}
          <div>
            <label className="text-sm font-medium">
              Default International (USD)
            </label>
            <input
              type="number"
              value={form.pricing.regions.REST_OF_WORLD?.price || ""}
              onChange={(e) =>
                updateRegionPrice(
                  "REST_OF_WORLD",
                  "price",
                  Number(e.target.value)
                )
              }
              className="input"
            />
          </div>
        </div>

        {/* ---------------- Tags ---------------- */}

        <div>
          <h3 className="font-semibold mb-2">Tags</h3>

          <div className="flex flex-wrap gap-2 mb-2">
            {form.tags.map((tag) => (
              <span
                key={tag}
                className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs flex items-center gap-1"
              >
                {tag}
                <button type="button" onClick={() => removeTag(tag)}>
                  ×
                </button>
              </span>
            ))}
          </div>

          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTag())
            }
            placeholder="Type tag and press Enter"
            className="input"
          />
        </div>

        {/* ---------------- Actions ---------------- */}

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-orange-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="border px-6 py-2 rounded-lg text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
