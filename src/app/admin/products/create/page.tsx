"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

interface CreateProductPayload {
  name: string;
  slug: string;
  description: string;
  category: Category;
  displayOrder?: number;
  stock: number;
  tags: string[];
  mainImage: ImageField;
  gallery: ImageField[];
  pricing: {
    regions: {
      INDIA: {
        price: number;
        originalPrice?: number;
        currency: "INR";
      };
      REST_OF_WORLD: {
        price: number;
        originalPrice?: number;
        currency: "USD";
      };
    };
    countries: Record<string, never>;
  };
  howToUse: string[];
  keyFeatures: { label: string; value: string }[];
}

/* ---------------- Constants ---------------- */

const CATEGORIES: Category[] = [
  "rudraksha malas",
  "wearables",
  "rudraksha beads",
  "puja essentials",
];

const MAX_GALLERY_IMAGES = 5;

/* ---------------- Helpers ---------------- */

const generateSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

/* ---------------- Component ---------------- */

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Prices
  const [price, setPrice] = useState<number | "">("");
  const [originalPrice, setOriginalPrice] = useState<number | "">("");
  const [usdPrice, setUsdPrice] = useState<number | "">("");
  const [usdOriginalPrice, setUsdOriginalPrice] = useState<number | "">("");

  const [tagInput, setTagInput] = useState("");
  const [displayOrder, setDisplayOrder] = useState<number | "">("");

  const [form, setForm] = useState<CreateProductPayload>({
    name: "",
    slug: "",
    description: "",
    category: "rudraksha malas",
    stock: 1,
    tags: [],
    mainImage: {
      public_id: "",
      url: "",
    },
    gallery: [{ public_id: "", url: "" }],
    pricing: {
      regions: {
        INDIA: {
          price: 0,
          currency: "INR",
        },
        REST_OF_WORLD: {
          price: 0,
          currency: "USD",
        },
      },
      countries: {},
    },
    howToUse: [],
    keyFeatures: [],
  });

  /* ---------- Handlers ---------- */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "name") {
      setForm((prev) => ({
        ...prev,
        name: value,
        slug: generateSlug(value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  /* ---------- Tags ---------- */

  const addTag = () => {
    if (!tagInput.trim()) return;
    if (form.tags.includes(tagInput.trim())) return;

    setForm((prev) => ({
      ...prev,
      tags: [...prev.tags, tagInput.trim()],
    }));

    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  /* ---------- Gallery ---------- */

  const updateGallery = (
    index: number,
    field: keyof ImageField,
    value: string,
  ) => {
    const updated = [...form.gallery];
    updated[index] = { ...updated[index], [field]: value };
    setForm((prev) => ({ ...prev, gallery: updated }));
  };

  const addGalleryImage = () => {
    if (form.gallery.length >= MAX_GALLERY_IMAGES) return;
    setForm((prev) => ({
      ...prev,
      gallery: [...prev.gallery, { public_id: "", url: "" }],
    }));
  };

  const removeGalleryImage = (index: number) => {
    if (form.gallery.length <= 1) return;
    setForm((prev) => ({
      ...prev,
      gallery: form.gallery.filter((_, i) => i !== index),
    }));
  };

  /* ---------- Submit ---------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.mainImage.url || !form.mainImage.public_id) {
      alert("Main image is required");
      return;
    }

    if (price === "" || usdPrice === "") {
      alert("Please enter both INR and USD selling prices");
      return;
    }

    const payload: CreateProductPayload = {
      ...form,
      displayOrder: displayOrder === "" ? undefined : displayOrder,
      pricing: {
        regions: {
          INDIA: {
            price: Number(price),
            originalPrice:
              originalPrice === "" ? undefined : Number(originalPrice),
            currency: "INR",
          },
          REST_OF_WORLD: {
            price: Number(usdPrice),
            originalPrice:
              usdOriginalPrice === "" ? undefined : Number(usdOriginalPrice),
            currency: "USD",
          },
        },
        countries: {},
      },
    };

    try {
      setLoading(true);
      await api.post("/v1/admin/products/create", payload);
      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold">Create Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border p-6 space-y-6"
      >
        {/* Basic Fields */}
        <div className="grid md:grid-cols-2 gap-5">
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            name="slug"
            placeholder="Slug"
            value={form.slug}
            onChange={handleChange}
            required
            className="input bg-gray-50"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="input"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <input
            type="number"
            min={0}
            value={form.stock}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                stock: Number(e.target.value),
              }))
            }
            className="input"
          />

          <input
            type="number"
            placeholder="Display Order (e.g. 1 = first)"
            value={displayOrder}
            onChange={(e) =>
              setDisplayOrder(
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
            className="input"
          />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          placeholder="Description"
          required
          className="input"
        />

        <div>
          <h3 className="font-semibold mb-2">How To Use</h3>

          {form.howToUse.map((step, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                value={step}
                onChange={(e) => {
                  const updated = [...form.howToUse];
                  updated[index] = e.target.value;
                  setForm({ ...form, howToUse: updated });
                }}
                placeholder={`Step ${index + 1}`}
                className="input flex-1"
              />

              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    howToUse: form.howToUse.filter((_, i) => i !== index),
                  })
                }
                className="text-red-500 px-2"
              >
                ×
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setForm({ ...form, howToUse: [...form.howToUse, ""] })
            }
            className="text-sm text-blue-600"
          >
            + Add Step
          </button>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Key Features</h3>

          {form.keyFeatures.map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-2 mb-2">
              <input
                placeholder="Feature (e.g. Ruling Deity)"
                value={item.label}
                onChange={(e) => {
                  const updated = [...form.keyFeatures];
                  updated[index].label = e.target.value;
                  setForm({ ...form, keyFeatures: updated });
                }}
                className="input"
              />

              <input
                placeholder="Value (e.g. Lord Shiva)"
                value={item.value}
                onChange={(e) => {
                  const updated = [...form.keyFeatures];
                  updated[index].value = e.target.value;
                  setForm({ ...form, keyFeatures: updated });
                }}
                className="input"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setForm({
                ...form,
                keyFeatures: [...form.keyFeatures, { label: "", value: "" }],
              })
            }
            className="text-sm text-blue-600"
          >
            + Add Feature
          </button>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Main Image</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <input
              placeholder="Public ID"
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
              placeholder="Image URL"
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

        {/* Pricing */}
        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="number"
            placeholder="Selling Price – India (INR)"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="input"
          />

          <input
            type="number"
            placeholder="Original Price – India (Optional)"
            value={originalPrice}
            onChange={(e) =>
              setOriginalPrice(
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
            className="input"
          />

          <input
            type="number"
            placeholder="Selling Price – International (USD)"
            value={usdPrice}
            onChange={(e) =>
              setUsdPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="input"
          />

          <input
            type="number"
            placeholder="Original Price – International (Optional)"
            value={usdOriginalPrice}
            onChange={(e) =>
              setUsdOriginalPrice(
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
            className="input"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-orange-700 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Product"}
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
