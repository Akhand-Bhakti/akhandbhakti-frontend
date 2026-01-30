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

interface RegionPrice {
  price: number;
  originalPrice?: number;
  currency: string;
}

interface Pricing {
  regions: {
    INDIA?: RegionPrice;
    EUROPE?: RegionPrice;
    MIDDLE_EAST?: RegionPrice;
    NORTH_AMERICA?: RegionPrice;
    REST_OF_WORLD?: RegionPrice;
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
  displayOrder?: number;
  tags: string[];
  mainImage: ImageField;
  gallery: ImageField[];
  pricing: Pricing;
  howToUse: string[];
  keyFeatures: { label: string; value: string }[];
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

  const getRegion = (
    pricing: Pricing | undefined,
    key: keyof Pricing["regions"],
  ) => {
    const regions: any = pricing?.regions;

    if (regions && regions[key]) return regions[key];
    if (regions && typeof regions.get === "function") {
      return regions.get(key);
    }
    return undefined;
  };

  const normalizePricing = (pricing?: Pricing): Pricing => ({
    regions: {
      INDIA: getRegion(pricing, "INDIA") ?? {
        price: 0,
        originalPrice: undefined,
        currency: "INR",
      },
      EUROPE: getRegion(pricing, "EUROPE") ?? {
        price: 0,
        originalPrice: undefined,
        currency: "EUR",
      },
      MIDDLE_EAST: getRegion(pricing, "MIDDLE_EAST") ?? {
        price: 0,
        originalPrice: undefined,
        currency: "AED",
      },
      NORTH_AMERICA: getRegion(pricing, "NORTH_AMERICA") ?? {
        price: 0,
        originalPrice: undefined,
        currency: "USD",
      },
      REST_OF_WORLD: getRegion(pricing, "REST_OF_WORLD") ?? {
        price: 0,
        originalPrice: undefined,
        currency: "USD",
      },
    },
    countries: pricing?.countries ?? {},
  });

  /* ---------- Fetch ---------- */

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/v1/admin/product/${id}`);
      const product: Product = data.product;

      product.pricing = normalizePricing(product.pricing);

      // ✅ ADDITION 1: ensure mainImage exists
      product.mainImage = product.mainImage ?? {
        public_id: "",
        url: "",
      };

      product.gallery =
        product.gallery?.length > 0
          ? product.gallery
          : [{ public_id: "", url: "" }];

      product.howToUse = product.howToUse ?? [];
      product.keyFeatures = product.keyFeatures ?? [];

      setForm(product);
    } catch {
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

  const updateRegionOriginalPrice = (
    region: keyof Pricing["regions"],
    value: number | "",
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
                  originalPrice: value === "" ? undefined : value,
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
    } catch {
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

          <input
            type="number"
            placeholder="Display Order (e.g. 1 = first)"
            value={form.displayOrder ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                displayOrder:
                  e.target.value === "" ? undefined : Number(e.target.value),
              })
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

        {/* ✅ ADDITION 2: MAIN IMAGE (NOT REPLACING GALLERY) */}
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
            <div key={key} className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">
                  Selling Price – {label}
                </label>
                <input
                  type="number"
                  value={form.pricing.regions[key]?.price || ""}
                  onChange={(e) =>
                    updateRegionPrice(key, Number(e.target.value))
                  }
                  className="input"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Original Price – {label}
                </label>
                <input
                  type="number"
                  value={form.pricing.regions[key]?.originalPrice ?? ""}
                  onChange={(e) =>
                    updateRegionOriginalPrice(
                      key,
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  className="input"
                />
              </div>
            </div>
          ))}
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
