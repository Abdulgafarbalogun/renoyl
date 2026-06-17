import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative bg-[#F9F7F2] overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#EDE4E1] rounded-bl-[120px] pointer-events-none" />

      <div className="relative container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-4rem)] py-16 lg:py-24">

          {/* Text content */}
          <div className="space-y-8 z-10">
            <span className="inline-flex items-center gap-2 border border-[#2B5F3A]/40 text-[#2B5F3A] px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2B5F3A]" />
              Premium Hair Care
            </span>

            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 leading-[1.05]">
              Embrace a<br />
              <em className="text-[#2B5F3A] not-italic font-medium">Fuller</em>, Healthier<br />
              Hair Journey
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
              Premium hair oils formulated to combat hair loss, boost volume and nurture a healthy scalp. Begin your transformation today.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/shop">
                <span className="inline-flex items-center gap-2 bg-[#2B5F3A] hover:bg-[#224a2e] text-white text-sm font-medium tracking-wide py-3.5 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#2B5F3A]/20">
                  Shop Now
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
              <Link href="/about">
                <span className="inline-flex items-center text-gray-700 text-sm font-medium tracking-wide py-3.5 px-8 rounded-full border border-gray-300 hover:border-[#2B5F3A] hover:text-[#2B5F3A] transition-all duration-300">
                  Our Story
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4 border-t border-gray-200">
              <div>
                <p className="text-2xl font-semibold text-[#2B5F3A]">100%</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">Natural</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <p className="text-2xl font-semibold text-[#2B5F3A]">5K+</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">Customers</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <p className="text-2xl font-semibold text-[#2B5F3A]">30 Day</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">Guarantee</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4] bg-[#EDE4E1] max-w-md mx-auto lg:max-w-none">
              <Image
                src="/img/background.jpg"
                alt="Woman with healthy, radiant hair"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                priority
                className="transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Floating rating card */}
            <div className="absolute bottom-8 -left-4 lg:-left-6 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#2B5F3A] rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">4.9 / 5 Rating</p>
                <p className="text-xs text-gray-500">From 2,000+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
