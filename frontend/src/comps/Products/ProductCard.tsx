import { Heart, Eye, ShoppingCart, Star } from "lucide-react";

// Define the props type for the component
interface ProductCardProps {
  product: {
    name: string;
    price: string;
    originalPrice?: string;
    rating: number;
    store: "coles" | "aldi" | "woolworths";
    image: string;
    badge?: string | null;
    isFavorite?: boolean;
  };
}

// A map for store logos
const storeLogos = {
  coles:
    "https://imgs.search.brave.com/zgP92XC8PM8FSF2OlJGLdA9d-tpBYsc_1bZ8kwHfiqk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIxLzA4/L0NvbGVzLUxvZ28t/NTAweDMxNC5wbmc",
  aldi: "https://imgs.search.brave.com/lC5er8NdlijQEiBa-NPNoacSncCV4iEvmqGtw8E6Syw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9iYW5u/ZXIyLmNsZWFucG5n/LmNvbS8yMDE4MDgw/OS9rd3AvYmU3MTkw/MTIzNGI3OTJkZjkx/MDEzMzUyMjM2MjE4/ZjQud2VicA",
  woolworths:
    "https://imgs.search.brave.com/0sl_tVUvc2z9jBnxcky5JGL0VdRodfUnZnqXVJJ_7Dc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93b29s/d29ydGhzZ3JvdXAu/c2NlbmU3LmNvbS9p/cy9pbWFnZS93b29s/d29ydGhzZ3JvdXBs/dGQvd29vbHdvcnRo/c19uel9sb2dvP3Rz/PTE3MzM5NjY2NzU2/MjcmZHByPW9mZg",
};

const ProductCard = ({ product }: ProductCardProps) => {
  const getBadgeClasses = () => {
    if (!product.badge) return "";
    if (product.badge.includes("Sale")) {
      return "bg-red-500 text-white";
    }
    if (product.badge.includes("Out of Stock")) {
      return "bg-gray-800 text-white";
    }
    return "bg-blue-500 text-white";
  };

  return (
    <div className="group relative border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white cursor-pointer">
      <div className="relative">
        {product.badge && (
          <div
            className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded z-10 ${getBadgeClasses()}`}
          >
            {product.badge}
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
            <Heart
              size={16}
              className={
                product.isFavorite
                  ? "text-red-500 fill-current"
                  : "text-gray-600"
              }
            />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
            <Eye size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        <div className="flex items-baseline my-2">
          <p className="text-xl font-bold text-gray-900">{product.price}</p>
          {product.originalPrice && (
            <p className="text-sm text-gray-500 line-through ml-2">
              {product.originalPrice}
            </p>
          )}
        </div>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < product.rating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-4">
          <img
            src={storeLogos[product.store]}
            alt={product.store}
            className="h-6 object-contain"
          />
          <button className="p-2 rounded-full hover:bg-gray-100">
            <ShoppingCart size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
