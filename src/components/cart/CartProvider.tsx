"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { loadCart, saveCart } from "@/lib/cartStorage";

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = useCartStore((s) => s.items);
  const setItems = useCartStore.setState;

  useEffect(() => {
    const stored = loadCart();
    if (stored && stored.length > 0) {
      setItems({ items: stored });
    }
  }, []);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  return <>{children}</>;
}
