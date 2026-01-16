"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import images from "@/utils/images";

const Services = () => {
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

  const services = [
    {
      title: "Consultation",
      description:
        "One-on-one sessions to discuss your project needs and vision.",
      duration: "1-2 hours",
      image: images.featured.spotlight[0], // _DEV1493.jpg
    },
    {
      title: "Design",
      description: "Custom design solutions tailored to your space and style.",
      duration: "2-4 weeks",
      image: images.featured.spotlight[1], // _DEV1505.jpg
    },
    {
      title: "Photography",
      description: "Professional photography services for spaces and products.",
      duration: "1 day",
      image: images.portfolio.photography[0], // _DEV1460.jpg
    },
    {
      title: "Installation",
      description: "Complete installation and styling services.",
      duration: "Custom",
      image: images.featured.spotlight[2], // _DEV1511.jpg
    },
  ];

  // Additional service examples
  const serviceExamples = [
    images.gallery.bespoke[0], // _DEV1042.jpg
    images.gallery.bespoke[1], // _DEV1063.jpg
    images.gallery.bespoke[2], // _DEV1365.jpg
    images.gallery.bespoke[3], // _DEV1371.jpg
    images.additional[0], // _DEV1524.jpg
    images.additional[1], // _DEV1536.jpg
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
                All Services
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                By Duration
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                Design Services
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                Photography Services
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
                By Duration
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
        <h1 className="text-2xl font-light mb-4">Services</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          Comprehensive services to bring your vision to life with attention to
          detail and creative excellence.
        </p>

        {/* Featured Banner */}
        <div className="mb-16">
          <div className="aspect-[16/6] relative overflow-hidden mb-6">
            <Image
              src={images.featured.curated}
              alt="Our Services"
              fill
              className="object-cover"
              priority
            />
            {/* TITLE OVERLAY */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h2 className="text-white text-2xl font-medium mb-2">
                Our Services
              </h2>
              <p className="text-gray-300 text-xl">
                Comprehensive creative solutions for your projects
              </p>
            </div>
          </div>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
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
                  <p className="text-gray-400 text-lg">
                    Duration: {service.duration}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Examples */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">Service Examples</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {serviceExamples.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden mb-2">
                  <Image
                    src={src}
                    alt={`Service example ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* TITLE OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-2xl text-center">
                      Example {index + 1}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="p-8 border-t">
          <h2 className="text-2xl font-light mb-6">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.gallery.seating[0]}
                  alt="Initial Consultation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Initial Consultation
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Understanding your vision, requirements, and project scope
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.gallery.tables[0]}
                  alt="Design & Planning"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Design & Planning
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Creating detailed designs and comprehensive project plans
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.gallery.lighting[0]}
                  alt="Execution & Delivery"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Execution & Delivery
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Bringing the vision to life with precision and attention to
                    detail
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 p-8 border-t text-center">
          <h2 className="text-2xl font-light mb-4">Start Your Project</h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Ready to bring your vision to life? Contact us to discuss your
            project and how we can help you achieve your goals.
          </p>
          <button className="border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
