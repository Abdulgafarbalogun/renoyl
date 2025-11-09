"use client";
import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="container mx-auto text-center p-12">
      <h1 className="text-3xl font-bold text-red-600">Payment Cancelled</h1>
      <p className="mt-4 text-lg">Your payment was not processed. You can try again or continue shopping.</p>
      <div className="mt-6 space-x-4">
        <Link href="/products" className="inline-block bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700">
          View Products
        </Link>
        <Link href="/" className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
