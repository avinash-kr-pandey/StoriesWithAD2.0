// app/projects/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
// import { projects } from "@/utils/projectsData";
import { Product, products } from "@/utils/products";

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

  useEffect(() => {
    setMounted(true);
  }, []);

 const filteredProjects = useMemo(() => {
   let result = [...products];

   if (filter !== "all") {
     result = result.filter((product) => product.category === filter);
   }

   if (searchQuery) {
     const query = searchQuery.toLowerCase();
     result = result.filter(
       (product) =>
         product.name.toLowerCase().includes(query) ||
         product.description.toLowerCase().includes(query),
     );
   }

   return result;
 }, [filter, searchQuery]);


  if (!mounted) return null;

  return (
    <div className="min-h-screen pt-32 font-['system-ui',sans-serif]">
      {/* Hero Header - Simplified */}
      <section className="py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-8xl mx-auto">
          <div className="text-start mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-['system-ui',sans-serif]">
              PORTFOLIO
            </h1>
          </div>
        </div>
      </section>

      {/* Projects Grid - Simple Image + Title Only */}
      <section className="pb-16 px-4 md:px-6">
        <div className="max-w-8xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${filter}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((product: Product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <Link href={`/projects/${product.id}`}>
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[4/3.5] mb-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 6}
                      />
                    </div>

                    {/* Name */}
                    <h3 className="text-2xl font-medium text-gray-700 leading-relaxed text-start">
                      {product.name}
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
