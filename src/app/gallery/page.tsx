"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import images from "@/utils/images";

const Gallery = () => {
  const categories = [
    {
      name: "Seating",
      count: images.gallery.seating.length,
      image: images.gallery.seating[0],
      hoverImage: images.gallery.seating[1],
      path: "/gallery/seating",
    },
    {
      name: "Tables",
      count: images.gallery.tables.length,
      image: images.gallery.tables[0],
      hoverImage: images.gallery.tables[1],
      path: "/gallery/tables",
    },
    {
      name: "Art",
      count: images.gallery.art.length,
      image: images.gallery.art[0],
      hoverImage: images.gallery.art[1],
      path: "/gallery/art",
    },
    {
      name: "Lighting",
      count: images.gallery.lighting.length,
      image: images.gallery.lighting[0],
      hoverImage: images.gallery.lighting[1],
      path: "/gallery/lighting",
    },
    {
      name: "Bespoke",
      count: images.gallery.bespoke.length,
      image: images.gallery.bespoke[0],
      hoverImage: images.gallery.bespoke[1],
      path: "/gallery/bespoke",
    },
    {
      name: "Objects",
      count: images.gallery.objects.length,
      image: images.gallery.objects[0],
      hoverImage: images.gallery.objects[1],
      path: "/gallery/objects",
    },
  ];

  const [sortOption, setSortOption] = useState<string>("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

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

  const sortCategories = (option: string) => {
    if (option === "a-z")
      return [...categories].sort((a, b) => a.name.localeCompare(b.name));
    if (option === "count-high")
      return [...categories].sort((a, b) => b.count - a.count);
    if (option === "count-low")
      return [...categories].sort((a, b) => a.count - b.count);
    return categories;
  };

  const sorted = sortCategories(sortOption);

  return (
    <div className="min-h-screen pt-42 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* ---------------- HEADER WITH BORDER ---------------- */}
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
                  All Categories
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                  By Item Count
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                  By Type
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                  Featured
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

        {/* ---------------- FILTER PANEL ---------------- */}
        {filtersOpen && (
          <div className="border p-6 mb-10 max-w-6xl mx-auto animate-fadeIn">
            <p className="text-gray-600">Filter options coming here...</p>
          </div>
        )}

        {/* ---------------- GRID ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {sorted.map((category, index) => (
            <Link key={index} href={category.path} className="group">
              {/* 3D FLIP IMAGE CONTAINER */}
              <div className="relative h-[340px] w-full overflow-hidden perspective shadow-lg group-hover:shadow-xl transition-all duration-300">
                <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  {/* FRONT IMAGE */}
                  <div className="absolute inset-0 backface-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* TITLE OVERLAY */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <h3 className="text-white text-2xl font-medium mb-1">
                        {category.name}
                      </h3>
                      <p className="text-gray-300 text-xl">
                        {category.count} items
                      </p>
                    </div>
                  </div>

                  {/* BACK IMAGE */}
                  <div className="absolute inset-0 rotate-y-180 backface-hidden">
                    <Image
                      src={category.hoverImage}
                      alt={`${category.name} hover`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* TITLE OVERLAY */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <h3 className="text-white text-2xl font-medium mb-1">
                        {category.name}
                      </h3>
                      <p className="text-gray-300 text-xl">
                        {category.count} items
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ---- 3D Flip CSS ---- */}
      <style>{`
        .perspective { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default Gallery;
