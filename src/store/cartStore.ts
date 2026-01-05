import { create } from "zustand";

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  variant: string;
  quantity: number;
  stock: number;
}

interface CartState {
  items: CartItem[];

  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variant: string) => void;
  updateQuantity: (
    productId: string,
    variant: string,
    quantity: number
  ) => void;
  clearCart: () => void;

  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) => i.productId === item.productId && i.variant === item.variant
      );

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === item.productId && i.variant === item.variant
              ? {
                  ...i,
                  quantity: Math.min(i.quantity + item.quantity, i.stock),
                }
              : i
          ),
        };
      }

      return { items: [...state.items, item] };
    }),

  removeItem: (productId, variant) =>
    set((state) => ({
      items: state.items.filter(
        (i) => !(i.productId === productId && i.variant === variant)
      ),
    })),

  updateQuantity: (productId, variant, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.productId === productId && i.variant === variant
          ? {
              ...i,
              quantity: Math.max(1, Math.min(quantity, i.stock)),
            }
          : i
      ),
    })),

  clearCart: () => set({ items: [] }),

  getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  getTotalPrice: () =>
    get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));
