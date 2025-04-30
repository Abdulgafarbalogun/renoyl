"use client"
// components/ProductGrid.tsx
import ProductCard from './ProductCard';

// Define the Product interface (the same as in ProductCard.tsx)
interface Product {
  id: number;
  title: string;
  subtitle?: string;
  price: number;
  imageUrl: string;
  slug: string;
}

// Define the props interface for the component
interface ProductGridProps {
  products: Product[];
  title: string;
  subtitle?: string;
}

const ProductGrid = ({ products, title, subtitle }: ProductGridProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>
          {subtitle && (
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Products Grid - Centered with max-width */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {products.map((product) => (
              <div key={product.id} className="flex justify-center">
                <div className="w-full max-w-xs">
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
