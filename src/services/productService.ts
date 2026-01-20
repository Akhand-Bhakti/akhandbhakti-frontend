const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/* Fetch all products */
export async function fetchProducts(params?: {
  keyword?: string;
  category?: string;
  limit?: number;
}) {
  const query = new URLSearchParams();

  if (params?.keyword) query.append("keyword", params.keyword);
  if (params?.category && params.category !== "all") {
    query.append("category", params.category);
  }
  if (params?.limit) {
    query.append("limit", String(params.limit));
  }

  const res = await fetch(`${API_BASE_URL}/v1/products?${query.toString()}`);

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

/* Fetch single product by slug */
export async function fetchProductBySlug(slug: string) {
  const res = await fetch(`${API_BASE_URL}/v1/product/slug/${slug}`);

  if (!res.ok) {
    throw new Error(`Product not found (${res.status})`);
  }

  return res.json();
}
