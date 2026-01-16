// app/projects/page.tsx
"use client";

import { useState, useEffect } from "react";
import { projects } from "@/utils/projectsData";
import Link from "next/link";
import Image from "next/image";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get all unique tags from projects
  const allTags = Array.from(
    new Set(projects.flatMap((project) => project.tags))
  );

  // Get all unique categories
  const allCategories = Array.from(
    new Set(projects.map((project) => project.category))
  );

  // Filter projects based on selected filter
  const filteredProjects =
    filter === "all"
      ? projects
      : filter.includes("Category: ")
      ? projects.filter(
          (project) => project.category === filter.replace("Category: ", "")
        )
      : projects.filter((project) => project.tags.includes(filter));

  if (!mounted) return null;

  return (
    <div className="min-h-screen mt-32 text-[#171717] p-4 md:p-8">
      {/* Header Section */}
      <header className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#171717] font-serif">
          Furniture <span className="italic">Designs</span>
        </h1>

        <p className="text-lg md:text-xl text-[#555] max-w-3xl mx-auto mb-8 leading-relaxed font-serif">
          Explore our collection of thoughtfully designed furniture pieces. Each
          project combines functionality, comfort, and aesthetic appeal for
          modern living spaces.
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                filter === "all"
                  ? "bg-[#171717] text-[#eae1d1]"
                  : "bg-white/70 text-[#171717] hover:bg-white/90 border border-[#d4c9b8]"
              } font-simple`}
            >
              All Projects
            </button>

            {/* Category Filters */}
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(`Category: ${category}`)}
                className={`px-4 py-2 rounded-full transition-all duration-200 ${
                  filter === `Category: ${category}`
                    ? "bg-[#171717] text-[#eae1d1]"
                    : "bg-white/70 text-[#171717] hover:bg-white/90 border border-[#d4c9b8]"
                } font-simple`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                  filter === tag
                    ? "bg-[#171717] text-[#eae1d1]"
                    : "bg-white/50 text-[#555] hover:bg-white/80 border border-[#d4c9b8]"
                } font-simple`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Projects Grid */}
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-[#d4c9b8] hover:border-[#b8ad9c] transition-all duration-300 hover:shadow-lg cursor-pointer"
            >
              {/* Project Image */}
              <div className="h-48 overflow-hidden relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  width={300}
                    height={200}
                />
                <div className="absolute top-3 right-3 bg-white/90 text-[#171717] px-3 py-1 rounded-full text-sm font-medium">
                  {project.date}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-[#171717] group-hover:text-[#555] transition-colors duration-300 font-serif">
                    {project.title}
                  </h3>
                  <span className="text-xs bg-[#f5f0e6] text-[#555] px-2 py-1 rounded">
                    {project.category}
                  </span>
                </div>

                <p className="text-[#555] mb-4 line-clamp-2 leading-relaxed font-serif">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-[#f5f0e6] text-[#555] rounded text-xs border border-[#e0d6c5]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Details Button */}
                <div className="w-full py-2.5 bg-white text-[#171717] border border-[#d4c9b8] hover:bg-[#171717] hover:text-[#eae1d1] rounded-lg font-medium transition-all duration-300 text-center font-simple">
                  View Details
                </div>
              </div>
            </Link>
          ))}

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-16 px-4">
              <div className="text-5xl mb-6">🪑</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-[#171717] font-serif">
                No Projects Found
              </h3>
              <p className="text-[#555] max-w-md mx-auto font-serif">
                Try selecting a different category or tag to see related
                furniture designs.
              </p>
              <button
                onClick={() => setFilter("all")}
                className="mt-6 px-6 py-3 bg-[#171717] text-[#eae1d1] rounded-lg font-medium hover:bg-[#333] transition-all duration-300 font-simple"
              >
                Show All Projects
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#d4c9b8] text-center">
        <p className="text-[#555] mb-4 font-serif">
          Interested in custom furniture designs?{" "}
          <Link
            href="/contact"
            className="text-[#171717] hover:text-[#555] transition-colors duration-300 underline"
          >
            Let&apos;s discuss your project
          </Link>
        </p>
        <div className="flex justify-center gap-4 text-xl">
          <span className="cursor-pointer hover:opacity-70 transition-opacity duration-300">
            🪑
          </span>
          <span className="cursor-pointer hover:opacity-70 transition-opacity duration-300">
            🛋️
          </span>
          <span className="cursor-pointer hover:opacity-70 transition-opacity duration-300">
            🪚
          </span>
          <span className="cursor-pointer hover:opacity-70 transition-opacity duration-300">
            🔨
          </span>
        </div>
        <p className="text-[#999] text-sm mt-6 font-serif">
          Crafted with attention to detail and sustainable materials
        </p>
      </footer>

      <style jsx global>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Smooth transitions */
        * {
          transition: background-color 0.2s ease, border-color 0.2s ease,
            transform 0.2s ease;
        }
      `}</style>
    </div>
  );
}
