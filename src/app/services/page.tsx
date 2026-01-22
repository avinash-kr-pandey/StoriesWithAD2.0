"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import images from "@/utils/images";

const Services = () => {
  const sections = [
    {
      title: "Custom Design Consultations",
      image: images.featured.spotlight[0],
      content: `Our custom design consultations begin with an in-depth exploration of your vision, lifestyle, and functional requirements. We work closely with you to understand the unique characteristics of your space, whether it's a residential interior, commercial establishment, or special project. Our team conducts thorough site assessments, taking precise measurements and evaluating architectural elements to create designs that harmonize with existing structures. We discuss materials, color palettes, lighting solutions, and spatial arrangements, ensuring every aspect aligns with your aesthetic preferences and practical needs while staying within your budget parameters.`,
    },
    {
      title: "Space Planning & Optimization",
      image: images.featured.spotlight[1],
      content: `Effective space planning transforms how you live and work within your environment. We analyze traffic flow, furniture placement, and functional zones to maximize both utility and visual appeal. Our optimization strategies consider natural light patterns, acoustics, and multi-purpose usage, creating adaptable spaces that evolve with your needs. We employ advanced visualization tools to present realistic 3D renderings, allowing you to experience the proposed design before implementation. This meticulous approach ensures every square foot serves a purpose while maintaining aesthetic coherence throughout the entire space.`,
    },
    {
      title: "Material Selection & Sourcing",
      image: images.portfolio.photography[0],
      content: `Material selection forms the foundation of exceptional design. We guide you through our curated collection of premium materials, including sustainable woods, natural stones, bespoke textiles, and innovative composites. Our extensive network of artisans and suppliers ensures access to exclusive materials not available through conventional channels. We consider durability, maintenance requirements, environmental impact, and tactile qualities when recommending materials. Each selection undergoes rigorous testing for performance and longevity, guaranteeing that your investment withstands daily use while maintaining its visual appeal for years to come.`,
    },
    {
      title: "Project Management & Installation",
      image: images.featured.spotlight[2],
      content: `Seamless execution distinguishes ordinary projects from extraordinary ones. Our comprehensive project management oversees every phase from initial concept to final installation. We coordinate with contractors, artisans, and suppliers, maintaining strict quality control and timeline adherence. Our installation teams handle furniture placement, accessory styling, and final detailing with precision. We conduct thorough quality inspections and provide detailed maintenance guidelines upon project completion. Our commitment extends beyond installation with follow-up consultations to ensure your continued satisfaction and address any evolving needs within your newly transformed space.`,
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Main title section */}
      <div className="pt-10 px-6 lg:px-16">
        <h1 className="text-3xl md:text-5xl font-bold uppercase py-8 pt-24 tracking-tight">
          Services
        </h1>
      </div>

      {/* 4 Full-screen alternating sections */}
      {sections.map((section, index) => (
        <div
          key={index}
          className="min-h-[90vh] flex items-center justify-center py-20"
        >
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
            <div
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-12 lg:gap-20`}
            >
              {/* Image Section - Height increased and responsive */}
              <div className="lg:w-1/2 w-full">
                <div className="h-[60vh] md:h-[60vh] lg:h-[70vh] relative overflow-hidden group">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                    priority={index < 2}
                  />
                </div>
              </div>

              {/* Text Content Section */}
              <div className="lg:w-1/2 w-full">
                <div className="max-w-2xl mx-auto lg:mx-0">
                  <h2 className="text-3xl lg:text-3xl text-gray-700 leading-relaxed font-thin pb-12">
                    {section.title}
                  </h2>
                  <div className="space-y-4 text-md">
                    {section.content
                      .split(".")
                      .filter((sentence) => sentence.trim())
                      .map((sentence, i) => (
                        <p
                          key={i}
                          className=" text-gray-700 leading-relaxed font-thin text-justify"
                        >
                          {sentence.trim() +
                            (i <
                            section.content.split(".").filter((s) => s.trim())
                              .length -
                              1
                              ? "."
                              : "")}
                        </p>
                      ))}
                  </div>
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
