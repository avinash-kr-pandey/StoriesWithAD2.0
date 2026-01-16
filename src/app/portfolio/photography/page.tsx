"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import images from "@/utils/images";

const PhotographyPortfolio = () => {
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

  const projects = [
    {
      title: "Architectural Series",
      location: "Berlin",
      year: "2024",
      type: "Architecture",
      images: [
        images.portfolio.photography[0],
        images.portfolio.photography[1],
        images.additional[0],
      ],
    },
    {
      title: "Portrait Collection",
      location: "Paris",
      year: "2023",
      type: "Portrait",
      images: [
        images.portfolio.photography[2],
        images.portfolio.photography[3],
        images.additional[1],
      ],
    },
    {
      title: "Urban Landscape",
      location: "Tokyo",
      year: "2024",
      type: "Street",
      images: [
        images.featured.spotlight[0],
        images.featured.spotlight[1],
        images.additional[2],
      ],
    },
    {
      title: "Product Photography",
      location: "Studio",
      year: "2023",
      type: "Commercial",
      images: [
        images.gallery.objects[0],
        images.gallery.objects[1],
        images.additional[3],
      ],
    },
  ];

  // Additional photography work
  const additionalWork = [
    images.additional[4],
    images.additional[5],
    images.additional[6],
    images.additional[7],
    images.additional[8],
    images.gallery.art[0],
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
                All Projects
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                By Genre
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                By Location
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                By Year
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
                  setSortOption("year");
                  setSortOpen(false);
                }}
              >
                Year: New → Old
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => {
                  setSortOption("location");
                  setSortOpen(false);
                }}
              >
                By Location
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* MAIN TITLE */}
        <h1 className="text-2xl font-light mb-4">Photography Portfolio</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          Visual narratives captured through lens, exploring different genres
          and techniques in photography.
        </p>

        {/* Featured Photography Banner */}
        <div className="mb-16">
          <div className="aspect-[16/6] relative overflow-hidden mb-6">
            <Image
              src={images.featured.curated}
              alt="Photography Portfolio"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Main Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Main Project Image */}
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={project.images[0]}
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
                    {project.location}
                  </p>
                  <p className="text-gray-400 text-lg">
                    {project.year} • {project.type}
                  </p>
                </div>
              </div>

              {/* Project Thumbnails */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {project.images.slice(1).map((src, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="aspect-square relative overflow-hidden group/thumb"
                  >
                    <Image
                      src={src}
                      alt={`${project.title} ${imgIndex + 2}`}
                      fill
                      className="object-cover group-hover/thumb:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Photography Work */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">More Photography Work</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {additionalWork.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden mb-2">
                  <Image
                    src={src}
                    alt={`Photography work ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* TITLE OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-2xl text-center">
                      Work {index + 1}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photography Styles Showcase */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">Photography Styles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center group cursor-pointer">
              <div className="aspect-[3/4] relative overflow-hidden mb-4">
                <Image
                  src={images.gallery.art[1]}
                  alt="Fine Art Photography"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Fine Art
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Artistic expression through carefully composed imagery
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="aspect-[3/4] relative overflow-hidden mb-4">
                <Image
                  src={images.gallery.art[2]}
                  alt="Documentary Photography"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Documentary
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Capturing authentic moments and real-life stories
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="aspect-[3/4] relative overflow-hidden mb-4">
                <Image
                  src={images.gallery.art[3]}
                  alt="Commercial Photography"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Commercial
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Professional imagery for brands and businesses
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="p-8 border-t text-center">
          <h2 className="text-2xl font-light mb-4">Photography Services</h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Available for commissioned work, editorial projects, and commercial
            photography. Let&rsquo;s create something beautiful together.
          </p>
          <button className="border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors">
            Contact for Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotographyPortfolio;
