"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { fetchProductBySlug } from "@/services/productService";
import StarRating from "@/StarRating";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { toast } from "sonner";
import { formatPrice } from "../../../../utils/formatPrice";

/* ===== ONLY NEW TYPE (SAFE) ===== */
interface Review {
  name: string;
  rating: number;
  comment: string;
}

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  useEffect(() => {
    if (!slug) return;

    const loadProduct = async () => {
      try {
        const data = await fetchProductBySlug(slug as string);
        setProduct(data.product);
        setActiveImage(data.product.mainImage?.url);
      } catch (err: any) {
        const message = err?.response?.data?.message || "Product not available";

        toast.error(message);

        // optional redirect after short delay
        setTimeout(() => {
          router.replace("/products");
        }, 1500);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug, router]);

  useEffect(() => {
    if (product?.stock && qty > product.stock) {
      setQty(product.stock);
    }
  }, [product, qty]);

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      productId: product._id,
      name: product.name,
      image: product.mainImage?.url || "/placeholder.png",
      price: product.price,
      currency: product.currency,
      quantity: qty,
      stock: product.stock || 0,
    });

    toast.success("Added to cart 🛒", {
      description: product.name,
    });
  };

  const handleBuyNow = () => {
    if (!product) return;
    handleAddToCart();
    router.push("/checkout");
  };

  if (loading) return <p className="text-center py-32">Loading product…</p>;
  if (!product)
    return (
      <p className="text-center py-32 text-gray-600">
        This product is not available in your region.
      </p>
    );

  const galleryImages = [product.mainImage, ...(product.gallery || [])].filter(
    Boolean,
  );

  const features = [
    { text: "100% Authentic", img: "/icons/authentic.png" },
    { text: "Lab Tested", img: "/icons/lab.png" },
    { text: "Energized", img: "/icons/energy.png" },
    { text: "Hand Picked", img: "/icons/handpicked.png" },
    { text: "Secure Packaging", img: "/icons/secure.png" },
    { text: "Trusted by Devotees", img: "/icons/trusted.png" },
  ];

  const howToUseSteps: string[] = product?.howToUse ?? [];
  const keyFeatures: { label: string; value: string }[] =
    product?.keyFeatures ?? [];

  const stock = product?.stock ?? 0;
  const outOfStock = stock === 0;
  const hasDiscount =
    typeof product?.originalPrice === "number" &&
    product.originalPrice > product.price;

  const disableActions = loading || outOfStock;

  return (
    <section className="bg-[#FAF7F2] pt-18 pb-24">
      {/* TWO COLUMN LAYOUT */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-16 lg:grid lg:grid-cols-2">
        {/* LEFT COLUMN */}
        <div className="space-y-10">
          {/* IMAGE BLOCK */}
          <div className="order-1 lg:order-1">
            <div className="relative w-full max-w-[420px] mx-auto aspect-3/4 bg-white rounded-2xl shadow overflow-hidden">
              <Image
                src={activeImage || "/placeholder.png"}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="grid grid-cols-5 gap-4 mt-6">
              {galleryImages.map((img: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img.url)}
                  className={`relative h-24 rounded-lg overflow-hidden border ${
                    activeImage === img.url
                      ? "border-orange-500"
                      : "border-transparent"
                  }`}
                >
                  <Image src={img.url} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* HOW TO USE + FEATURES */}
          <div className="space-y-10 hidden lg:block">
            {howToUseSteps.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow">
                <h3 className="font-semibold mb-4">How to Use</h3>
                <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
                  {howToUseSteps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              </div>
            )}

            {keyFeatures.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow">
                <h3 className="font-semibold mb-4">Key Features</h3>
                <div className="divide-y text-sm">
                  {keyFeatures.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between py-2 text-gray-700"
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className="text-right max-w-[60%] wrap-break-word">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-12 order-2 lg:order-2">
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

            <div className="mt-6 space-y-1">
              {hasDiscount && (
                <p className="text-sm text-gray-500 line-through">
                  {product.currency}{" "}
                  {formatPrice(product.originalPrice, product.currency)}
                </p>
              )}

              <div className="flex items-center gap-3">
                <p className="text-2xl font-semibold text-orange-600">
                  {product.currency}{" "}
                  {formatPrice(product.price, product.currency)}
                </p>

                {hasDiscount && (
                  <span className="text-xs font-bold bg-black text-white px-2 py-1 rounded">
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100,
                    )}
                    % OFF
                  </span>
                )}
              </div>
              <div className="inline-flex items-center gap-2 bg-linear-to-r from-orange-500 to-yellow-400 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-md w-fit">
                🕉️ Maha Shivratri Sale is LIVE
              </div>

              <p className="text-xs text-gray-600">
                Limited time offer · Feel the divine energy ✨
              </p>
            </div>

            {/* EXISTING DESCRIPTION COPY – UNTOUCHED */}
            <div className="mt-6 text-sm text-gray-600 leading-relaxed">
              At AkhandBhakti, every purchase is a sacred step toward inviting
              divine energy into your life. Your support enables us to care for
              our cows and conduct pujan and spiritual rituals across various
              regions of India. With each order, you contribute to the
              Namak–Chamak Rudrabhishek and help sustain cow shelters, nurturing
              both spiritual and social harmony.
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
                <button
                  onClick={() => setQty(qty + 1)}
                  disabled={qty >= stock}
                  className="px-4 py-2 disabled:opacity-40"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={disableActions}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  outOfStock
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#dfa231] hover:bg-[#f1af2a]"
                }`}
              >
                Add to Cart
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={disableActions}
              className={`mt-4 w-full py-3 rounded-lg font-semibold transition ${
                outOfStock
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#dfa231] hover:bg-[#f1af2a]"
              }`}
            >
              Buy Now
            </button>
          </div>

          {/* Description (UNCHANGED) */}
          <div>
            <h2 className="font-semibold mb-3">Description</h2>
            <div className="bg-gray-100 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
              {product.description
                .split("\n")
                .map((line: string, index: number) =>
                  line.startsWith("- ") ? (
                    <li key={index} className="ml-4 list-disc">
                      {line.replace("- ", "")}
                    </li>
                  ) : (
                    <p key={index} className="mb-2">
                      {line}
                    </p>
                  ),
                )}
            </div>
          </div>

          {/* Why Choose Us (UNCHANGED) */}
          <div className="bg-white rounded-2xl p-8 shadow">
            <h3 className="font-semibold mb-6">Why should you choose us?</h3>
            <div className="grid grid-cols-2 gap-6 text-sm">
              {features.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-700">
                  <Image
                    src={item.img}
                    alt={item.text}
                    width={20}
                    height={20}
                  />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ (UNCHANGED) */}
          <div className="bg-[#FFF2CC] rounded-2xl p-6 text-sm">
            <p className="font-medium">Got Questions?</p>
            <p className="mt-2 text-gray-700">
              We are here for you. If you have any questions related to our
              products,{" "}
              <Link href="/contact" className="text-blue-400 underline">
                contact our support.
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* HOW TO USE + FEATURES (MOBILE ONLY) */}
      <div className="space-y-10 lg:hidden px-6 mt-16">
        {howToUseSteps.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="font-semibold mb-4">How to Use</h3>
            <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
              {howToUseSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        )}

        {keyFeatures.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="font-semibold mb-4">Key Features</h3>
            <div className="divide-y text-sm">
              {keyFeatures.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between py-2 text-gray-700"
                >
                  <span className="font-medium">{item.label}</span>
                  <span className="text-right max-w-[60%] wrap-break-word">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* REVIEWS – ONLY SECTION VISUALLY CHANGED */}
      <div className="max-w-7xl mx-auto px-6 mt-24">
        <h2 className="text-xl font-semibold mb-6">
          Reviews ({product.numOfReviews})
        </h2>

        {(product.reviews?.length ?? 0) === 0 ? (
          <p className="text-gray-500">
            No reviews yet. Be the first to review this product.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.reviews
              .slice(0, 12)
              .map((review: Review, index: number) => (
                <div
                  key={index}
                  className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold uppercase">
                      {review.name.charAt(0)}
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm truncate">
                        {review.name}
                      </p>
                      <div className="flex items-center gap-1 text-yellow-500 text-xs">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <span className="inline-block text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      ✔ Verified Buyer
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mt-3 leading-relaxed line-clamp-4">
                    “{review.comment}”
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
