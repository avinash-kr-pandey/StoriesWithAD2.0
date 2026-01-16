"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import images from "@/utils/images";

const Installation = () => {
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

  const installationServices = [
    {
      title: "Furniture Installation",
      description: "Professional assembly and placement of furniture pieces with precision and care.",
      scope: "Residential & Commercial",
      timeline: "1-3 days",
      image: images.gallery.seating[3], // _DEV0830.jpg
    },
    {
      title: "Lighting Installation",
      description: "Expert installation of lighting fixtures including chandeliers, sconces, and track lighting.",
      scope: "All Lighting Types",
      timeline: "1-2 days",
      image: images.gallery.lighting[3], // _DEV0972.jpg
    },
    {
      title: "Art & Display Installation",
      description: "Careful placement and installation of artwork, sculptures, and decorative displays.",
      scope: "Wall & Free-standing",
      timeline: "1 day",
      image: images.gallery.art[3], // _DEV0932.jpg
    },
    {
      title: "Complete Space Setup",
      description: "Full space installation including all furniture, lighting, and decorative elements.",
      scope: "Turnkey Service",
      timeline: "3-7 days",
      image: images.gallery.tables[3], // _DEV0854.jpg
    },
  ];

  // Installation portfolio images
  const installationPortfolio = [
    images.additional[2], // _DEV1539.jpg
    images.additional[3], // _DEV1540.jpg
    images.additional[4], // _DEV1541.jpg
    images.additional[5], // _DEV1542.jpg
    images.additional[6], // _DEV1543.jpg
    images.additional[7], // _DEV1549.jpg
  ];

  // Installation process images
  const installationProcess = [
    images.featured.spotlight[1], // _DEV1505.jpg
    images.featured.spotlight[2], // _DEV1511.jpg
    images.portfolio.photography[0], // _DEV1460.jpg
    images.portfolio.photography[1], // _DEV1463.jpg
  ];

  return (
    <div className="min-h-screen pt-42 py-10 px-6">
      {/* ================= HEADER (FILTER + SORT) ================= */}
      <div className="border-2 border-white py-4 px-6 flex justify-between items-center mb-10 max-w-6xl mx-auto h-16">
        {/* FILTER BUTTON WITH DROPDOWN */}
        <div ref={filterRef} className="relative h-full flex items-center border-r-2 border-white pr-4">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center text-sm px-4 py-2 h-full"
          >
            ⚲ SHOW FILTERS
          </button>

          {filtersOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border shadow-md rounded-md z-20">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                All Installation Services
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                Furniture Installation
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                Lighting Installation
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                Art Installation
              </button>
            </div>
          )}
        </div>

        {/* SORT DROPDOWN */}
        <div ref={sortRef} className="relative h-full flex items-center border-l-2 border-white pl-4">
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
                  setSortOption("complexity");
                  setSortOpen(false);
                }}
              >
                By Complexity
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* MAIN TITLE */}
        <h1 className="text-2xl font-light mb-4">Installation Services</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          Professional installation services that bring your design vision to life with precision, care, and attention to detail.
        </p>

        {/* Featured Banner */}
        <div className="mb-16">
          <div className="aspect-[16/6] relative overflow-hidden mb-6">
            <Image
              src={images.featured.curated} // CURATED.jpg
              alt="Professional Installation Services"
              fill
              className="object-cover"
              priority
            />
            {/* TITLE OVERLAY */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h2 className="text-white text-2xl font-medium mb-2">Professional Installation</h2>
              <p className="text-gray-300 text-xl">Bringing designs to life with expert precision and care</p>
            </div>
          </div>
        </div>

        {/* Installation Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {installationServices.map((service, index) => (
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
                  <h3 className="text-white text-2xl font-medium mb-1">{service.title}</h3>
                  <p className="text-gray-300 text-xl mb-1">{service.description}</p>
                  <p className="text-gray-300 text-xl mb-1">Scope: {service.scope}</p>
                  <p className="text-gray-400 text-lg">Timeline: {service.timeline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Installation Portfolio */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">Installation Portfolio</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {installationPortfolio.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden mb-2">
                  <Image
                    src={src}
                    alt={`Installation project ${index + 1}`}
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

        {/* Installation Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">Our Installation Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {installationProcess.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden mb-3">
                  <Image
                    src={src}
                    alt={`Installation process step ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* TITLE OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white text-2xl text-center">
                      {index === 0 && "Assessment"}
                      {index === 1 && "Preparation"}
                      {index === 2 && "Installation"}
                      {index === 3 && "Final Check"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="p-8 border-t">
          <h2 className="text-2xl font-light mb-6">Why Choose Our Installation Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.gallery.objects[3]} // _DEV1413.jpg
                  alt="Expert Craftsmanship"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">Expert Craftsmanship</h3>
                  <p className="text-gray-300 text-xl">
                    Skilled professionals with years of installation experience and attention to detail
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.portfolio.webDesign[2]} // _DEV1448.jpg
                  alt="Quality Assurance"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">Quality Assurance</h3>
                  <p className="text-gray-300 text-xl">
                    Rigorous quality checks to ensure every installation meets our high standards
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.portfolio.webDesign[3]} // _DEV1454.jpg
                  alt="Timely Completion"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">Timely Completion</h3>
                  <p className="text-gray-300 text-xl">
                    Efficient project management to ensure installations are completed on schedule
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Get Started Section */}
        <div className="mt-16 p-8 border-t text-center">
          <h2 className="text-2xl font-light mb-4">Schedule Your Installation</h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Ready for professional installation? Contact us to schedule your service and ensure your design is implemented with precision and care.
          </p>
          <button className="border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors mr-4">
            Book Installation
          </button>
          <button className="border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors">
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Installation;