"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const TextPart = () => {
  return (
    <section
      className="relative flex items-center justify-center px-6"
      style={{
        paddingTop: "var(--PT, 60px)",
        paddingBottom: "var(--PB, 60px)",
      }}
    >
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto text-center"
      >
        <p
          className="text-[1rem]  md:text-[2.1rem] font-normal leading-[2rem] md:leading-[3rem] text-[#1a1a1a] font-light tracking-[0.05em]"
          style={{ wordSpacing: "0.1em" }}
        >
          STORIES WITH AD{" "}
          <span className="italic font-normal lowercase">is</span>{" "}
          <span className="uppercase">A CREATIVE INTERIOR DESIGN STUDIO</span>{" "}
          <span className="italic font-normal lowercase">led by its</span>{" "}
          <span className="italic font-normal lowercase">
            founder and creative director,
          </span>{" "}
          AD. <span className="italic font-normal lowercase">the studio’s</span>{" "}
          SIGNATURE AESTHETIC{" "}
          <span className="italic font-normal lowercase">is defined by</span>{" "}
          SOULFUL SPACES{" "}
          <span className="italic font-normal lowercase">shaped by</span> STORY,
          CRAFT, AND INTENTION.
        </p>
      </motion.div>
    </section>
  );
};

export default TextPart;
