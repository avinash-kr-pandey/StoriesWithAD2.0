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

  // Section data with alternating layout
  const sections = [
    {
      title: "Custom Design Consultations",
      image: images.featured.spotlight[0], // _DEV1493.jpg
      content: `Our custom design consultations begin with an in-depth exploration of your vision, lifestyle, and functional requirements. We work closely with you to understand the unique characteristics of your space, whether it's a residential interior, commercial establishment, or special project. Our team conducts thorough site assessments, taking precise measurements and evaluating architectural elements to create designs that harmonize with existing structures. We discuss materials, color palettes, lighting solutions, and spatial arrangements, ensuring every aspect aligns with your aesthetic preferences and practical needs while staying within your budget parameters.`,
    },
    {
      title: "Space Planning & Optimization",
      image: images.featured.spotlight[1], // _DEV1505.jpg
      content: `Effective space planning transforms how you live and work within your environment. We analyze traffic flow, furniture placement, and functional zones to maximize both utility and visual appeal. Our optimization strategies consider natural light patterns, acoustics, and multi-purpose usage, creating adaptable spaces that evolve with your needs. We employ advanced visualization tools to present realistic 3D renderings, allowing you to experience the proposed design before implementation. This meticulous approach ensures every square foot serves a purpose while maintaining aesthetic coherence throughout the entire space.`,
    },
    {
      title: "Material Selection & Sourcing",
      image: images.portfolio.photography[0], // _DEV1460.jpg
      content: `Material selection forms the foundation of exceptional design. We guide you through our curated collection of premium materials, including sustainable woods, natural stones, bespoke textiles, and innovative composites. Our extensive network of artisans and suppliers ensures access to exclusive materials not available through conventional channels. We consider durability, maintenance requirements, environmental impact, and tactile qualities when recommending materials. Each selection undergoes rigorous testing for performance and longevity, guaranteeing that your investment withstands daily use while maintaining its visual appeal for years to come.`,
    },
    {
      title: "Project Management & Installation",
      image: images.featured.spotlight[2], // _DEV1511.jpg
      content: `Seamless execution distinguishes ordinary projects from extraordinary ones. Our comprehensive project management oversees every phase from initial concept to final installation. We coordinate with contractors, artisans, and suppliers, maintaining strict quality control and timeline adherence. Our installation teams handle furniture placement, accessory styling, and final detailing with precision. We conduct thorough quality inspections and provide detailed maintenance guidelines upon project completion. Our commitment extends beyond installation with follow-up consultations to ensure your continued satisfaction and address any evolving needs within your newly transformed space.`,
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
    <div className="min-h-screen pt-42">
      {/* Main title section */}
      <div className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-light mb-4 !system-ui uppercase py-8">
            Services
          </h1>

          {/* Featured Banner */}
        </div>
      </div>

      {/* 4 Full-screen alternating sections */}
      {sections.map((section, index) => (
        <div
          key={index}
          className="min-h-screen flex items-center justify-center"
        >
          <div className="w-full max-w-7xl mx-auto px-6">
            <div
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-12`}
            >
              {/* Image Section */}
              <div className="lg:w-1/2 w-full">
                <div className="aspect-[4/3] lg:aspect-square relative overflow-hidden">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Text Content Section */}
              <div className="lg:w-1/2 w-full">
                <div className="max-w-lg mx-auto lg:mx-0">
                  <h2 className="text-2xl lg:text-3xl font-light mb-8 !system-ui pb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-800 text-md leading-relaxed !system-ui text-justify">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      
    </div>
  );
};

export default Services;
