'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const navLinks = {
  Explore: [
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'Contact Us', href: '/contact-us' },
  ],
  Info: [
    { label: 'Shipping & Returns', href: '/shipping-returns' },
    { label: 'Terms & Conditions', href: '/terms-conditions' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
  ],
};

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <footer className="bg-[#1B3A2D] text-white">

      {/* Main body */}
      <div className="container mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Brand */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative h-9 w-24">
              <Image
                src="/img/logo.png"
                alt="Renoyl"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left' }}
                className="brightness-0 invert"
              />
            </div>
            <p className="text-[#9CB8A8] text-sm leading-relaxed max-w-xs">
              Premium hair oils formulated to combat hair loss, boost volume and nurture a healthy scalp. Begin your transformation today.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:border-white hover:text-white transition-all duration-200"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:border-white hover:text-white transition-all duration-200"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            {Object.entries(navLinks).map(([group, links]) => (
              <div key={group}>
                <p className="text-xs font-medium tracking-widest uppercase text-white/50 mb-5">
                  {group}
                </p>
                <ul className="space-y-3">
                  {links.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-sm text-[#9CB8A8] hover:text-white transition-colors duration-200"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <p className="text-xs font-medium tracking-widest uppercase text-white/50 mb-5">
              Newsletter
            </p>
            {status === 'success' ? (
              <div className="bg-[#2B5F3A]/40 border border-[#2B5F3A] rounded-xl px-5 py-4">
                <p className="text-sm text-green-300 font-medium">You&apos;re subscribed!</p>
                <p className="text-xs text-[#9CB8A8] mt-1">Thanks for joining the Renoyl community.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-[#9CB8A8] leading-relaxed">
                  Get exclusive offers, hair care tips, and new product launches straight to your inbox.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-white/10 border border-white/20 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition"
                  />
                  {status === 'error' && (
                    <p className="text-red-400 text-xs px-1">Something went wrong. Please try again.</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#1B3A2D] hover:bg-[#F9F7F2] px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 disabled:opacity-60 w-full"
                  >
                    {status === 'loading' ? 'Subscribing…' : (
                      <>Subscribe <ArrowRight size={15} /></>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Renoyl. All rights reserved.
          </p>
          <a
            href="mailto:info@renoyl.com"
            className="text-xs text-[#9CB8A8] hover:text-white transition-colors duration-200"
          >
            info@renoyl.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
