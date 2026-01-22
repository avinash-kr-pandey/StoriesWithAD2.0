"use client";
import Image from "next/image";
import images from "@/utils/images";

const Blog = () => {
  const blogImages = [
    images.gallery.seating[0],
    images.gallery.tables[1],
    images.gallery.art[2],
    images.featured.curated,
  ];

  return (
    <div className="min-h-screen w-full pt-24">
      {/* Heading */}
      <div className="px-6 lg:px-16 pt-12">
        <h1 className="text-5xl font-light uppercase py-12 !system-ui">Blog</h1>
      </div>

      {/* Blog Intro Section */}
      <div className="px-6 lg:px-16 pt-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* LEFT : CONTENT */}
          <div className="lg:pl-12 ">
            <h2 className="text-2xl lg:text-4xl font-light leading-snug mb-10 !system-ui text-justify pb-12">
              JOURNALING STORIES, SPACES & CREATIVE INSPIRATION.
            </h2>

            <div className="space-y-6">
              <p className="text-md text-gray-700 font-thin leading-relaxed text-justify">
                The Stories With AD blog is a curated journal exploring
                interiors, styling, art, and design philosophy. It is a space
                where visual storytelling meets thoughtful reflection.
              </p>

              <p className="text-md text-gray-700 font-thin leading-relaxed text-justify">
                Through behind-the-scenes insights, project narratives, and
                personal musings, the blog offers a deeper look into the
                creative process that shapes evocative spaces and soulful
                interiors.
              </p>

              <p className="text-md text-gray-700 font-thin leading-relaxed text-justify">
                Each story highlights the harmony between form and function,
                celebrating craftsmanship, vintage finds, contemporary design,
                and the emotional connection to objects and spaces.
              </p>

              <p className="text-md text-gray-700 font-thin leading-relaxed text-justify">
                Readers are invited to explore inspiration sourced from travel,
                collaborations with artisans, editorial features, and the
                evolving design landscape.
              </p>

              <p className="text-md text-gray-700 font-thin leading-relaxed text-justify">
                This journal is an extension of the Stories With AD philosophy —
                slow design, intentional living, and spaces that feel deeply
                personal and timeless.
              </p>
            </div>
          </div>

          {/* RIGHT : IMAGE */}
          <div className="relative">
            <div className="relative aspect-[4/4] overflow-hidden shadow-xl">
              <Image
                src={blogImages[2]}
                alt="Blog Visual"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
