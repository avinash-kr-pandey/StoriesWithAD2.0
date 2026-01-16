"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import images from "@/utils/images";

const Lighting = () => {
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

  const lights = [
    {
      name: "Pendant Light",
      type: "Ceiling",
      material: "Glass & Brass",
      image: images.gallery.lighting[0],
    },
    {
      name: "Floor Lamp",
      type: "Standing",
      material: "Metal & Marble",
      image: images.gallery.lighting[1],
    },
    {
      name: "Table Lamp",
      type: "Desktop",
      material: "Ceramic",
      image: images.gallery.lighting[2],
    },
    {
      name: "Wall Sconce",
      type: "Wall Mount",
      material: "Bronze",
      image: images.gallery.lighting[3],
    },
    {
      name: "Chandelier",
      type: "Ceiling",
      material: "Crystal",
      image: images.additional[0],
    },
    {
      name: "Track Lighting",
      type: "Ceiling",
      material: "Aluminum",
      image: images.additional[1],
    },
  ];

  // Additional lighting fixtures
  const additionalLights = [
    images.additional[2],
    images.additional[3],
    images.additional[4],
    images.additional[5],
    images.additional[6],
    images.additional[7],
  ];

  // Lighting in context images
  const contextImages = [
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
                All Lighting
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                By Type
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                By Material
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                Custom Solutions
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
                  setSortOption("type");
                  setSortOpen(false);
                }}
              >
                By Type
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
        <h1 className="text-2xl font-light mb-4">Lighting</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          Illuminating designs that create atmosphere and enhance spatial
          experience.
        </p>

        {/* Featured Lighting Banner */}
        <div className="mb-16">
          <div className="aspect-[16/6] relative overflow-hidden mb-6">
            <Image
              src={images.featured.curated}
              alt="Lighting Collection"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Main Lighting Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {lights.map((light, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-[3/4] relative overflow-hidden mb-4">
                <Image
                  src={light.image}
                  alt={light.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-1">
                    {light.name}
                  </h3>
                  <p className="text-gray-300 text-xl mb-1">
                    Type: {light.type}
                  </p>
                  <p className="text-gray-400 text-lg">
                    Material: {light.material}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lighting in Context Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">Lighting in Context</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contextImages.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-[4/3] relative overflow-hidden mb-3">
                  <Image
                    src={src}
                    alt={`Lighting context ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* TITLE OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white text-2xl text-center">
                      {index === 0 && "Ambient Lighting"}
                      {index === 1 && "Task Lighting"}
                      {index === 2 && "Accent Lighting"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Lighting Collection */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">More Lighting Designs</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {additionalLights.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden mb-2">
                  <Image
                    src={src}
                    alt={`Lighting design ${index + 1}`}
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

        {/* Technical Details Section */}
        <div className="p-8 border-t">
          <h2 className="text-2xl font-light mb-4">
            Custom Lighting Solutions
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl">
            We create bespoke lighting designs tailored to your space,
            considering both aesthetic appeal and functional requirements.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.gallery.lighting[0]}
                  alt="Design Consultation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Design Consultation
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Work with our designers to create custom lighting solutions
                    that complement your interior architecture.
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.gallery.lighting[1]}
                  alt="Technical Expertise"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Technical Expertise
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Professional installation and lighting planning services to
                    ensure optimal illumination and energy efficiency.
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

export default Lighting;
