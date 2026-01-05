export const CART_KEY = "akhandbhakti_cart";

export const loadCart = () => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveCart = (cart: any[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const clearCartStorage = () => {
  localStorage.removeItem(CART_KEY);
};
