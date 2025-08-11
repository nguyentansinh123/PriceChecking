import React from 'react';
import Navbar from '@/comps/HomeCMTS/Navbar';
import Footer from '@/comps/HomeCMTS/Footer';
import SideBar from '@/comps/ProductCMTS/SideBar';

const ProductListPage: React.FC = () => {
    const categories = ['Fresh Fruits', 'Vegetables', 'Cooking', 'Snacks', 'Beverages', 'Beauty & Health', 'Breads & Bakery'];
    const tags = ['Healthy', 'Low Fat', 'Vegetarian', 'Kid Foods', 'Vitamins', 'Bread', 'Meat', 'Snacks', 'Dinner', 'Fruit'];
    const priceRange = [50, 1500]; // min and max price
    const rating = [5, 4, 3]; // list of ratings to filter

    return (
        <>
            <div className="min-h-screen bg-gray-100 py-10 overflow-hidden">
                <div className="w-4/5 mx-auto space-y-15">
                    <Navbar />
                    <div className="flex">
                        <SideBar />
                    </div>
                    <h1>Product List</h1>
                    {/* Product list content will go here */}
                </div>
            </div>
            <Footer />
        
        </>
        
    );
};

export default ProductListPage;