import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="bg-[#EDE4E1] overflow-hidden">
      <div className="grid lg:grid-cols-[42%_58%]">

        {/* Text — below image on mobile, left column on desktop */}
        <div className="flex items-center px-6 lg:px-12 py-10 lg:py-20 xl:py-28 order-2 lg:order-1">
          <div className="max-w-sm">
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 leading-[1.15] mb-4 md:mb-6">
              Embrace a Fuller, Healthier hair journey
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed mb-6 md:mb-8 max-w-xs">
              We understand that your hair is more than just strands — it&apos;s a reflection of
              who you are. Whether it&apos;s reviving thin hair or enhancing your beard&apos;s
              fullness, our products work with you to restore self-esteem and empower everyday
              with renewed confidence.
            </p>
            <Link href="/shop">
              <span className="inline-block bg-[#2B5F3A] hover:bg-[#224a2e] text-white text-sm font-semibold uppercase tracking-widest py-3 px-8 rounded-md transition-colors duration-200">
                Start Now
              </span>
            </Link>
          </div>
        </div>

        {/* Image — full bleed on right, above text on mobile */}
        <div className="relative order-1 lg:order-2 aspect-[4/3] lg:aspect-auto lg:min-h-[520px]">
          <Image
            src="/img/background.jpg"
            alt="Woman with healthy, radiant hair"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
