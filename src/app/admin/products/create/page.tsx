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
        currency: "INR";
      };
      REST_OF_WORLD: {
        price: number;
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
  const [price, setPrice] = useState<number | "">("");
  const [usdPrice, setUsdPrice] = useState<number | "">("");

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
    gallery: [
      {
        public_id: "",
        url: "",
      },
    ],
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
    >
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
    value: string
  ) => {
    const updated = [...form.gallery];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
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
      alert("Please enter both INR and USD prices");
      return;
    }

    const payload: CreateProductPayload = {
      ...form,
      pricing: {
        regions: {
          INDIA: {
            price: Number(price),
            currency: "INR",
          },
          REST_OF_WORLD: {
            price: Number(usdPrice),
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
          <div>
            <h3 className="font-semibold mb-2">Product Name</h3>
            <input
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Slug</h3>
            <input
              name="slug"
              placeholder="Slug"
              value={form.slug}
              onChange={handleChange}
              required
              className="input bg-gray-50"
            />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Category</h3>
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
          </div>

          <div>
            <h3 className="font-semibold mb-2">Stock Quantity</h3>
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
              placeholder="Stock"
              className="input"
            />
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            placeholder="Description"
            required
            className="input"
          />
        </div>

        {/* Main Image */}
        <div>
          <h3 className="font-semibold mb-2">Main Image</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <input
              placeholder="Public ID"
              value={form.mainImage.public_id}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  mainImage: {
                    ...prev.mainImage,
                    public_id: e.target.value,
                  },
                }))
              }
              className="input"
            />

            <input
              placeholder="Image URL"
              value={form.mainImage.url}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  mainImage: {
                    ...prev.mainImage,
                    url: e.target.value,
                  },
                }))
              }
              className="input"
            />
          </div>
        </div>

        {/* Gallery */}
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

        {/* Price */}
        <div>
          <h3 className="font-semibold mb-2">Base Price – India (INR)</h3>
          <input
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="input"
          />
        </div>
        <div>
          <h3 className="font-semibold mb-2">
            Default International Price – USD
          </h3>
          <input
            type="number"
            value={usdPrice}
            onChange={(e) =>
              setUsdPrice(e.target.value === "" ? "" : Number(e.target.value))
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
