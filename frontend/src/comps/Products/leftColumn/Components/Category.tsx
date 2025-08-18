import React from "react";

interface CategoryItem {
  name: string;
  count: number;
  checked?: boolean;
}

interface CategoryProps {
  categories: CategoryItem[];
}

const Category: React.FC<CategoryProps> = ({ categories }) => {
  return (
    <ul className="space-y-3">
      {categories.map((cat) => (
        <li
          key={cat.name}
          className="flex items-center justify-between text-gray-600"
        >
          <div className="flex items-center">
            <input
              type="radio"
              name="category"
              id={cat.name}
              defaultChecked={cat.checked}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor={cat.name} className="ml-3">
              {cat.name}
            </label>
          </div>
          <span>({cat.count})</span>
        </li>
      ))}
    </ul>
  );
};

export default Category;
