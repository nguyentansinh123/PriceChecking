import { useState } from "react";
import { FaCheckCircle, FaPlayCircle, FaRegMoneyBillAlt } from "react-icons/fa";
import { GiPlantSeed } from "react-icons/gi";

const ProductInfoTabs = () => {
  const [activeTab, setActiveTab] = useState("description");

  const renderContent = () => {
    if (activeTab === "description") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-gray-600 space-y-4">
            <p>
              Sed commodo aliquam dui ac porta. Fusce ipsum felis, imperdiet at
              posuere ac, viverra at mauris. Maecenas tincidunt ligula a sem
              vestibulum pharetra. Maecenas auctor tortor lacus, nec laoreet
              nisl porttitor vel. Etiam tincidunt metus vel dui interdum
              sollicitudin.
            </p>
            <p>
              Nulla mauris tellus, feugiat quis pharetra sed, gravida ac dui.
              Sed iaculis, metus faucibus elementum tincidunt, turpis mi viverra
              velit, pellentesque tristique neque mi eget nulla.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-500" /> 100 g of fresh
                leaves provides.
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-500" /> Aliquam ac est at
                augue volutpat elementum.
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-500" /> Proin convallis odio
                volutpat finibus posuere.
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="relative cursor-pointer group">
              <img
                src="/images/content/delivery-man.jpg"
                alt="Delivery"
                className="rounded-lg w-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded-lg">
                <FaPlayCircle
                  size={60}
                  className="text-white group-hover:scale-110 transition-transform"
                />
              </div>
            </div>
            <div className="flex justify-around text-center md:text-left">
              <div className="flex items-center gap-3">
                <FaRegMoneyBillAlt size={30} className="text-blue-500" />
                <div>
                  <p className="font-bold">64% Discount</p>
                  <p className="text-sm text-gray-500">Save your 64% money</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <GiPlantSeed size={30} className="text-green-500" />
                <div>
                  <p className="font-bold">100% Organic</p>
                  <p className="text-sm text-gray-500">Organic Vegetables</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div>Content for {activeTab}</div>;
  };

  return (
    <div className="mt-16">
      <div className="border-b flex justify-center gap-8">
        <button
          onClick={() => setActiveTab("description")}
          className={`py-4 px-2 text-lg font-semibold ${activeTab === "description" ? "text-green-600 border-b-2 border-green-600" : "text-gray-500"}`}
        >
          Descriptions
        </button>
        <button
          onClick={() => setActiveTab("additional")}
          className={`py-4 px-2 text-lg font-semibold ${activeTab === "additional" ? "text-green-600 border-b-2 border-green-600" : "text-gray-500"}`}
        >
          Additional Information
        </button>
        <button
          onClick={() => setActiveTab("feedback")}
          className={`py-4 px-2 text-lg font-semibold ${activeTab === "feedback" ? "text-green-600 border-b-2 border-green-600" : "text-gray-500"}`}
        >
          Customer Feedback
        </button>
      </div>
      <div className="py-8">{renderContent()}</div>
    </div>
  );
};

export default ProductInfoTabs;
