"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import images from "@/utils/images";

const WebDesign = () => {
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
      title: "E-commerce Platform",
      client: "Fashion Brand",
      year: "2024",
      description: "Complete online shopping experience with custom CMS",
      image: images.portfolio.webDesign[0], // _DEV1422.jpg
    },
    {
      title: "Portfolio Website",
      client: "Photographer",
      year: "2023",
      description: "Minimalist portfolio with image-focused layout",
      image: images.portfolio.webDesign[1], // _DEV1436.jpg
    },
    {
      title: "Corporate Website",
      client: "Tech Company",
      year: "2024",
      description: "Enterprise website with interactive elements",
      image: images.portfolio.webDesign[2], // _DEV1448.jpg
    },
    {
      title: "Art Gallery Platform",
      client: "Art Gallery",
      year: "2023",
      description: "Online exhibition space for contemporary art",
      image: images.portfolio.webDesign[3], // _DEV1454.jpg
    },
  ];

  // Additional web design projects
  const additionalProjects = [
    images.additional[0], // _DEV1524.jpg
    images.additional[1], // _DEV1536.jpg
    images.additional[2], // _DEV1539.jpg
    images.additional[3], // _DEV1540.jpg
    images.additional[4], // _DEV1541.jpg
    images.additional[5], // _DEV1542.jpg
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
                By Year
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
                  setSortOption("year");
                  setSortOpen(false);
                }}
              >
                Year: New → Old
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
        <h1 className="text-2xl font-light mb-4">Web Design</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          Creating digital experiences that are both beautiful and functional,
          with focus on user experience and visual aesthetics.
        </p>

        {/* Featured Banner */}
        <div className="mb-16">
          <div className="aspect-[16/6] relative overflow-hidden mb-6">
            <Image
              src={images.featured.curated}
              alt="Web Design Portfolio"
              fill
              className="object-cover"
              priority
            />
            {/* TITLE OVERLAY */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h2 className="text-white text-2xl font-medium mb-2">
                Web Design Portfolio
              </h2>
              <p className="text-gray-300 text-xl">
                Digital Experiences & User Interfaces
              </p>
            </div>
          </div>
        </div>

        {/* Main Projects Grid */}
        <div className="space-y-16 mb-16">
          {projects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-[16/9] relative overflow-hidden mb-6">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-xl mb-1">
                    Client: {project.client}
                  </p>
                  <p className="text-gray-300 text-xl mb-1">
                    {project.description}
                  </p>
                  <p className="text-gray-400 text-lg">Year: {project.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Projects */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">More Web Design Projects</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {additionalProjects.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden mb-2">
                  <Image
                    src={src}
                    alt={`Web design project ${index + 1}`}
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

        {/* Services Section */}
        <div className="p-8 border-t">
          <h2 className="text-2xl font-light mb-6">Web Design Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.portfolio.webDesign[0]}
                  alt="UI/UX Design"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    UI/UX Design
                  </h3>
                  <p className="text-gray-300 text-xl">
                    User-centered design approach for optimal user experience
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.portfolio.webDesign[1]}
                  alt="Responsive Design"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Responsive Design
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Websites that work perfectly on all devices and screen sizes
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.portfolio.webDesign[2]}
                  alt="Custom Development"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Custom Development
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Tailored solutions with modern technologies and frameworks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 p-8 border-t text-center">
          <h2 className="text-2xl font-light mb-4">Start Your Web Project</h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Ready to create an exceptional digital experience? Let`&rsquo;s
            discuss your project requirements and bring your vision to life.
          </p>
          <button className="border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors">
            Discuss Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebDesign;
