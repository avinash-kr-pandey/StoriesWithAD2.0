"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import images from "@/utils/images";

const Bespoke = () => {
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
      title: "Custom Dining Set",
      client: "Private Residence",
      location: "New York",
      image: images.gallery.bespoke[0],
    },
    {
      title: "Office Furniture",
      client: "Tech Startup",
      location: "San Francisco",
      image: images.gallery.bespoke[1],
    },
    {
      title: "Hotel Lobby",
      client: "Boutique Hotel",
      location: "London",
      image: images.gallery.bespoke[2],
    },
    {
      title: "Residential Library",
      client: "Private Residence",
      location: "Paris",
      image: images.gallery.bespoke[3],
    },
    {
      title: "Restaurant Interior",
      client: "Fine Dining",
      location: "Tokyo",
      image: images.additional[0],
    },
    {
      title: "Retail Space",
      client: "Fashion Brand",
      location: "Milan",
      image: images.additional[1],
    },
  ];

  // Additional bespoke project images
  const additionalProjects = [
    images.additional[2],
    images.additional[3],
    images.additional[4],
    images.additional[5],
    images.additional[6],
    images.additional[7],
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
                By Client Type
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                By Location
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                Featured Projects
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
                  setSortOption("location");
                  setSortOpen(false);
                }}
              >
                By Location
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => {
                  setSortOption("client");
                  setSortOpen(false);
                }}
              >
                By Client Type
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* MAIN TITLE */}
        <h1 className="text-2xl font-light mb-4">Bespoke</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          Custom-made pieces and complete interior solutions tailored to
          specific spaces and client needs.
        </p>

        {/* Hero Bespoke Project */}
        <div className="mb-16">
          <div className="aspect-[16/7] relative overflow-hidden mb-6">
            <Image
              src={images.featured.curated}
              alt="Bespoke Project Showcase"
              fill
              className="object-cover"
              priority
            />
            {/* TITLE OVERLAY */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
              <h2 className="text-white text-2xl font-medium mb-2">
                Featured Bespoke Project
              </h2>
              <p className="text-gray-300 text-xl">Luxury Residence, London</p>
            </div>
          </div>
        </div>

        {/* Main Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
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
                    Client: {project.client}
                  </p>
                  <p className="text-gray-400 text-lg">
                    Location: {project.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Projects Showcase */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">Project Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {additionalProjects.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden mb-2">
                  <Image
                    src={src}
                    alt={`Bespoke project detail ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* TITLE OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-2xl text-center">
                      Detail {index + 1}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Images */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {images.featured.spotlight.map((src, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="aspect-[4/3] relative overflow-hidden mb-4">
                  <Image
                    src={src}
                    alt={`Process step ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* TITLE OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white text-2xl font-medium mb-2">
                      {index === 0 && "Consultation"}
                      {index === 1 && "Design"}
                      {index === 2 && "Execution"}
                    </h3>
                    <p className="text-gray-300 text-xl">
                      {index === 0 &&
                        "Understanding your vision and requirements"}
                      {index === 1 && "Creating detailed designs and plans"}
                      {index === 2 &&
                        "Bringing the design to life with precision"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 p-8 border-t">
          <h2 className="text-2xl font-light mb-4">
            Start Your Bespoke Project
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl">
            Interested in custom furniture or a complete interior solution?
            Let&rsquo;s discuss your vision and requirements.
          </p>
          <button className="border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bespoke;
