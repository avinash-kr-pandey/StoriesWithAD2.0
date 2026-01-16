"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import images from "@/utils/images";

const Professional = () => {
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

  const professionalServices = [
    {
      title: "Corporate Interior Design",
      category: "Commercial",
      duration: "6-12 weeks",
      description:
        "Professional workspace design that enhances productivity and brand identity",
      image: images.gallery.bespoke[1], // _DEV1063.jpg
    },
    {
      title: "Hospitality Design",
      category: "Hospitality",
      duration: "8-16 weeks",
      description:
        "Creating memorable experiences for hotels, restaurants, and venues",
      image: images.gallery.bespoke[2], // _DEV1365.jpg
    },
    {
      title: "Retail Space Design",
      category: "Retail",
      duration: "4-10 weeks",
      description:
        "Strategic retail environments that drive customer engagement and sales",
      image: images.gallery.bespoke[3], // _DEV1371.jpg
    },
    {
      title: "Office Planning",
      category: "Workplace",
      duration: "3-8 weeks",
      description:
        "Optimized office layouts for collaboration, focus, and efficiency",
      image: images.portfolio.webDesign[0], // _DEV1422.jpg
    },
  ];

  // Professional portfolio images
  const professionalPortfolio = [
    images.additional[0], // _DEV1524.jpg
    images.additional[1], // _DEV1536.jpg
    images.additional[2], // _DEV1539.jpg
    images.additional[3], // _DEV1540.jpg
    images.additional[4], // _DEV1541.jpg
    images.additional[5], // _DEV1542.jpg
  ];

  // Professional expertise areas
  const expertiseAreas = [
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
                All Professional Services
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                Corporate Design
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                Hospitality Design
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                Retail Design
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
                  setSortOption("duration");
                  setSortOpen(false);
                }}
              >
                Duration: Short → Long
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => {
                  setSortOption("category");
                  setSortOpen(false);
                }}
              >
                By Category
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* MAIN TITLE */}
        <h1 className="text-2xl font-light mb-4">Professional Services</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          Comprehensive professional design solutions for corporate,
          hospitality, and commercial spaces that drive business success and
          enhance user experience.
        </p>

        {/* Featured Banner */}
        <div className="mb-16">
          <div className="aspect-[16/6] relative overflow-hidden mb-6">
            <Image
              src={images.featured.curated} // CURATED.jpg
              alt="Professional Design Services"
              fill
              className="object-cover"
              priority
            />
            {/* TITLE OVERLAY */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h2 className="text-white text-2xl font-medium mb-2">
                Professional Excellence
              </h2>
              <p className="text-gray-300 text-xl">
                Strategic design solutions for business success
              </p>
            </div>
          </div>
        </div>

        {/* Professional Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {professionalServices.map((service, index) => (
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
                    Category: {service.category}
                  </p>
                  <p className="text-gray-400 text-lg">
                    Duration: {service.duration}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Professional Portfolio */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">Professional Portfolio</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {professionalPortfolio.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden mb-2">
                  <Image
                    src={src}
                    alt={`Professional project ${index + 1}`}
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

        {/* Expertise Areas */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">Areas of Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {expertiseAreas.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-[4/3] relative overflow-hidden mb-4">
                  <Image
                    src={src}
                    alt={`Expertise area ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* TITLE OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white text-2xl font-medium mb-2">
                      {index === 0 && "Strategic Planning"}
                      {index === 1 && "Brand Integration"}
                      {index === 2 && "User Experience"}
                    </h3>
                    <p className="text-gray-300 text-xl">
                      {index === 0 &&
                        "Data-driven design strategies aligned with business objectives"}
                      {index === 1 &&
                        "Seamless brand identity integration throughout all spaces"}
                      {index === 2 &&
                        "Human-centered design focused on user needs and behaviors"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Approach */}
        <div className="p-8 border-t">
          <h2 className="text-2xl font-light mb-6">
            Our Professional Approach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.portfolio.webDesign[1]} // _DEV1436.jpg
                  alt="Research & Analysis"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Research & Analysis
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Comprehensive market research and user analysis to inform
                    design decisions
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.portfolio.webDesign[2]} // _DEV1448.jpg
                  alt="Collaborative Process"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Collaborative Process
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Working closely with stakeholders to ensure alignment with
                    business goals
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.portfolio.webDesign[3]} // _DEV1454.jpg
                  alt="Measurable Results"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Measurable Results
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Tracking key performance indicators to demonstrate design
                    impact and ROI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Consultation Section */}
        <div className="mt-16 p-8 border-t text-center">
          <h2 className="text-2xl font-light mb-4">
            Business Design Consultation
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Ready to elevate your business environment? Let&rsquo;s discuss how
            strategic design can enhance your brand, improve productivity, and
            drive business growth.
          </p>
          <button className="border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors mr-4">
            Schedule Consultation
          </button>
          <button className="border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors">
            Download Brochure
          </button>
        </div>
      </div>
    </div>
  );
};

export default Professional;
