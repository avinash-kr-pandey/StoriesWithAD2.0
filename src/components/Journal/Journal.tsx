"use client";
import React from "react";
import Image from "next/image";
import images from "@/utils/images";

const Journal = () => {
  const posts = [
    {
      title: "The Art of Minimalism",
      date: "March 15, 2024",
      excerpt:
        "Exploring how minimalism transforms spaces and minds through clean lines and intentional design choices that create harmony and clarity.",
      category: "Design Philosophy",
      image: images.gallery.art[0], // _DEV0866.jpg
      readTime: "5 min read",
    },
    {
      title: "Color Psychology in Interiors",
      date: "February 28, 2024",
      excerpt:
        "Understanding how colors influence mood, perception, and behavior in interior spaces to create desired emotional responses.",
      category: "Design Psychology",
      image: images.gallery.art[1], // _DEV0884.jpg
      readTime: "7 min read",
    },
    {
      title: "Sustainable Materials Revolution",
      date: "January 12, 2024",
      excerpt:
        "Embracing eco-friendly choices and sustainable practices that are shaping the future of modern design solutions worldwide.",
      category: "Sustainability",
      image: images.gallery.art[2], // _DEV0914.jpg
      readTime: "6 min read",
    },
    {
      title: "Lighting Design Principles",
      date: "December 5, 2023",
      excerpt:
        "Mastering the art of lighting to create ambiance, enhance spatial experiences, and transform ordinary spaces into extraordinary ones.",
      category: "Technical Design",
      image: images.gallery.lighting[0], // _DEV0938.jpg
      readTime: "8 min read",
    },
    {
      title: "The Power of Negative Space",
      date: "November 18, 2023",
      excerpt:
        "How empty spaces can speak volumes and create powerful visual impact in interior design compositions.",
      category: "Design Theory",
      image: images.gallery.art[3], // _DEV0932.jpg
      readTime: "4 min read",
    },
    {
      title: "Textural Harmony",
      date: "October 30, 2023",
      excerpt:
        "Creating depth and interest through the strategic layering of different materials and surfaces in design.",
      category: "Material Design",
      image: images.gallery.objects[0], // _DEV1381.jpg
      readTime: "5 min read",
    },
  ];

  // Featured journal images gallery
  const featuredGallery = [
    images.additional[0], // _DEV1524.jpg
    images.additional[1], // _DEV1536.jpg
    images.additional[2], // _DEV1539.jpg
    images.additional[3], // _DEV1540.jpg
    images.additional[4], // _DEV1541.jpg
    images.additional[5], // _DEV1542.jpg
    images.additional[6], // _DEV1543.jpg
    images.additional[7], // _DEV1549.jpg
  ];

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

  return (
    <div className="min-h-screen pt-42 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* MAIN HEADER */}
        <div className="text-left mb-16">
          <h1 className="text-4xl font-light mb-6 tracking-tight">
            Design Journal
          </h1>
          <p className="text-xl text-gray-600  mx-auto leading-relaxed">
            Curated thoughts, deep insights, and inspiring stories from the
            ever-evolving world of design, <br/> creativity, and spatial experiences.
          </p>
        </div>

        {/* FEATURED BANNER */}
        <div className="mb-20">
          <div className="aspect-[18/7] relative overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src={images.featured.curated} // CURATED.jpg
              alt="Design Journal Featured"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60 flex items-end p-12">
              <div className="text-white">
                <span className="text-sm font-medium tracking-wider mb-3 block">
                  FEATURED STORY
                </span>
                <h2 className="text-3xl font-light mb-4">
                  The Evolution of Modern Design
                </h2>
                <p className="text-gray-200 text-lg max-w-2xl">
                  Tracing the journey of design from functional necessity to
                  artistic expression and its impact on contemporary living
                  spaces.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* JOURNAL POSTS GRID */}
        <div className="mb-20">
          <h2 className="text-2xl font-light mb-10 text-center tracking-wide">
            LATEST ARTICLES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article
                key={index}
                className="group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* POST OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-medium text-white bg-white/20 px-2 py-1 rounded">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-300">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-white text-lg font-medium mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 text-sm line-clamp-2 mb-2">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">{post.date}</span>
                      <button className="text-white text-sm font-medium hover:underline">
                        Read More →
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* FEATURED GALLERY */}
        <div className="mb-20">
          <h2 className="text-2xl font-light mb-10 text-center tracking-wide">
            VISUAL INSPIRATION
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredGallery.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                  <Image
                    src={src}
                    alt={`Journal inspiration ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* GALLERY OVERLAY */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      View
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* JOURNAL CATEGORIES */}
        <div className="mb-20">
          <h2 className="text-2xl font-light mb-10 text-center tracking-wide">
            EXPLORE CATEGORIES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {journalCategories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-[3/4] relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-4">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* CATEGORY OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                    <h3 className="text-white text-lg font-medium mb-1">
                      {category.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-2">
                      {category.description}
                    </p>
                    <span className="text-xs text-gray-400">
                      {category.count}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NEWSLETTER SECTION */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 text-center">
          <h2 className="text-2xl font-light mb-4">Stay Inspired</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
            Get the latest articles, insights, and visual inspiration delivered
            to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-black transition-colors"
            />
            <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Join 5,000+ designers and creatives
          </p>
        </div>
      </div>
    </div>
  );
};

export default Journal;
