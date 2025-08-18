import Footer from "@/comps/HomeCMTS/Footer";
import Navbar from "@/comps/HomeCMTS/Navbar";
import LeftSide from "@/comps/Products/leftColumn/LeftSide";
import SearchBar from "@/comps/Products/SearchBar";


const Products = () => {

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="w-4/5 mx-auto space-y-10 font-sans text-gray-800">
        <Navbar />
      </div>
      <main className="flex-grow py-8">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <LeftSide />
            <div className="lg:col-span-3 p-6 rounded-lg h-[300vh]">
              <SearchBar />
              <h1 className="text-4xl font-bold mt-10">Product Page</h1>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
