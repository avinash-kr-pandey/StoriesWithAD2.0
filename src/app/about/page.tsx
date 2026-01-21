"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import images from "@/utils/images";

const About = () => {
  // Stats data
  const stats = [
    { number: "12+", label: "Years Experience", icon: "🕰️" },
    { number: "350+", label: "Projects Completed", icon: "🏆" },
    { number: "98%", label: "Client Satisfaction", icon: "❤️" },
    { number: "50+", label: "Awards Won", icon: "⭐" },
  ];

  // Team members
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Creative Director",
      image: images.gallery.art[0],
      desc: "20+ years in luxury interior design",
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Designer",
      image: images.gallery.seating[1],
      desc: "Specializes in minimalist spaces",
    },
    {
      name: "Elena Petrova",
      role: "Photography Director",
      image: images.gallery.tables[0],
      desc: "Architectural photography expert",
    },
  ];

  // Using multiple images from your collection for the about page
  const aboutImages = [
    images.gallery.seating[0],
    images.gallery.tables[1],
    images.gallery.art[2],
    images.featured.curated,
  ];

  // Sections data with alternating layout
  const sections = [
    {
      title: "Our Story & Philosophy",
      subtitle: "Where Vision Meets Craftsmanship",
      image: aboutImages[0],
      content: `Founded on the principles of aesthetic integrity and functional beauty, our journey began with a simple vision: to transform spaces into reflections of personal identity. We believe that exceptional design isn't about following trends, but about creating environments that resonate with how you live, work, and feel.`,
      highlights: [
        "Established 2010",
        "Global Presence",
        "Sustainable Practices",
      ],
    },
    {
      title: "Our Approach & Methodology",
      subtitle: "Meticulous Process, Exceptional Results",
      image: aboutImages[1],
      content: `Our design process is deeply collaborative, beginning with immersive discovery sessions to understand your vision, lifestyle, and aspirations. We employ a meticulous methodology that balances creative intuition with technical precision.`,
      highlights: [
        "3-Phase Process",
        "Client-Centric Approach",
        "Quality Assurance",
      ],
    },
    {
      title: "Our Commitment & Values",
      subtitle: "Excellence in Every Detail",
      image: aboutImages[2],
      content: `At our core, we are committed to excellence, integrity, and sustainability. We prioritize quality craftsmanship, ethical sourcing, and lasting relationships with both clients and artisans.`,
      highlights: [
        "Ethical Sourcing",
        "Lifetime Support",
        "Artisan Partnerships",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with Parallax Effect */}
      <div className="pt-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-light mb-4 !system-ui uppercase py-8 pt-24">
            About
          </h1>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="py-12 px-6 ">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={aboutImages[0]}
                  alt="Studio Space"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute -bottom-6 -right-6 w-40 h-40 border-4 border-white bg-gray-100 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={aboutImages[1]}
                    alt="Design Detail"
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-black"></div>
                <span className="text-sm tracking-widest text-gray-500 !system-ui">
                  WHO WE ARE
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light mb-8 !system-ui leading-tight">
                We Create
                <span className="block font-normal mt-2">
                  Meaningful Experiences
                </span>
              </h2>

              <div className="space-y-6 mb-10">
                <p className="text-gray-700 text-lg leading-relaxed !system-ui">
                  With over a decade of excellence in visual arts and design, we
                  specialize in transforming ordinary spaces into extraordinary
                  experiences. Our team combines artistic vision with technical
                  precision to deliver results that exceed expectations.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed !system-ui">
                  We believe that truly remarkable design emerges at the
                  intersection of aesthetics and functionality. Each project is
                  an opportunity to craft a unique narrative through space,
                  light, and materiality.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-2xl mb-3">✨</div>
                  <h3 className="font-medium mb-2 !system-ui">Innovation</h3>
                  <p className="text-sm text-gray-600 !system-ui">
                    Cutting-edge design solutions
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-2xl mb-3">🎯</div>
                  <h3 className="font-medium mb-2 !system-ui">Precision</h3>
                  <p className="text-sm text-gray-600 !system-ui">
                    Attention to every detail
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Sections */}
      {sections.map((section, index) => (
        <section
          key={index}
          className={`py-24 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-16 lg:gap-24`}
            >
              {/* Image Section */}
              <div className="lg:w-1/2 w-full">
                <div className="relative group">
                  <div className="aspect-[4/3] lg:aspect-[3/4] relative overflow-hidden rounded-3xl shadow-2xl">
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div
                    className={`absolute -top-6 ${index % 2 === 0 ? "-right-6" : "-left-6"} bg-gray-800
                     text-white p-6 rounded-2xl shadow-xl w-48`}
                  >
                    <div className="text-2xl mb-2">{section.highlights[0]}</div>
                    <div className="text-sm text-gray-300 !system-ui">
                      Key Highlight
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Content Section */}
              <div className="lg:w-1/2 w-full">
                <div className="max-w-xl mx-auto lg:mx-0">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="text-6xl text-gray-200 font-light !system-ui">
                      0{index + 1}
                    </div>
                    <div className="h-px w-20 bg-gray-300"></div>
                  </div>

                  <div className="mb-4">
                    <span className="text-sm tracking-widest text-gray-500 !system-ui">
                      {section.subtitle}
                    </span>
                  </div>

                  <h2 className="text-4xl lg:text-5xl font-light mb-10 !system-ui leading-tight">
                    {section.title}
                  </h2>

                  <div className="space-y-6 mb-10">
                    <p className="text-gray-700 text-lg leading-relaxed !system-ui">
                      {section.content}
                    </p>
                  </div>

                  <div className="space-y-3 mb-10">
                    {section.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                        <span className="text-gray-700 !system-ui">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="group relative px-8 py-4 bg-transparent border-2 border-black/30 text-gray-600 
                  overflow-hidden rounded-full transition-all duration-500 hover:text-white"
                  >
                    <span className="relative z-10 !system-ui font-medium tracking-wider">
                      DISCOVER MORE
                    </span>
                    <div className="absolute inset-0 bg-black/30 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default About;
