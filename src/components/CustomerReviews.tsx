const CustomerReviews = () => {
  return (
    <section className="py-20 bg-ivory">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary-green">
          Our Customers love Renoyl
        </h2>
        <p className="text-center mb-10 text-gray-600">
          At Renoyl, we are committed to your satisfaction and expectations. Here is what our customers have been saying about us.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-primary-green">Francine Key</h4>
                <p className="text-xs text-gray-500">Happy Customer</p>
              </div>
            </div>
            <p className="text-gray-600">
              "Renoyl hair oils have transformed my hair! After just 2 weeks, I noticed a significant improvement in thickness and shine."
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-primary-green">Francine Key</h4>
                <p className="text-xs text-gray-500">Happy Customer</p>
              </div>
            </div>
            <p className="text-gray-600">
              "Renoyl hair oils have transformed my hair! After just 2 weeks, I noticed a significant improvement in thickness and shine."
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-primary-green">Francine Key</h4>
                <p className="text-xs text-gray-500">Happy Customer</p>
              </div>
            </div>
            <p className="text-gray-600">
              "Renoyl hair oils have transformed my hair! After just 2 weeks, I noticed a significant improvement in thickness and shine."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;