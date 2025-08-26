import ProductCard from "@/comps/Products/ProductCard"; // Assumes you have this component
import { products } from "@/comps/Products/rightColumn/constants"; // Assumes you have this mock data

const RelatedProducts = () => {
  const related = products.slice(0, 4);

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-center mb-8">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
