import Footer from "@/comps/HomeCMTS/Footer";
import Navbar from "@/comps/HomeCMTS/Navbar";
import LeftSide from "@/comps/Products/leftColumn/LeftSide";
import SearchBar from "@/comps/Products/SearchBar";
import ProductCard from "@/comps/Products/ProductCard";
import Pagination from "@/comps/common/Pagination";
import useGetAllProducts from "@/hooks/ProductHooks/useGetAllProducts";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const Products = () => {
  const [sortBy, setSortBy] = useState("latest");
  
  const {
    products,
    isLoading,
    isError,
    page,
    limit,
    handlePageChange,
    handleLimitChange,
  } = useGetAllProducts();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
    // You could implement sorting logic here or on the server side
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
            <div className="lg:col-span-3 mt-10">
              <SearchBar />

              <div className="flex justify-between items-center mt-12">
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-by" className="text-sm text-gray-600">
                    Sort by:
                  </label>
                  <select
                    id="sort-by"
                    className="border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="latest">Latest</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                  </select>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-gray-800">{products.length}</span> Results
                  Found
                </p>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <BeatLoader color="#3B82F6" />
                </div>
              ) : isError ? (
                <div className="text-center text-red-500 mt-10">
                  Error loading products. Please try again later.
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                    {products.map((product, index) => (
                      <ProductCard 
                        key={product.productId || index} 
                        product={{
                          name: product.title,
                          price: product.price,
                          originalPrice: product.originalPrice || undefined,
                          rating: 4, // You might need to add this field to your API
                          store: (product.store?.toLowerCase() as any) || "coles",
                          image: product.image,
                          badge: product.originalPrice ? "Sale" : undefined,
                        }} 
                      />
                    ))}
                  </div>
                  {products.length === 0 && (
                    <div className="text-center py-10">
                      No products found. Try changing your search criteria.
                    </div>
                  )}
                  <div className="mt-8">
                    <Pagination
                      currentPage={page}
                      totalPages={10} // You might want to get this from the API
                      onPageChange={handlePageChange}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
