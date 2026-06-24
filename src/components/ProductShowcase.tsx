import ProductGrid from './ProductGrid';
import { api } from '@/lib/api';

const ProductShowcase = async () => {
  let products: { id: string; title: string; price: number; imageUrl: string; slug: string }[] = [];

  try {
    const apiProducts = await api.products.list();
    products = apiProducts
      .filter((p) => p.isActive)
      .slice(0, 4)
      .map((p) => ({
        id: p.id,
        title: p.name,
        price: Number(p.price),
        imageUrl: p.images?.[0] || '/img/essential-oil.png',
        slug: p.id,
      }));
  } catch {
    // backend unreachable — render nothing
  }

  return (
    <ProductGrid
      products={products}
      title="Explore Our Exclusive Hair Oil Collections"
      subtitle="Explore our variety of hair oil, formulated to combat hair loss, boost volume and nurture a healthy scalp. Begin your transformation today."
    />
  );
};

export default ProductShowcase;
