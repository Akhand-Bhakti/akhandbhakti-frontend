"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { fetchProducts } from "@/services/productService";
import StarRating from "@/StarRating";
import { useSearchParams, useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { formatPrice } from "../../../utils/formatPrice";

interface Product {
  _id: string;
  name: string;
  slug: string;
  mainImage: { url: string };
  price: number;
  originalPrice?: number; // ✅ optional
  currency: string;
  ratings: number;
  numOfReviews: number;
  category: string;
  stock: number;
  inStock: boolean;
  purchasable: boolean;
}

export default function ProductsClient() {
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
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.purchasable) {
      toast.error("This product is not available in your region");
      return;
    }

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
      setLoading(true);
      try {
        const data = await fetchProducts({ keyword, category, limit: 50 });
        setProducts(data.products);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [keyword, category]);

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
                }`,
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
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        ) : (
          products.map((product) => {
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
                    disabled={product.stock === 0 || !product.purchasable}
                    onClick={(e) => handleAddToCart(e, product)}
                    className={`absolute top-3 right-3 bg-white p-2 rounded-full shadow z-10 ${
                      product.stock === 0 || !product.purchasable
                        ? "opacity-40 cursor-not-allowed"
                        : ""
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
                          {product.currency}{" "}
                          {formatPrice(originalPrice, product.currency)}
                        </p>
                      )}

                      <div className="flex items-center gap-2">
                        <p className="font-bold text-gray-800">
                          {product.currency}{" "}
                          {formatPrice(product.price, product.currency)}
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
    </section>
  );
}
