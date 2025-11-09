"use client";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const productName = searchParams.get('product_name');

  return (
    <div className="container mx-auto text-center p-12">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4 text-lg">Thank you for your purchase of {productName || 'our product'}.</p>
      <Link href="/" className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
        Continue Shopping
      </Link>
    </div>
  );
}
