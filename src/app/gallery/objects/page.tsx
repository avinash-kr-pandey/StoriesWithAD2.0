"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import images from "@/utils/images";

const Objects = () => {
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

  const objects = [
    {
      name: "Ceramic Vase",
      category: "Decor",
      material: "Porcelain",
      image: images.gallery.objects[0],
    },
    {
      name: "Sculptural Bowl",
      category: "Art",
      material: "Stone",
      image: images.gallery.objects[1],
    },
    {
      name: "Textile Art",
      category: "Textile",
      material: "Wool & Silk",
      image: images.gallery.objects[2],
    },
    {
      name: "Glass Object",
      category: "Glassware",
      material: "Blown Glass",
      image: images.gallery.objects[3],
    },
    {
      name: "Wood Carving",
      category: "Sculpture",
      material: "Walnut",
      image: images.additional[0],
    },
    {
      name: "Metal Artifact",
      category: "Metalwork",
      material: "Brass",
      image: images.additional[1],
    },
  ];

  const additionalObjects = [
    images.additional[2],
    images.additional[3],
    images.additional[4],
    images.additional[5],
    images.additional[6],
    images.additional[7],
    images.additional[8],
    images.additional[9],
  ];

  const styledSettings = [
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
                All Objects
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                By Material
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                By Category
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
                  setSortOption("category");
                  setSortOpen(false);
                }}
              >
                By Category
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => {
                  setSortOption("material");
                  setSortOpen(false);
                }}
              >
                By Material
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* MAIN TITLE */}
        <h1 className="text-2xl font-light mb-4">Objects</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          Carefully selected objects and artifacts that add character and
          personality to any space.
        </p>

        {/* Banner */}
        <div className="mb-16">
          <div className="aspect-[16/6] relative overflow-hidden mb-6">
            <Image
              src={images.featured.curated}
              alt="Curated Objects"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {objects.map((object, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={object.image}
                  alt={object.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-1">
                    {object.name}
                  </h3>
                  <p className="text-gray-300 text-xl mb-1">
                    {object.material}
                  </p>
                  <p className="text-gray-400 text-lg">{object.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Styled Settings */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">Objects in Context</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {styledSettings.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={src}
                    alt={`Setting ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* TITLE OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white text-2xl text-center">
                      {index === 0 && "Tabletop Arrangement"}
                      {index === 1 && "Shelf Display"}
                      {index === 2 && "Focal Point"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Objects */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">More from the Collection</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {additionalObjects.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={src}
                    alt={`Object ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* TITLE OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-2xl text-center">
                      Item {index + 1}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Materials */}
        <div className="p-8 border-t">
          <h2 className="text-2xl font-light mb-4">Material Craftsmanship</h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl">
            Each object is selected for its exceptional craftsmanship, material
            quality, and ability to tell a story within your space.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {objects.slice(0, 4).map((object, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="relative aspect-square overflow-hidden rounded-full">
                  <Image
                    src={object.image}
                    alt={object.material}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* TITLE OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <h3 className="text-white text-2xl font-medium">
                      {object.material}
                    </h3>
                    <p className="text-gray-300 text-xl">{object.category}</p>
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

export default Objects;
