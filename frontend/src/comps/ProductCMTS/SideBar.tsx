import React, { useState } from 'react';
import filter from '../../assets/filter.png';

interface Product {
  name: string;
  price: string;
  discountPrice: string;
  image: string;
}

const categories = [
  { category: 'Vegetables', quantity: 12 },
  { category: 'Fresh Fruit', quantity: 8 },
  { category: 'Cooking', quantity: 5 },
  { category: 'Snacks', quantity: 7 },
  { category: 'Beverages', quantity: 4 },
];

const ratingOptions = [
  { value: 5.0, label: '5.0', stars: '★★★★★' },
  { value: 4.0, label: '4.0 & up', stars: '★★★★☆' },
  { value: 3.0, label: '3.0 & up', stars: '★★★☆☆' },
  { value: 2.0, label: '2.0 & up', stars: '★★☆☆☆' },
  { value: 1.0, label: '1.0 & up', stars: '★☆☆☆☆' },
];

const popularTags = [
  'Fresh', 'Organic', 'Discount', 'Imported', 'Local', 'Seasonal', 'Best Seller', 'New'
];

const saleProducts: Product[] = [
  { name: 'Red Capsicum', price: '$32.00', discountPrice: '$30.99', image: 'red-capsicum.jpg' },
  { name: 'Chinese Cabbage', price: '$24.00', discountPrice: '$20.99', image: 'chinese-cabbage.jpg' },
  { name: 'Green Capsicum', price: '$32.00', discountPrice: '$29.99', image: 'green-capsicum.jpg' },
];

const Sidebar: React.FC = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [rating, setRating] = useState<number>(4.0);
  const [showCategories, setShowCategories] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('vegetables');
  const [showRating, setShowRating] = useState<boolean>(true);
  const [showTags, setShowTags] = useState<boolean>(true);

  return (
    <div className="w-64 bg-gray-100 p-4 space-y-6">
      
      <button className="w-40 h-12 mb-10 py-2 bg-blue-500 text-white font-semibold rounded-2xl hover:bg-blue-700 transition duration-200">
        Filter
        <img src={filter} alt="Filter Icon" className="inline-block ml-4 h-5 w-5" />
      </button>

      
      <div className='mb-6 border-b pb-4'>
        <button
          className="flex items-center justify-between w-full text-xl font-semibold mb-6"
          type="button"
          onClick={() => setShowCategories((prev) => !prev)}
        >
          <span>All Categories</span>
          <svg
            className={`w-4 h-4 ml-2 text-black-500 transition-transform duration-200 ${showCategories ? 'rotate-180' : ''}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        
        {showCategories && (
          <ul className="text-lg mb-5" aria-labelledby="All Categories">
            {categories.map((cat) => (
              <li key={cat.category}>
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="radio"
                    value={cat.category}
                    name="category"
                    checked={selectedCategory === cat.category}
                    onChange={() => setSelectedCategory(cat.category)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <label className="ms-3 text-md text-gray-900">
                    {cat.category} <span className="text-gray-500">({cat.quantity})</span>
                  </label>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Price Range */}
      <div className='mb-6 border-b pb-6'>
        <h4 className="flex items-center justify-between w-full text-xl font-semibold mb-6">Price Range</h4>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">${priceRange[0]}</span>
          <input
            type="range"
            min={0}
            max={1500}
            value={priceRange[0]}
            onChange={e => {
              const val = Math.min(Number(e.target.value), priceRange[1] - 1);
              setPriceRange([val, priceRange[1]]);
            }}
            className="w-full accent-blue-600"
          />
          <input
            type="range"
            min={0}
            max={1500}
            value={priceRange[1]}
            onChange={e => {
              const val = Math.max(Number(e.target.value), priceRange[0] + 1);
              setPriceRange([priceRange[0], val]);
            }}
            className="w-full accent-blue-600"
          />
          <span className="text-sm font-medium">${priceRange[1]}</span>
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>Min: ${priceRange[0]}</span>
          <span>Max: ${priceRange[1]}</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div className='mb-6 border-b pb-6'>
        <button
          className="flex items-center justify-between w-full text-xl font-semibold mb-6"
          type="button"
          onClick={() => setShowRating((prev) => !prev)}
        >
          <span>Rating</span>
          <svg
            className={`w-4 h-4 ml-2 text-black-700 transition-transform duration-200 ${showRating ? 'rotate-180' : ''}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {showRating && (
          <ul className="text-lg mb-3" aria-labelledby="Rating">
            {ratingOptions.map(option => (
              <li key={option.value}>
                <div className="flex items-center">
                  <input
                    type="radio"
                    value={option.value}
                    name="rating"
                    checked={rating === option.value}
                    onChange={() => setRating(option.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 rounded-none"
                    style={{ borderRadius: 0 }}
                  />
                  <span className="ml-2 mr-2 text-yellow-500">{option.stars}</span>
                  <label className="text-md text-gray-900">
                    {option.label}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Popular Tags */}
      <div className='mb-6 border-b pb-6'>
        <button
          className="flex items-center justify-between w-full text-xl font-semibold mb-6"
          type="button"
          onClick={() => setShowTags((prev) => !prev)}
        >
          <span>Popular Tags</span>
          <svg
            className={`w-4 h-4 ml-2 text-black-700 transition-transform duration-200 ${showTags ? 'rotate-180' : ''}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {showTags && (
          <div className="flex flex-wrap gap-3 mb-3">
            {popularTags.map((tag) => (
              <button
                key={tag}
                className="px-5 py-2 text-sm bg-gray-200 rounded-2xl hover:bg-gray-300 transition"
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sale Products */}
      <div className='mb-6 pb-6'>
        <h4 className="text-xl font-semibold mb-6">Sale Products</h4>
        {saleProducts.map((product, index) => (
          <div key={index} className="flex items-center space-x-4 mb-3">
            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
            <div>
              <p className="text-sm font-medium">{product.name}
              <p className="text-xs text-gray-500"></p>
                <span className="line-through text-red-600">{product.price}</span>{' '}
                <span className="font-semibold text-green-600">{product.discountPrice}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
