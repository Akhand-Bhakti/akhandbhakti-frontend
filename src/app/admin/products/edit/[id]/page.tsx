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
  variants: {
    region: string;
    basePrice: number;
    currency: string;
  }[];
}

/* ---------------- Component ---------------- */

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [price, setPrice] = useState<number | "">("");
  const [tagInput, setTagInput] = useState("");

  const [form, setForm] = useState<Product | null>(null);

  /* ---------- Fetch product ---------- */

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/v1/product/${id}`);
      const product: Product = data.product;

      setForm(product);
      setPrice(product.variants?.[0]?.basePrice ?? "");
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

  /* ---------- Tags ---------- */

  const addTag = () => {
    if (!tagInput.trim() || !form) return;
    if (form.tags.includes(tagInput.trim())) return;

    setForm({
      ...form,
      tags: [...form.tags, tagInput.trim()],
    });

    setTagInput("");
  };

  const removeTag = (tag: string) => {
    if (!form) return;

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
    if (!form) return;

    const updated = [...form.gallery];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setForm({ ...form, gallery: updated });
  };

  const addGalleryImage = () => {
    if (!form || form.gallery.length >= 5) return;

    setForm({
      ...form,
      gallery: [...form.gallery, { public_id: "", url: "" }],
    });
  };

  const removeGalleryImage = (index: number) => {
    if (!form || form.gallery.length <= 1) return;

    setForm({
      ...form,
      gallery: form.gallery.filter((_, i) => i !== index),
    });
  };

  /* ---------- Submit ---------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    try {
      setSaving(true);

      const payload = {
        ...form,
        variants: [
          {
            region: "India",
            basePrice: Number(price),
            currency: "INR",
          },
        ],
      };

      await api.put(`/v1/admin/product/${id}`, payload);
      router.push("/admin/products");
    } catch (error) {
      alert("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- UI ---------------- */

  if (loading || !form) {
    return <p className="text-gray-500">Loading product...</p>;
  }

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

        {/* Main Image */}
        <div>
          <h3 className="font-semibold mb-2">Main Image</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <input
              value={form.mainImage.public_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  mainImage: {
                    ...form.mainImage,
                    public_id: e.target.value,
                  },
                })
              }
              className="input"
            />

            <input
              value={form.mainImage.url}
              onChange={(e) =>
                setForm({
                  ...form,
                  mainImage: {
                    ...form.mainImage,
                    url: e.target.value,
                  },
                })
              }
              className="input"
            />
          </div>
        </div>

        {/* Gallery */}
        <div>
          <h3 className="font-semibold mb-2">Gallery Images</h3>

          {form.gallery.map((img, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-3 mb-3">
              <input
                value={img.public_id}
                onChange={(e) =>
                  updateGallery(index, "public_id", e.target.value)
                }
                className="input"
              />

              <input
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

          {form.gallery.length < 5 && (
            <button
              type="button"
              onClick={addGalleryImage}
              className="text-sm text-blue-600"
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

        {/* Price */}
        <div>
          <h3 className="font-semibold mb-2">Price (INR)</h3>
          <input
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="input"
          />
        </div>

        {/* Actions */}
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
