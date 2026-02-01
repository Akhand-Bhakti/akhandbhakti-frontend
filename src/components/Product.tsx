"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { fetchProducts } from "@/services/productService";
import StarRating from "@/StarRating";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

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
  stock: number;
  inStock: boolean;
  // originalPrice is optional (comes from backend)
  originalPrice?: number;
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

  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product._id,
      name: product.name,
      image: product.mainImage?.url || "/placeholder.png",
      price: product.price,
      currency: product.currency,
      quantity: 1,
      stock: product.stock ?? 0,
    });

    toast.success("Added to cart 🛒", {
      description: product.name,
    });
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts({ limit: 100 });
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
          visibleProducts.map((product) => {
            const originalPrice = Number(product.originalPrice);

            const hasDiscount =
              Number.isFinite(originalPrice) && originalPrice > product.price;

            const discountPercent = hasDiscount
              ? Math.round(
                  ((originalPrice - product.price) / originalPrice) * 100,
                )
              : 0;

            return (
              <Link
                key={product._id}
                href={`/product/${product.slug}`}
                className="block"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl hover:-translate-y-1 transition relative cursor-pointer">
                  {/* Add to cart */}
                  <button
                    disabled={product.stock === 0}
                    onClick={(e) => handleAddToCart(e, product)}
                    className={`absolute top-3 right-3 bg-white p-2 rounded-full shadow z-10 ${
                      product.stock === 0 ? "opacity-40 cursor-not-allowed" : ""
                    }`}
                  >
                    <ShoppingCart size={20} />
                  </button>

                  {/* Image */}
                  <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                    {hasDiscount && (
                      <div className="absolute z-30 left-2 top-2 sm:left-3 sm:top-3">
                        <span
                          className="
      flex items-center gap-1
      bg-white/90 backdrop-blur-md text-orange-600
      text-[9px] sm:text-[10px]
      font-semibold
      px-2 py-0.5 sm:px-3 sm:py-1
      rounded-full
      border border-orange-200
      shadow-sm
      max-w-[120px] sm:max-w-none
      truncate
    "
                        >
                          🕉️{" "}
                          <span className="hidden sm:inline">
                            Maha Shivratri Sale is Live
                          </span>
                          <span className="sm:hidden">Maha Shivratri Sale</span>
                        </span>
                      </div>
                    )}
                    <Image
                      src={product.mainImage?.url || "/placeholder.png"}
                      alt={product.name}
                      fill
                      className="object-cover p-4 z-0"
                    />
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 min-h-10">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="mt-2 space-y-0.5">
                      {hasDiscount && (
                        <p className="text-xs text-gray-500 line-through">
                          {product.currency} {originalPrice}
                        </p>
                      )}

                      <div className="flex items-center gap-2">
                        <p className="font-bold text-gray-800">
                          {product.currency} {product.price}
                        </p>

                        {hasDiscount && (
                          <span className="text-[10px] font-semibold bg-black text-white px-1.5 py-0.5 rounded">
                            {discountPercent}% OFF
                          </span>
                        )}
                      </div>
                    </div>

                    <StarRating
                      rating={product.ratings}
                      totalReviews={product.numOfReviews}
                    />
                  </div>
                </div>
              </Link>
            );
          })
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
