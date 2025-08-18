import React from "react";
import StarRating from "../Wrapper/StarRating";

interface RatingItem {
  stars: number;
  label: string;
  checked?: boolean;
}

interface RatingProductProps {
  ratings: RatingItem[];
}

const RatingProduct: React.FC<RatingProductProps> = ({ ratings }) => {
  return (
    <ul className="space-y-3">
      {ratings.map((r) => (
        <li key={r.stars} className="flex items-center">
          <input
            type="checkbox"
            id={`rating-${r.stars}`}
            defaultChecked={r.checked}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor={`rating-${r.stars}`}
            className="ml-3 flex items-center gap-2 text-gray-600"
          >
            <StarRating rating={r.stars} />
            <span>{r.label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default RatingProduct;
