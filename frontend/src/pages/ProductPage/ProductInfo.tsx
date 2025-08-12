import React from "react";
import { FaStar, FaRegStar, FaFacebook, FaEnvelope } from "react-icons/fa";
import Navbar from "@/comps/HomeCMTS/Navbar";
import Footer from "@/comps/HomeCMTS/Footer";

type ProductInfoProps = {
    name: string;
    inStock: boolean;
    rating: number; // 0-5
    sku: string;
    price: number;
    brand: string;
    images: string[];
};

const ProductInfo: React.FC<ProductInfoProps> = ({
    name,
    inStock,
    rating,
    sku,
    price,
    brand,
    images,
}) => {
    const renderStars = (rating: number) => (
        <>
            {[...Array(5)].map((_, i) =>
                i < rating ? (
                    <FaStar key={i} color="#facc15" />
                ) : (
                    <FaRegStar key={i} color="#d1d5db" />
                )
            )}
        </>
    );

    const shareUrl = window.location.href;
    const shareText = encodeURIComponent(`Check out this product: ${name}`);

    return (
        <div className="min-h-screen bg-gray-100 py-10 overflow-hidden">
            <div className="w-4/5 mx-auto space-y-15">
                <Navbar />

                <div style={{ display: "flex", gap: "10rem" }}>
                    {/* Left: Product Images */}
                    <div style={{ display: "flex items-center", gap: 10 }}>
                        {/* Vertical slider for thumbnails */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 8,
                                maxWidth: 80,
                                marginRight: 8,
                                alignItems: "center",
                                justifyContent: "center",
                                maxHeight: 320,
                                overflowY: images.length > 3 ? "auto" : "visible",
                            }}
                        >
                            {images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`${name} ${idx + 1}`}
                                    style={{
                                        width: 90,
                                        height: 90,
                                        objectFit: "cover",
                                        borderRadius: 4,
                                        border: "1px solid #e5e7eb",
                                        cursor: "pointer",
                                        opacity: idx === 0 ? 1 : 0.7,
                                    }}
                                />
                            ))}
                        </div>
                        {/* Main large image */}
                        <div style={{ width: 600, height: 500, minWidth: 240 }}>
                            <img
                                src={images[0]}
                                alt={name}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: 12,
                                    marginBottom: 2,
                                }}
                            />
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                        }}
                    >
                        {/* Name & In Stock */}
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <h1 style={{ fontSize: 28, fontWeight: 600, margin: 0 }}>
                                {name}
                            </h1>
                            <span
                                style={{
                                    background: inStock ? "#22c55e" : "#ef4444",
                                    color: "#fff",
                                    borderRadius: 16,
                                    padding: "4px 16px",
                                    fontWeight: 500,
                                    fontSize: 14,
                                    display: "inline-block",
                                }}
                            >
                                {inStock ? "In Stock" : "Out of Stock"}
                            </span>
                        </div>

                        {/* Rating & SKU */}
                        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                {renderStars(rating)}
                            </div>
                            <span style={{ color: "#6b7280", fontSize: 14 }}>
                                SKU: {sku}
                            </span>
                        </div>

                        {/* Price */}
                        <div
                            style={{
                                fontSize: 32,
                                fontWeight: 700,
                                color: "#1e293b",
                            }}
                        >
                            ${price.toFixed(2)}
                        </div>

                        {/* Brand & Share */}
                        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                            <span style={{ color: "#6b7280", fontSize: 16 }}>
                                Brand:{" "}
                                <span style={{ color: "#0ea5e9", fontWeight: 500 }}>
                                    {brand}
                                </span>
                            </span>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ color: "#6b7280", fontSize: 16 }}>Share:</span>
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                        shareUrl
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "#1877f3", fontSize: 20 }}
                                    title="Share on Facebook"
                                >
                                    <FaFacebook />
                                </a>
                                <a
                                    href={`mailto:?subject=${shareText}&body=${encodeURIComponent(
                                        shareUrl
                                    )}`}
                                    style={{ color: "#ea4335", fontSize: 20 }}
                                    title="Share via Gmail"
                                >
                                    <FaEnvelope />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;