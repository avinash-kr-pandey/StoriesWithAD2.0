"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import images from "@/utils/images";

const Journal = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  const posts = [
    {
      title: "The Art of Minimalism",
      date: "March 15, 2024",
      excerpt: "Exploring how minimalism transforms spaces and minds through clean lines and intentional design choices that create harmony and clarity.",
      category: "Design Philosophy",
      image: images.gallery.art[0], // _DEV0866.jpg
      readTime: "5 min read",
    },
    {
      title: "Color Psychology in Interiors",
      date: "February 28, 2024",
      excerpt: "Understanding how colors influence mood, perception, and behavior in interior spaces to create desired emotional responses.",
      category: "Design Psychology",
      image: images.gallery.art[1], // _DEV0884.jpg
      readTime: "7 min read",
    },
    {
      title: "Sustainable Materials Revolution",
      date: "January 12, 2024",
      excerpt: "Embracing eco-friendly choices and sustainable practices that are shaping the future of modern design solutions worldwide.",
      category: "Sustainability",
      image: images.gallery.art[2], // _DEV0914.jpg
      readTime: "6 min read",
    },
    {
      title: "Lighting Design Principles",
      date: "December 5, 2023",
      excerpt: "Mastering the art of lighting to create ambiance, enhance spatial experiences, and transform ordinary spaces into extraordinary ones.",
      category: "Technical Design",
      image: images.gallery.lighting[0], // _DEV0938.jpg
      readTime: "8 min read",
    },
    {
      title: "The Power of Negative Space",
      date: "November 18, 2023",
      excerpt: "How empty spaces can speak volumes and create powerful visual impact in interior design compositions.",
      category: "Design Theory",
      image: images.gallery.art[3], // _DEV0932.jpg
      readTime: "4 min read",
    },
    {
      title: "Textural Harmony",
      date: "October 30, 2023",
      excerpt: "Creating depth and interest through the strategic layering of different materials and surfaces in design.",
      category: "Material Design",
      image: images.gallery.objects[0], // _DEV1381.jpg
      readTime: "5 min read",
    },
  ];

  const categories = [
    { id: "all", name: "All Categories", count: 6 },
    { id: "Design Philosophy", name: "Design Philosophy", count: 1 },
    { id: "Design Psychology", name: "Design Psychology", count: 1 },
    { id: "Sustainability", name: "Sustainability", count: 1 },
    { id: "Technical Design", name: "Technical Design", count: 1 },
    { id: "Design Theory", name: "Design Theory", count: 1 },
    { id: "Material Design", name: "Material Design", count: 1 },
  ];

  const filteredPosts = selectedCategory === "all" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  // Journal categories with images
  const journalCategories = [
    {
      title: "Design Theory",
      description: "Exploring fundamental principles and concepts",
      image: images.gallery.seating[0], // _DEV0791.jpg
      count: "12 Articles",
    },
    {
      title: "Creative Process",
      description: "Behind the scenes of design creation",
      image: images.gallery.tables[0], // _DEV0836.jpg
      count: "8 Articles",
    },
    {
      title: "Industry Trends",
      description: "Emerging movements and future directions",
      image: images.gallery.objects[1], // _DEV1394.jpg
      count: "15 Articles",
    },
    {
      title: "Material Studies",
      description: "In-depth look at materials and textures",
      image: images.gallery.objects[2], // _DEV1404.jpg
      count: "10 Articles",
    },
  ];

  // Section data with alternating layout
  const sections = [
    {
      title: "Design Philosophy & Creative Exploration",
      image: posts[0].image,
      content: `Design is more than aesthetic arrangement—it's a language that communicates values, emotions, and possibilities. Our journal explores the deeper dimensions of design, examining how spatial compositions influence human experience, wellbeing, and perception. We believe that thoughtful design transcends trends, creating environments that resonate on both functional and emotional levels. Through careful study of proportion, materiality, light, and form, we uncover principles that transform ordinary spaces into meaningful places that inspire, comfort, and elevate daily life.`,
    },
    {
      title: "Sustainable Practices & Material Innovation",
      image: posts[2].image,
      content: `The intersection of sustainability and design represents one of the most significant evolutions in contemporary practice. We investigate how material choices, production methods, and lifecycle considerations are reshaping design ethics and outcomes. This exploration includes emerging biomaterials, circular design principles, and technologies that minimize environmental impact while maximizing aesthetic and functional value. Our focus extends beyond immediate visual appeal to consider long-term durability, repairability, and eventual renewal—creating designs that honor both present needs and future generations.`,
    },
    {
      title: "Spatial Psychology & Environmental Influence",
      image: posts[1].image,
      content: `Every environment communicates, influencing mood, behavior, and cognitive function. We examine the psychological dimensions of design, exploring how spatial arrangements, color palettes, lighting conditions, and material textures affect human experience. From biophilic design that connects us to natural patterns to acoustic considerations that support concentration or conversation, we analyze the measurable impacts of design decisions. This understanding enables creation of spaces that actively support wellbeing, productivity, creativity, and social connection through intentional environmental design.`,
    },
    {
      title: "Technical Mastery & Craft Evolution",
      image: posts[3].image,
      content: `True design excellence emerges from technical proficiency combined with creative vision. We document the evolving techniques, tools, and technologies shaping contemporary design practice. This includes everything from traditional craftsmanship preserved through generations to digital fabrication methods enabling new forms of expression. We explore how technical constraints become creative opportunities, how material properties suggest formal solutions, and how emerging technologies expand what's possible in spatial design. This technical foundation supports innovation while ensuring designs are both beautiful and buildable.`,
    },
  ];

  return (
    <div className="min-h-screen pt-42">
      {/* Main title section */}
      <div className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-light mb-4 !system-ui uppercase py-8">
            Journal
          </h1>

          {/* Filters and Sort Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            {/* Categories Filter */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="px-6 py-3 border border-gray-300 rounded-lg flex items-center gap-2 hover:border-gray-800 transition-colors duration-300 !system-ui"
              >
                <span>Filter by Category</span>
                <span className={`transform transition-transform ${filtersOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {filtersOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 min-w-[200px]">
                  <div className="p-4">
                    <div className="mb-2 text-sm font-medium !system-ui">Categories</div>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setFiltersOpen(false);
                          }}
                          className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors ${
                            selectedCategory === category.id ? "bg-gray-100 font-medium" : ""
                          }`}
                        >
                          {category.name} ({category.count})
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sort Options */}
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="px-6 py-3 border border-gray-300 rounded-lg flex items-center gap-2 hover:border-gray-800 transition-colors duration-300 !system-ui"
              >
                <span>Sort by: {sortOption === "newest" ? "Newest First" : 
                      sortOption === "oldest" ? "Oldest First" :
                      sortOption === "read-time" ? "Read Time" : "Featured"}</span>
                <span className={`transform transition-transform ${sortOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {sortOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 min-w-[200px]">
                  <div className="p-4">
                    <div className="mb-2 text-sm font-medium !system-ui">Sort Options</div>
                    <div className="space-y-2">
                      {["featured", "newest", "oldest", "read-time"].map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSortOption(option);
                            setSortOpen(false);
                          }}
                          className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors ${
                            sortOption === option ? "bg-gray-100 font-medium" : ""
                          }`}
                        >
                          {option === "featured" ? "Featured" : 
                           option === "newest" ? "Newest First" :
                           option === "oldest" ? "Oldest First" : "Read Time"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="text-gray-600 !system-ui">
              Showing {filteredPosts.length} articles
            </div>
          </div>
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

      {/* Featured Journal Categories */}
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-light mb-4 !system-ui uppercase">
              Explore Categories
            </h2>
            <div className="w-20 h-px bg-gray-800"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {journalCategories.map((category, index) => (
              <div
                key={index}
                className="group cursor-pointer"
              >
                {/* Category Image */}
                <div className="aspect-[3/4] relative overflow-hidden mb-6">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="text-white !system-ui">
                      <h3 className="text-lg font-light mb-2">{category.title}</h3>
                      <p className="text-gray-300 text-sm mb-2">{category.description}</p>
                      <span className="text-xs text-gray-400">{category.count}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Journal Posts Grid */}
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-light mb-4 !system-ui uppercase">
              Latest Articles
            </h2>
            <div className="w-20 h-px bg-gray-800"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <div
                key={index}
                className="group cursor-pointer"
              >
                {/* Post Image */}
                <div className="aspect-[4/3] relative overflow-hidden mb-6">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 px-4 py-2 bg-white text-gray-800 text-sm rounded-full !system-ui">
                    {post.category}
                  </div>
                </div>

                {/* Post Info */}
                <div>
                  <h3 className="text-xl font-light mb-3 !system-ui group-hover:text-gray-600 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed !system-ui line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  {/* Post Meta */}
                  <div className="flex items-center justify-between text-gray-500 text-sm !system-ui mb-6">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Read More Button */}
                  <button className="text-gray-800 border p-2 border-gray-800 hover:text-gray-600 transition-colors duration-300 flex items-center group !system-ui text-sm">
                    Read Article
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;