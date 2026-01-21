// app/projects/page.tsx
"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { projects } from "@/utils/projectsData";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiFilter,
  FiList,
  FiChevronDown,
  FiSearch,
  FiCalendar,
  FiTag,
  FiStar,
  FiEye,
  FiBox,
  FiClock,
  FiHeart,
  FiShare2,
  FiBookmark,
} from "react-icons/fi";
import { TbLayoutGrid, TbLayoutColumns } from "react-icons/tb";
import { FaPencilRuler } from "react-icons/fa";

// Define Project interface based on your projectsData structure
interface Project {
  id: number;  // Changed from string to number
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

// Extended interface with additional properties
interface ProjectWithRating extends Project {
  rating?: number;
  client?: string;
  status?: string;
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "masonry" | "list">("grid");
  const [sortBy, setSortBy] = useState<"date" | "name" | "category">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen]);

  // Close filter when filter is applied
  const handleFilterSelect = (filterValue: string) => {
    setFilter(filterValue);
    setIsFilterOpen(false);
  };

  // Get all unique categories with counts
  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>();
    projects.forEach((project) => {
      categoryMap.set(
        project.category,
        (categoryMap.get(project.category) || 0) + 1,
      );
    });
    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  }, []);

  // Get all unique tags with counts
  const tags = useMemo(() => {
    const tagMap = new Map<string, number>();
    projects.forEach((project) => {
      project.tags.forEach((tag) => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });
    });
    return Array.from(tagMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  // Add rating to projects (if not present)
  const projectsWithRating = useMemo(() => {
    return projects.map((project) => ({
      ...project,
      rating: Math.random() * 1 + 4.5, // Random rating between 4.5-5.5
      client: ["Private", "Corporate", "Residential"][Math.floor(Math.random() * 3)],
      status: ["Completed", "In Progress", "Concept"][Math.floor(Math.random() * 3)],
    }));
  }, []);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let result = [...projectsWithRating];

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
          project.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          project.materials.some((material) =>
            material.toLowerCase().includes(query),
          ),
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "date":
          comparison = new Date(b.date).getTime() - new Date(a.date).getTime();
          break;
        case "name":
          comparison = a.title.localeCompare(b.title);
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
      }

      return sortOrder === "asc" ? -comparison : comparison;
    });

    return result;
  }, [filter, searchQuery, sortBy, sortOrder, projectsWithRating]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen pt-20 font-['system-ui',sans-serif]">
      {/* Hero Header */}
      <section className="relative py-12 md:py-20 px-4 md:px-6 overflow-hidden">
        <div className="absolute inset-0"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full text-sm font-medium tracking-wide text-gray-700 mb-4">
                <FiStar className="w-3 h-3" />
                PORTFOLIO COLLECTION
              </span>

              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto font-['system-ui',sans-serif]">
                A curated collection of furniture designs where craftsmanship
                meets innovation, showcasing our dedication to quality and
                sustainable excellence.
              </p>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto mt-12"
            >
              <div className="text-center p-4 md:p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 font-['system-ui',sans-serif]">
                  {projects.length}
                </div>
                <div className="text-sm text-gray-600 font-medium font-['system-ui',sans-serif]">
                  Total Projects
                </div>
              </div>
              <div className="text-center p-4 md:p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 font-['system-ui',sans-serif]">
                  {categories.length}
                </div>
                <div className="text-sm text-gray-600 font-medium font-['system-ui',sans-serif]">
                  Categories
                </div>
              </div>
              <div className="text-center p-4 md:p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 font-['system-ui',sans-serif]">
                  {tags.length}
                </div>
                <div className="text-sm text-gray-600 font-medium font-['system-ui',sans-serif]">
                  Unique Tags
                </div>
              </div>
              <div className="text-center p-4 md:p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 font-['system-ui',sans-serif]">
                  2020
                </div>
                <div className="text-sm text-gray-600 font-medium font-['system-ui',sans-serif]">
                  Since
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Control Bar - Made it stick higher */}
      <section className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 py-4 px-4 md:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Left Controls - Search */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative max-w-md">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search projects, materials, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 font-['system-ui',sans-serif]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* View Toggle */}
              <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-black"
                      : "hover:bg-white/50 text-gray-600"
                  }`}
                  title="Grid View"
                >
                  <TbLayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("masonry")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "masonry"
                      ? "bg-white shadow-sm text-black"
                      : "hover:bg-white/50 text-gray-600"
                  }`}
                  title="Masonry View"
                >
                  <TbLayoutColumns className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-black"
                      : "hover:bg-white/50 text-gray-600"
                  }`}
                  title="List View"
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>

              {/* Filter & Sort Dropdown */}
              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors duration-200 font-['system-ui',sans-serif]"
                >
                  <FiFilter className="w-4 h-4" />
                  <span className="text-sm font-medium">Filter & Sort</span>
                  <FiChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isFilterOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Filter Dropdown */}
                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50"
                    >
                      <div className="space-y-4">
                        {/* Sort Options */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2 font-['system-ui',sans-serif]">
                            Sort By
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => setSortBy("date")}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors font-['system-ui',sans-serif] ${
                                sortBy === "date"
                                  ? "bg-black text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              <FiCalendar className="w-4 h-4" />
                              Date
                            </button>
                            <button
                              onClick={() => setSortBy("name")}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors font-['system-ui',sans-serif] ${
                                sortBy === "name"
                                  ? "bg-black text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              A-Z
                            </button>
                            <button
                              onClick={() =>
                                setSortOrder(
                                  sortOrder === "asc" ? "desc" : "asc",
                                )
                              }
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors font-['system-ui',sans-serif] ${
                                sortOrder === "desc"
                                  ? "bg-black text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {sortOrder === "desc"
                                ? "Descending"
                                : "Ascending"}
                            </button>
                          </div>
                        </div>

                        {/* Category Filter */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2 font-['system-ui',sans-serif]">
                            Category
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => handleFilterSelect("all")}
                              className={`px-3 py-2 rounded-lg text-sm transition-colors font-['system-ui',sans-serif] ${
                                filter === "all"
                                  ? "bg-black text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              All ({projects.length})
                            </button>
                            {categories.map(({ name, count }) => (
                              <button
                                key={name}
                                onClick={() => handleFilterSelect(name)}
                                className={`px-3 py-2 rounded-lg text-sm transition-colors font-['system-ui',sans-serif] ${
                                  filter === name
                                    ? "bg-black text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                {name} ({count})
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Popular Tags */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2 font-['system-ui',sans-serif]">
                            Popular Tags
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {tags.slice(0, 6).map(({ name, count }) => (
                              <button
                                key={name}
                                onClick={() => handleFilterSelect(name)}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-colors font-['system-ui',sans-serif] ${
                                  filter === name
                                    ? "bg-black text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                <FiTag className="w-3 h-3" />
                                {name}
                                <span className="opacity-75">({count})</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-4 border-t border-gray-200">
                          <button
                            onClick={() => {
                              setFilter("all");
                              setSearchQuery("");
                              setSortBy("date");
                              setSortOrder("desc");
                              setIsFilterOpen(false);
                            }}
                            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium font-['system-ui',sans-serif]"
                          >
                            Reset All
                          </button>
                          <button
                            onClick={() => setIsFilterOpen(false)}
                            className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium font-['system-ui',sans-serif]"
                          >
                            Apply Filters
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Results Info */}
          <div className="mb-8 px-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 font-['system-ui',sans-serif]">
                  {filteredProjects.length}{" "}
                  {filteredProjects.length === 1 ? "Project" : "Projects"} Found
                </h2>
                {(filter !== "all" || searchQuery) && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-600 font-['system-ui',sans-serif]">
                      Active filters:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {filter !== "all" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-black text-white text-xs rounded-full font-['system-ui',sans-serif]">
                          Category: {filter}
                          <button
                            onClick={() => setFilter("all")}
                            className="ml-1 hover:opacity-75"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {searchQuery && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-['system-ui',sans-serif]">
                          Search: "{searchQuery}"
                          <button
                            onClick={() => setSearchQuery("")}
                            className="ml-1 hover:opacity-75"
                          >
                            ×
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewMode}-${filter}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={
                viewMode === "list"
                  ? "space-y-6"
                  : viewMode === "masonry"
                  ? "columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
                  : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              }
            >
              {filteredProjects.map((project: ProjectWithRating, index) => {
                const projectRating = project.rating || 4.8;
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={
                      viewMode === "masonry"
                        ? "break-inside-avoid mb-6"
                        : "h-full"
                    }
                  >
                    <Link href={`/projects/${project.id}`}>
                      <div
                        className={`
                      group relative overflow-hidden rounded-2xl bg-white border border-gray-200 
                      hover:border-gray-300 transition-all duration-500 hover:shadow-xl h-full
                      flex flex-col
                      ${viewMode === "list" ? "md:flex-row" : ""}
                    `}
                      >
                        {/* Image Container */}
                        <div
                          className={`
                        relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200
                        ${
                          viewMode === "list"
                            ? "md:w-64 md:flex-shrink-0 aspect-square md:aspect-auto"
                            : "aspect-[4/3]"
                        }
                      `}
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes={
                              viewMode === "list"
                                ? "256px"
                                : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            }
                          />

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          {/* Badges */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-black text-xs font-medium rounded-full shadow-sm font-['system-ui',sans-serif]">
                              {project.category}
                            </span>
                            <span className="px-3 py-1.5 bg-black/95 backdrop-blur-sm text-white text-xs font-medium rounded-full shadow-sm font-['system-ui',sans-serif]">
                              {project.date}
                            </span>
                          </div>

                          {/* Quick Action Buttons */}
                          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <button
                              className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200 shadow-sm"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // Add to favorites logic
                              }}
                            >
                              <FiHeart className="w-4 h-4 text-gray-700" />
                            </button>
                            <button
                              className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200 shadow-sm"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // Share logic
                              }}
                            >
                              <FiShare2 className="w-4 h-4 text-gray-700" />
                            </button>
                          </div>

                          {/* View Button */}
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white text-black font-medium rounded-full shadow-lg font-['system-ui',sans-serif]">
                              <FiEye className="w-4 h-4" />
                              View Details
                            </div>
                          </div>

                          {/* Progress Indicator (for project completion status) */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                              style={{
                                width: `${Math.min(100, Math.random() * 30 + 70)}%`,
                              }}
                            />
                          </div>
                        </div>

                        {/* Content */}
                        <div
                          className={`flex-1 flex flex-col ${
                            viewMode === "list" ? "p-6" : "p-5"
                          }`}
                        >
                          {/* Header with title and rating */}
                          <div className="mb-4">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-bold text-gray-900 line-clamp-1 font-['system-ui',sans-serif] group-hover:text-black transition-colors duration-300">
                                  {project.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <FiStar
                                        key={i}
                                        className={`w-3 h-3 ${
                                          i < Math.floor(projectRating)
                                            ? "text-yellow-500 fill-yellow-500"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-500 font-['system-ui',sans-serif]">
                                    {projectRating.toFixed(1)}
                                  </span>
                                </div>
                              </div>
                              <button
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 flex-shrink-0"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  // Bookmark logic
                                }}
                              >
                                <FiBookmark className="w-5 h-5" />
                              </button>
                            </div>
                            <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed font-['system-ui',sans-serif]">
                              {project.description}
                            </p>
                          </div>

                          {/* Tags */}
                          <div className="mb-5">
                            <div className="flex flex-wrap gap-2">
                              {project.tags.slice(0, 4).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 text-gray-700
                                 text-xs rounded-full border border-gray-200 hover:border-gray-300
                                  hover:bg-gray-100 transition-colors duration-200 font-['system-ui',sans-serif]"
                                >
                                  <FiTag className="w-3 h-3 opacity-70" />
                                  {tag}
                                </span>
                              ))}
                              {project.tags.length > 4 && (
                                <span className="px-2.5 py-1 text-gray-400 text-xs font-['system-ui',sans-serif]">
                                  +{project.tags.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Project Details Grid */}
                          <div className="mt-auto w-full border-t border-gray-200 pt-4">
                            <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                              {/* Materials */}
                              <div className="flex items-center gap-3 w-full">
                                <div className="p-2.5 bg-blue-50 rounded-xl shrink-0">
                                  <FiBox className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-xs text-gray-500 font-medium">
                                    Materials
                                  </p>
                                  <p className="text-sm font-semibold text-gray-900">
                                    {project.materials.length} Types
                                  </p>
                                </div>
                              </div>

                              {/* Dimensions */}
                              <div className="flex items-center gap-3 w-full">
                                <div className="p-2.5 bg-green-50 rounded-xl shrink-0">
                                  <FaPencilRuler className="w-4 h-4 text-green-600" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-xs text-gray-500 font-medium">
                                    Dimensions
                                  </p>
                                  <p className="text-sm font-semibold text-gray-900">
                                    {project.dimensions}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                            <div className="text-sm text-gray-500 font-['system-ui',sans-serif]">
                              <span className="text-gray-900 font-medium">
                                Client:
                              </span>{" "}
                              {project.client || "Private"}
                            </div>
                            <div
                              className={`text-xs font-medium px-2.5 py-1 rounded-full font-['system-ui',sans-serif] ${
                                (project.status || "Completed") === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : (project.status || "In Progress") ===
                                    "In Progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {project.status || "Completed"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 px-4"
            >
              <div className="w-24 h-24 mx-auto mb-8 flex items-center justify-center bg-gray-100 rounded-2xl">
                <FiSearch className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-['system-ui',sans-serif]">
                No Projects Found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8 font-['system-ui',sans-serif]">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
              <button
                onClick={() => {
                  setFilter("all");
                  setSearchQuery("");
                }}
                className="px-8 py-3 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-colors duration-300 font-['system-ui',sans-serif]"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}