const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

/* Fetch all products */
export async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/products`);

    if (!res.ok) {
      throw new Error(`Failed to fetch products (${res.status})`);
    }

    return await res.json();
  } catch (error) {
    console.error("fetchProducts error:", error);
    throw error;
  }
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
