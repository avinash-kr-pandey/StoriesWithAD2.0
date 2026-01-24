"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { FunnelIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { products, Product } from "@/utils/products";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type SortType = "featured" | "az" | "za" | "new" | "old";

const sortOptions: [SortType, string][] = [
  ["featured", "Featured"],
  ["az", "Alphabetically, A–Z"],
  ["za", "Alphabetically, Z–A"],
  ["new", "Price: Low to High"],
  ["old", "Price: High to Low"],
];

const ITEMS_PER_PAGE = 9;

const ShopHeader = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortType>("featured");
  const [currentPage, setCurrentPage] = useState(1);

  const sortRef = useRef<HTMLDivElement>(null);
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  /* ---------- OUTSIDE CLICK (SORT) ---------- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------- SORT LOGIC ---------- */
  const sortedProducts = useMemo(() => {
    const data: Product[] = [...products];

    switch (sortBy) {
      case "az":
        return data.sort((a, b) => a.name.localeCompare(b.name));
      case "za":
        return data.sort((a, b) => b.name.localeCompare(a.name));
      case "new":
        return data.sort((a, b) => a.price - b.price);
      case "old":
        return data.sort((a, b) => b.price - a.price);
      default:
        // Featured: show new or bestsellers first
        return data.sort(
          (a, b) => Number(b.isBestSeller) - Number(a.isBestSeller),
        );
    }
  }, [sortBy]);

  /* ---------- PAGINATION ---------- */
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy]);

  return (
    <div className="w-full min-h-screen pt-32 mt-12">
      {/* ================= HEADER ================= */}
      <div className="sticky top-0 z-40 bg-[#eae1d1] flex items-center justify-between h-16 px-6 lg:px-12 border-y border-gray-800">
        {/* FILTER TOGGLE */}
        <button
          onClick={() => setIsFilterOpen((p) => !p)}
          className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium h-full pr-6 border-r border-gray-800"
        >
          <FunnelIcon className="w-4 h-4" />
          {isFilterOpen ? "Hide Filters" : "Show Filters"}
        </button>

        {/* SORT */}
        <div ref={sortRef} className="relative h-full">
          <button
            onClick={() => setIsSortOpen((p) => !p)}
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium h-full pl-6 border-l border-gray-800"
          >
            Sort By
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform ${isSortOpen ? "rotate-180" : ""}`}
            />
          </button>


          {/* SORT DROPDOWN */}
          <AnimatePresence>
            {isSortOpen && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-800 z-50"
              >
                {sortOptions.map(([key, label]) => (
                  <p
                    key={key}
                    onClick={() => {
                      setSortBy(key);
                      setIsSortOpen(false);
                    }}
                    className="px-4 py-3 text-sm cursor-pointer hover:bg-black/5"
                  >
                    {label}
                  </p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <section className="flex px-6 pt-12">
        {/* FILTER SIDEBAR */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="sticky top-16 h-[calc(100vh-4rem)] border-r border-gray-800 overflow-y-auto"
            >
              <div className="px-6">
                {[
                  {
                    title: "Availability",
                    options: ["In Stock", "Out of Stock"],
                  },
                  {
                    title: "Category",
                    options: [
                      "Living",
                      "Bedroom",
                      "Dining",
                      "Office",
                      "Outdoor",
                    ],
                  },
                  { title: "Price", options: ["Low to High", "High to Low"] },
                ].map((filter) => {
                  const isOpen = openFilter === filter.title;

                  return (
                    <div
                      key={filter.title}
                      className="border-b border-gray-800"
                    >
                      <button
                        onClick={() =>
                          setOpenFilter(isOpen ? null : filter.title)
                        }
                        className="w-full flex justify-between items-center py-4 text-left uppercase text-xs"
                      >
                        <span>{filter.title}</span>
                        <span className="text-lg leading-none">
                          {isOpen ? "–" : "+"}
                        </span>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pb-4 pl-2">
                              {filter.options.map((opt) => (
                                <label
                                  key={opt}
                                  className="flex items-center gap-2 py-1 text-[11px] uppercase cursor-pointer hover:opacity-70"
                                >
                                  <input
                                    type="checkbox"
                                    className="accent-black"
                                  />
                                  {opt}
                                </label>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* GRID */}
        <motion.div layout className="flex-1 pl-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {paginatedProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="group">
                  <div className="relative aspect-[4/4] mb-5 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                  <p className="text-sm uppercase tracking-wide text-center min-h-[48px] flex items-center justify-center">
                    {product.name}
                  </p>
                  <p className="text-md text-center flex items-center justify-center">
                    ₹{product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center mt-16 gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 text-sm border border-gray-800 transition ${
                    currentPage === page
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ShopHeader;
