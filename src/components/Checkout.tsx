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
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact and Delivery Information */}
        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-3">Contact Information</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        {/* Delivery Information */}
        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-3">Delivery Information</h2>
          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
              Country
            </label>
            <input
              type="text"
              id="country"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">
                State
              </label>
              <input
                type="text"
                id="state"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label htmlFor="zip" className="block text-gray-700 text-sm font-bold mb-2">
                Zip Code
              </label>
              <input
                type="text"
                id="zip"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-3">Payment Information</h2>
          <div className="mb-4">
            <label htmlFor="cardName" className="block text-gray-700 text-sm font-bold mb-2">
              Credit Card
            </label>
            <input
              type="text"
              id="cardName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-bold mb-2">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="expDate" className="block text-gray-700 text-sm font-bold mb-2">
                Exp. Date (MM/YY)
              </label>
              <input
                type="text"
                id="expDate"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block text-gray-700 text-sm font-bold mb-2">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="nameOnCard" className="block text-gray-700 text-sm font-bold mb-2">
              Name on Card
            </label>
            <input
              type="text"
              id="nameOnCard"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-green-500" />
              <span className="ml-2 text-gray-700 text-sm">Use shipping address as billing address</span>
            </label>
          </div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Pay Now
          </button>
        </div>

        {/* Order Summary */}
        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Image src={item.imageUrl} alt={item.name} width={50} height={50} className="mr-2" />
                <span>{item.name} ({item.quantity})</span>
              </div>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex items-center justify-between mt-4">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" type="button">
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
