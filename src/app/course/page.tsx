"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import images from "@/utils/images";

const Course = () => {
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

  const courses = [
    {
      title: "Design Fundamentals",
      level: "Beginner",
      duration: "4 weeks",
      description: "Learn the basics of interior design and space planning.",
      image: images.gallery.seating[0], // _DEV0791.jpg
    },
    {
      title: "Advanced Styling",
      level: "Intermediate",
      duration: "6 weeks",
      description: "Master the art of styling and creating visual narratives.",
      image: images.gallery.art[0], // _DEV0866.jpg
    },
    {
      title: "Professional Practice",
      level: "Advanced",
      duration: "8 weeks",
      description: "Build your design business and client management skills.",
      image: images.gallery.bespoke[0], // _DEV1042.jpg
    },
    {
      title: "Photography for Designers",
      level: "Intermediate",
      duration: "5 weeks",
      description: "Learn professional photography techniques for design portfolios.",
      image: images.portfolio.photography[0], // _DEV1460.jpg
    },
  ];

  // Course materials and resources
  const courseResources = [
    images.additional[0], // _DEV1524.jpg
    images.additional[1], // _DEV1536.jpg
    images.additional[2], // _DEV1539.jpg
    images.additional[3], // _DEV1540.jpg
    images.additional[4], // _DEV1541.jpg
    images.additional[5], // _DEV1542.jpg
  ];

  // Learning outcomes
  const learningOutcomes = [
    images.featured.spotlight[0], // _DEV1493.jpg
    images.featured.spotlight[1], // _DEV1505.jpg
    images.featured.spotlight[2], // _DEV1511.jpg
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
                All Courses
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                Beginner Level
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-b">
                Intermediate Level
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                Advanced Level
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
                  setSortOption("duration");
                  setSortOpen(false);
                }}
              >
                Duration: Short → Long
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => {
                  setSortOption("level");
                  setSortOpen(false);
                }}
              >
                By Level
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* MAIN TITLE */}
        <h1 className="text-2xl font-light mb-4">Courses</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          Expand your skills with comprehensive courses designed for creative
          professionals and enthusiasts.
        </p>

        {/* Featured Banner */}
        <div className="mb-16">
          <div className="aspect-[16/6] relative overflow-hidden mb-6">
            <Image
              src={images.featured.hero} // _DEV1486.jpg
              alt="Design Courses & Education"
              fill
              className="object-cover"
              priority
            />
            {/* TITLE OVERLAY */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h2 className="text-white text-2xl font-medium mb-2">Design Education</h2>
              <p className="text-gray-300 text-xl">Master the art of design with our comprehensive courses</p>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {courses.map((course, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-1">{course.title}</h3>
                  <p className="text-gray-300 text-xl mb-1">{course.description}</p>
                  <p className="text-gray-300 text-xl mb-1">Level: {course.level}</p>
                  <p className="text-gray-400 text-lg">Duration: {course.duration}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1">
                  {course.level}
                </span>
                <button className="border border-black px-6 py-2 hover:bg-black hover:text-white transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Course Resources */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">Course Resources & Materials</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {courseResources.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden mb-2">
                  <Image
                    src={src}
                    alt={`Course resource ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* TITLE OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-2xl text-center">
                      Resource {index + 1}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningOutcomes.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-[4/3] relative overflow-hidden mb-4">
                  <Image
                    src={src}
                    alt={`Learning outcome ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* TITLE OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white text-2xl font-medium mb-2">
                      {index === 0 && "Design Principles"}
                      {index === 1 && "Practical Skills"}
                      {index === 2 && "Professional Development"}
                    </h3>
                    <p className="text-gray-300 text-xl">
                      {index === 0 && "Master fundamental design concepts and spatial relationships"}
                      {index === 1 && "Develop hands-on skills for real-world design projects"}
                      {index === 2 && "Build your portfolio and professional network"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Benefits */}
        <div className="p-8 border-t">
          <h2 className="text-2xl font-light mb-6">Course Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.gallery.objects[0]} // _DEV1381.jpg
                  alt="Expert Instruction"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">Expert Instruction</h3>
                  <p className="text-gray-300 text-xl">
                    Learn from industry professionals with years of experience
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.gallery.objects[1]} // _DEV1394.jpg
                  alt="Hands-on Projects"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">Hands-on Projects</h3>
                  <p className="text-gray-300 text-xl">
                    Apply your learning through practical, real-world projects
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={images.gallery.objects[2]} // _DEV1404.jpg
                  alt="Community Support"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* TITLE OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-2xl font-medium mb-2">Community Support</h3>
                  <p className="text-gray-300 text-xl">
                    Join a community of designers and receive ongoing support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enrollment Section */}
        <div className="mt-16 p-8 border-t text-center">
          <h2 className="text-2xl font-light mb-4">Start Your Design Journey</h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Ready to transform your creative skills? Enroll in our courses and take the first step toward mastering design.
          </p>
          <button className="border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors mr-4">
            View All Courses
          </button>
          <button className="border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors">
            Contact Advisor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Course;