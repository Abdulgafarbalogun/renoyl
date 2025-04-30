"use client"
import React from 'react';
import { useZustandStore } from '../store/zustandStore';

const ShoppingCart = () => {
  const cart = useZustandStore((state) => state.cart);
  const addItem = useZustandStore((state) => state.addItem);
  const removeItem = useZustandStore((state) => state.removeItem);
  const updateItemQuantity = useZustandStore((state) => state.updateItemQuantity);

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-300 rounded shadow-lg z-50 p-4">
      <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="mb-3">
              <div className="flex justify-between items-center">
                <span>{item.name}</span>
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
      )}
    </div>
  );
};

export default ShoppingCart;
