import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found — Renoyl',
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F9F7F2] px-6 text-center">
      <p className="text-sm font-medium tracking-widest text-[#2B5F3A] uppercase mb-4">404</p>
      <h1 className="text-4xl md:text-5xl font-serif text-[#1B3A2D] mb-4">
        Page Not Found
      </h1>
      <p className="text-gray-500 max-w-md mb-10">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="px-8 py-3 rounded-full bg-[#2B5F3A] text-white font-medium hover:bg-[#224a2e] transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/shop"
          className="px-8 py-3 rounded-full border-2 border-[#2B5F3A] text-[#2B5F3A] font-medium hover:bg-[#2B5F3A] hover:text-white transition-colors"
        >
          Browse Shop
        </Link>
      </div>
    </main>
  );
}
