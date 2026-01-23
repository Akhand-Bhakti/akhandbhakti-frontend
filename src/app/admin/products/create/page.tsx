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
