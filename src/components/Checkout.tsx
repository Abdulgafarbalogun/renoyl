"use client";

import React from 'react';
import { useZustandStore } from '../store/zustandStore';
import Image from 'next/image';

const Checkout = () => {
  const cart = useZustandStore((state) => state.cart);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = 5.00;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Forms */}
        <div className="space-y-8">
          {/* Contact Section */}
          <div>
            <h2 className="text-lg font-medium mb-6">Contact</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm text-gray-700 mb-2">
                  Phone number
                </label>
                <div className="flex">
                  <select className="border border-gray-300 rounded-l px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:border-gray-500">
                    <option>🇺🇸 +1</option>
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    className="flex-1 border border-gray-300 rounded-r px-3 py-2 text-sm focus:outline-none focus:border-gray-500 border-l-0"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Section */}
          <div>
            <h2 className="text-lg font-medium mb-6">Delivery</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="country" className="block text-sm text-gray-700 mb-2">
                  Country
                </label>
                <select
                  id="country"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500 bg-white"
                >
                  <option>Ireland</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm text-gray-700 mb-2">
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm text-gray-700 mb-2">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm text-gray-700 mb-2">
                    Zip code
                  </label>
                  <input
                    type="text"
                    id="zip"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div>
            <h2 className="text-lg font-medium mb-6">Payment</h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">All transactions are secure and encrypted.</p>
              
              <div className="border border-gray-300 rounded">
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-300">
                  <label className="flex items-center text-sm">
                    <input type="radio" name="payment" className="mr-3" defaultChecked />
                    Credit card
                  </label>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Card number"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Exp date (MM/YY)"
                      className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                    />
                    <input
                      type="text"
                      placeholder="Security code"
                      className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Name on card"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <input type="checkbox" id="billingAddress" className="mt-1 mr-3" />
                <label htmlFor="billingAddress" className="text-sm text-gray-700">
                  Use shipping address as billing address
                </label>
              </div>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded text-sm font-medium transition-colors">
                Pay now
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-6">Order summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="relative">
                    <Image 
                      src={item.imageUrl} 
                      alt={item.name} 
                      width={60} 
                      height={60} 
                      className="rounded border"
                    />
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                  </div>
                  <div className="text-sm font-medium">
                    €{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>€{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>€{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t pt-2">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded text-sm font-medium mt-6 transition-colors">
              Complete order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;