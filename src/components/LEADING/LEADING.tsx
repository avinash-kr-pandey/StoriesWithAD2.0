"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const LEADING = () => {
  return (
    <div className="py-12 min-h-[90vh] flex justify-center px-4 md:px-8">
      <div className="max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

        {/* Left Side (Image) */}
        <motion.div
          className="w-full h-[500px] md:h-[600px] flex items-center justify-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/PICTURES/shop/ABOUT.jpg"
            alt="AD - Interior Stylist"
            width={800}
            height={600}
            className="object-cover w-full h-[70vh]"
          />
        </motion.div>

        {/* Right Side (Content) */}
        <motion.div
          className="md:pl-12 md-px-0 px-4 md:w-[40vw] w-full flex flex-col justify-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Title with font-light */}
          <h2 className="text-2xl md:text-2xl !font-light tracking-wide mb-4 text-gray-800 font-modern">
            IT’S ALL ABOUT PASSION, GRIT &{" "}
            <h2 className="  text-2xl md:text-2xl">THE GIRL WHO NEVER GAVE UP</h2>
            <h2 className=" text-2xl md:text-2xl ">THE LADY BOSS</h2>
          </h2>

          <div className="md:pr-12 text-justify">
            {/* Paragraphs with font-thin */}
            <p className="text-gray-800 text-md md:text-md leading-relaxed mb-2 !font-thin">
              “No one said it would be easy. But I promised myself I would work
              hard — so hard that failure simply wouldn’t be an option.”
            </p>

            <p className="text-gray-800 text-md md:text-md leading-relaxed mb-2 !font-thin">
              After 13 years of designing in India, 2 years of rebuilding life in
              Singapore, and now preparing for another big move — this time to the
              United States — AD stands exactly where she always hoped to be: at
              the edge of something bigger, carrying a little fear but a lot more
              fire.
            </p>

            <p className="text-gray-800 text-md md:text-md leading-relaxed mb-0 !font-thin">
              Stories with AD is the result of that fire — an obsession with good
              work, an eye for beauty, a love for craft, and a belief that design
              can hold meaning far beyond spaces. It is a brand built on
              resilience. On courage. On the quiet determination of a woman who
              refused to let life write her story for her — and chose to write it
              herself.
            </p>

            <p className="text-gray-800 text-md md:text-md leading-relaxed !font-thin">
              And the story is still being written… one project, one dream, one
              chapter at a time.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LEADING;
