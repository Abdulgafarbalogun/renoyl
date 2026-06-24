"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';
import type { AuthUser } from '@/store/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function SignUpForm() {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName.trim()} ${lastName.trim()}`.trim(),
          email,
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Registration failed');
        return;
      }
      setAuth(data.accessToken, data.user as AuthUser);
      router.push('/account');
    } catch {
      setError('Unable to connect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex flex-col md:flex-row">

      {/* Left — decorative panel (desktop only) */}
      <div className="hidden md:flex md:w-1/2 bg-[#EDE4E1] items-center justify-center p-12">
        <div className="text-center max-w-xs">
          <div className="relative h-16 w-40 mx-auto mb-8">
            <Image src="/img/logo.png" alt="Renoyl" fill style={{ objectFit: 'contain' }} />
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Premium hair oils formulated to combat hair loss, boost volume and nurture a healthy scalp.
          </p>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="md:hidden flex justify-center mb-8">
            <div className="relative h-12 w-32">
              <Image src="/img/logo.png" alt="Renoyl" fill style={{ objectFit: 'contain' }} />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign up</h1>
          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            Welcome to Renoyl! Create your account to monitor all your activities.
          </p>

          {error && (
            <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jane"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2B5F3A] transition"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  required
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Smith"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2B5F3A] transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2B5F3A] transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="new-password"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2B5F3A] transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2B5F3A] text-white py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#224a2e] disabled:opacity-50 transition mt-2"
            >
              {loading ? 'Creating account…' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/signin" className="text-[#2B5F3A] hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
