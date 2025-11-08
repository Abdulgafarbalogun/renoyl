export interface ProductItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  ingredients: string;
}

export const products: ProductItem[] = [
  {
    id: 1,
    name: 'Essential Hair Oil (30ml)',
    price: 25,
    description: 'Formulated with natural ingredients to nourish your hair and scalp. Our unique blend helps combat hair loss while promoting healthy growth.',
    image: '/img/essential-oil.png',
    ingredients: 'Jojoba Oil, Argan Oil, Rosemary Extract, Peppermint Oil, Vitamin E'
  },
  {
    id: 2,
    name: 'Scalp Serum',
    price: 20,
    description: 'Intensive treatment for scalp health. Helps reduce dandruff and itchiness while promoting hair growth.',
    image: '/img/essential-oil.png',
    ingredients: 'Aloe Vera, Tea Tree Oil, Biotin, Caffeine, Niacinamide'
  }
];

export function getProductById(id: number) {
  return products.find(p => p.id === id) || null;
}

export function getAllProductIds() {
  return products.map(p => p.id);
}