"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

const BlogHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  const furniturePosts = [
    {
      id: 1,
      title: "Modern Minimalist Living Room Designs",
      excerpt:
        "Discover how to create serene and functional living spaces with minimalist furniture that combines style and comfort.",
      date: "March 15, 2024",
      readTime: "6 min read",
      category: "Living Room",
      image: "/PICTURES/_DEV0866.jpg",
    },
    {
      id: 2,
      title: "The Art of Scandinavian Furniture",
      excerpt:
        "Explore the principles of Scandinavian design that emphasize simplicity, functionality, and connection to nature.",
      date: "March 12, 2024",
      readTime: "8 min read",
      category: "Design Style",
      image: "/PICTURES/_DEV1542.jpg",
    },
    {
      id: 3,
      title: "Sustainable Wood Furniture Trends",
      excerpt:
        "Learn about eco-friendly furniture choices and how sustainable materials are shaping modern interior design.",
      date: "March 10, 2024",
      readTime: "5 min read",
      category: "Sustainability",
      image: "/PICTURES/_DEV1486.jpg",
    },
    {
      id: 4,
      title: "Space-Saving Solutions for Small Apartments",
      excerpt:
        "Creative furniture ideas and multi-functional pieces that maximize space without compromising on style.",
      date: "March 8, 2024",
      readTime: "7 min read",
      category: "Small Spaces",
      image: "/PICTURES/_DEV1536.jpg",
    },
    {
      id: 5,
      title: "Luxury Bedroom Furniture Collections",
      excerpt:
        "Curated selection of premium bedroom furniture that transforms your sleeping space into a luxury retreat.",
      date: "March 5, 2024",
      readTime: "6 min read",
      category: "Bedroom",
      image: "/PICTURES/_DEV1549_1.jpg",
    },
    {
      id: 6,
      title: "Industrial Chic: Raw & Refined",
      excerpt:
        "How to incorporate industrial elements with refined furniture pieces for a balanced urban aesthetic.",
      date: "March 3, 2024",
      readTime: "5 min read",
      category: "Industrial",
      image: "/PICTURES/_DEV1541.jpg",
    },
    {
      id: 7,
      title: "Dining Room Elegance",
      excerpt:
        "Creating memorable dining experiences with carefully selected tables, chairs, and storage solutions.",
      date: "March 1, 2024",
      readTime: "4 min read",
      category: "Dining Room",
      image: "/PICTURES/_DEV1505.jpg",
    },
    {
      id: 8,
      title: "Outdoor Furniture for Modern Living",
      excerpt:
        "Extend your living space outdoors with durable and stylish furniture designed for comfort and longevity.",
      date: "February 28, 2024",
      readTime: "5 min read",
      category: "Outdoor",
      image: "/PICTURES/_DEV1511.jpg",
    },
    {
      id: 9,
      title: "Custom Furniture: Worth the Investment?",
      excerpt:
        "Understanding the benefits and considerations of investing in custom-made furniture pieces.",
      date: "February 25, 2024",
      readTime: "7 min read",
      category: "Custom",
      image: "/PICTURES/_DEV1524.jpg",
    },
  ];

  const featuredPost = furniturePosts[0];
  const trendingPosts = furniturePosts.slice(1, 4);
  const recentPosts = furniturePosts.slice(4);

  return (
    <div className="min-h-screen pt-16 font-simple">
      {/* Hero Section */}
      <section
        ref={headerRef}
        className={`pt-20 pb-16 px-4 transition-all duration-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Furniture{" "}
              <span className="border-b-4 border-gray-800">Inspiration</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover the latest trends, design tips, and expert insights for
              creating beautiful living spaces.
            </p>
          </div>

          {/* Featured Post */}
          <div
            className={`mb-20 transition-all duration-700 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="bg-gray-50 rounded-2xl overflow-hidden  transition-all duration-500 cursor-pointer border border-gray-200">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover transition-transform duration-700 hover:scale-105"
                    width={600}
                    height={400}
                    priority
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <span className="inline-block px-3 py-1 bg-gray-800 text-white text-sm rounded-full mb-4">
                    Featured
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 hover:text-gray-700 transition-colors duration-300">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-gray-500">
                      <span>{featuredPost.date}</span>
                      <span>•</span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <button className="px-6 py-2 border-2 border-gray-800 text-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-105">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trending Now Section */}
          <div
            className={`mb-16 transition-all duration-700 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-3xl font-bold mb-8 text-center border-b border-gray-200 pb-4">
              Trending Now
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {trendingPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-500 cursor-pointer group ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      width={400}
                      height={192}
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full mb-4 group-hover:bg-gray-800 group-hover:text-white transition-all duration-300">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-gray-500 text-sm">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Articles Grid */}
          <div
            className={`mb-16 transition-all duration-700 delay-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-3xl font-bold mb-8 text-center border-b border-gray-200 pb-4">
              Recent Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-500 cursor-pointer group ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 150 + 600}ms` }}
                >
                  <div className="h-56 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      width={400}
                      height={224}
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full mb-4 group-hover:bg-gray-800 group-hover:text-white transition-all duration-300">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-gray-500 text-sm">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button className="text-gray-800 hover:text-gray-600 transition-colors duration-300 flex items-center group">
                        Read Article
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Design Philosophy Section */}
          <div
            className={`mb-16 transition-all duration-700 delay-900 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Image
                    src="/PICTURES/_DEV0854.jpg"
                    alt="Curated Furniture Collection"
                    className="w-full h-74 object-cover  transition-transform duration-700 hover:scale-105"
                    width={600}
                    height={256}
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    Our Design Philosophy
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    We believe that great furniture should not only be beautiful
                    but also functional, sustainable, and timeless. Each piece
                    in our collection is carefully curated to enhance your
                    living experience.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                      <div className="text-2xl font-bold text-gray-800 mb-2">
                        500+
                      </div>
                      <div className="text-gray-600">Designs</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                      <div className="text-2xl font-bold text-gray-800 mb-2">
                        50+
                      </div>
                      <div className="text-gray-600">Designers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div
            className={`transition-all duration-700 delay-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200 text-center">
              <h3 className="text-3xl font-bold mb-4">Stay Inspired</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
                Get weekly furniture design inspiration, expert tips, and
                exclusive content delivered directly to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 transition-colors duration-300"
                />
                <button className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 font-semibold">
                  Subscribe
                </button>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                No spam, unsubscribe at any time
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BlogHeader;
