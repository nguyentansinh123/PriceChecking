import React, { useState } from "react";

interface PriceRangeProps {
  min: number;
  max: number;
  initialValue?: number;
  onPriceChange?: (price: number) => void;
}

const PriceRange: React.FC<PriceRangeProps> = ({
  min,
  max,
  initialValue,
  onPriceChange,
}) => {
  const [price, setPrice] = useState(initialValue ?? max);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number(event.target.value);
    setPrice(newPrice);
    if (onPriceChange) {
      onPriceChange(newPrice);
    }
  };

  // Calculate the progress percentage for the gradient background
  const progress = ((price - min) / (max - min)) * 100;
  const trackStyle = {
    background: `linear-gradient(to right, #3b82f6 ${progress}%, #e5e7eb ${progress}%)`,
  };

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={price}
        onChange={handleChange}
        style={trackStyle}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:h-4
                   [&::-webkit-slider-thumb]:w-4
                   [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:bg-blue-600
                   [&::-moz-range-thumb]:h-4
                   [&::-moz-range-thumb]:w-4
                   [&::-moz-range-thumb]:rounded-full
                   [&::-moz-range-thumb]:bg-blue-600"
      />
      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>
          Price: ${min} — ${price}
        </span>
      </div>
    </>
  );
};

export default PriceRange;
