import React, { useState } from 'react';
import filter from '../../assets/filter.png';

interface Product {
  name: string;
  price: string;
  discountPrice: string;
  image: string;
}

const Sidebar: React.FC = () => {
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [rating, setRating] = useState<number>(4.0);

  const saleProducts: Product[] = [
    { name: 'Red Capsicum', price: '$32.00', discountPrice: '$30.99', image: 'red-capsicum.jpg' },
    { name: 'Chinese Cabbage', price: '$24.00', discountPrice: '$20.99', image: 'chinese-cabbage.jpg' },
    { name: 'Green Capsicum', price: '$32.00', discountPrice: '$29.99', image: 'green-capsicum.jpg' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('vegetables');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="w-64 bg-gray-100 p-4 space-y-6">
      {/* Filter Button */}
      <button className="w-40 h-12 py-2 bg-blue-500 text-white font-semibold rounded-2xl hover:bg-blue-700 transition duration-200">
        Filter
        <img src={filter} alt="Filter Icon" className="inline-block ml-4 h-5 w-5" />
      </button>

      {/* Categories Section */}
      <div>
        <h4 className="text-lg font-semibold mb-3">All Categories</h4>
        <div className="space-y-2">
          <label className="block">
            <input type="radio" name="category" className="mr-2" />
            Vegetables
          </label>
          <label className="block">
            <input type="radio" name="category" className="mr-2" />
            Fresh Fruit
          </label>
        </div>
      </div>

    <button className="flex items-center justify-between w-full text-lg font-semibold mb-3" type="button">
      <span>All Categories</span>
      <svg
        className="w-5 h-5 ml-2 text-gray-700"
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

      <div>
        <ul className="text-lg font-semibold mb-3" aria-labelledby="All Categories">
            <li>
                <div className="flex items-center">
                    <input type="radio" value="" name='radio-1' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
                </div>
            </li>
        </ul>
      </div>
        

      {/* Price Range */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Price</h4>
        <input
          type="range"
          min="0"
          max="1500"
          value={priceRange[0]}
          onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
          className="w-full"
        />
        <input
          type="range"
          min="0"
          max="1500"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          className="w-full"
        />
        <p className="text-sm text-gray-600">Price: ${priceRange[0]} - ${priceRange[1]}</p>
      </div>

      {/* Rating Filter */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Rating</h4>
        <label className="block">
          <input
            type="radio"
            name="rating"
            checked={rating === 4.0}
            onChange={() => setRating(4.0)}
            className="mr-2"
          />
          4.0 & up
        </label>
        <label className="block">
          <input
            type="radio"
            name="rating"
            checked={rating === 5.0}
            onChange={() => setRating(5.0)}
            className="mr-2"
          />
          5.0
        </label>
      </div>

      {/* Popular Tags Section */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Popular Tags</h4>
        <div className="space-x-2">
          <button className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300">Healthy</button>
          <button className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300">Low Fat</button>
          <button className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300">Vegetarian</button>
          <button className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300">Kid Foods</button>
          <button className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300">Vitamins</button>
        </div>
      </div>

      {/* Sale Products */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Sale Products</h4>
        {saleProducts.map((product, index) => (
          <div key={index} className="flex items-center space-x-4 mb-3">
            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
            <div>
              <p className="text-sm font-medium">{product.name}</p>
              <p className="text-xs text-gray-500">
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
