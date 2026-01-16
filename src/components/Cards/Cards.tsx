"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import GlobalButton from "../utils/GlobalButton";

const containerVariants: Variants = {
  hidden: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // ✅ Type-safe easeOut
    },
  },
};

const Cards = () => {
  const cards = [
    {
      id: 1,
      title: "SHOP",
      description:
        "Shop our highly coveted collection of mid-century furniture and contemporary art.",
      btnText: "SHOP",
      btnLink: "#",
      img: "/PICTURES/shop/img-1.jpg",
    },
    {
      id: 2,
      title: "SERVICES",
      description:
        "We would love to curate your residential or commercial space. View our services here.",
      btnText: "VIEW",
      btnLink: "#",
      img: "/PICTURES/shop/img-2.jpg",
    },
    {
      id: 3,
      title: "PORTFOLIO",
      description:
        "Explore Kerrie-Ann's portfolio of evocative & elevated interiors. View our portfolio here.",
      btnText: "EXPLORE",
      btnLink: "#",
      img: "/PICTURES/shop/img-3.jpg",
    },
  ];

  return (
    <section className="bg-[#c6a67a] md:py-12 py-4 md:px-8 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto"
      >
        {cards.map((card) => (
          <motion.div
            key={card.id}
            variants={cardVariants}
            className="flex flex-col"
          >
            {/* Image */}
            <div className="w-full h-[500px] relative overflow-hidden">
              <Image
                src={card.img}
                alt={card.title}
                fill
                className="object-full transition-transform duration-300 hover:scale-105 "
              />
            </div>

            {/* Content */}
            <div className="md:mt-4 mt-2 md:ml-0 ml-0">
              <h2 className="text-3xl tracking-wide text-gray-900 !font-light">
                {card.title}
              </h2>
              <p
                className="mt-2 text-md text-gray-900 leading-relaxed font-thin "
                style={{
                  letterSpacing: "0.04em",
                  lineHeight: "1.6",
                  fontFamily: "system-ui, sans-serif",
                  fontWeight: 400,
                }}
              >
                {card.description}
              </p>

              <GlobalButton
                text={`${card.btnText} →`}
                className="mt-4 px-6 py-1 border border-black text-black h-[48px]"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Cards;
