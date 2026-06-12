import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

interface CartState {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
}

export const useZustandStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.cart.find((c) => c.id === item.id);
          if (existing) {
            return {
              cart: state.cart.map((c) =>
                c.id === item.id ? { ...c, quantity: c.quantity + item.quantity } : c,
              ),
            };
          }
          return { cart: [...state.cart, item] };
        }),
      removeItem: (id) =>
        set((state) => ({ cart: state.cart.filter((c) => c.id !== id) })),
      updateItemQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((c) => (c.id === id ? { ...c, quantity } : c)),
        })),
      clearCart: () => set({ cart: [] }),
      getItemCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),
      getTotalPrice: () =>
        get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    { name: 'renoyl-cart' },
  ),
);
