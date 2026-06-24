"use client";
import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function AccountNewsletterPage() {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setStatus('loading');
    try {
      const res = await fetch(`${API_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Newsletter</h2>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-lg">
        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">You&apos;re subscribed!</h3>
            <p className="text-sm text-gray-500">Thanks for joining the Renoyl community.</p>
          </div>
        ) : (
          <>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Subscribe to Renoyl Newsletter</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Get exclusive offers, hair care tips, and new product launches straight to your inbox. We respect your privacy and will never share your information.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Email address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2B5F3A] transition"
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 accent-[#2B5F3A] w-4 h-4 shrink-0"
                />
                <span className="text-xs text-gray-500 leading-relaxed">
                  I agree to the{' '}
                  <a href="/privacy-policy" className="text-[#2B5F3A] hover:underline">Privacy Policy</a>
                  {' '}and consent to receiving marketing emails from Renoyl.
                </span>
              </label>

              {status === 'error' && (
                <p className="text-red-500 text-xs">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={!agreed || status === 'loading'}
                className="w-full bg-[#2B5F3A] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#224a2e] disabled:opacity-50 transition"
              >
                {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
