"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import images from "@/utils/images";

const Blog = () => {
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

  const blogPosts = [
    {
      id: 1,
      title: "Modern Minimalist Living Room Designs",
      excerpt: "Discover how to create serene and functional living spaces with minimalist furniture that combines style and comfort.",
      date: "March 15, 2024",
      readTime: "6 min read",
      category: "Living Room",
      image: images.featured.spotlight[0] || "/PICTURES/_DEV0866.jpg",
    },
    {
      id: 2,
      title: "The Art of Scandinavian Furniture",
      excerpt: "Explore the principles of Scandinavian design that emphasize simplicity, functionality, and connection to nature.",
      date: "March 12, 2024",
      readTime: "8 min read",
      category: "Design Style",
      image: images.featured.spotlight[1] || "/PICTURES/_DEV1542.jpg",
    },
    {
      id: 3,
      title: "Sustainable Wood Furniture Trends",
      excerpt: "Learn about eco-friendly furniture choices and how sustainable materials are shaping modern interior design.",
      date: "March 10, 2024",
      readTime: "5 min read",
      category: "Sustainability",
      image: images.portfolio.photography[0] || "/PICTURES/_DEV1486.jpg",
    },
    {
      id: 4,
      title: "Space-Saving Solutions for Small Apartments",
      excerpt: "Creative furniture ideas and multi-functional pieces that maximize space without compromising on style.",
      date: "March 8, 2024",
      readTime: "7 min read",
      category: "Small Spaces",
      image: images.featured.spotlight[2] || "/PICTURES/_DEV1536.jpg",
    },
    {
      id: 5,
      title: "Luxury Bedroom Furniture Collections",
      excerpt: "Curated selection of premium bedroom furniture that transforms your sleeping space into a luxury retreat.",
      date: "March 5, 2024",
      readTime: "6 min read",
      category: "Bedroom",
      image: images.gallery.bespoke[0] || "/PICTURES/_DEV1549_1.jpg",
    },
    {
      id: 6,
      title: "Industrial Chic: Raw & Refined",
      excerpt: "How to incorporate industrial elements with refined furniture pieces for a balanced urban aesthetic.",
      date: "March 3, 2024",
      readTime: "5 min read",
      category: "Industrial",
      image: images.gallery.bespoke[1] || "/PICTURES/_DEV1541.jpg",
    },
    {
      id: 7,
      title: "Dining Room Elegance",
      excerpt: "Creating memorable dining experiences with carefully selected tables, chairs, and storage solutions.",
      date: "March 1, 2024",
      readTime: "4 min read",
      category: "Dining Room",
      image: images.gallery.bespoke[2] || "/PICTURES/_DEV1505.jpg",
    },
    {
      id: 8,
      title: "Outdoor Furniture for Modern Living",
      excerpt: "Extend your living space outdoors with durable and stylish furniture designed for comfort and longevity.",
      date: "February 28, 2024",
      readTime: "5 min read",
      category: "Outdoor",
      image: images.gallery.bespoke[3] || "/PICTURES/_DEV1511.jpg",
    },
    {
      id: 9,
      title: "Custom Furniture: Worth the Investment?",
      excerpt: "Understanding the benefits and considerations of investing in custom-made furniture pieces.",
      date: "February 25, 2024",
      readTime: "7 min read",
      category: "Custom",
      image: images.additional[0] || "/PICTURES/_DEV1524.jpg",
    },
  ];

  const categories = [
    { id: "all", name: "All Categories", count: 9 },
    { id: "Living Room", name: "Living Room", count: 1 },
    { id: "Design Style", name: "Design Style", count: 1 },
    { id: "Sustainability", name: "Sustainability", count: 1 },
    { id: "Small Spaces", name: "Small Spaces", count: 1 },
    { id: "Bedroom", name: "Bedroom", count: 1 },
    { id: "Industrial", name: "Industrial", count: 1 },
    { id: "Dining Room", name: "Dining Room", count: 1 },
    { id: "Outdoor", name: "Outdoor", count: 1 },
    { id: "Custom", name: "Custom", count: 1 },
  ];

  const featuredPost = blogPosts[0];
  const filteredPosts = selectedCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  // Section data with alternating layout
  const sections = [
    {
      title: "Furniture Design Philosophy & Inspiration",
      image: featuredPost.image,
      content: `At the heart of exceptional furniture design lies a deep understanding of form, function, and human experience. Our design philosophy embraces the harmonious balance between aesthetic beauty and practical utility, creating pieces that not only serve their purpose but enrich daily life. We believe furniture should tell stories—stories of craftsmanship, material integrity, and thoughtful design that evolves with you. From the initial sketch to final construction, every element is considered, from ergonomic proportions to sustainable material selection, ensuring each piece becomes a meaningful addition to your living space.`,
    },
    {
      title: "Sustainable Craftsmanship & Material Innovation",
      image: blogPosts[2].image,
      content: `The future of furniture design is inherently sustainable. We explore innovative materials and production methods that minimize environmental impact while maximizing longevity and beauty. Our approach combines traditional craftsmanship with modern technology, using FSC-certified woods, recycled metals, and non-toxic finishes. Each material is selected for its unique properties—durability, texture, grain pattern, and aging characteristics—creating furniture that develops character over time. This commitment to sustainability extends beyond materials to include ethical production practices, fair labor conditions, and designs that encourage repair and reuse rather than replacement.`,
    },
    {
      title: "Space Optimization & Functional Design Solutions",
      image: blogPosts[3].image,
      content: `In today's diverse living environments, furniture must adapt to varying spatial constraints while maintaining aesthetic coherence. Our design principles focus on intelligent space utilization through multi-functional pieces, modular systems, and proportional scaling. We explore how furniture can serve multiple purposes—a dining table that becomes a workspace, storage that doubles as room division, or seating that transforms for different social contexts. These solutions are particularly valuable in urban settings where square footage is precious, allowing for flexible living arrangements that don't compromise on style or comfort.`,
    },
    {
      title: "Timeless Design & Contemporary Trends",
      image: blogPosts[8].image,
      content: `While trends come and go, truly great furniture design transcends temporary fashions. We examine how contemporary trends integrate with timeless design principles to create pieces that feel both current and enduring. This involves studying historical design movements, understanding cultural shifts in living patterns, and anticipating future needs. Our exploration covers everything from minimalist Scandinavian aesthetics to bold industrial expressions, always with an eye toward creating furniture that will remain relevant and beautiful for decades. The result is collections that feel fresh yet familiar, innovative yet rooted in proven design wisdom.`,
    },
  ];

  return (
    <div className="min-h-screen pt-42">
      {/* Main title section */}
      <div className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-light mb-4 !system-ui uppercase py-8">
            Blog
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
                      sortOption === "popular" ? "Most Popular" : "Featured"}</span>
                <span className={`transform transition-transform ${sortOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {sortOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 min-w-[200px]">
                  <div className="p-4">
                    <div className="mb-2 text-sm font-medium !system-ui">Sort Options</div>
                    <div className="space-y-2">
                      {["featured", "newest", "oldest", "popular"].map((option) => (
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
                           option === "oldest" ? "Oldest First" : "Most Popular"}
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

      {/* Featured Post */}
      <div className="min-h-screen flex items-center justify-center py-8">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Image Section */}
            <div className="lg:w-1/2 w-full">
              <div className="aspect-[4/3] lg:aspect-square relative overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 px-4 py-2 bg-white text-gray-800 text-sm rounded-full !system-ui">
                  Featured
                </div>
              </div>
            </div>

            {/* Text Content Section */}
            <div className="lg:w-1/2 w-full">
              <div className="max-w-lg mx-auto lg:mx-0">
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-gray-100 text-gray-800 text-sm rounded-full !system-ui">
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-light mb-6 !system-ui pb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-800 text-md leading-relaxed !system-ui text-justify mb-8">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between text-gray-600 !system-ui mb-6">
                  <div className="flex items-center space-x-4">
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <button className="px-6 py-3 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 !system-ui">
                  Read Full Article
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Full-screen alternating sections */}
      {sections.slice(1).map((section, index) => (
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

      {/* Blog Posts Grid */}
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-light mb-4 !system-ui uppercase">
              Recent Articles
            </h2>
            <div className="w-20 h-px bg-gray-800"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <div
                key={post.id}
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
                  <div className="flex items-center justify-between text-gray-500 text-sm !system-ui">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Read More Button */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button className="text-gray-800 hover:text-gray-600 transition-colors duration-300 flex items-center group !system-ui text-sm">
                      Read Article
                      <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </button>
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

export default Blog;