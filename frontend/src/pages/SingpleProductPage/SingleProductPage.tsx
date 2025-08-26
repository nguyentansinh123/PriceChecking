import Navbar from "@/comps/HomeCMTS/Navbar";
import Footer from "@/comps/HomeCMTS/Footer";
import ProductGallery from "./components/ProductGallery";
import ProductDetails from "./components/ProductDetails";
import ProductInfoTabs from "./components/ProductInfoTabs";
import RelatedProducts from "./components/RelatedProducts";

const product = {
  name: "Chinese Cabbage",
  images: [
    "/images/products/cabbage-main.png", // Main image
    "/images/products/cabbage-thumb-1.png",
    "/images/products/cabbage-thumb-2.png",
    "/images/products/cabbage-thumb-3.png",
    "/images/products/cabbage-thumb-4.png",
  ],
  reviews: {
    count: 4,
    rating: 4.5,
  },
  sku: "2,511,594",
  price: 48.0,
  salePrice: 17.28,
  discount: 64,
  brand: {
    name: "Jommy",
    logo: "/images/brands/jommy-logo.png",
  },
  description:
    "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.",
  category: "Vegetables",
  tags: ["Vegetables", "Healthy", "Chinese", "Cabbage", "Green Cabbage"],
};

const SingleProductPage = () => {
  return (
    <div className="bg-white font-sans">
      <div className="w-4/5 mx-auto">
        <Navbar />
      </div>

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductGallery images={product.images} />
          <ProductDetails product={product} />
        </div>

        <ProductInfoTabs />
        <RelatedProducts />
      </main>

      <Footer />
    </div>
  );
};

export default SingleProductPage;
