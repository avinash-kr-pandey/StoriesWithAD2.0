"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { products, getAllSubCategories } from "@/utils/PORTFOLIO";

export default function ProjectDetailsPage() {
  const params = useParams();
  const productId = Number(params?.id);

  const [product, setProduct] = useState<any>(null);
  const [categorySubs, setCategorySubs] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (!productId) return;

    const foundProduct = products.find((p) => p.id === productId);
    setProduct(foundProduct);

    if (foundProduct) {
      const allSubs = getAllSubCategories();
      const subsForCategory = allSubs.filter(
        (sub) => sub.categoryId === foundProduct.category,
      );
      setCategorySubs(subsForCategory);
    }
  }, [productId]);

  if (!mounted) return null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Project not found
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 mt-6 font-['system-ui',sans-serif]">
      <section className="py-4 px-4 md:px-6 justify-center">
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2 py-6 uppercase">
            {product.name}
          </h1>
        </div>
      </section>

      <section className="py-8 md:py-12 px-4 md:px-6 max-w-8xl mx-auto">
        <p className="text-gray-600 text-lg pb-12">{product.description}</p>
        <div className="">
          {/* Subcategories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorySubs.map((subCategory, index) => (
              <motion.div
                key={subCategory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <Link href={`/projects/subcategory-products/${subCategory.id}`}>
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[4/3.5] mb-4">
                    <Image
                      src={subCategory.images?.[0]}
                      alt={subCategory.name}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="text-2xl font-medium text-gray-700 leading-relaxed uppercase group-hover:text-gray-900 transition-colors duration-300">
                    {subCategory.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
