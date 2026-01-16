"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import GlobalButton from "../utils/GlobalButton";

const arrivalsData = [
  {
    id: 1,
    img: "/PICTURES/_DEV0809.jpg",
    title: "Fantasma Floor Lamp",
    price: "$10,950.00",
  },
  {
    id: 2,
    img: "/PICTURES/_DEV0830.jpg",
    title: "Medium Ceramic Black Footed Bowl",
    price: "$240.00",
  },
  {
    id: 3,
    img: "/PICTURES/_DEV0836.jpg",
    title: "Pianura Black Velvet Armchairs",
    price: "$7,900.00",
  },
  {
    id: 4,
    img: "/PICTURES/_DEV0842.jpg",
    title: "Impermanence Original Artwork",
    price: "$4,200.00",
  },
  {
    id: 5,
    img: "/PICTURES/_DEV0875.jpg",
    title: "Vintage Side Table",
    price: "$1,800.00",
  },
  {
    id: 6,
    img: "/PICTURES/_DEV0809.jpg",
    title: "Classic Floor Vase",
    price: "$350.00",
  },
];

const ARRIVALS = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showButtons, setShowButtons] = useState(false);

  const cardWidth = 400;
  const scrollSpeed = 4000;

  // Create duplicated list for seamless loop
  const loopedData = [...arrivalsData, ...arrivalsData, ...arrivalsData];

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current || showButtons) return;
      smoothScroll(cardWidth);
    }, scrollSpeed);
    return () => clearInterval(interval);
  }, [showButtons]);

  const smoothScroll = (distance: number) => {
    const container = scrollRef.current;
    if (!container) return;

    container.style.scrollBehavior = "smooth";
    container.scrollLeft += distance;

    const totalScroll = container.scrollWidth / 3;

    setTimeout(() => {
      if (container.scrollLeft >= totalScroll * 2) {
        container.style.scrollBehavior = "auto";
        container.scrollLeft = totalScroll;
      } else if (container.scrollLeft <= totalScroll / 3) {
        container.style.scrollBehavior = "auto";
        container.scrollLeft = totalScroll;
      }
    }, 500);
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    smoothScroll(dir === "right" ? cardWidth : -cardWidth);
  };

  // Initialize middle position
  useEffect(() => {
    if (scrollRef.current) {
      const totalScroll = scrollRef.current.scrollWidth / 3;
      scrollRef.current.scrollLeft = totalScroll;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-[#a67c52] py-16 md:px-16 px-8 min-h-screen relative overflow-hidden"
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="md:text-3xl text-xl text-white uppercase tracking-wide !font-light">
          NEW ARRIVALS
        </h2>
        <GlobalButton
          text="SHOP NOW"
          className="mt-4 px-6 py-1 border border-white text-white h-[48px] !font-light"
        />
      </div>

      {/* Scroll Buttons - Animated on hover */}
      <button
        onClick={() => scroll("left")}
        className={`absolute top-1/2 -translate-y-1/2 left-5 z-20 bg-[#eae1d1] text-[#a67c52] p-3 rounded-xl h-12 w-12 shadow-lg transition-all duration-500 cursor-pointer ${
          showButtons
            ? "opacity-100 transform translate-x-0"
            : "opacity-0 transform -translate-x-4"
        } hover:scale-110 hover:shadow-xl`}
      >
        ‹
      </button>

      <button
        onClick={() => scroll("right")}
        className={`absolute top-1/2 -translate-y-1/2 right-5 z-20 bg-[#eae1d1] text-[#a67c52] p-3 rounded-xl h-12 w-12 shadow-lg transition-all duration-500 cursor-pointer ${
          showButtons
            ? "opacity-100 transform translate-x-0"
            : "opacity-0 transform translate-x-4"
        } hover:scale-110 hover:shadow-xl`}
      >
        ›
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 py-6 scroll-smooth scrollbar-none "
        style={{
          scrollbarWidth: "none",
          scrollBehavior: "smooth",
        }}
      >
        {loopedData.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="min-w-[380px] bg-[#eae1d1] shadow-md hover:shadow-xl transition-all duration-500 hover:scale-102"
          >
            <Image
              src={item.img}
              alt={item.title}
              className="w-full h-[400px] object-cover "
              width={400}
              height={400}
            />
            <div className="p-4 text-center">
              <p className="text-lg text-gray-800 font-system">{item.title}</p>
              <p className="text-gray-700 text-md font-system">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ARRIVALS;
