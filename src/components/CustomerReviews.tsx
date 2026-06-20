const reviews = [
  {
    name: 'Francine Key',
    role: 'Verified Customer',
    initials: 'FK',
    text: 'Renoyl hair oils have transformed my hair. After just two weeks I noticed a significant improvement in thickness and shine. I couldn\'t be happier with the results.',
  },
  {
    name: 'Sarah Okonkwo',
    role: 'Verified Customer',
    initials: 'SO',
    text: 'I\'ve tried many hair oils over the years, but nothing compares to Renoyl. My hair feels deeply nourished, strong, and looks healthier than it ever has.',
  },
  {
    name: 'Michael Adeyemi',
    role: 'Verified Customer',
    initials: 'MA',
    text: 'As someone dealing with thinning hair, I was sceptical. After a month of using Renoyl the difference is undeniable. My confidence is back and my hair is thriving.',
  },
];

const Stars = () => (
  <div className="flex gap-1 mb-6">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const CustomerReviews = () => {
  return (
    <section className="py-12 md:py-24 bg-[#F9F7F2]">
      <div className="container mx-auto px-6 lg:px-12">

        <div className="text-center mb-8 md:mb-16">
          <span className="inline-block text-[#2B5F3A] text-xs font-medium tracking-widest uppercase mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
            Our Customers Love Renoyl
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            We&apos;re committed to your satisfaction. Here is what our customers have been saying.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-2xl p-8 flex flex-col hover:shadow-md transition-shadow duration-300"
            >
              <Stars />

              <blockquote className="text-gray-600 leading-relaxed flex-1 mb-8 italic">
                &ldquo;{review.text}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
                <div className="w-10 h-10 bg-[#2B5F3A] rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0">
                  {review.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
