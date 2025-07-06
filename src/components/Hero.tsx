// components/Hero.jsx
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative bg-peach pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center">
          {/* Text content - Left side */}
          <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-gray-900">
              Embrace a Fuller, Healthier hair journey
            </h1>
            <p className="text-sm md:text-base leading-relaxed mb-6 text-gray-700 max-w-lg">
              We understand that your hair is more than just strands - it's a reflection 
              of who you are. Whether it's reviving thin hair or enhancing your beards, 
              discover our premium hair oils that restore self-esteem and 
              empower everyday with renewed confidence.
            </p>
            <Link href="/shop">
              <span className="inline-block bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-6 rounded-full transition duration-300">
                START NOW
              </span>
            </Link>
          </div>
          
          {/* Image - Right side */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative h-72 md:h-96 w-full">
              <Image
                src="/img/background.jpg"
                alt="Woman with healthy hair"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;