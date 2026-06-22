import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import ProductDetailClient from './productDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await api.products.get(id);
    return {
      title: `${product.name} — Renoyl`,
      description: product.description || `Buy ${product.name} from Renoyl.`,
      openGraph: {
        title: product.name,
        description: product.description || '',
        images: product.images?.[0] ? [{ url: product.images[0] }] : [],
      },
    };
  } catch {
    return { title: 'Product — Renoyl' };
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let product;
  let allProducts;

  try {
    [product, allProducts] = await Promise.all([
      api.products.get(id),
      api.products.list(),
    ]);
  } catch {
    notFound();
  }

  if (!product) notFound();

  const related = (allProducts ?? []).filter((p) => p.id !== id).slice(0, 4);

  const clientProduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    ingredients: product.ingredients,
    image: product.images?.[0] || '/img/essential-oil.png',
  };

  return (
    <div className="bg-[#F9F7F2] min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 md:mb-12">
          <Link href="/" className="hover:text-[#2B5F3A] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#2B5F3A] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-gray-700 truncate max-w-[140px] sm:max-w-none">{product.name}</span>
        </nav>

        {/* Product */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-20 mb-10 md:mb-20">
          <div className="relative bg-[#EDE4E1] rounded-3xl overflow-hidden aspect-square">
            <Image
              src={product.images?.[0] || '/img/essential-oil.png'}
              alt={product.name}
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-700 hover:scale-105"
            />
          </div>
          <ProductDetailClient product={clientProduct} />
        </div>

        {/* Ingredients */}
        {product.ingredients && (
          <div className="bg-white rounded-3xl px-6 py-8 md:px-12 md:py-14 mb-10 md:mb-20 text-center">
            <span className="block text-[#2B5F3A] text-xs font-medium tracking-widest uppercase mb-4">
              Key Ingredients
            </span>
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4 md:mb-6">What&apos;s Inside</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">{product.ingredients}</p>
          </div>
        )}

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <div className="text-center mb-6 md:mb-12">
              <span className="block text-[#2B5F3A] text-xs font-medium tracking-widest uppercase mb-4">
                You May Also Like
              </span>
              <h2 className="text-2xl md:text-3xl font-light text-gray-900">Related Products</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <Link href={`/products/${p.id}`} key={p.id} className="group">
                  <div className="relative bg-[#EDE4E1] rounded-2xl mb-3 md:mb-4 aspect-square overflow-hidden">
                    <Image
                      src={p.images?.[0] || '/img/essential-oil.png'}
                      alt={p.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 text-sm group-hover:text-[#2B5F3A] transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">£{Number(p.price).toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
