import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

type ProductGalleryProps = {
  images: string[];
};

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const thumbnails = images.slice(1); // Assuming the first image is the main one

  return (
    <div className="flex gap-4 h-[500px]">
      <div className="flex flex-col items-center justify-center gap-2">
        <button className="text-gray-500 hover:text-black">
          <FaChevronUp />
        </button>
        <div className="flex flex-col gap-2">
          {thumbnails.map((img, index) => (
            <div
              key={index}
              className={`w-24 h-24 border-2 p-1 rounded-md cursor-pointer ${
                mainImage === img ? "border-green-500" : "border-gray-200"
              }`}
              onMouseEnter={() => setMainImage(img)}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
        <button className="text-gray-500 hover:text-black">
          <FaChevronDown />
        </button>
      </div>
      <div className="flex-1 border rounded-lg p-4 flex items-center justify-center bg-gray-50">
        <img
          src={mainImage}
          alt="Main product"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ProductGallery;
