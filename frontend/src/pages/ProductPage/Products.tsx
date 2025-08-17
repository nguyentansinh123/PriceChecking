import Footer from "@/comps/HomeCMTS/Footer";
import Navbar from "@/comps/HomeCMTS/Navbar";
import SearchBar from "@/comps/Products/SearchBar";
import { IoSearch } from "react-icons/io5";

const Products = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-gray-50 py-10 flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col flex-grow w-full">
          <Navbar />
        </div>
      </main>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-8 flex-grow mx-[6%]">
            <aside className="lg:col-span-1 bg-blue-100 p-6 rounded-lg h-[400vh]">
              <h2 className="text-xl font-semibold">Filters</h2>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3 bg-red-100 p-6 rounded-lg h-[400vh]">
              <SearchBar/>
              <h1 className="text-4xl font-bold mt-10">Product Page</h1>
              
            </div>
          </div>
      <Footer />
    </div>
  );
};

export default Products;
