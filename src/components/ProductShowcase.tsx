import ProductGrid from './ProductGrid';

const ProductShowcase = () => {
  // Example product data
  const featuredProducts = [
    {
      id: 1,
      title: 'Essential Hair Primer Oil',
      subtitle: 'For all hair types',
      price: 15.00,
      imageUrl: '/img/essential-oil.png',
      slug: 'essential-hair-primer-oil'
    },
    {
      id: 2,
      title: 'Revitalizing Full Beard Oil',
      subtitle: 'For beard care',
      price: 19.00,
      imageUrl: '/img/essential-oil.png',
      slug: 'revitalizing-full-beard-oil'
    },
    // Add more products as needed
  ];

  return (
    <ProductGrid 
      products={featuredProducts} 
      title="Explore Our Exclusive Hair Oil Collections" 
      subtitle="Explore our variety of hair oil, formulated to combat hair loss, boost volume and nurture a healthy scalp. Begin your transformation today."
    />
  );
};

export default ProductShowcase;