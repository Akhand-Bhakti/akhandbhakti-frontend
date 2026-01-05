"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { fetchProductBySlug } from "@/services/productService";
import StarRating from "@/StarRating";
import { useCartStore } from "@/store/cartStore";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (!slug) return;

    const loadProduct = async () => {
      try {
        const data = await fetchProductBySlug(slug as string);
        setProduct(data.product);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);
  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      productId: product._id,
      name: product.name,
      image: product.mainImage?.url || "/placeholder.png",
      price: product.variants?.[0]?.basePrice,
      variant: "India", // region placeholder (future)
      quantity: qty,
      stock: product.stock || 10,
    });
  };

  if (loading) return <p className="text-center py-32">Loading product…</p>;
  if (!product) return <p className="text-center py-32">Product not found</p>;

  return (
    <section className="bg-[#FAF7F2] pt-28 pb-24">
      {/* TWO COLUMN LAYOUT */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        {/* ================= LEFT COLUMN ================= */}
        <div className="space-y-10">
          {/* Main Image */}
          <div className="relative w-full h-[480px] bg-white rounded-2xl shadow">
            <Image
              src={product.mainImage?.url || "/placeholder.png"}
              alt={product.name}
              fill
              className="object-contain p-8"
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg" />
            ))}
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-2xl p-8 shadow">
            <h3 className="font-semibold mb-6">Why should you choose us?</h3>

            <div className="grid grid-cols-2 gap-6 text-sm">
              {[
                "100% Authentic",
                "Lab Tested",
                "Energized",
                "Hand Picked",
                "Secure Packaging",
                "Trusted by Devotees",
              ].map((item, i) => (
                <div key={i} className="text-gray-700">
                  ✔ {item}
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-[#FFF2CC] rounded-2xl p-6 text-sm">
            <p className="font-medium">Got Questions?</p>
            <p className="mt-2 text-gray-700">
              We are here for you. If you have any questions related to our
              products, contact our support.
            </p>
          </div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="space-y-12">
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <StarRating
              rating={product.ratings}
              totalReviews={product.numOfReviews}
            />
            <p className="text-sm text-gray-500 mt-1">
              Lab tested, authentic & energized
            </p>

            <p className="mt-6 text-2xl font-semibold text-orange-600">
              ₹{product.variants?.[0]?.basePrice}
            </p>

            {/* Features */}
            <div className="mt-6 text-sm text-gray-600 leading-relaxed">
              At Akhandbhakti, every purchase welcomes divine energy into your
              life and supports our efforts to care for our cows and perform
              pujan in different parts of India. With each order, you&apos;re
              contributing to Namak-Chamak Rudrabhishek and to help with cow
              shelters .
            </div>

            {/* Quantity + Cart */}
            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2"
                >
                  −
                </button>
                <span className="px-5">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-2">
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-[#E8C37E] px-10 py-3 rounded-lg font-semibold hover:bg-[#ddb463] transition"
              >
                Add to Cart
              </button>
            </div>

            <button className="mt-4 w-full bg-[#D8A74F] py-3 rounded-lg font-semibold">
              Buy Now
            </button>
          </div>

          {/* Description */}
          <div>
            <h2 className="font-semibold mb-3">Description</h2>
            <div className="bg-gray-100 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
              {product.description
                .split("\n")
                .map((line: string, index: number) => {
                  if (line.startsWith("- ")) {
                    return (
                      <li key={index} className="ml-4 list-disc">
                        {line.replace("- ", "")}
                      </li>
                    );
                  }
                  return (
                    <p key={index} className="mb-2">
                      {line}
                    </p>
                  );
                })}
            </div>
          </div>

          {/* Lab Test */}
          <div>
            <h2 className="font-semibold mb-3">Lab Test</h2>
            <div className="h-28 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>

      {/* ================= RELATED PRODUCTS (FULL WIDTH) ================= */}
      <div className="max-w-7xl mx-auto px-6 mt-24">
        {/* Reviews */}
        <div>
          <h2 className="text-xl font-semibold mb-6">
            Reviews ({product.numOfReviews})
          </h2>

          {product.reviews.length === 0 ? (
            <p className="text-gray-500">
              No reviews yet. Be the first to review this product.
            </p>
          ) : (
            <>
              {/* Reviews Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {product.reviews
                  .slice(0, 12)
                  .map((review: any, index: number) => (
                    <div
                      key={index}
                      className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                    >
                      {/* Reviewer Name */}
                      <p className="font-semibold text-gray-900 truncate">
                        {review.name}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                        ))}
                      </div>

                      {/* Comment */}
                      <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                        {review.comment}
                      </p>
                    </div>
                  ))}
              </div>

              {/* View More Button */}
              {product.reviews.length > 12 && (
                <div className="flex justify-center mt-8">
                  <button
                    className="px-6 py-2 border border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition"
                    onClick={() => alert("Full reviews page/modal coming soon")}
                  >
                    View More Reviews
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-6">Related Products</h2>
          <div className="h-48 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </section>
  );
}
