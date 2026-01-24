// app/projects/subcategory-products/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getSubCategoryById } from "@/utils/PORTFOLIO";
import Image from "next/image";

export default function SubCategoryImagesPage() {
  const params = useParams();
  const subCategoryId = params.id as string;

  const [subCategory, setSubCategory] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const subCat = getSubCategoryById(subCategoryId);
    setSubCategory(subCat);
  }, [subCategoryId]);

  if (!mounted) return null;

  if (!subCategory) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Subcategory not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 mt-6 font-['system-ui',sans-serif]">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2 py-6 uppercase">
          {subCategory.name}
        </h1>
        <p className="text-gray-600 text-lg">{subCategory.description}</p>
      </div>

      {/* All Images Grid */}
      <section className="pb-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Images Grid - Simple and Clean */}
          <div className="grid grid-cols-3 gap-6">
            {subCategory.images.map((image: string, index: number) => (
              <div
                key={index}
                className="relative h-[220px] md:h-[320px] lg:h-[420px] overflow-hidden group"
              >
                <Image
                  src={image}
                  alt={`${subCategory.name} - Image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
