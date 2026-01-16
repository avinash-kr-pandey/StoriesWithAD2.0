"use client";
import Link from "next/link";
import Image from "next/image";
import { allProducts } from "@/utils/products";
import { Product } from "@/utils/products"; // Import from correct location

interface RecommendedProductsProps {
  currentId: number;
  category: string;
}

export default function RecommendedProducts({
  currentId,
  category,
}: RecommendedProductsProps) {
  // Filter related products by category and exclude current product
  const related = allProducts
    .filter((p) => p.category === category && p.id !== currentId)
    .slice(0, 5);

  if (related.length === 0) return null;

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

  // Check if product has specific features
  const hasFeature = (product: Product, feature: string): boolean => {
    return product.features.some((f: string) =>
      f.toLowerCase().includes(feature.toLowerCase())
    );
  };

  // Get warranty info from features
  const getWarranty = (product: Product): string => {
    const warrantyFeature = product.features.find(
      (f: string) =>
        f.toLowerCase().includes("warranty") || f.toLowerCase().includes("year")
    );
    return warrantyFeature || "Warranty Included";
  };

  // Calculate discount percentage
  const getDiscountPercentage = (product: Product): number => {
    if (!product.originalPrice) return 0;
    return Math.round((1 - product.price / product.originalPrice) * 100);
  };

  // Get stock status text and color
  const getStockStatus = (
    product: Product
  ): { text: string; color: string; barColor: string } => {
    if (product.stockQuantity > 10) {
      return {
        text: "Plenty Available",
        color: "text-green-600",
        barColor: "bg-green-500",
      };
    } else if (product.stockQuantity > 0) {
      return {
        text: `Only ${product.stockQuantity} left`,
        color: "text-amber-600",
        barColor: "bg-amber-500",
      };
    } else {
      return {
        text: "Out of Stock",
        color: "text-red-600",
        barColor: "bg-red-500",
      };
    }
  };

  // Get first material
  const getFirstMaterial = (product: Product): string => {
    return product.material.split(",")[0].trim();
  };

  // Get first dimension
  const getFirstDimension = (product: Product): string => {
    return product.dimensions.split(" ")[0];
  };

  // Calculate stock percentage for progress bar
  const getStockPercentage = (product: Product): number => {
    return Math.min((product.stockQuantity / 20) * 100, 100);
  };

  return (
    <section className="py-8 sm:py-10 md:py-12 px-3 sm:px-6 md:px-10 ">
      <div className="max-w-full mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">
            Recommended <span className="text-pink-500">Products</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Handpicked items you might love 💖
          </p>
        </div>

        {/* ✅ Responsive Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {related.map((product) => {
            const discountPercentage = getDiscountPercentage(product);
            const stockStatus = getStockStatus(product);
            const stockPercentage = getStockPercentage(product);
            const firstMaterial = getFirstMaterial(product);
            const firstDimension = getFirstDimension(product);

            return (
              <div
                key={product.id}
                className="group  rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-pink-100 relative"
              >
                <Link href={`/products/${product.id}`}>
                  {/* Product Image */}
                  <div className="relative w-full h-44 md:h-56 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300 border-b border-gray-200"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        {product.isNew && (
                          <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                            NEW
                          </span>
                        )}
                        {product.isBestSeller && (
                          <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                            BEST SELLER
                          </span>
                        )}
                      </div>

                      {/* Discount Badge */}
                      {discountPercentage > 0 && (
                        <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                          -{discountPercentage}%
                        </div>
                      )}
                    </div>

                    {/* Bottom Features Badges */}
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                      {hasFeature(product, "free") && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                          🚚 Free
                        </span>
                      )}
                      {hasFeature(product, "authentic") && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                          ✓ Authentic
                        </span>
                      )}
                      {hasFeature(product, "premium") && (
                        <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                          ✨ Premium
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 flex flex-col items-start">
                    {/* Brand/Category */}
                    <p className="text-xs text-blue-600 font-semibold mb-1 capitalize">
                      {product.category}
                    </p>

                    {/* Product Name */}
                    <p className="font-semibold text-gray-800 text-sm md:text-base mb-1 group-hover:text-pink-600 transition-colors line-clamp-2">
                      {product.name}
                    </p>

                    {/* Features as Tags */}
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <span
                          key={index}
                          className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {product.features.length > 2 && (
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          +{product.features.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-xs text-gray-600">
                        {product.rating}/5
                      </span>
                      <span className="text-xs text-gray-400">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between w-full">
                      <div className="space-y-1">
                        <p className="font-bold text-gray-800 text-lg">
                          ${product.price}
                        </p>
                        {product.originalPrice && (
                          <p className="text-xs text-gray-500 line-through">
                            ${product.originalPrice}
                          </p>
                        )}
                      </div>

                      {/* Quick Features */}
                      <div className="flex flex-col items-end space-y-1">
                        <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                          {getWarranty(product)}
                        </span>
                        {product.inStock ? (
                          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            In Stock
                          </span>
                        ) : (
                          <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Material & Dimensions */}
                    <div className="flex flex-col gap-1 mt-2 w-full">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Material:</span>
                        <span className="text-gray-700 font-medium">
                          {firstMaterial}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Dimensions:</span>
                        <span className="text-gray-700 font-medium text-right">
                          {firstDimension}
                        </span>
                      </div>
                    </div>

                    {/* Stock Status */}
                    <div className="w-full mt-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Stock:</span>
                        <span className={`font-semibold ${stockStatus.color}`}>
                          {stockStatus.text}
                        </span>
                      </div>
                      {product.stockQuantity > 0 && (
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className={`h-1.5 rounded-full ${stockStatus.barColor}`}
                            style={{
                              width: `${stockPercentage}%`,
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* View More Button */}
        {related.length >= 4 && (
          <div className="text-center mt-8">
            <Link
              href={`/products?category=${category}`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              View All {category} Products
              <span className="text-lg">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
