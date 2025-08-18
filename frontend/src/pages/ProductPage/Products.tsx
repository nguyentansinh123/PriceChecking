import Footer from "@/comps/HomeCMTS/Footer";
import Navbar from "@/comps/HomeCMTS/Navbar";
import LeftSide from "@/comps/Products/leftColumn/LeftSide";
import SearchBar from "@/comps/Products/SearchBar";
import ProductCard from "@/comps/Products/ProductCard";
import { products } from "@/comps/Products/rightColumn/constants";

const Products = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="w-4/5 mx-auto space-y-10 font-sans text-gray-800 bg-white">
        <Navbar />
      </div>
      <main className="flex-grow py-8">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <LeftSide />
            <div className="lg:col-span-3 h-[300vh]">
              <SearchBar />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                {products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
