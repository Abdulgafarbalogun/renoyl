import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Payment Cancelled — Renoyl',
};

export default function CancelPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#F9F7F2] px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-3xl font-light text-gray-900 mb-3">Payment Cancelled</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Your payment was not completed. No charge has been made. You can try again or continue browsing.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop">
            <span className="inline-flex items-center justify-center gap-2 bg-[#2B5F3A] hover:bg-[#224a2e] text-white py-3.5 px-8 rounded-full text-sm font-medium transition-all duration-200">
              Continue Shopping
            </span>
          </Link>
          <Link href="/">
            <span className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-[#2B5F3A] hover:text-[#2B5F3A] text-gray-700 py-3.5 px-8 rounded-full text-sm font-medium transition-all duration-200">
              Go to Homepage
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
