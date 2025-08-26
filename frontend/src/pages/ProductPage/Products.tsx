import Footer from "@/comps/HomeCMTS/Footer";
import Navbar from "@/comps/HomeCMTS/Navbar";
import LeftSide from "@/comps/Products/leftColumn/LeftSide";
import SearchBar from "@/comps/Products/SearchBar";
import ProductCard from "@/comps/Products/ProductCard";
import { products } from "@/comps/Products/rightColumn/constants";
import Pagination from "@/comps/common/Pagination";
import { useState } from "react";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 100; // This should come from API response

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // You would add logic here to fetch products for the new page
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="w-4/5 mx-auto space-y-10 font-sans text-gray-800 bg-white">
        <Navbar />
      </div>
      <main className="flex-grow py-8">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <LeftSide />
            <div className="lg:col-span-3 h-[350vh] mt-10">
              <SearchBar />

              {/* Sorting and Results Count */}
              <div className="flex justify-between items-center mt-12">
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-by" className="text-sm text-gray-600">
                    Sort by:
                  </label>
                  <select
                    id="sort-by"
                    className="border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option>Latest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-gray-800">52</span> Results
                  Found
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                {products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
