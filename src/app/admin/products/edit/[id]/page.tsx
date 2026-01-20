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
    INDIA?: { price: number; currency: "INR" };
    EUROPE?: { price: number; currency: "EUR" };
    MIDDLE_EAST?: { price: number; currency: "AED" };
    NORTH_AMERICA?: { price: number; currency: "USD" };
    REST_OF_WORLD?: { price: number; currency: "USD" };
  };
  countries: Record<string, { price: number; currency: string }>;
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

const MAX_GALLERY_IMAGES = 5;

/* ---------------- Component ---------------- */

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [form, setForm] = useState<Product | null>(null);

  /* ---------- Helpers ---------- */

  const normalizePricing = (pricing?: Pricing): Pricing => ({
    regions: {
      INDIA: pricing?.regions?.INDIA ?? { price: 0, currency: "INR" },
      EUROPE: pricing?.regions?.EUROPE ?? { price: 0, currency: "EUR" },
      MIDDLE_EAST: pricing?.regions?.MIDDLE_EAST ?? {
        price: 0,
        currency: "AED",
      },
      NORTH_AMERICA: pricing?.regions?.NORTH_AMERICA ?? {
        price: 0,
        currency: "USD",
      },
      REST_OF_WORLD: pricing?.regions?.REST_OF_WORLD ?? {
        price: 0,
        currency: "USD",
      },
    },
    countries: pricing?.countries ?? {},
  });

  /* ---------- Fetch product ---------- */

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/v1/product/${id}`);
      const product: Product = data.product;

      product.pricing = normalizePricing(product.pricing);
      product.gallery =
        product.gallery && product.gallery.length > 0
          ? product.gallery
          : [{ public_id: "", url: "" }];

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

  /* ---------- Pricing ---------- */

  const updateRegionPrice = (
    region: keyof Pricing["regions"],
    value: number,
  ) => {
    setForm((prev) =>
      prev
        ? {
            ...prev,
            pricing: {
              ...prev.pricing,
              regions: {
                ...prev.pricing.regions,
                [region]: {
                  ...prev.pricing.regions[region]!,
                  price: value,
                },
              },
            },
          }
        : prev,
    );
  };

  /* ---------- Tags ---------- */

  const addTag = () => {
    if (!tagInput.trim() || form.tags.includes(tagInput.trim())) return;
    setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  };

  /* ---------- Gallery ---------- */

  const updateGallery = (
    index: number,
    field: keyof ImageField,
    value: string,
  ) => {
    const updated = [...form.gallery];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, gallery: updated });
  };

  const addGalleryImage = () => {
    if (form.gallery.length >= MAX_GALLERY_IMAGES) return;
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

    if (!form.pricing.regions.INDIA?.price) {
      alert("India price is mandatory");
      return;
    }

    if (!form.pricing.regions.REST_OF_WORLD?.price) {
      alert("International price is mandatory");
      return;
    }

    try {
      setSaving(true);
      await api.put(`/v1/admin/product/${id}`, form);
      router.push("/admin/products");
    } catch (error) {
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

        {/* Pricing */}
        <div className="space-y-4">
          <h3 className="font-semibold">Region Pricing</h3>

          {(
            [
              ["INDIA", "India (INR)"],
              ["EUROPE", "Europe (EUR)"],
              ["MIDDLE_EAST", "Middle East (AED)"],
              ["NORTH_AMERICA", "North America (USD)"],
              ["REST_OF_WORLD", "International (USD)"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label className="text-sm font-medium">{label}</label>
              <input
                type="number"
                value={form.pricing.regions[key]?.price || ""}
                onChange={(e) => updateRegionPrice(key, Number(e.target.value))}
                className="input"
              />
            </div>
          ))}
        </div>

        {/* Gallery (same as Create) */}
        <div>
          <h3 className="font-semibold mb-2">Gallery Images</h3>

          <div className="space-y-3">
            {form.gallery.map((img, index) => (
              <div
                key={index}
                className="grid md:grid-cols-2 gap-3 items-center"
              >
                <input
                  placeholder="Public ID"
                  value={img.public_id}
                  onChange={(e) =>
                    updateGallery(index, "public_id", e.target.value)
                  }
                  className="input"
                />

                <input
                  placeholder="Image URL"
                  value={img.url}
                  onChange={(e) => updateGallery(index, "url", e.target.value)}
                  className="input"
                />

                {form.gallery.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="text-red-600 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {form.gallery.length < MAX_GALLERY_IMAGES && (
            <button
              type="button"
              onClick={addGalleryImage}
              className="mt-3 text-sm text-blue-600"
            >
              + Add Image
            </button>
          )}
        </div>

        {/* Tags */}
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

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg text-sm"
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
