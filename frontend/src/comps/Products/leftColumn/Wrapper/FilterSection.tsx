import React, { useState } from "react";
import { FaChevronUp } from "react-icons/fa";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  children,
  defaultOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="py-6 border-b border-gray-200">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <FaChevronUp
          className={`text-gray-500 transition-transform duration-300 ${
            isOpen ? "" : "rotate-180"
          }`}
        />
      </div>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default FilterSection;
