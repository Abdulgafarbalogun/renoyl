"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useZustandStore } from '@/store/zustandStore';

// This would typically come from a database or API
const productData = [
  {
    id: 1,
    name: 'Essential Hair Oil (30ml)',
    price: 25,
    description: 'Formulated with natural ingredients to nourish your hair and scalp. Our unique blend helps combat hair loss while promoting healthy growth.',
    image: '/img/product-bottle.jpg',
    ingredients: 'Jojoba Oil, Argan Oil, Rosemary Extract, Peppermint Oil, Vitamin E'
  },
  {
    id: 2,
    name: 'Scalp Serum',
    price: 20,
    description: 'Intensive treatment for scalp health. Helps reduce dandruff and itchiness while promoting hair growth.',
    image: '/img/product-bottle.jpg',
    ingredients: 'Aloe Vera, Tea Tree Oil, Biotin, Caffeine, Niacinamide'
  }
];

const ProductPage = () => {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const addItem = useZustandStore((state) => state.addItem);
  
  // In a real app, you would fetch this data from an API
  useEffect(() => {
    // Simulate API fetch
    const fetchProduct = () => {
      setLoading(true);
      // Find product by ID
      const foundProduct = productData.find(p => p.id === productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
      }
      setLoading(false);
    };
    
    fetchProduct();
  }, [productId]);
  
  // Get related products (excluding current product)
  const relatedProducts = productData.filter(p => p.id !== productId);
  
  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.image,
        quantity: quantity
      });
      
      // Optional: Add analytics tracking here
      console.log('Product added to cart:', {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F1EE] pt-24 flex items-center justify-center">
        <p>Loading product...</p>
      </div>
    );
  }

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
          {/* Product Image */}
          <div className="bg-[#EDE4E1] rounded-lg p-8 flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={400}
              className="mx-auto"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-2xl font-medium">{product.name}</h1>
            <p className="text-gray-700">{product.description}</p>
            
            {/* Price */}
            <div className="bg-[#EDE4E1] inline-block px-4 py-2 rounded">
              <span className="font-medium">£{product.price}</span>
            </div>
            
            {/* Quantity Selector */}
            <div className="space-y-2">
              <label htmlFor="quantity" className="block text-sm font-medium">Qty</label>
              <div className="flex items-center space-x-2">
                <select 
                  id="quantity"
                  className="border border-gray-300 rounded px-3 py-2 w-20"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  aria-label="Product quantity"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <div>
              <button 
                className="w-full bg-[#2B5F3A] text-white px-6 py-2 rounded hover:bg-[#224a2e] transition"
                onClick={handleAddToCart}
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>
            </div>
            {/* <button 
              className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition"
              aria-label="Add to wishlist"
            >
              Wishlist
            </button> */}
          </div>
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
                    width={150}
                    height={200}
                    className="mx-auto"
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
};

export default ProductPage;