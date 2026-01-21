"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { categories, Product, products } from "@/utils/products";
import toast from "react-hot-toast";
import Link from "next/link";
import images from "@/utils/images";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  const sortRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const { addToCart, cart } = useCart();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFiltersOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sort products based on selection
  const getSortedProducts = (productsToSort: Product[]) => {
    switch (sortOption) {
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

  // Section data with alternating layout
  const sections = [
    {
      title: "Premium Furniture Collections",
      image: images.featured.spotlight[0] || products[0]?.image,
      content: `Discover our curated collection of premium furniture that combines timeless craftsmanship with contemporary design. Each piece in our collection is meticulously crafted using sustainable materials and traditional techniques passed down through generations. Our furniture is designed not just to fill space, but to create environments that inspire, comfort, and elevate daily living. From solid wood dining tables that become family heirlooms to ergonomic office chairs that support productivity, every item tells a story of quality and intentional design.`,
    },
    {
      title: "Artisan Craftsmanship & Quality",
      image: images.featured.spotlight[1] || products[1]?.image,
      content: `Experience the difference of artisan craftsmanship in every detail of our furniture collection. Our skilled craftsmen dedicate countless hours to each piece, ensuring perfect joinery, flawless finishes, and enduring quality. We source only the finest materials—from sustainably harvested hardwoods to premium upholstery fabrics that meet rigorous durability standards. Each furniture piece undergoes multiple quality checks throughout production, resulting in furniture that not only looks beautiful but stands the test of time. Our commitment to quality means your investment continues to bring joy and functionality for decades.`,
    },
    {
      title: "Custom Design Solutions",
      image: images.portfolio.photography[0] || products[2]?.image,
      content: `Transform your vision into reality with our custom design services. Whether you're furnishing a cozy apartment, a spacious family home, or a commercial establishment, our design team works closely with you to create pieces that perfectly match your space, style, and functional requirements. We offer customizable dimensions, material selections, finish options, and hardware choices to ensure your furniture fits both your aesthetic preferences and practical needs. From concept sketches to final installation, we guide you through every step of creating furniture that's uniquely yours.`,
    },
    {
      title: "Sustainable & Ethical Production",
      image: images.featured.spotlight[2] || products[3]?.image,
      content: `Shop with confidence knowing our furniture is created with respect for both people and planet. Our sustainable practices include using FSC-certified woods, water-based non-toxic finishes, and recycled materials wherever possible. We partner with workshops that provide fair wages, safe working conditions, and skill development opportunities for artisans. Our furniture is built to last, reducing the need for frequent replacements and minimizing environmental impact. Each purchase supports responsible forestry, ethical manufacturing, and a commitment to creating heirloom-quality pieces that won't end up in landfills.`,
    },
  ];

  return (
    <div className="min-h-screen pt-42">
      {/* Main title section */}
      <div className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-light mb-4 !system-ui uppercase py-8">
            Shop
          </h1>

          {/* Filters and Sort Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            {/* Categories Filter */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="px-6 py-3 border border-gray-300 rounded-lg flex items-center gap-2 hover:border-gray-800 transition-colors duration-300 !system-ui"
              >
                <span>Filter by Category</span>
                <span className={`transform transition-transform ${filtersOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {filtersOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 min-w-[200px]">
                  <div className="p-4">
                    <div className="mb-2 text-sm font-medium !system-ui">Categories</div>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setSelectedCategory("all");
                          setFiltersOpen(false);
                        }}
                        className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors ${
                          selectedCategory === "all" ? "bg-gray-100 font-medium" : ""
                        }`}
                      >
                        All Products
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setFiltersOpen(false);
                          }}
                          className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors ${
                            selectedCategory === category.id ? "bg-gray-100 font-medium" : ""
                          }`}
                        >
                          {category.name} ({category.count})
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sort Options */}
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="px-6 py-3 border border-gray-300 rounded-lg flex items-center gap-2 hover:border-gray-800 transition-colors duration-300 !system-ui"
              >
                <span>Sort by: {sortOption === "featured" ? "Featured" : 
                      sortOption === "price-low" ? "Price: Low to High" :
                      sortOption === "price-high" ? "Price: High to Low" :
                      sortOption === "rating" ? "Top Rated" : "Newest First"}</span>
                <span className={`transform transition-transform ${sortOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {sortOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 min-w-[200px]">
                  <div className="p-4">
                    <div className="mb-2 text-sm font-medium !system-ui">Sort Options</div>
                    <div className="space-y-2">
                      {["featured", "price-low", "price-high", "rating", "newest"].map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSortOption(option);
                            setSortOpen(false);
                          }}
                          className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors ${
                            sortOption === option ? "bg-gray-100 font-medium" : ""
                          }`}
                        >
                          {option === "featured" ? "Featured" : 
                           option === "price-low" ? "Price: Low to High" :
                           option === "price-high" ? "Price: High to Low" :
                           option === "rating" ? "Top Rated" : "Newest First"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="text-gray-600 !system-ui">
              Showing {sortedProducts.length} products
            </div>
          </div>
        </div>
      </div>

      {/* 4 Full-screen alternating sections */}
      {sections.map((section, index) => (
        <div
          key={index}
          className="min-h-screen flex items-center justify-center"
        >
          <div className="w-full max-w-7xl mx-auto px-6">
            <div
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-12`}
            >
              {/* Image Section */}
              <div className="lg:w-1/2 w-full">
                <div className="aspect-[4/3] lg:aspect-square relative overflow-hidden">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Text Content Section */}
              <div className="lg:w-1/2 w-full">
                <div className="max-w-lg mx-auto lg:mx-0">
                  <h2 className="text-2xl lg:text-3xl font-light mb-8 !system-ui pb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-800 text-md leading-relaxed !system-ui text-justify">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Products Grid Section */}
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product, index) => (
              <div
                key={product.id}
                className="group cursor-pointer"
              >
                {/* Product Image */}
                <div className="aspect-[4/3] relative overflow-hidden mb-6">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {product.isNew && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white text-gray-800 text-sm rounded-full">
                      New
                    </div>
                  )}
                  {product.isBestSeller && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gray-800 text-white text-sm rounded-full">
                      Best Seller
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div>
                  <h3 className="text-xl font-light mb-2 !system-ui group-hover:text-gray-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed !system-ui line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {"★".repeat(Math.floor(product.rating))}
                      {"☆".repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span className="text-gray-500 text-sm ml-2 !system-ui">
                      ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price and Add to Cart */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-medium text-gray-800 !system-ui">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through !system-ui">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-4 py-2 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 !system-ui text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;