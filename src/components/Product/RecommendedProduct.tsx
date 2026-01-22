"use client";
import Image from "next/image";
import Link from "next/link";
import { products, Product } from "@/utils/products";
import { useEffect, useState } from "react";

export default function RecommendedProducts() {
  const [activeTab, setActiveTab] = useState<"related" | "recent">("related");
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("recentlyViewed");
    if (stored) {
      const ids: number[] = JSON.parse(stored);
      const data = products.filter((p) => ids.includes(p.id));
      setRecentlyViewed(data);
    }
  }, []);

  const list = activeTab === "related" ? products.slice(0, 4) : recentlyViewed;

  return (
    <section className="bg-[#f3eadc] py-16 px-6">
      {/* Tabs */}
      <div className="flex gap-10 mb-10 text-sm tracking-widest uppercase text-gray-700">
        <button
          onClick={() => setActiveTab("related")}
          className={`pb-1 ${
            activeTab === "related" ? "border-b border-gray-900" : "opacity-60"
          }`}
        >
          Related Products
        </button>

        <button
          onClick={() => setActiveTab("recent")}
          className={`pb-1 ${
            activeTab === "recent" ? "border-b border-gray-900" : "opacity-60"
          }`}
        >
          Recently Viewed
        </button>
      </div>

      {/* Content */}
      {activeTab === "recent" && list.length === 0 ? (
        <div className="h-64 flex items-center justify-center">
          <p className="text-sm tracking-widest uppercase text-gray-500">
            No Data
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {list.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div>
                <div className="relative w-full aspect-[4/5] bg-white">
                  <Image
                    src={
                      product.image.startsWith("/")
                        ? product.image
                        : `/${product.image}`
                    }
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-900 leading-snug">
                    {product.name}
                  </p>
                  <p className="mt-2 text-sm text-gray-700">
                    ${product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
