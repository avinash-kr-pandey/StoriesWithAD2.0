"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import images from "@/utils/images";

const Design = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("");

  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

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

  const designProjects = [
    {
      title: "Modern Living Room",
      style: "Contemporary",
      location: "New York",
      area: "350 sq ft",
      image: images.gallery.seating[1], // _DEV0803.jpg
    },
    {
      title: "Minimalist Office",
      style: "Minimalist",
      location: "San Francisco",
      area: "250 sq ft",
      image: images.gallery.tables[1], // _DEV0842.jpg
    },
    {
      title: "Luxury Bedroom",
      style: "Luxury",
      location: "Los Angeles",
      area: "400 sq ft",
      image: images.gallery.art[1], // _DEV0884.jpg
    },
    {
      title: "Urban Loft",
      style: "Industrial",
      location: "Chicago",
      area: "800 sq ft",
      image: images.gallery.lighting[1], // _DEV0953.jpg
    },
  ];

  // Design portfolio images
  const designPortfolio = [
    images.additional[6], // _DEV1543.jpg
    images.additional[7], // _DEV1549.jpg
    images.additional[8], // _DEV1549_1.jpg
    images.portfolio.webDesign[0], // _DEV1422.jpg
    images.portfolio.webDesign[1], // _DEV1436.jpg
    images.portfolio.webDesign[2], // _DEV1448.jpg
  ];

  // Design styles showcase
  const designStyles = [
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
            className="flex items-center text-sm px-4 py-2 h-full"
          >
            ⚲ SHOW FILTERS
          </button>

          {filtersOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border shadow-md rounded-md z-20">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                All Designs
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                Residential
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                Commercial
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
                  setSortOption("area");
                  setSortOpen(false);
                }}
              >
                Area: Small → Large
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => {
                  setSortOption("style");
                  setSortOpen(false);
                }}
              >
                By Style
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* MAIN TITLE */}
        <h1 className="text-2xl font-light mb-4">Design Portfolio</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          Explore our curated collection of interior design projects that
          showcase innovation, functionality, and aesthetic excellence in every
          space.
        </p>

        {/* Featured Banner */}
        <div className="mb-16">
          <div className="aspect-[16/6] relative overflow-hidden mb-6">
            <Image
              src={images.featured.curated} // CURATED.jpg
              alt="Design Portfolio Showcase"
              fill
              className="object-cover"
              priority
            />
            {/* TITLE OVERLAY */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h2 className="text-white text-2xl font-medium mb-2">
                Design Excellence
              </h2>
              <p className="text-gray-300 text-xl">
                Transforming spaces with innovative design solutions
              </p>
            </div>
          </div>
        </div>

        {/* Design Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {designProjects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-xl mb-1">
                    Style: {project.style}
                  </p>
                  <p className="text-gray-300 text-xl mb-1">
                    Location: {project.location}
                  </p>
                  <p className="text-gray-400 text-lg">Area: {project.area}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Design Portfolio Gallery */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">Design Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {designPortfolio.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden mb-2">
                  <Image
                    src={src}
                    alt={`Design project ${index + 1}`}
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

        {/* Design Styles */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">Design Styles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {designStyles.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-[4/3] relative overflow-hidden mb-4">
                  <Image
                    src={src}
                    alt={`Design style ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* TITLE OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white text-2xl font-medium mb-2">
                      {index === 0 && "Contemporary"}
                      {index === 1 && "Minimalist"}
                      {index === 2 && "Industrial"}
                    </h3>
                    <p className="text-gray-300 text-xl">
                      {index === 0 &&
                        "Clean lines and modern aesthetics for today's living"}
                      {index === 1 &&
                        "Simplicity and functionality in perfect harmony"}
                      {index === 2 &&
                        "Raw materials and urban-inspired design elements"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Design Process */}
        <div className="p-8 border-t">
          <h2 className="text-2xl font-light mb-6">Our Design Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.gallery.bespoke[2]} // _DEV1365.jpg
                  alt="Concept Development"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Concept Development
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Transforming ideas into cohesive design concepts and mood
                    boards
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.gallery.bespoke[3]} // _DEV1371.jpg
                  alt="Space Planning"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Space Planning
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Optimizing layouts for functionality, flow, and visual
                    appeal
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.portfolio.webDesign[3]} // _DEV1454.jpg
                  alt="Final Execution"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Final Execution
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Bringing designs to life with precision and attention to
                    detail
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Get Started Section */}
        <div className="mt-16 p-8 border-t text-center">
          <h2 className="text-2xl font-light mb-4">
            Start Your Design Project
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Ready to transform your space? Let&rsquo;s collaborate to create a
            design that reflects your personality and enhances your lifestyle.
          </p>
          <button className="border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors mr-4">
            Book Consultation
          </button>
          <button className="border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors">
            View Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Design;