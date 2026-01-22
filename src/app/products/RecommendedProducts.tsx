"use client";
import Link from "next/link";
import Image from "next/image";
import { allProducts } from "@/utils/products";
import { Product } from "@/utils/products";
import { useState, useEffect } from "react";

interface RecommendedProductsProps {
  currentId: number;
  category: string;
}

export default function RecommendedProducts({
  currentId,
  category,
}: RecommendedProductsProps) {
  const [activeTab, setActiveTab] = useState<"related" | "recent">("related");
  const [startIndex, setStartIndex] = useState(0);
  const ITEMS_PER_PAGE = 4;

  // Get recently viewed products from localStorage
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("recentlyViewed");
    if (stored) {
      try {
        const viewedIds = JSON.parse(stored);
        const viewedProducts = allProducts
          .filter((p) => viewedIds.includes(p.id) && p.id !== currentId)
          .slice(0, 8);
        setRecentlyViewed(viewedProducts);
      } catch (error) {
        console.error("Error parsing recently viewed:", error);
      }
    }
  }, [currentId]);

  // Filter related products by category and exclude current product
  const related = allProducts
    .filter((p) => p.category === category && p.id !== currentId)
    .slice(0, 8);

  // Get current products based on active tab
  const getCurrentProducts = () => {
    const products = activeTab === "related" ? related : recentlyViewed;
    return products.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const currentProducts = getCurrentProducts();
  const totalProducts =
    activeTab === "related" ? related.length : recentlyViewed.length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  const currentPage = Math.floor(startIndex / ITEMS_PER_PAGE) + 1;

  if (currentProducts.length === 0) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className={`text-xs ${
          index < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  // Get stock status
  const getStockStatus = (product: Product): string => {
    if (product.stockQuantity > 10) return "In Stock";
    if (product.stockQuantity > 0) return `Only ${product.stockQuantity} left`;
    return "Out of Stock";
  };

  // Calculate discount percentage
  const getDiscountPercentage = (product: Product): number => {
    if (!product.originalPrice) return 0;
    return Math.round((1 - product.price / product.originalPrice) * 100);
  };

  // Get first material
  const getFirstMaterial = (product: Product): string => {
    return product.material.split(",")[0].trim();
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - ITEMS_PER_PAGE));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(totalProducts - ITEMS_PER_PAGE, prev + ITEMS_PER_PAGE),
    );
  };

  return (
    <section
      className="py-8 sm:py-10 md:py-12 px-3 sm:px-6 md:px-10"
      style={{
        fontFamily: "system-ui, sans-serif",
        letterSpacing: "0.08em",
        lineHeight: "1.6",
        fontWeight: 300,
      }}
    >
      <div className="max-w-full mx-auto">
        {/* Section Header with Tabs */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            You Might Also Like
          </h2>

          {/* Tabs */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => {
                  setActiveTab("related");
                  setStartIndex(0);
                }}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === "related"
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Related Products ({related.length})
              </button>
              <button
                onClick={() => {
                  setActiveTab("recent");
                  setStartIndex(0);
                }}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === "recent"
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Recently Viewed ({recentlyViewed.length})
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentProducts.map((product) => {
            const discountPercentage = getDiscountPercentage(product);
            const stockStatus = getStockStatus(product);
            const firstMaterial = getFirstMaterial(product);

            return (
              <div
                key={product.id}
                className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white relative"
              >
                <Link href={`/products/${product.id}`}>
                  {/* Product Image */}
                  <div className="relative w-full h-48 md:h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Discount Badge */}
                    {discountPercentage > 0 && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                          -{discountPercentage}% OFF
                        </span>
                      </div>
                    )}

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-gray-900 font-semibold px-4 py-2 rounded-full text-sm shadow-lg">
                        Quick View
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    {/* Category */}
                    <p className="text-xs text-purple-600 font-semibold mb-1 uppercase tracking-wider">
                      {product.category}
                    </p>

                    {/* Product Name */}
                    <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-purple-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-xs text-gray-600">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-bold text-gray-900 text-lg">
                          ${product.price.toFixed(2)}
                        </p>
                        {product.originalPrice && (
                          <p className="text-xs text-gray-500 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-xs font-semibold ${
                            product.stockQuantity > 10
                              ? "text-green-600"
                              : product.stockQuantity > 0
                                ? "text-amber-600"
                                : "text-red-600"
                          }`}
                        >
                          {stockStatus}
                        </span>
                      </div>
                    </div>

                    {/* Material & Quick Info */}
                    <div className="border-t border-gray-100 pt-3">
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span className="font-medium">Material:</span>
                        <span className="text-gray-900">{firstMaterial}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
                        <span className="font-medium">Style:</span>
                        <span className="text-gray-900 capitalize">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Add to cart logic here
                      }}
                      className="w-full mt-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2.5 rounded-lg font-semibold text-sm hover:from-gray-800 hover:to-gray-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                startIndex === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              ← Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                const isActive = currentPage === page;
                const pageStartIndex = (page - 1) * ITEMS_PER_PAGE;

                return (
                  <button
                    key={index}
                    onClick={() => setStartIndex(pageStartIndex)}
                    className={`w-8 h-8 rounded-full font-medium text-sm transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              disabled={startIndex + ITEMS_PER_PAGE >= totalProducts}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                startIndex + ITEMS_PER_PAGE >= totalProducts
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Next →
            </button>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link
            href={`/products?category=${category}`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-3 rounded-full font-semibold text-sm hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            View All Products
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
