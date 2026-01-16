"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import images from "@/utils/images";

const Consultation = () => {
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

  const consultationTypes = [
    {
      title: "Initial Design Consultation",
      description:
        "One-on-one session to discuss your vision, space requirements, and design preferences.",
      duration: "1-2 hours",
      price: "Starting at $200",
      image: images.gallery.seating[1], // _DEV0803.jpg
    },
    {
      title: "Project Planning Session",
      description:
        "Detailed planning meeting to outline project scope, timeline, and budget requirements.",
      duration: "2-3 hours",
      price: "Starting at $350",
      image: images.gallery.tables[1], // _DEV0842.jpg
    },
    {
      title: "Virtual Consultation",
      description:
        "Remote consultation via video call for clients outside our service area.",
      duration: "1 hour",
      price: "$150",
      image: images.gallery.art[1], // _DEV0884.jpg
    },
    {
      title: "Site Visit & Assessment",
      description:
        "On-site evaluation of your space with measurements and initial recommendations.",
      duration: "2-4 hours",
      price: "Starting at $400",
      image: images.gallery.lighting[1], // _DEV0953.jpg
    },
  ];

  // Consultation process images
  const processImages = [
    images.portfolio.photography[0], // _DEV1460.jpg
    images.portfolio.photography[1], // _DEV1463.jpg
    images.portfolio.photography[2], // _DEV1469.jpg
    images.portfolio.photography[3], // _DEV1472.jpg
  ];

  // Success stories images
  const successStories = [
    images.gallery.bespoke[0], // _DEV1042.jpg
    images.gallery.bespoke[1], // _DEV1063.jpg
    images.gallery.bespoke[2], // _DEV1365.jpg
    images.gallery.bespoke[3], // _DEV1371.jpg
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
                All Consultations
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                By Duration
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                By Price Range
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                Virtual Consultations
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
                  setSortOption("price");
                  setSortOpen(false);
                }}
              >
                Price: Low → High
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* MAIN TITLE */}
        <h1 className="text-2xl font-light mb-4">Consultation Services</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          Professional design consultations to help you plan, visualize, and
          execute your perfect space with expert guidance.
        </p>

        {/* Featured Banner */}
        <div className="mb-16">
          <div className="aspect-[16/6] relative overflow-hidden mb-6">
            <Image
              src={images.featured.hero} // _DEV1486.jpg
              alt="Design Consultation Services"
              fill
              className="object-cover"
              priority
            />
            {/* TITLE OVERLAY */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h2 className="text-white text-2xl font-medium mb-2">
                Design Consultation Services
              </h2>
              <p className="text-gray-300 text-xl">
                Expert guidance to transform your vision into reality
              </p>
            </div>
          </div>
        </div>

        {/* Consultation Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {consultationTypes.map((consultation, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={consultation.image}
                  alt={consultation.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-1">
                    {consultation.title}
                  </h3>
                  <p className="text-gray-300 text-xl mb-1">
                    {consultation.description}
                  </p>
                  <p className="text-gray-300 text-xl mb-1">
                    Duration: {consultation.duration}
                  </p>
                  <p className="text-gray-400 text-lg">{consultation.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Consultation Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">Our Consultation Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processImages.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden mb-3">
                  <Image
                    src={src}
                    alt={`Consultation process step ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* TITLE OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white text-2xl text-center">
                      {index === 0 && "Discovery"}
                      {index === 1 && "Planning"}
                      {index === 2 && "Design"}
                      {index === 3 && "Execution"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">
            Consultation Success Stories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {successStories.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden mb-2">
                  <Image
                    src={src}
                    alt={`Success story ${index + 1}`}
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

        {/* What to Expect Section */}
        <div className="p-8 border-t">
          <h2 className="text-2xl font-light mb-6">What to Expect</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.gallery.objects[0]} // _DEV1381.jpg
                  alt="Personalized Approach"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Personalized Approach
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Tailored solutions that reflect your unique style and
                    requirements
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.gallery.objects[1]} // _DEV1394.jpg
                  alt="Expert Guidance"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Expert Guidance
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Professional insights and recommendations based on years of
                    experience
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.gallery.objects[2]} // _DEV1404.jpg
                  alt="Clear Communication"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">
                    Clear Communication
                  </h3>
                  <p className="text-gray-300 text-xl">
                    Transparent process with regular updates and detailed
                    explanations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="mt-16 p-8 border-t text-center">
          <h2 className="text-2xl font-light mb-4">Book Your Consultation</h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Ready to transform your space? Schedule a consultation and
            let&rsquo;s create something extraordinary together.
          </p>
          <button className="border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors mr-4">
            Schedule Now
          </button>
          <button className="border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
