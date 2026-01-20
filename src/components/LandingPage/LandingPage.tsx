"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

const iframeVariants: Variants = {
  hidden: { opacity: 0, scale: 1.1 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const LandingPage = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <motion.iframe
        variants={iframeVariants}
        initial="hidden"
        animate="show"
        src="https://www.youtube.com/embed/C0aMBcP73iI?autoplay=1&mute=1&loop=1&controls=0&playlist=C0aMBcP73iI&modestbranding=1&rel=0"
        allow="autoplay; fullscreen"
        allowFullScreen
        frameBorder="0"
        className="
          absolute top-1/2 left-1/2
          w-[100vw] h-[100vh]
          min-w-[177.77vh]
          min-h-[56.25vw]
          -translate-x-1/2 -translate-y-1/2
          pointer-events-none
        "
      />

      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
};

export default LandingPage;
