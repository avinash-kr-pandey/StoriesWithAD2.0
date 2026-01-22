// app/products/ProductReviews.tsx
"use client";

import React, { useState } from "react";
import { Star, StarOff, X } from "lucide-react";
import { allProducts } from "@/utils/products";
import Image from "next/image";

interface ProductReviewsProps {
  productId: number;
}

interface ReviewForm {
  name: string;
  email: string;
  rating: number;
  comment: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  // ✅ HOOKS MUST BE CALLED AT THE TOP LEVEL - NO CONDITIONAL RETURNS BEFORE HOOKS
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState<ReviewForm>({
    name: "",
    email: "",
    rating: 0,
    comment: "",
  });

  // Find product after hooks
  const product = allProducts.find((p) => p.id === productId);

  // ✅ MOVED THE CONDITIONAL RETURN AFTER ALL HOOKS
  if (!product) {
    return (
      <section className="bg-[#C4F9FF] py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600">
            Cannot load reviews for product ID: {productId}
          </p>
        </div>
      </section>
    );
  }

  // Use actual reviewsList from product data
  const reviews = product.reviewsList || [];
  const reviewsCount = product.reviews || 0;

  const handleStarClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleStarHover = (rating: number) => {
    setHoverRating(rating);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create new review object
    const newReview = {
      ...formData,
      date: new Date().toISOString().split("T")[0],
      avatar: "https://i.pravatar.cc/100?img=5",
    };

    // In a real app, you would send this to your backend
    console.log("Review submitted:", newReview);

    // Reset form and close modal
    setFormData({
      name: "",
      email: "",
      rating: 0,
      comment: "",
    });
    setShowReviewModal(false);

    // Success message
    alert(
      "Thank you for your review! It will be published after verification."
    );
  };

  const isFormValid =
    formData.name && formData.email && formData.rating > 0 && formData.comment;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span key={index}>
        {index < rating ? (
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
        ) : (
          <StarOff className="w-5 h-5 text-gray-300" />
        )}
      </span>
    ));
  };

  return (
    <>
      <section
        className=" py-12 px-4"
        style={{
          fontFamily: "system-ui, sans-serif",
          letterSpacing: "0.08em",
          lineHeight: "1.6",
          fontWeight: 300,
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              Customer <span className="text-pink-500">Reviews</span>
            </h2>
            <p className="text-gray-500 mt-2">
              See what our happy customers are saying about this product ✨
            </p>
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="flex items-center gap-1">
                {renderStars(Math.floor(product.rating))}
              </div>
              <span
                className="text-lg font-semibold text-gray-700"
                style={{
                  fontFamily: "system-ui, sans-serif",
                  letterSpacing: "0.08em",
                  lineHeight: "1.6",
                  fontWeight: 500,
                }}
              >
                {product.rating}/5
              </span>
              <span
                className="text-gray-500"
                style={{
                  fontFamily: "system-ui, sans-serif",
                  letterSpacing: "0.08em",
                  lineHeight: "1.6",
                  fontWeight: 500,
                }}
              >
                •
              </span>
              <span
                className="text-gray-600"
                style={{
                  fontFamily: "system-ui, sans-serif",
                  letterSpacing: "0.08em",
                  lineHeight: "1.6",
                  fontWeight: 500,
                }}
              >
                {reviewsCount} {reviewsCount === 1 ? "Review" : "Reviews"}
              </span>
            </div>
          </div>

          {/* Reviews - Using actual reviewsList from product data */}
          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white/70 backdrop-blur-lg border border-pink-100 rounded-2xl shadow-md p-8 max-w-md mx-auto">
                <StarOff className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  No Reviews Yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Be the first to share your experience with this product!
                </p>
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  Write First Review
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-lg border border-pink-100 rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Top Section */}
                  <div className="flex items-center mb-4">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {review.name}
                      </p>
                      <p className="text-sm text-gray-400">{review.date}</p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center mb-3">
                    {renderStars(review.rating)}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}

         
        </div>
      </section>

    </>
  );
}
