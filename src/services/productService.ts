const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

/* Fetch all products */
export async function fetchProducts(params?: {
  keyword?: string;
  category?: string;
}) {
  const query = new URLSearchParams();

  if (params?.keyword) query.append("keyword", params.keyword);
  if (params?.category && params.category !== "all") {
    query.append("category", params.category);
  }

  const res = await fetch(`${API_BASE_URL}/products?${query.toString()}`);

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

/* Fetch single product by slug */
export async function fetchProductBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/product/slug/${slug}`);

    if (!res.ok) {
      throw new Error(`Product not found (${res.status})`);
    }

    return await res.json();
  } catch (error) {
    console.error("fetchProductBySlug error:", error);
    throw error;
  }
}
