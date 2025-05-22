import React from 'react';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#F9F1EE] pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-2xl font-semibold mb-4">About</h1>
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-xl font-medium mb-4">Our Story</h2>
          <p className="text-gray-700 mb-8">
            Explore our variety of hair oil, formulated to combat hair loss, boost volume and nurture a healthy scalp. Begin your transformation today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          <div className="bg-[#EDE4E1] rounded-lg p-8">
            <Image
              src="/img/logo.png"
              alt="Renoyl Logo"
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Our Story</h2>
            <p className="text-gray-700">
              Explore our variety of hair oil, formulated to combat hair loss, boost volume and nurture a healthy scalp. Begin your transformation today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
