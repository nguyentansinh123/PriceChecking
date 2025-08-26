import {
  FaStar,
  FaRegStar,
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaRegHeart,
} from "react-icons/fa";

interface Product {
  name: string;
  reviews: {
    rating: number;
    count: number;
  };
  sku: string;
  salePrice: number;
  price: number;
  discount: number;
  brand: {
    logo: string;
    name: string;
  };
  description: string;
  category: string;
  tags: string[];
}

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
      <div className="flex items-center gap-4">
        <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          In Stock
        </span>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) =>
            i < Math.round(product.reviews.rating) ? (
              <FaStar key={i} className="text-yellow-400" />
            ) : (
              <FaRegStar key={i} className="text-gray-300" />
            ),
          )}
          <span className="ml-2 text-sm text-gray-600">
            {product.reviews.count} Reviews
          </span>
        </div>
        <span className="text-sm text-gray-500">SKU: {product.sku}</span>
      </div>
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-blue-600">
          ${product.salePrice.toFixed(2)}
        </span>
        <span className="text-xl text-gray-400 line-through">
          ${product.price.toFixed(2)}
        </span>
        <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-1 rounded">
          {product.discount}% Off
        </span>
      </div>
      <div className="flex items-center gap-8 border-y py-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Brand:</span>
          <img
            src={product.brand.logo}
            alt={product.brand.name}
            className="h-6"
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">Share item:</span>
          <a
            href="#"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-800 hover:text-white"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-400 hover:text-white"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-red-600 hover:text-white"
          >
            <FaPinterestP />
          </a>
        </div>
      </div>
      <p className="text-gray-600">{product.description}</p>
      <div className="flex items-center gap-4">
        <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition">
          Add to Cart
        </button>
        <button className="w-12 h-12 flex items-center justify-center border-2 border-gray-200 rounded-full text-gray-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition">
          <FaRegHeart size={20} />
        </button>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <span className="font-bold text-gray-800">Category:</span>{" "}
          {product.category}
        </p>
        <p>
          <span className="font-bold text-gray-800">Tag:</span>{" "}
          {product.tags.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
