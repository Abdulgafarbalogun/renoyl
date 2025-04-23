const ImageGallery = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-200 rounded-lg h-64">
            <img src="/img/gallery1.jpg" alt="Gallery Image 1" className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="bg-gray-200 rounded-lg h-64">
            <img src="/img/gallery2.jpg" alt="Gallery Image 2" className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="bg-gray-200 rounded-lg h-64">
            <img src="/img/gallery3.jpg" alt="Gallery Image 3" className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="bg-gray-200 rounded-lg h-64">
            <img src="/img/gallery4.jpg" alt="Gallery Image 4" className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;