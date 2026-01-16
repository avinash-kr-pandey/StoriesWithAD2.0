"use client";
import { motion } from "framer-motion";
import React from "react";

interface FadeUpWrapperProps {
  children: React.ReactNode;
  delay?: number;
}

const FadeUpWrapper: React.FC<FadeUpWrapperProps> = ({
  children,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }} // 👈 Slide from left
      animate={{ opacity: 1, x: 0 }} // 👈 Move to normal position
      transition={{
        duration: 1.2, // slower for visible animation
        delay,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic ease
      }}
      style={{ overflow: "hidden" }} // prevents scrollbars during motion
    >
      {children}
    </motion.div>
  );
};

export default FadeUpWrapper;
