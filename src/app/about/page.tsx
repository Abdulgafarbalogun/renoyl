import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — Renoyl',
  description: 'Learn about Renoyl — premium hair oils formulated to combat hair loss, boost volume, and nurture a healthy scalp.',
};

const values = [
  {
    title: 'Natural',
    description:
      'Every ingredient is carefully sourced from nature. No harsh chemicals, no synthetic additives — just pure, potent botanical oils.',
  },
  {
    title: 'Premium',
    description:
      'We never compromise on quality. Our oils are cold-pressed and minimally processed to preserve their natural potency and benefits.',
  },
  {
    title: 'Effective',
    description:
      'Backed by science and nature. Our formulas deliver visible results — thicker, healthier, more radiant hair from root to tip.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#F9F7F2] min-h-screen">

      {/* Hero */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <span className="inline-block text-[#2B5F3A] text-xs font-medium tracking-widest uppercase mb-6">
            Our Story
          </span>
          <h1 className="text-5xl lg:text-7xl font-light text-gray-900 mb-8 max-w-3xl mx-auto leading-tight">
            Premium Oils,{' '}
            <em className="text-[#2B5F3A]">Naturally</em>{' '}
            Made
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We believe your hair deserves the best nature has to offer. Renoyl was born from a passion for natural, effective hair care that respects both you and the environment.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="py-24">
        <div className="container mx-auto px-6 lg:px-12">

          <div className="grid md:grid-cols-3 gap-6 mb-24">
            {values.map(({ title, description }) => (
              <div key={title} className="bg-white rounded-2xl p-8">
                <div className="w-11 h-11 rounded-xl bg-[#2B5F3A]/10 flex items-center justify-center mb-6">
                  <div className="w-5 h-5 rounded-full bg-[#2B5F3A]" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
              </div>
            ))}
          </div>

          {/* Mission section */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-[#EDE4E1] rounded-3xl aspect-[4/5] flex items-center justify-center p-16">
              <Image
                src="/img/logo.png"
                alt="Renoyl Logo"
                width={240}
                height={240}
                className="mx-auto object-contain"
              />
            </div>

            <div className="space-y-6">
              <span className="block text-[#2B5F3A] text-xs font-medium tracking-widest uppercase">
                Our Mission
              </span>
              <h2 className="text-4xl font-light text-gray-900 leading-tight">
                Empowering Through Natural Beauty
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We understand that your hair is more than just strands — it&apos;s a reflection of who you are. Whether you&apos;re reviving thin hair or enhancing your natural texture, Renoyl is here to support your journey.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our premium hair oils are formulated to combat hair loss, boost volume, and nurture a healthy scalp. Each product is crafted with care to deliver real, visible results you can feel proud of.
              </p>
              <div className="pt-2">
                <Link href="/shop">
                  <span className="inline-flex items-center gap-2 bg-[#2B5F3A] hover:bg-[#224a2e] text-white py-3.5 px-8 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[#2B5F3A]/20">
                    Explore Our Products
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
