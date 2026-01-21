// app/projects/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { projects } from "@/utils/projectsData";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiSearch, FiChevronDown, FiX } from "react-icons/fi";

interface Project {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  image: string;
  tags: string[];
  githubLink: string;
  liveLink: string;
  date: string;
  materials: string[];
  dimensions: string;
  category: string;
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get all unique categories
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    projects.forEach((project) => {
      categorySet.add(project.category);
    });
    return Array.from(categorySet);
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Apply category filter
    if (filter !== "all") {
      result = result.filter((project) => project.category === filter);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    return result;
  }, [filter, searchQuery]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen pt-32 font-['system-ui',sans-serif]">
      {/* Hero Header - Simplified */}
      <section className="py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-start mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-['system-ui',sans-serif]">
              PORTFOLIO
            </h1>
          </div>
        </div>
      </section>

      {/* Projects Grid - Simple Image + Title Only */}
      <section className="pb-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${filter}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project: Project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <Link href={`/projects/${project.id}`}>
                    {/* Image Container with Increased Height */}
                    <div
                      className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 
                    aspect-[4/3.2] mb-4"
                    >
                      {" "}
                      {/* Changed from aspect-[4/3] to aspect-[4/3.2] */}
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 6}
                      />
                      {/* Gradient Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Title Only */}
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-black transition-colors duration-300 text-start px-1">
                      {project.title}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gray-100 rounded-full">
                <FiSearch className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Projects Found
              </h3>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
