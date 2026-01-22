// components/ProductInfo.tsx
"use client";

import Image from "next/image";
import { useState, useRef, useMemo, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/utils/products";
import toast from "react-hot-toast";
import { motion, MotionConfig } from "framer-motion";
import { AnimatePresence } from "framer-motion";

interface ProductInfoProps {
  product: Product;
}

// Custom hook for image preloading
const useImagePreloader = (imageUrls: string[]) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    let isMounted = true;
    const promises = imageUrls.map((url) => {
      return new Promise<void>((resolve) => {
        const img = document.createElement("img");
        img.src = url;
        img.onload = () => {
          if (isMounted) {
            setLoadedImages((prev) => new Set([...prev, url]));
          }
          resolve();
        };
        img.onerror = () => resolve();
      });
    });

    Promise.all(promises).then(() => {
      console.log("✅ All product images preloaded successfully!");
    });

    return () => {
      isMounted = false;
    };
  }, [imageUrls]);

  return loadedImages;
};

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const { addToCart, cart } = useCart();

  // Use actual images from product data
  const allImages = useMemo(
    () => product.images || [product.image],
    [product.images, product.image]
  );

  // Preload all images
  const loadedImages = useImagePreloader(allImages);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !showZoom) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    const boundedX = Math.max(0, Math.min(100, x));
    const boundedY = Math.max(0, Math.min(100, y));

    setZoomPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseEnter = () => {
    if (loadedImages.has(selectedImage)) {
      setShowZoom(true);
    }
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  const handleImageSelect = (img: string) => {
    setSelectedImage(img);
    setShowZoom(false);
  };

  const handleAddToCart = () => {
    const existingItem = cart.items.find(
      (item) => item.product.id === product.id
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  // Calculate discount percentage
  const discountPercentage = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const isCurrentImageLoaded = loadedImages.has(selectedImage);

  return (
    <div
      className="min-h-screen w-full overflow-hidden flex items-center justify-center py-8"
      style={{
        fontFamily: "system-ui, sans-serif",
        letterSpacing: "0.08em",
        lineHeight: "1.6",
        fontWeight: 500,
      }}
    >
      <div className="max-w-7xl w-full">
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 md:p-0 p-2 md:pt-8">
            {/* Left: Image Gallery */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Thumbnail Gallery */}
              <div className="flex lg:flex-col gap-2 order-2 lg:order-1 lg:max-h-[90vh] p-2">
                {allImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border-1 ${
                      selectedImage === img
                        ? "border-pink-500 ring-2 ring-pink-200 scale-105"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                    onClick={() => handleImageSelect(img)}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                    {!loadedImages.has(img) && (
                      <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Main Image Container */}
              <div className="flex-1 order-1 lg:order-2 relative">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100 to-blue-50 shadow-inner h-[70vh] w-full">
                  <div
                    ref={imageRef}
                    className="relative w-full h-full cursor-crosshair"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Image
                      src={selectedImage}
                      alt={product.name}
                      fill
                      className={`object-cover transition-opacity duration-500 ${
                        isCurrentImageLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      priority
                    />

                    {!isCurrentImageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-2xl">
                        <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}

                    {showZoom && isCurrentImageLoaded && (
                      <div
                        className="absolute w-42 h-42 bg-black/40 rounded-full bg-opacity-20 pointer-events-none z-10 border-2 border-white/50 shadow-lg"
                        style={{
                          left: `calc(${zoomPosition.x}% - 64px)`,
                          top: `calc(${zoomPosition.y}% - 64px)`,
                        }}
                      />
                    )}
                  </div>

                  {/* Product Badges */}
                  {product.isNew && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg tracking-wide">
                        NEW ARRIVAL
                      </span>
                    </div>
                  )}

                  {product.isBestSeller && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg tracking-wide">
                        BEST SELLER
                      </span>
                    </div>
                  )}

                  {discountPercentage > 0 && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg z-10">
                      -{discountPercentage}%
                    </div>
                  )}
                </div>

                {showZoom && isCurrentImageLoaded && (
                  <div className="absolute left-full top-0 ml-6 w-140 h-140 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-20">
                    <div
                      className="w-full h-full bg-no-repeat bg-origin-padding transition-all duration-100"
                      style={{
                        backgroundImage: `url(${selectedImage})`,
                        backgroundSize: "200%",
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="flex flex-col justify-center space-y-6">
              {/* Category & Brand */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="bg-pink-500/10 text-pink-700 px-3 py-1 rounded-full text-xs font-bold border border-pink-200"
                    style={{
                      fontFamily: "system-ui, sans-serif",
                      letterSpacing: "0.08em",
                      lineHeight: "1.6",
                      fontWeight: 500,
                    }}
                  >
                    {product.category}
                  </span>
                  <span
                    className="bg-blue-500/10 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-200"
                    style={{
                      fontFamily: "system-ui, sans-serif",
                      letterSpacing: "0.08em",
                      lineHeight: "1.6",
                      fontWeight: 500,
                    }}
                  >
                    {product.brand || "Premium Brand"}
                  </span>
                </div>
              </div>

              {/* Product Name */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm ">
                  {renderStars(product.rating)}
                </div>
                <span
                  className="text-gray-700 font-medium text-sm"
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    letterSpacing: "0.08em",
                    lineHeight: "1.6",
                    fontWeight: 500,
                  }}
                >
                  {product.rating}/5
                </span>
                <span className="text-gray-400">•</span>
                <span
                  className="text-gray-600 text-sm"
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    letterSpacing: "0.08em",
                    lineHeight: "1.6",
                    fontWeight: 500,
                  }}
                >
                  {product.reviews} Reviews
                </span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="space-y-2 relative">
                  {/* Price Animation Container */}
                  <div className="flex items-center gap-3 relative">
                    <AnimatePresence>
                      {product.originalPrice && (
                        // Step 1: Original price big and centered
                        <motion.div
                          initial={{ scale: 2, opacity: 0, y: -20 }}
                          animate={{ scale: 1, opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="relative flex items-center"
                        >
                          <p className="text-xl md:text-xl text-gray-500 font-bold z-10">
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </p>

                          {/* Step 2: Animated line cutting the price */}
                          <motion.span
                            className="absolute left-0 top-1/2 h-[2px] bg-black z-0"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{
                              duration: 1.2,
                              ease: "easeInOut",
                              delay: 0.5,
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Step 3: Current Price Reveal */}
                    <motion.p
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2, duration: 0.8 }}
                      className="text-3xl font-bold text-gray-900"
                    >
                      ₹{product.price.toLocaleString("en-IN")}
                    </motion.p>

                    {/* Step 4: Discount Badge */}
                    {discountPercentage > 0 && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 2.5, duration: 0.5 }}
                        className="bg-rose-100 text-rose-600 text-sm font-semibold px-2 py-1 rounded"
                      >
                        {discountPercentage}% OFF
                      </motion.span>
                    )}
                  </div>

                  {/* Discount Save Text */}
                  {discountPercentage > 0 && product.originalPrice && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3, duration: 0.5 }}
                      className="text-green-600 font-medium text-sm"
                    >
                      You save ₹
                      {(product.originalPrice - product.price).toLocaleString(
                        "en-IN",
                      )}
                    </motion.p>
                  )}

                  {/* Shipping Info */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.5, duration: 0.5 }}
                    className="text-green-600 font-medium text-sm flex items-center gap-1"
                  >
                    <span>✓</span>
                    {product.shippingInfo
                      ? "Free shipping available"
                      : "Standard shipping available"}
                  </motion.p>
                </div>

                {/* Discount Save Text */}
                {discountPercentage > 0 && product.originalPrice && (
                  <p className="text-green-600 font-medium text-sm">
                    You save ₹
                    {(product.originalPrice - product.price).toLocaleString(
                      "en-IN",
                    )}
                  </p>
                )}

                {/* Shipping Info */}
                <p className="text-green-600 font-medium text-sm flex items-center gap-1">
                  <span>✓</span>
                  {product.shippingInfo
                    ? "Free shipping available"
                    : "Standard shipping available"}
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed border-l-4 border-pink-400 pl-4">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    product.inStock ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <span
                  className={`font-medium text-sm ${
                    product.inStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.inStock
                    ? `In Stock (${product.stockQuantity} available)`
                    : "Out of Stock"}
                </span>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-xl bg-white shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors text-lg"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 font-bold text-gray-900 min-w-8 text-center border-l border-r border-gray-200">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors text-lg"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all duration-300 transform shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                      product.inStock
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white hover:shadow-xl"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }`}
                  >
                    <span>🛒</span>
                    {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                    className={`border-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                      product.inStock
                        ? "border-blue-500 text-blue-600 hover:bg-blue-50"
                        : "border-gray-400 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <span>⚡</span>
                    {product.inStock ? "BUY NOW" : "UNAVAILABLE"}
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-pink-600 text-sm">🚚</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-xs">
                      {product.shippingInfo?.delivery || "Free Shipping"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-amber-600 text-sm">🛡️</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-xs">
                      {product.warranty}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-xs">
                      Premium Quality
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">🔒</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-xs">
                      Secure Payment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs Section */}
          <div className="mt-8 bg-white border border-white/50 mx-0 md:rounded-2xl">
            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 overflow-x-auto">
              <nav className="flex space-x-4 sm:space-x-6 md:space-x-8 px-3 sm:px-4 md:px-6 min-w-max">
                {[
                  { id: "description", label: "Description" },
                  { id: "details", label: "Product Details" },
                  { id: "features", label: "Features" },
                  { id: "reviews", label: "Reviews" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 sm:py-4 px-2 font-medium text-sm sm:text-base border-b-2 whitespace-nowrap transition-all duration-300  ${
                      activeTab === tab.id
                        ? "border-pink-500 text-pink-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tabs Content */}
            <div className="p-4 sm:p-6">
              {activeTab === "description" && (
                <div
                  className="space-y-4"
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    letterSpacing: "0.08em",
                    lineHeight: "1.6",
                    fontWeight: 500,
                  }}
                >
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {product.description}
                  </p>
                </div>
              )}

              {activeTab === "details" && (
                <div
                  className="space-y-4"
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    letterSpacing: "0.08em",
                    lineHeight: "1.6",
                    fontWeight: 500,
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3 text-sm sm:text-base">
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span
                          className="font-medium text-gray-600"
                          style={{
                            fontFamily: "system-ui, sans-serif",
                            letterSpacing: "0.08em",
                            lineHeight: "1.6",
                            fontWeight: 500,
                          }}
                        >
                          Dimensions
                        </span>
                        <span
                          className="text-gray-900"
                          style={{
                            fontFamily: "system-ui, sans-serif",
                            letterSpacing: "0.08em",
                            lineHeight: "1.6",
                            fontWeight: 500,
                          }}
                        >
                          {product.dimensions}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span
                          className="font-medium text-gray-600"
                          style={{
                            fontFamily: "system-ui, sans-serif",
                            letterSpacing: "0.08em",
                            lineHeight: "1.6",
                            fontWeight: 500,
                          }}
                        >
                          Material
                        </span>
                        <span
                          className="text-gray-900"
                          style={{
                            fontFamily: "system-ui, sans-serif",
                            letterSpacing: "0.08em",
                            lineHeight: "1.6",
                            fontWeight: 500,
                          }}
                        >
                          {product.material}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span
                          className="font-medium text-gray-600"
                          style={{
                            fontFamily: "system-ui, sans-serif",
                            letterSpacing: "0.08em",
                            lineHeight: "1.6",
                            fontWeight: 500,
                          }}
                        >
                          Warranty
                        </span>
                        <span
                          className="text-gray-900"
                          style={{
                            fontFamily: "system-ui, sans-serif",
                            letterSpacing: "0.08em",
                            lineHeight: "1.6",
                            fontWeight: 500,
                          }}
                        >
                          {product.warranty}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm sm:text-base">
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span
                          className="font-medium text-gray-600"
                          style={{
                            fontFamily: "system-ui, sans-serif",
                            letterSpacing: "0.08em",
                            lineHeight: "1.6",
                            fontWeight: 500,
                          }}
                        >
                          Category
                        </span>
                        <span
                          className="text-gray-900 capitalize"
                          style={{
                            fontFamily: "system-ui, sans-serif",
                            letterSpacing: "0.08em",
                            lineHeight: "1.6",
                            fontWeight: 500,
                          }}
                        >
                          {product.category}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span
                          className="font-medium text-gray-600"
                          style={{
                            fontFamily: "system-ui, sans-serif",
                            letterSpacing: "0.08em",
                            lineHeight: "1.6",
                            fontWeight: 500,
                          }}
                        >
                          Stock
                        </span>
                        <span
                          className="text-gray-900"
                          style={{
                            fontFamily: "system-ui, sans-serif",
                            letterSpacing: "0.08em",
                            lineHeight: "1.6",
                            fontWeight: 500,
                          }}
                        >
                          {product.inStock
                            ? `In Stock (${product.stockQuantity})`
                            : "Out of Stock"}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span
                          className="font-medium text-gray-600"
                          style={{
                            fontFamily: "system-ui, sans-serif",
                            letterSpacing: "0.08em",
                            lineHeight: "1.6",
                            fontWeight: 500,
                          }}
                        >
                          SKU
                        </span>
                        <span
                          className="text-gray-900"
                          style={{
                            fontFamily: "system-ui, sans-serif",
                            letterSpacing: "0.08em",
                            lineHeight: "1.6",
                            fontWeight: 500,
                          }}
                        >
                          PRD-{product.id.toString().padStart(6, "0")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "features" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span
                          className="text-gray-700"
                          style={{
                            fontFamily: "system-ui, sans-serif",
                            letterSpacing: "0.08em",
                            lineHeight: "1.6",
                            fontWeight: 500,
                          }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  {/* Overall Rating Summary */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900">
                        {product.rating}
                      </div>
                      <div className="flex justify-center gap-1 mt-1">
                        {renderStars(product.rating)}
                      </div>
                      <div className="text-gray-500 text-sm mt-2">
                        Based on {product.reviews} review
                        {product.reviews > 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  {product.reviewsList && product.reviewsList.length > 0 ? (
                    <div className="space-y-4">
                      {product.reviewsList.map((review, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-xl shadow hover:shadow-md transition-shadow border border-gray-100"
                        >
                          {/* Avatar */}
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                          />

                          {/* Review Content */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <p className="font-semibold text-gray-900">
                                {review.name}
                              </p>
                              <span className="text-gray-400 text-sm">
                                {review.date}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 mt-1">
                              {renderStars(review.rating)}
                            </div>

                            <p className="text-gray-700 text-sm mt-2">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 py-12 italic bg-gray-50 rounded-lg shadow-sm">
                      No reviews yet. Be the first to review this product!
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
