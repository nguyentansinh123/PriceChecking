import React from 'react';
import Navbar from '@/comps/HomeCMTS/Navbar';
import Footer from '@/comps/HomeCMTS/Footer';
import SideBar from '@/comps/ProductCMTS/SideBar';
import potato from '@/assets/potato.png';
import coles from '@/assets/coles.png';
import woolworths from '@/assets/woolworths.png';

const ProductListPage: React.FC = () => {
    const categories = ['Fresh Fruits', 'Vegetables', 'Cooking', 'Snacks', 'Beverages', 'Beauty & Health', 'Breads & Bakery'];
    const tags = ['Healthy', 'Low Fat', 'Vegetarian', 'Kid Foods', 'Vitamins', 'Bread', 'Meat', 'Snacks', 'Dinner', 'Fruit'];
    const priceRange = [50, 1500]; // min and max price
    const rating = [5, 4, 3]; // list of ratings to filter

    const products = [
        {
            name: 'Potatos',
            image: potato,
            price: 14.99,
            rating: '★★★★☆',
        },
        {
            name: 'Cabbage',
            image: potato,
            price: 14.99,
            rating: '★★★★☆',
        },
        {
            name: 'Corn',
            image: potato,
            price: 14.99,
            rating: '★★★★☆',
        },
    ];

    return (
        <>
            <div className="min-h-screen bg-gray-100 py-10 overflow-hidden">
                <div className="w-4/5 mx-auto space-y-15">
                    <Navbar />
                    
                    <div className="flex space-x-10">
                        <div className="flex mt-15 w-1/4">
                            <SideBar />
                        </div>
                        

                        <div className="flex-1 items-center">

                            <div className="flex w-full mb-6">
                                <div className="relative flex-grow">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <circle cx="11" cy="11" r="8" />
                                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className="w-full pl-10 pr-28 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 rounded-r-md font-semibold transition-colors"
                                >
                                    Search
                                </button>
                            </div>

                            <div className="flex justify-between items-center mt-10">
                                
                                <div className="flex items-center space-x-4">
                                    <label htmlFor="sortBy" className="text-md font-medium text-gray-500">
                                        Sort by:
                                    </label>
                                    <select
                                        id="sortBy"
                                        name="sortBy"
                                        className="h-10 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        defaultValue="popular"
                                    >
                                        <option value="latest">Latest</option>
                                        <option value="earliest">Earliest</option>
                                        <option value="relevant">Most Relevant</option>
                                        <option value="popular">Most Popular</option>
                                    </select>
                                </div>
                                
                                <div className="text-gray-600 text-md font-medium">
                                    128 products
                                </div>
                            </div>

                            

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-10">
                                {products.map((product, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white rounded-lg shadow p-6 flex flex-col justify-between h-100 relative"
                                    >
                                        {/* Product Image */}
                                        <div className="mb-4 flex justify-center">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="object-contain rounded"
                                            />
                                        </div>
                                        {/* Product Name */}
                                        <div className="flex flex-col items-start space-y-1">
                                            <h3 className="text-md text-grey-700">{product.name}</h3>
                                            <h4 className="text-black-600 font-bold text-lg">${product.price}</h4>
                                            <div className="flex items-center text-yellow-500">{product.rating}</div>
                                        </div>

                                        <div className="absolute bottom-12 right-4 flex items-center space-x-3">
                                            <span>
                                                <img
                                                    src={coles}
                                                    alt="Coles"
                                                    className="w-7 h-7 object-contain bg-white rounded-full border"
                                                />
                                            </span>
                                            <span title="Woolworths">
                                                <img
                                                    src={woolworths}
                                                    alt="Woolworths"
                                                    className="w-7 h-7 object-contain bg-white rounded-full border"
                                                />
                                            </span>
                                            
                                            <button
                                                className="ml-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow transition-colors"
                                                title="Add to cart"
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.85-1.53L17 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>





                        </div>


                        


                    </div>
                </div>
            </div>
            <Footer />
        
        </>
        
    );
};

export default ProductListPage;