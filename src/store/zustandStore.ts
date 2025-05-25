import { create } from 'zustand';

interface CartItem {
  id: number; // Changed from string to number
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

interface CartState {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void; // Changed from string to number
  updateItemQuantity: (id: number, quantity: number) => void; // Changed from string to number
  clearCart: () => void;
}

export const useZustandStore = create<CartState>((set) => ({
  cart: [],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem
          ),
        };
      } else {
        return { cart: [...state.cart, item] };
      }
    }),
  removeItem: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
  updateItemQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) => (item.id === id ? { ...item, quantity } : item)),
    })),
  clearCart: () => set({ cart: [] }),
}));
