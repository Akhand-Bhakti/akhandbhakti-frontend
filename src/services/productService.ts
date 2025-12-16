export async function fetchProducts() {
  const res = await fetch("http://localhost:5000/api/v1/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function fetchProductBySlug(slug: string) {
  const res = await fetch(`http://localhost:5000/api/v1/product/slug/${slug}`);

  if (!res.ok) {
    throw new Error("Product not found");
  }

  return res.json();
}
