import { categories, ratings, saleProducts, tags } from "./Constants";
import FilterSection from "./Wrapper/FilterSection";
import Category from "./Components/Category";
import PriceRange from "./Components/PriceRange";
import RatingProduct from "./Components/RatingProduct";
import Tags from "./Components/Tags";
import Deals from "./Components/Deals";
import CheapestProduct from "./Components/CheapestProduct";

const LeftSide = () => {
  return (
    <aside className="lg:col-span-1 p-4 rounded-lg">
      <FilterSection title="All Categories">
        <Category categories={categories} />
      </FilterSection>

      <FilterSection title="Price">
        <PriceRange min={0} max={1500} />
      </FilterSection>

      <FilterSection title="Rating">
        <RatingProduct ratings={ratings} />
      </FilterSection>

      <FilterSection title="Popular Tag">
        <Tags tags={tags} />
      </FilterSection>

      <Deals />

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Cheapest Products
        </h3>
        <CheapestProduct saleProducts={saleProducts} />
      </div>
    </aside>
  );
};

export default LeftSide;
