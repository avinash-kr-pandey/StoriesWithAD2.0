"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import images from "@/utils/images";

const Styling = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("");

  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
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

  const stylingServices = [
    {
      title: "Table Styling",
      category: "Entertainment",
      duration: "2-3 hours",
      description: "Beautiful table settings for dinners and special occasions",
      image: images.gallery.tables[0], // _DEV0836.jpg
    },
    {
      title: "Shelf Styling",
      category: "Display",
      duration: "1-2 hours",
      description: "Curated arrangements for bookshelves and display units",
      image: images.gallery.objects[0], // _DEV1381.jpg
    },
    {
      title: "Mantel Styling",
      category: "Focal Point",
      duration: "1 hour",
      description: "Eye-catching arrangements for fireplace mantels",
      image: images.gallery.art[0], // _DEV0866.jpg
    },
    {
      title: "Console Styling",
      category: "Entryway",
      duration: "1-2 hours",
      description: "Welcoming arrangements for entry consoles and hallways",
      image: images.gallery.tables[3], // _DEV0854.jpg
    },
  ];

  // Styling portfolio images
  const stylingPortfolio = [
    images.additional[0], // _DEV1524.jpg
    images.additional[1], // _DEV1536.jpg
    images.additional[2], // _DEV1539.jpg
    images.additional[3], // _DEV1540.jpg
    images.additional[4], // _DEV1541.jpg
    images.additional[5], // _DEV1542.jpg
  ];

  // Styling techniques
  const stylingTechniques = [
    images.featured.spotlight[0], // _DEV1493.jpg
    images.featured.spotlight[1], // _DEV1505.jpg
    images.featured.spotlight[2], // _DEV1511.jpg
  ];

  return (
    <div className="min-h-screen pt-42 py-10 px-6">
      {/* ================= HEADER (FILTER + SORT) ================= */}
      <div className="border-2 border-white py-4 px-6 flex justify-between items-center mb-10 max-w-6xl mx-auto h-16">
        {/* FILTER BUTTON WITH DROPDOWN */}
        <div
          ref={filterRef}
          className="relative h-full flex items-center border-r-2 border-white pr-4"
        >
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center text-sm px-4 py-2 h-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 rounded"
          >
            ⚲ SHOW FILTERS
          </button>

          {filtersOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border-2 border-gray-200 shadow-lg rounded-lg z-20">
              <button className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm border-b border-gray-100 transition-colors">
                All Styling Services
              </button>
              <button className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm border-b border-gray-100 transition-colors">
                Table Styling
              </button>
              <button className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm border-b border-gray-100 transition-colors">
                Shelf Styling
              </button>
              <button className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm transition-colors">
                Seasonal Styling
              </button>
            </div>
          )}
        </div>

        {/* SORT DROPDOWN */}
        <div
          ref={sortRef}
          className="relative h-full flex items-center border-l-2 border-white pl-4"
        >
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="text-sm px-4 py-2 h-full flex items-center bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 rounded"
          >
            SORT BY ▾
          </button>

          {sortOpen && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-white border-2 border-gray-200 shadow-lg rounded-lg z-20">
              <button
                className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm border-b border-gray-100 transition-colors"
                onClick={() => {
                  setSortOption("a-z");
                  setSortOpen(false);
                }}
              >
                Alphabetical (A–Z)
              </button>
              <button
                className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm border-b border-gray-100 transition-colors"
                onClick={() => {
                  setSortOption("duration");
                  setSortOpen(false);
                }}
              >
                Duration: Short → Long
              </button>
              <button
                className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm transition-colors"
                onClick={() => {
                  setSortOption("category");
                  setSortOpen(false);
                }}
              >
                By Category
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* MAIN TITLE WITH DIFFERENT STYLING */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-light mb-4 tracking-wider">
            STYLING SERVICES
          </h1>
          <div className="w-20 h-0.5 bg-gray-300 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform your spaces with professional styling that brings harmony,
            balance, and personality to every corner of your home or office.
          </p>
        </div>

        {/* Featured Banner with Different Aspect Ratio */}
        <div className="mb-16">
          <div className="aspect-[18/6] relative overflow-hidden mb-6 rounded-lg shadow-2xl">
            <Image
              src={images.featured.hero} // _DEV1486.jpg
              alt="Professional Styling Services"
              fill
              className="object-cover transform hover:scale-105 transition-transform duration-700"
              priority
            />
            {/* TITLE OVERLAY WITH DIFFERENT DESIGN */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60 p-8 flex items-end">
              <div className="text-white">
                <h2 className="text-2xl font-medium mb-2 tracking-wide">
                  ELEVATE YOUR SPACE
                </h2>
                <p className="text-gray-200 text-xl font-light">
                  Professional styling for every occasion and season
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Styling Services Grid with Card Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {stylingServices.map((service, index) => (
            <div
              key={index}
              className="group cursor-pointer bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* BADGE OVERLAY */}
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-gray-800">
                    {service.category}
                  </span>
                </div>
                {/* TITLE OVERLAY WITH DIFFERENT DESIGN */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-lg mb-1">
                    {service.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">
                      Duration: {service.duration}
                    </span>
                    <button className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Styling Portfolio with Masonry Layout */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-8 text-center tracking-wide">
            STYLING PORTFOLIO
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {stylingPortfolio.map((src, index) => (
              <div
                key={index}
                className={`group cursor-pointer overflow-hidden rounded-lg ${
                  index % 3 === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <div
                  className={`relative ${
                    index % 3 === 0 ? "aspect-square" : "aspect-square"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Styling example ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* SIMPLE OVERLAY */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Styling Techniques with Different Layout */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-8 text-center tracking-wide">
            STYLING TECHNIQUES
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {stylingTechniques.map((src, index) => (
              <div key={index} className="group cursor-pointer text-center">
                <div className="aspect-[5/4] relative overflow-hidden rounded-lg mb-4 shadow-lg">
                  <Image
                    src={src}
                    alt={`Styling technique ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* CIRCULAR BADGE */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-3">
                  {index === 0 && "Layering & Texture"}
                  {index === 1 && "Color Coordination"}
                  {index === 2 && "Balance & Proportion"}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {index === 0 &&
                    "Create depth and interest through strategic layering of textures and materials"}
                  {index === 1 &&
                    "Harmonize colors to create cohesive and visually appealing arrangements"}
                  {index === 2 &&
                    "Achieve visual balance through careful consideration of scale and proportion"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action with Different Design */}
        <div className="mt-20 p-12 border-t border-gray-200 text-center bg-gray-50 rounded-2xl">
          <h2 className="text-2xl font-light mb-6 tracking-wide">
            READY TO TRANSFORM YOUR SPACE?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Let us bring professional styling expertise to your home or office.
            Create spaces that inspire and reflect your unique personality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 font-medium tracking-wide">
              BOOK STYLING SERVICE
            </button>
            <button className="border-2 border-black text-black px-10 py-4 rounded-full hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 font-medium tracking-wide">
              VIEW GALLERY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Styling;
