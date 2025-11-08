import Image from 'next/image';
import Link from 'next/link';
import { products, getProductById, getAllProductIds } from '@/data/products';
import ProductDetailClient from './productDetailClient';

export function generateStaticParams() {
  return getAllProductIds().map(id => ({ id: id.toString() }));
}

export const dynamic = 'force-static';

// Using loose typing for params to satisfy Next.js static export without runtime auth/backend.
export default function ProductPage({ params }: any) {
  const productId = parseInt(params.id, 10);
  const product = getProductById(productId);
  const relatedProducts = products.filter(p => p.id !== productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F9F1EE] pt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-medium">Product not found</h1>
          <Link href="/shop" className="text-green-600 hover:underline">
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F1EE]">
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link> / 
          <Link href="/shop" className="text-gray-500 hover:text-gray-700 mx-1">Shop</Link> / 
          <span className="text-gray-700">{product.name}</span>
        </div>

        {/* Product Details Section */}
  <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Product Image Container */}
          <div className="bg-[#EDE4E1] rounded-lg p-8 flex items-center justify-center aspect-square"> {/* Added aspect-square for a consistent container shape */} 
            <Image
              src={product.image}
              alt={product.name}
              width={500}  // Provide a base width, height will be auto or constrained by aspect ratio
              height={500} // Provide a base height
              className="object-contain max-h-full max-w-full" // Ensure it respects container bounds
            />
          </div>

          {/* Product Info */}
          <ProductDetailClient product={product} />
        </div>

        {/* Ingredients Section */}
        <div className="mb-16">
          <h2 className="text-xl font-medium mb-4 text-center">Ingredients</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-700 text-center">{product.ingredients}</p>
          </div>
        </div>

        {/* Related Products Section */}
        <div>
          <h2 className="text-xl font-medium mb-8 text-center">RELATED PRODUCTS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <Link 
                href={`/products/${relatedProduct.id}`} 
                key={relatedProduct.id}
                className="text-center group"
                aria-label={`View ${relatedProduct.name} details`}
              >
                <div className="bg-[#EDE4E1] rounded-lg p-4 mb-3 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    width={150} // You can adjust width if needed
                    height={150} // Adjusted from 200, change as needed
                    className="mx-auto object-contain" // Added object-contain
                  />
                </div>
                <h3 className="font-medium group-hover:text-green-600 transition-colors">{relatedProduct.name}</h3>
                <p className="text-gray-700">£{relatedProduct.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}