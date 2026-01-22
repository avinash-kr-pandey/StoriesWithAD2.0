// components/ProductInfo.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/utils/products";
import toast from "react-hot-toast";
import GlobalButton from "@/components/utils/GlobalButton";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const { addToCart, cart } = useCart();

  // Get all images (main image + additional images)
  const allImages = product.images || [product.image];

  const handleAddToCart = () => {
    const existingItem = cart.items.find(
      (item) => item.product.id === product.id,
    );

    if (existingItem) {
      toast.error(`${product.name} is already in your cart!`, {
        icon: "⚠️",
        style: {
          border: "1px solid #fbbf24",
          padding: "16px",
          color: "#92400e",
          background: "#fef3c7",
        },
      });
    } else {
      addToCart(product);
      toast.success(`${product.name} added to cart successfully!`, {
        icon: "🛒",
        style: {
          border: "1px solid #10b981",
          padding: "16px",
          color: "#065f46",
          background: "#d1fae5",
        },
      });
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // You can add navigation to cart page here
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pt-8">
          {/* Left: Product Image */}
          <div className="flex flex-col">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-100 to-blue-50 mb-6">
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Thumbnail Gallery - Bottom Row */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {allImages.map((img, index) => (
                <div
                  key={index}
                  className={`relative flex-shrink-0 w-24 h-24 cursor-pointer transition-all duration-200 border ${
                    selectedImage === img
                      ? "border-gray-900 border-2"
                      : "border-gray-300 hover:border-gray-600"
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 gap-2 font-light tracking-wider">
              <span
                className="hover:text-black cursor-pointer transition-colors duration-200"
                style={{
                  fontFamily: "system-ui, sans-serif",
                  letterSpacing: "0.08em",
                  lineHeight: "1.6",
                  fontWeight: 500,
                }}
              >
                Home
              </span>
              <span
                style={{
                  fontFamily: "system-ui, sans-serif",
                  letterSpacing: "0.08em",
                  lineHeight: "1.6",
                  fontWeight: 500,
                }}
              >
                •
              </span>
              <span
                className="hover:text-black cursor-pointer transition-colors duration-200"
                style={{
                  fontFamily: "system-ui, sans-serif",
                  letterSpacing: "0.08em",
                  lineHeight: "1.6",
                  fontWeight: 500,
                }}
              >
                ALL PRODUCTS
              </span>
              <span
                style={{
                  fontFamily: "system-ui, sans-serif",
                  letterSpacing: "0.08em",
                  lineHeight: "1.6",
                  fontWeight: 500,
                }}
              >
                •
              </span>
              <span
                className="text-black font-medium"
                style={{
                  fontFamily: "system-ui, sans-serif",
                  letterSpacing: "0.08em",
                  lineHeight: "1.6",
                  fontWeight: 500,
                }}
              >
                {product.name}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl font-light text-gray-900 leading-snug tracking-wider">
              {product.name}
            </h1>

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-center gap-4">
                <p
                  className="text-3xl font-normal text-gray-900 tracking-wider"
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    letterSpacing: "0.01em",
                    lineHeight: "1.6",
                    fontWeight: 500,
                  }}
                >
                  ${product.price.toLocaleString("en-US")}
                </p>
              </div>
            </div>

            {/* Shipping & Returns */}
            <div className="flex items-center gap-4 text-sm text-gray-600 tracking-wider">
              <span
                className="border-b pb-0.5 cursor-pointer transition-colors duration-200"
                style={{
                  fontFamily: "system-ui, sans-serif",
                  letterSpacing: "0.08em",
                  lineHeight: "1.6",
                  fontWeight: 400,
                }}
              >
                Shipping
              </span>
              <span>|</span>
              <span
                className="border-b border-gray-600 pb-0.5 cursor-pointer hover:text-black transition-colors duration-200"
                style={{
                  fontFamily: "system-ui, sans-serif",
                  letterSpacing: "0.08em",
                  lineHeight: "1.6",
                  fontWeight: 400,
                }}
              >
                Returns
              </span>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-4">
                {/* Quantity Dropdown */}
                <div className="w-32">
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full border border-gray-900  px-4 py-2 text-lg tracking-wider focus:outline-none focus:ring-0"
                    style={{
                      fontFamily: "system-ui, sans-serif",
                      letterSpacing: "0.08em",
                      lineHeight: "1.6",
                      fontWeight: 400,
                      maxHeight: "200px",
                      overflowY: "auto",
                    }}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option
                        key={i + 1}
                        value={i + 1}
                        className="bg-[#eae1d1]"
                      >
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ADD TO CART */}
                <div className="flex-1">
                  <GlobalButton
                    className="w-full border border-gray-700 py-3 rounded-none"
                    text={product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
                  />
                </div>
              </div>

              {/* BUY NOW */}
              <div>
                <GlobalButton
                  className="w-full border border-gray-700 py-3 rounded-none bg-blue-900 text-white hover:bg-blue-700"
                  text="Buy with shop"
                />
              </div>
            </div>

            {/* Description */}
            <div
              className="space-y-6 pt-8 border-t border-gray-200"
              style={{
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.08em",
                lineHeight: "1.6",
                fontWeight: 500,
              }}
            >
              <h3 className="text-lg font-normal text-gray-900 tracking-wider uppercase">
                DESCRIPTION
              </h3>
              <p className="text-gray-600 text-base leading-relaxed tracking-wider font-light">
                {product.description}
              </p>

              {/* Product Details from Image */}
              <div className="space-y-4 text-gray-600 text-base tracking-wider font-light">
                <p>A pair of Mario Sabot armchairs from Italy, c1970.</p>
                <p>Chromed frames with original fabric upholstery.</p>
                <p className="font-medium">
                  ${product.price.toLocaleString("en-US")} per chair | 2
                  available
                </p>
                <p className="italic">
                  Please email us with any questions, including payment via
                  funds transfer, trade prices and shipping.
                </p>
                <p>75w x 85d x 66h, seat height 37 (in cm)</p>
              </div>

              {/* Condition Section */}
              <div className="space-y-2">
                <h4 className="text-base font-normal text-gray-900 tracking-wider">
                  Condition:
                </h4>
                <p className="text-gray-600 text-base leading-relaxed tracking-wider font-light">
                  Very good, with minor signs of wear and use as expected for
                  age. The chrome shows minor pitting and blemishes, as expected
                  for age. The underside dust covers have some tears, though are
                  not visible when the seats are in in their sitting position.
                </p>
              </div>

              {/* SKU */}
              <div className="pt-4">
                <p className="text-gray-600 text-sm tracking-wider font-light">
                  SKU <span className="font-normal">141</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
