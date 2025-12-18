"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "lucide-react";
import { fetchProducts } from "@/services/productService";

interface Product {
  _id: string;
  name: string;
  slug: string;
  mainImage: { url: string };
  variants: { basePrice: number; currency: string }[];
  ratings: number;
  numOfReviews: number;
  category: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const filterButtons = [
    "all",
    "rudraksha",
    "karungali",
    "puja prasad",
    "bracelet",
    "combination",
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.products);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <section className="pt-28 pb-20 px-6 lg:px-16">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Our Products</h1>
        <p className="text-gray-600 mt-2">
          Explore our complete collection of authentic & energized products
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {filterButtons.map((btn) => (
          <button
            key={btn}
            onClick={() => setFilter(btn)}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              filter === btn
                ? "bg-orange-500 text-white"
                : "bg-orange-100 text-orange-600"
            }`}
          >
            {btn.charAt(0).toUpperCase() + btn.slice(1)}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500 col-span-full">
            Loading products...
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition relative"
            >
              {/* Wishlist */}
              <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
                <HeartIcon size={16} />
              </button>

              {/* Image */}
              <div className="relative w-full h-48">
                <Image
                  src={product.mainImage?.url || "/placeholder.png"}
                  alt={product.name}
                  fill
                  className="object-contain p-3"
                />
              </div>

              {/* Details */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {product.name.length > 35
                    ? product.name.slice(0, 32) + "..."
                    : product.name}
                </h3>

                <p className="mt-2 font-bold text-gray-800">
                  ₹{product.variants?.[0]?.basePrice || "N/A"}
                </p>

                <div className="mt-2 text-yellow-500 text-sm">★★★★☆</div>

                <Link
                  href={`/product/${product.slug}`}
                  className="text-orange-600 text-sm font-semibold mt-3 inline-block"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
