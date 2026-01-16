"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import images from "@/utils/images";

const Art = () => {
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

  const artworks = [
    {
      title: "Abstract Composition",
      artist: "Maria Chen",
      medium: "Acrylic on Canvas",
      size: "100×100 cm",
      image: images.gallery.art[0],
    },
    {
      title: "Urban Landscape",
      artist: "Alex Rivera",
      medium: "Oil on Wood",
      size: "80×120 cm",
      image: images.gallery.art[1],
    },
    {
      title: "Minimal Forms",
      artist: "Lisa Park",
      medium: "Mixed Media",
      size: "60×60 cm",
      image: images.gallery.art[2],
    },
    {
      title: "Color Study",
      artist: "Tom White",
      medium: "Watercolor",
      size: "50×70 cm",
      image: images.gallery.art[3],
    },
    {
      title: "Sculptural Piece",
      artist: "James Miller",
      medium: "Bronze",
      size: "40×30×25 cm",
      image: images.additional[0],
    },
    {
      title: "Digital Art",
      artist: "Sarah Kim",
      medium: "Digital Print",
      size: "90×60 cm",
      image: images.additional[1],
    },
  ];

  // Additional art pieces for featured section
  const featuredArt = [
    images.additional[2],
    images.additional[3],
    images.additional[4],
    images.additional[5],
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
                All Artworks
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                By Medium
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                By Artist
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                Featured Art
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
                  setSortOption("artist");
                  setSortOpen(false);
                }}
              >
                By Artist
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => {
                  setSortOption("medium");
                  setSortOpen(false);
                }}
              >
                By Medium
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* MAIN TITLE */}
        <h1 className="text-2xl font-light mb-4">Art</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          A curated selection of contemporary artworks that complement and
          enhance interior spaces.
        </p>

        {/* Featured Art Banner */}
        <div className="mb-16">
          <div className="aspect-[16/6] relative overflow-hidden mb-6">
            <Image
              src={images.featured.curated}
              alt="Art Collection Curated"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Main Artworks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {artworks.map((art, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-square relative overflow-hidden mb-4">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-1">
                    {art.title}
                  </h3>
                  <p className="text-gray-300 text-xl mb-1">
                    Artist: {art.artist}
                  </p>
                  <p className="text-gray-300 text-xl mb-1">
                    Medium: {art.medium}
                  </p>
                  <p className="text-gray-400 text-lg">Size: {art.size}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Art Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">Featured Pieces</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredArt.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden mb-3">
                  <Image
                    src={src}
                    alt={`Featured art ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* TITLE OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white text-2xl text-center">
                      Featured Art {index + 1}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Art Preview */}
        <div>
          <h2 className="text-2xl font-light mb-6">More from the Collection</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {images.additional.slice(6, 12).map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden mb-2">
                  <Image
                    src={src}
                    alt={`Art piece ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* TITLE OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-2xl text-center">
                      Art {index + 1}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Art;
