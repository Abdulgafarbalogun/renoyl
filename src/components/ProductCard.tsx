import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  const { id, title, subtitle, price, imageUrl, slug } = product;

  return (
    <div className="flex flex-col">
      {/* Product Image */}
      <div className="bg-gray-100 rounded-lg mb-3 overflow-hidden">
        <div className="relative h-64 w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            style={{ objectFit: 'contain' }}
            priority={false}
            className="p-4 transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
      
      {/* Product Info */}
      <div className="bg-green-50 p-4 rounded-lg text-center">
        <h3 className="text-sm font-medium text-gray-800 mb-1">{title}</h3>
        <p className="font-bold text-lg mb-3">${price.toFixed(2)}</p>
        <Link href={`/shop/${slug}`}>
          <span className="inline-block border border-gray-300 rounded-full px-6 py-1 text-sm font-medium text-gray-700 hover:bg-white transition-colors duration-300">
            SHOP
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;