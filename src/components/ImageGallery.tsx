import Link from 'next/link';

const ImageGallery = () => {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-12 gap-4">
          <div>
            <span className="inline-block text-[#2B5F3A] text-xs font-medium tracking-widest uppercase mb-3">
              The Renoyl Lifestyle
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900">
              Naturally Beautiful
            </h2>
          </div>
          <Link href="/shop">
            <span className="inline-flex items-center gap-2 text-[#2B5F3A] text-sm font-medium hover:gap-4 transition-all duration-200">
              Browse all products
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="group relative overflow-hidden rounded-2xl aspect-square bg-[#EDE4E1]"
            >
              <img
                src={`/img/gallery${n}.jpg`}
                alt={`Renoyl lifestyle ${n}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#2B5F3A]/0 group-hover:bg-[#2B5F3A]/15 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
