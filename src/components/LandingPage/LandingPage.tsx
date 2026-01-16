"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

const iframeVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1, // smooth fade in
      ease: [0.16, 1, 0.3, 1], // Type-safe easeOut
    },
  },
};

const LandingPage = () => {
  return (
    <div className="relative w-screen md:h-screen h-[35vh] overflow-hidden">
      <motion.iframe
        variants={iframeVariants}
        initial="hidden"
        animate="show"
        src="https://www.youtube.com/embed/C0aMBcP73iI?autoplay=1&mute=1&loop=1&controls=0&playlist=C0aMBcP73iI&modestbranding=1&rel=0"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
        className="
          absolute top-1/2 left-1/2
          w-[100vw] h-screen
          md:w-[120vw] md:h-[120vh]
          -translate-x-1/2 -translate-y-1/2
          pointer-events-none
        "
      />
    </div>
  );
};

export default LandingPage;
