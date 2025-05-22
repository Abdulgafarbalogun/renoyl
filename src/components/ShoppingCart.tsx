"use client"
import React from 'react';
import { useZustandStore } from '../store/zustandStore';

const ShoppingCart = () => {
  const cart = useZustandStore((state) => state.cart);
  const addItem = useZustandStore((state) => state.addItem);
  const removeItem = useZustandStore((state) => state.removeItem);
  const updateItemQuantity = useZustandStore((state) => state.updateItemQuantity);
  const clearCart = useZustandStore((state) => state.clearCart); // Assuming this function exists in the store

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-300 rounded shadow-lg z-50 p-4">
      <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="max-h-60 overflow-y-auto mb-4">
            {cart.map((item) => (
              <li key={item.id} className="mb-3 pb-2 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{item.name}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded"
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded"
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="ml-2 text-red-600 hover:text-red-800"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded text-sm font-medium transition-colors"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
