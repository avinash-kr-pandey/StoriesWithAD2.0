"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import images from "@/utils/images";

const Tables = () => {
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
      name: "Coffee Table",
      material: "Oak Wood",
      dimensions: "120×60×40 cm",
      image: images.gallery.tables[0],
    },
    {
      name: "Dining Table",
      material: "Marble",
      dimensions: "200×100×75 cm",
      image: images.gallery.tables[1],
    },
    {
      name: "Side Table",
      material: "Metal & Glass",
      dimensions: "50×50×55 cm",
      image: images.gallery.tables[2],
    },
    {
      name: "Console Table",
      material: "Walnut",
      dimensions: "150×40×80 cm",
      image: images.gallery.tables[3],
    },
    {
      name: "Nesting Tables",
      material: "Plywood",
      dimensions: "Various",
      image: images.additional[0],
    },
    {
      name: "Outdoor Table",
      material: "Teak",
      dimensions: "180×90×75 cm",
      image: images.additional[1],
    },
  ];

  const additionalTables = [
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
      {/* HEADER WITH FILTER + SORT */}
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
                All Tables
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                By Material
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                By Size
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                By Style
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
                  setSortOption("count-high");
                  setSortOpen(false);
                }}
              >
                Count High → Low
              </button>

              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => {
                  setSortOption("count-low");
                  setSortOpen(false);
                }}
              >
                Count Low → High
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* MAIN TITLE */}
        <h1 className="text-2xl font-light mb-4">Tables</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          Functional and sculptural tables designed for various spaces and
          purposes.
        </p>

        {/* Featured Banner */}
        <div className="mb-16">
          <div className="aspect-[16/6] relative overflow-hidden mb-6">
            <Image
              src={images.featured.curated}
              alt="Tables Collection"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* MAIN TABLE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {items.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-2xl font-medium text-white mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xl text-gray-300 mb-1">
                    Material: {item.material}
                  </p>
                  <p className="text-lg text-gray-400">
                    Dimensions: {item.dimensions}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ROOM SETTINGS */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">Tables in Context</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roomSettings.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-[4/3] relative overflow-hidden mb-3">
                  <Image
                    src={src}
                    alt={`Table setting ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* TITLE OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-2xl text-white text-center">
                      {index === 0 && "Living Room"}
                      {index === 1 && "Dining Space"}
                      {index === 2 && "Entryway"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ADDITIONAL TABLES */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">More Table Designs</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {additionalTables.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden mb-2">
                  <Image
                    src={src}
                    alt={`Table design ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* TITLE OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-2xl text-white text-center">
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
          <h2 className="text-2xl font-light mb-4">Material Excellence</h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl">
            Each table showcases exceptional materials and craftsmanship.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {items.slice(0, 4).map((item, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="aspect-square relative overflow-hidden mb-3 rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.material}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* TITLE OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <h3 className="text-2xl font-medium text-white">
                      {item.material}
                    </h3>
                    <p className="text-xl text-gray-300">{item.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group cursor-pointer">
            <div className="aspect-[4/3] relative overflow-hidden mb-4">
              <Image
                src={images.gallery.tables[0]}
                alt="Table construction detail"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* TITLE OVERLAY */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-2xl font-medium text-white mb-2">
                  Joinery & Structure
                </h3>
                <p className="text-xl text-gray-300">
                  Precision joinery ensures stability and long life.
                </p>
              </div>
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="aspect-[4/3] relative overflow-hidden mb-4">
              <Image
                src={images.gallery.tables[1]}
                alt="Surface finish detail"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* TITLE OVERLAY */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-2xl font-medium text-white mb-2">
                  Surface Finishes
                </h3>
                <p className="text-xl text-gray-300">
                  Expert finishing enhances natural beauty and durability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;
