import React from "react";
import StarRating from "../Wrapper/StarRating";

interface SaleProduct {
  name: string;
  img: string;
  price: string;
  oldPrice: string;
  active?: boolean;
}

interface CheapestProductProps {
  saleProducts: SaleProduct[];
}

const CheapestProduct: React.FC<CheapestProductProps> = ({ saleProducts }) => {
  return (
    <ul className="space-y-4">
      {saleProducts.map((p) => (
        <li
          key={p.name}
          className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer ${
            p.active ? "border border-blue-500" : ""
          }`}
        >
          <img
            src={p.img}
            alt={p.name}
            className="w-16 h-16 object-cover rounded-md"
          />
          <div>
            <h4 className="font-medium text-gray-800">{p.name}</h4>
            <div className="flex items-baseline gap-2">
              <span className="text-blue-600 font-semibold">{p.price}</span>
              <span className="text-sm text-gray-400 line-through">
                {p.oldPrice}
              </span>
            </div>
            <StarRating rating={4} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CheapestProduct;
