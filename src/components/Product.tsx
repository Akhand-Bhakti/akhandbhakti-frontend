"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "lucide-react";
import { fetchProducts } from "@/services/productService";
import StarRating from "@/StarRating";

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

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const filterButtons = [
    "all",
    "rudraksha malas",
    "wearables",
    "rudraksha beads",
    "puja essentials",
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

  const visibleProducts = filteredProducts.slice(0, 8);

  return (
    <section className="w-full py-16 px-6 lg:px-16">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">
          Abhimantrit Essentials
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Selected with care, energized with mantra and for spiritual growth
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500 col-span-full">Loading...</p>
        ) : visibleProducts.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        ) : (
          visibleProducts.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product.slug}`}
              className="block"
            >
              <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition relative cursor-pointer">
                {/* Wishlist */}
                <button
                  onClick={(e) => e.preventDefault()}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow z-10"
                >
                  <HeartIcon size={16} />
                </button>

                {/* Image */}
                <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center">
                  <Image
                    src={product.mainImage?.url || "/placeholder.png"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-4xl p-4"
                  />
                </div>

                {/* Details */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 min-h-10">
                    {product.name}
                  </h3>

                  <p className="mt-2 font-bold text-gray-800">
                    ₹{product.variants?.[0]?.basePrice || "N/A"}
                  </p>

                  <StarRating
                    rating={product.ratings}
                    totalReviews={product.numOfReviews}
                  />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Explore More */}
      <div className="flex justify-center mt-14">
        <Link
          href="/products"
          className="px-8 py-3 border border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition"
        >
          Explore More
        </Link>
      </div>
    </section>
  );
}
