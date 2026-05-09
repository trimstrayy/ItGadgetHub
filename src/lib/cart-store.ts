import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

export type CartItem = { product: Product; qty: number };

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: () => number;
  count: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      add: (p, qty = 1) =>
        set((s) => {
          const found = s.items.find((i) => i.product.id === p.id);
          if (found) return { items: s.items.map((i) => i.product.id === p.id ? { ...i, qty: i.qty + qty } : i), isOpen: true };
          return { items: [...s.items, { product: p, qty }], isOpen: true };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.product.id !== id) })),
      setQty: (id, qty) => set((s) => ({ items: s.items.map((i) => i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i) })),
      clear: () => set({ items: [] }),
      subtotal: () => get().items.reduce((a, i) => a + i.product.price * i.qty, 0),
      count: () => get().items.reduce((a, i) => a + i.qty, 0),
    }),
    { name: "ighb-cart" }
  )
);
