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

  const designServices = [
    {
      title: "Interior Design",
      description:
        "Complete interior design solutions for residential and commercial spaces.",
      scope: "Full Space Design",
      timeline: "4-8 weeks",
      image: images.gallery.seating[2], // _DEV0809.jpg
    },
    {
      title: "Furniture Design",
      description:
        "Custom furniture pieces designed specifically for your space and needs.",
      scope: "Custom Pieces",
      timeline: "6-12 weeks",
      image: images.gallery.tables[2], // _DEV0848.jpg
    },
    {
      title: "Space Planning",
      description:
        "Optimize your space layout for functionality and aesthetic appeal.",
      scope: "Layout & Flow",
      timeline: "2-4 weeks",
      image: images.gallery.art[2], // _DEV0914.jpg
    },
    {
      title: "Lighting Design",
      description:
        "Strategic lighting solutions to enhance ambiance and functionality.",
      scope: "Lighting Plans",
      timeline: "3-5 weeks",
      image: images.gallery.lighting[2], // _DEV0966.jpg
    },
  ];

  // Design portfolio images
  const designPortfolio = [
    images.gallery.bespoke[0], // _DEV1042.jpg
    images.gallery.bespoke[1], // _DEV1063.jpg
    images.gallery.bespoke[2], // _DEV1365.jpg
    images.gallery.bespoke[3], // _DEV1371.jpg
    images.additional[0], // _DEV1524.jpg
    images.additional[1], // _DEV1536.jpg
  ];

  // Design process images
  const designProcess = [
    images.portfolio.webDesign[0], // _DEV1422.jpg
    images.portfolio.webDesign[1], // _DEV1436.jpg
    images.portfolio.webDesign[2], // _DEV1448.jpg
    images.portfolio.webDesign[3], // _DEV1454.jpg
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
                All Design Services
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                Residential Design
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                Commercial Design
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                Custom Furniture
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
                  setSortOption("timeline");
                  setSortOpen(false);
                }}
              >
                Timeline: Short → Long
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => {
                  setSortOption("popular");
                  setSortOpen(false);
                }}
              >
                Most Popular
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* MAIN TITLE */}
        <h1 className="text-2xl font-light mb-4">Design Services</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          Transform your spaces with our comprehensive design services, from
          concept to completion with meticulous attention to detail.
        </p>

        {/* Featured Banner */}
        <div className="mb-16">
          <div className="aspect-[16/6] relative overflow-hidden mb-6">
            <Image
              src={images.featured.spotlight[0]} // _DEV1493.jpg
              alt="Design Services Portfolio"
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
                Creating spaces that inspire and function beautifully
              </p>
            </div>
          </div>
        </div>

        {/* Design Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {designServices.map((service, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-1">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-xl mb-1">
                    {service.description}
                  </p>
                  <p className="text-gray-300 text-xl mb-1">
                    Scope: {service.scope}
                  </p>
                  <p className="text-gray-400 text-lg">
                    Timeline: {service.timeline}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Design Portfolio */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">Design Portfolio</h2>
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
                      Project {index + 1}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Design Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">Our Design Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {designProcess.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden mb-3">
                  <Image
                    src={src}
                    alt={`Design process step ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* TITLE OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white text-2xl text-center">
                      {index === 0 && "Concept"}
                      {index === 1 && "Development"}
                      {index === 2 && "Refinement"}
                      {index === 3 && "Delivery"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Design Principles */}
        <div className="p-8 border-t">
          <h2 className="text-2xl font-light mb-6">Our Design Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.gallery.objects[0]} // _DEV1381.jpg
                  alt="Functionality First"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Functionality First
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Designs that work as beautifully as they look in everyday
                    life
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.gallery.objects[1]} // _DEV1394.jpg
                  alt="Aesthetic Excellence"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Aesthetic Excellence
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Creating visually stunning spaces that reflect your personal
                    style
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.gallery.objects[2]} // _DEV1404.jpg
                  alt="Sustainable Design"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Sustainable Design
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Environmentally conscious choices that stand the test of
                    time
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
            design that perfectly captures your vision and enhances your
            lifestyle.
          </p>
          <button className="border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors mr-4">
            Begin Design Process
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
