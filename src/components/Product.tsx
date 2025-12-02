"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

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
    "single-bead",
    "mala",
    "pendant",
    "bracelet",
    "combination",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/products"); // your backend route
        const data = await res.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <section className="w-full py-16 px-6 lg:px-16">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Blessed Collection</h2>
        <p className="text-gray-600 text-sm mt-1">
          Authentic & Energized Rudraksha
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
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500 w-full">Loading...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 w-full">No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition relative"
            >
              {/* Wishlist Icon */}
              <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
                <ShoppingCartIcon size={16} />
              </button>

              {/* Product Image */}
              <div className="relative w-full h-48">
                <Image
                  src={product.mainImage?.url || "/placeholder.png"}
                  alt={product.name}
                  fill
                  className="object-contain p-3"
                />
              </div>

              {/* Text Section */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {product.name.length > 35
                    ? product.name.slice(0, 32) + "..."
                    : product.name}
                </h3>

                {/* Price */}
                <p className="mt-2 font-bold text-gray-800">
                  ₹{product.variants?.[0]?.basePrice || "N/A"}
                </p>

                {/* Ratings (custom component later) */}
                <div className="mt-2 text-yellow-500 text-sm">★★★★☆</div>

                {/* Learn more */}
                <Link
                  href={`/product/${product.slug}`}
                  className="text-orange-600 text-sm font-semibold mt-3 inline-block"
                >
                  Learn more →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
