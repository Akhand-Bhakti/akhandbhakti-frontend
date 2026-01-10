"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "lucide-react";
import { fetchProducts } from "@/services/productService";
import StarRating from "@/StarRating";
import { useSearchParams, useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  slug: string;
  mainImage: { url: string };
  price: number;
  currency: string;
  ratings: number;
  numOfReviews: number;
  category: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const filterButtons = [
    "all",
    "rudraksha malas",
    "wearables",
    "rudraksha beads",
    "puja essentials",
  ];

  const searchParams = useSearchParams();
  const router = useRouter();
  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "all";

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts({ keyword, category });
        setProducts(data.products);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [keyword, category]);

  const filteredProducts = products;

  return (
    <section className="pt-8 pb-20 px-6 lg:px-16">
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
            onClick={() => {
              router.push(
                `/products?category=${encodeURIComponent(btn)}${
                  keyword ? `&keyword=${keyword}` : ""
                }`
              );
            }}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              category === btn
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
          <p className="text-center text-gray-500 col-span-full">
            Loading products...
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        ) : (
          filteredProducts.map((product) => (
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
                    {product.currency} {product.price}
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
    </section>
  );
}
