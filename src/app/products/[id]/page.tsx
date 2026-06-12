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
    priceId: product.stripePriceId,
  };

  return (
    <div className="min-h-screen bg-[#F9F1EE]">
      <div className="container mx-auto px-4 py-12">
        <div className="text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link> /
          <Link href="/shop" className="text-gray-500 hover:text-gray-700 mx-1">Shop</Link> /
          <span className="text-gray-700">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-[#EDE4E1] rounded-lg p-8 flex items-center justify-center aspect-square">
            <Image
              src={product.images?.[0] || '/img/essential-oil.png'}
              alt={product.name}
              width={500}
              height={500}
              className="object-contain max-h-full max-w-full"
            />
          </div>
          <ProductDetailClient product={clientProduct} />
        </div>

        <div className="mb-16">
          <h2 className="text-xl font-medium mb-4 text-center">Ingredients</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-700 text-center">{product.ingredients}</p>
          </div>
        </div>

        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-medium mb-8 text-center">RELATED PRODUCTS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <Link
                  href={`/products/${p.id}`}
                  key={p.id}
                  className="text-center group"
                >
                  <div className="bg-[#EDE4E1] rounded-lg p-4 mb-3 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={p.images?.[0] || '/img/essential-oil.png'}
                      alt={p.name}
                      width={150}
                      height={150}
                      className="mx-auto object-contain"
                    />
                  </div>
                  <h3 className="font-medium group-hover:text-green-600 transition-colors">{p.name}</h3>
                  <p className="text-gray-700">£{Number(p.price).toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
