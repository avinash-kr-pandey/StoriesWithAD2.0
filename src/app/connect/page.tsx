"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import images from "@/utils/images";
import GlobalButton from "@/components/utils/GlobalButton";

const Book = () => {
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

  // Select images for the book page - showing portfolio work
  const portfolioImages = [
    images.portfolio.webDesign[0], // _DEV1422.jpg
    images.portfolio.photography[1], // _DEV1463.jpg
    images.gallery.bespoke[0], // _DEV1042.jpg
    images.gallery.lighting[2], // _DEV0966.jpg
    images.featured.spotlight[0], // _DEV1493.jpg
    images.additional[5], // _DEV1542.jpg
  ];

  // Section data with alternating layout - Using only existing content
  const sections = [
    {
      title: "Book a Session",
      image: images.featured.spotlight[0], // _DEV1493.jpg
      content: `Ready to start your project? Fill out the form below and I'll get back to you within 24 hours.`,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen pt-42">
      {/* Main Content Section with Form and Images */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <div>
              <div className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-light mb-4 !system-ui uppercase">
                  Book a Session
                </h2>
                <div className="w-20 h-px bg-gray-800 mb-6"></div>
                <p className="text-gray-600 text-md leading-relaxed !system-ui text-justify">
                  Ready to start your project? Fill out the form below and I'll
                  get back to you within 24 hours.
                </p>
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium mb-3 !system-ui text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gray-800 transition-colors duration-300 !system-ui"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-3 !system-ui text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gray-800 transition-colors duration-300 !system-ui"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3 !system-ui text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gray-800 transition-colors duration-300 !system-ui"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3 !system-ui text-gray-700">
                    Service Interested In
                  </label>
                  <select className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gray-800 transition-colors duration-300 !system-ui">
                    <option>Select a service</option>
                    <option>Consultation</option>
                    <option>Design</option>
                    <option>Photography</option>
                    <option>Installation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3 !system-ui text-gray-700">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gray-800 transition-colors duration-300 !system-ui"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <GlobalButton
                  text="Submit Inquiry"
                  className="px-8 py-3 border border-gray-800 text-gray-800 hover:border-white hover:text-gray-800 transition-all duration-300"
                />
              </form>
            </div>

            {/* Images Section */}
            <div>
              {/* Main Portfolio Image */}
              <div className="aspect-[4/3] relative overflow-hidden mb-6">
                <Image
                  src={portfolioImages[0]}
                  alt="Portfolio Work Example"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Small Images Grid */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                {portfolioImages.slice(1, 3).map((src, index) => (
                  <div
                    key={index}
                    className="aspect-square relative overflow-hidden"
                  >
                    <Image
                      src={src}
                      alt={`Project example ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>

              {/* Additional Images Row */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                {portfolioImages.slice(3).map((src, index) => (
                  <div
                    key={index}
                    className="aspect-square relative overflow-hidden"
                  >
                    <Image
                      src={src}
                      alt={`Work sample ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 33vw, 16vw"
                    />
                  </div>
                ))}
              </div>

              {/* Inspiration Text */}
              <div className="py-6 border-t">
                <h3 className="font-medium mb-2 !system-ui">Recent Work</h3>
                <p className="text-sm text-gray-600 !system-ui">
                  Browse through recent projects to get inspiration for your own
                  vision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
