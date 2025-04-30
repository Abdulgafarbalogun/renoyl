"use client";

import { useZustandStore } from '../store/zustandStore';

const CartCount = () => {
  const cart = useZustandStore((state) => state.cart);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>
  );
};

export default CartCount;