"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  const [year] = useState<number>(new Date().getFullYear());

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerGroups = [
    {
      title: "Explore",
      items: [
        { name: "Our Story", path: "/about" },
        { name: "Projects", path: "/projects" },
        { name: "News", path: "/blog" },
        { name: "Reflections", path: "/reflections" },
        { name: "Connect", path: "/connect" },
      ],
    },
    {
      title: "Services",
      items: [
        { name: "Consultation", path: "/services/consultation" },
        { name: "Design", path: "/services/design" },
        { name: "Photography", path: "/services/photography" },
        { name: "Installation", path: "/services/installation" },
      ],
    },
    {
      title: "Collections",
      items: [
        { name: "Seating", path: "/gallery/seating" },
        { name: "Tables", path: "/gallery/tables" },
        { name: "Art", path: "/gallery/art" },
        { name: "Lighting", path: "/gallery/lighting" },
        { name: "Bespoke", path: "/gallery/bespoke" },
        { name: "Objects", path: "/gallery/objects" },
      ],
    },
  ];

  return (
    <footer className="bg-[#e2d8c6] text-[#2f2f2f]">
      <div className="px-4 md:px-8 lg:px-16 py-16">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            {/* Logo */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <h1
                  className="text-3xl md:text-4xl uppercase tracking-widest 
                 "
                >
                  Stories With AD
                </h1>
              </Link>

              <p
                className="font-system text-gray-700 text-base max-w-md tracking-wide 
                "
              >
                Curating timeless interiors and bespoke furnishings that tell
                unique stories. Elevating spaces through thoughtful design,
                craftsmanship, and artistic expression.
              </p>
            </div>

            {/* Groups */}
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3
                  className="text-sm uppercase tracking-wider mb-6 text-gray-600 
                  "
                >
                  {group.title}
                </h3>

                <ul className="space-y-2 pt-4">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.path}
                        className="relative font-system inline-block uppercase tracking-wider 
   
    text-gray-800 transition-colors duration-300
    after:absolute after:left-0 after:-bottom-1
    after:h-[1px] after:w-full after:bg-gray-800
    after:scale-x-0 after:origin-left
    after:transition-transform after:duration-300
    hover:after:scale-x-100"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 px-4 md:px-8 lg:px-16 py-8 bg-[#e2d8c6]">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <p
              className="text-xs text-gray-700 text-center lg:text-left font-system 
         "
            >
              © {year} Stories With AD. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              {[Instagram, Youtube, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-3 rounded-full bg-[#f2e3c7] shadow-md 
                    hover:shadow-xl hover:scale-110 transition-all duration-300"
                >
                  <Icon size={18} className="text-black" />
                </a>
              ))}
            </div>

            <div className="flex gap-4 font-system">
              {["Privacy Policy", "Terms of Service"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-xs text-gray-600 hover:text-gray-800 
                    "
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Top */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={scrollToTop}
          className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800"
        >
          ↑
        </button>
      </motion.div>
    </footer>
  );
};

export default Footer;
