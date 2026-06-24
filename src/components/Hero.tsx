import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="bg-[#EDE4E1] overflow-hidden">
      <div className="grid lg:grid-cols-[40%_60%]">

        {/* Text — below image on mobile, left column on desktop */}
        <div className="flex items-center px-8 md:px-12 lg:px-16 xl:px-20 py-10 lg:py-16 xl:py-24 order-2 lg:order-1">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-[1.15] mb-4 md:mb-5">
              Embrace a Fuller, Healthier hair journey
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed mb-6 md:mb-8 max-w-[300px]">
              We understand that your hair is more than just strands — it&apos;s a reflection of
              who you are. Whether it&apos;s reviving thin hair or enhancing your beard&apos;s
              fullness, our products work with you to restore self-esteem and empower everyday
              with renewed confidence.
            </p>
            <Link href="/shop">
              <span className="inline-block bg-[#2B5F3A] hover:bg-[#224a2e] text-white text-xs font-bold uppercase tracking-[0.15em] py-3 px-7 rounded-md transition-colors duration-200">
                Start Now
              </span>
            </Link>
          </div>
        </div>

        {/* Image — full bleed on right, above text on mobile */}
        <div className="relative order-1 lg:order-2 aspect-[4/3] lg:aspect-auto lg:min-h-[540px]">
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
