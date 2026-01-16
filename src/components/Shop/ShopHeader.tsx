"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { categories, Product, products } from "@/utils/products";
import toast from "react-hot-toast";
import Link from "next/link";

const ShopHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const headerRef = useRef(null);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  // Sort products based on selection
  const getSortedProducts = (productsToSort: Product[]) => {
    switch (sortBy) {
      case "price-low":
        return [...productsToSort].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...productsToSort].sort((a, b) => b.price - a.price);
      case "rating":
        return [...productsToSort].sort((a, b) => b.rating - a.rating);
      case "newest":
        return [...productsToSort].sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
      default:
        return productsToSort;
    }
  };

  const featuredProducts = products
    .filter((product) => product.isBestSeller)
    .slice(0, 3);
  const newArrivals = products.filter((product) => product.isNew).slice(0, 4);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const sortedProducts = getSortedProducts(filteredProducts);

  const handleAddToCart = (product: Product) => {
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

  return (
    <div className="min-h-screen pt-16 font-simple">
      {/* Hero Section */}
      <section
        ref={headerRef}
        className={`pt-20 pb-16 px-4 transition-all duration-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Furniture{" "}
              <span className="border-b-4 border-gray-800">Store</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Discover premium furniture collections for every room in your
              home. Quality craftsmanship meets contemporary design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#new-arrivals">
                <button className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 font-semibold">
                  Shop New Arrivals
                </button>
              </Link>
              <Link href="#all-products">
                <button className="px-8 py-3 border-2 border-gray-800 text-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-105 font-semibold">
                  View Collections
                </button>
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-700 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {[
              { number: "500+", label: "Products" },
              { number: "50+", label: "Designers" },
              { number: "10K+", label: "Happy Customers" },
              { number: "15+", label: "Years Experience" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-3xl font-bold mb-12 text-center transition-all duration-700 delay-400 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <button
                key={category.id}
                className={`p-6 bg-gray-50 rounded-xl border-2 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? "border-gray-800 bg-gray-100"
                    : "border-gray-200 hover:border-gray-300"
                } ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  {category.name}
                </div>
                <div className="text-gray-500 text-sm">
                  {category.count} items
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - FIXED */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div
            className={`flex justify-between items-center mb-12 transition-all duration-700 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-3xl font-bold">Best Sellers</h2>
            <Link href="#all-products">
              <button className="text-gray-800 hover:text-gray-600 transition-colors duration-300 font-semibold">
                View All →
              </button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-500 cursor-pointer group ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Product Info - Clickable for navigation */}
                <Link href={`/products/${product.id}`} passHref>
                  <div className="cursor-pointer">
                    <div className="h-64 overflow-hidden relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        width={400}
                        height={256}
                      />
                      {product.isNew && (
                        <span className="absolute top-4 left-4 px-3 py-1 bg-green-500 text-white text-sm rounded-full">
                          New
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="absolute top-4 right-4 px-3 py-1 bg-orange-500 text-white text-sm rounded-full">
                          Best Seller
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-gray-700 transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center mb-4">
                        <div className="flex text-yellow-400">
                          {"★".repeat(Math.floor(product.rating))}
                          {"☆".repeat(5 - Math.floor(product.rating))}
                        </div>
                        <span className="text-gray-500 text-sm ml-2">
                          ({product.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Add to Cart Button - Separate from navigation */}
                <div className="flex items-center justify-between p-6 pt-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-800">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals - FIXED */}
      <section id="new-arrivals" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div
            className={`flex justify-between items-center mb-12 transition-all duration-700 delay-600 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <Link href="#all-products">
              <button className="text-gray-800 hover:text-gray-600 transition-colors duration-300 font-semibold">
                View All →
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <div key={product.id} className="bg-white ...">
                <Link
                  href={`/products/${product.id}`}
                  className="cursor-pointer block"
                >
                  <div className="h-48 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={192}
                    />
                  </div>
                  <div className="p-4">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                </Link>
                <div className="flex justify-between p-4 pt-0">
                  <span>${product.price}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Products Grid - FIXED */}
      <section id="all-products" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div
            className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-8 transition-all duration-700 delay-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-3xl font-bold mb-4 md:mb-0">All Products</h2>
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 transition-colors duration-300"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest First</option>
              </select>
              <div className="text-gray-600">
                Showing {sortedProducts.length} products
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product, index) => (
              <div
                key={product.id}
                className={`bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-500 cursor-pointer group ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link href={`/products/${product.id}`} passHref>
                  <div className="cursor-pointer">
                    <div className="h-56 overflow-hidden relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        width={300}
                        height={224}
                      />
                      {product.isNew && (
                        <span className="absolute top-3 left-3 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                          New
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="absolute top-3 right-3 px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
                          Best Seller
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 group-hover:text-gray-700 transition-colors duration-300 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center mb-3">
                        <div className="flex text-yellow-400 text-sm">
                          {"★".repeat(Math.floor(product.rating))}
                          {"☆".repeat(5 - Math.floor(product.rating))}
                        </div>
                        <span className="text-gray-500 text-xs ml-1">
                          ({product.reviews})
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="flex items-center justify-between p-4 pt-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-800">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 text-sm transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div
            className={`bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200 text-center transition-all duration-700 delay-800 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h3 className="text-3xl font-bold mb-4">
              Join Our Furniture Family
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
              Get exclusive deals, design tips, and early access to new
              collections. Transform your space with inspiration delivered to
              your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 transition-colors duration-300"
              />
              <button className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 font-semibold">
                Subscribe
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              No spam, unsubscribe at any time. Special welcome offer for new
              subscribers.
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ShopHeader;
