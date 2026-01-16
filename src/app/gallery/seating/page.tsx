"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import images from "@/utils/images";

const Seating = () => {
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

  const items = [
    {
      name: "Modern Chair",
      designer: "John Doe",
      year: "2024",
      image: images.gallery.seating[0],
    },
    {
      name: "Lounge Chair",
      designer: "Jane Smith",
      year: "2023",
      image: images.gallery.seating[1],
    },
    {
      name: "Dining Chair",
      designer: "Mike Johnson",
      year: "2024",
      image: images.gallery.seating[2],
    },
    {
      name: "Accent Chair",
      designer: "Sarah Wilson",
      year: "2023",
      image: images.gallery.seating[3],
    },
    {
      name: "Sofa",
      designer: "David Brown",
      year: "2024",
      image: images.additional[0],
    },
    {
      name: "Bench",
      designer: "Emma Davis",
      year: "2023",
      image: images.additional[1],
    },
  ];

  const additionalSeating = [
    images.additional[2],
    images.additional[3],
    images.additional[4],
    images.additional[5],
    images.additional[6],
    images.additional[7],
  ];

  const roomSettings = [
    images.featured.spotlight[0],
    images.featured.spotlight[1],
    images.featured.spotlight[2],
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
            className="flex items-center text-sm px-4 py-2 h-full"
          >
            ⚲ SHOW FILTERS
          </button>

          {filtersOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border shadow-md rounded-md z-20">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                All Seating
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                By Designer
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                By Year
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                By Type
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
            className="text-sm px-4 py-2 h-full flex items-center"
          >
            SORT BY ▾
          </button>

          {sortOpen && (
            <div className="absolute top-full right-0 mt-1 w-44 bg-white border shadow-md rounded-md z-20">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b"
                onClick={() => {
                  setSortOption("a-z");
                  setSortOpen(false);
                }}
              >
                Alphabetical (A–Z)
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b"
                onClick={() => {
                  setSortOption("new-first");
                  setSortOpen(false);
                }}
              >
                Year: New → Old
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => {
                  setSortOption("old-first");
                  setSortOpen(false);
                }}
              >
                Year: Old → New
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* MAIN TITLE */}
        <h1 className="text-2xl font-light mb-4">Seating</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          Curated collection of chairs, sofas, and seating solutions that
          combine comfort with aesthetic appeal.
        </p>

        {/* Featured Banner */}
        <div className="mb-16">
          <div className="aspect-[16/6] relative overflow-hidden mb-6">
            <Image
              src={images.featured.curated}
              alt="Seating Collection"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {items.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-[3/4] relative overflow-hidden mb-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-300 text-xl mb-1">
                    Designer: {item.designer}
                  </p>
                  <p className="text-gray-400 text-lg">Year: {item.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ROOM SETTINGS */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">Seating in Context</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roomSettings.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-[4/3] relative overflow-hidden mb-3">
                  <Image
                    src={src}
                    alt={`Room setting ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* TITLE OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white text-2xl text-center">
                      {index === 0 && "Living Room"}
                      {index === 1 && "Dining Area"}
                      {index === 2 && "Office Space"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ADDITIONAL SEATING */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">More Seating Designs</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {additionalSeating.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden mb-2">
                  <Image
                    src={src}
                    alt={`Seating design ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* TITLE OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-2xl text-center">
                      Design {index + 1}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MATERIALS */}
        <div className="p-8 border-t">
          <h2 className="text-2xl font-light mb-4">
            Craftsmanship & Materials
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl">
            Each seating piece is crafted with detail, using premium materials
            for both comfort and durability.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.gallery.seating[0]}
                  alt="Material detail"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Premium Upholstery
                  </h3>
                  <p className="text-gray-300 text-xl">
                    High-quality fabrics and leathers selected for comfort and
                    durability.
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.gallery.seating[1]}
                  alt="Construction detail"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Solid Construction
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Expert joinery and structural integrity for long-lasting
                    performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seating;
