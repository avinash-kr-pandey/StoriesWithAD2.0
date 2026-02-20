"use client";

import React from "react";
import { MdOutlineArrowForward } from "react-icons/md";

interface GlobalButtonProps {
  text: string;
  className?: string;
}

const GlobalButton: React.FC<GlobalButtonProps> = ({ text, className }) => {
  return (
    <button
      className={`
        relative overflow-hidden rounded-md cursor-pointer
        transition-all duration-300 group
        ${className || ""}
      `}
      style={{
        fontFamily: "system-ui, sans-serif",
        letterSpacing: "0.01em",
        fontWeight: 300,
      }}
    >
      {/* Hover overlay */}
      <span
        className="
          absolute inset-0
          bg-black/10
          scale-x-0
          origin-left
          transition-transform duration-700 ease-out
          group-hover:scale-x-100
        "
      />

      <span className="relative z-10 uppercase text-sm flex items-center gap-2">
        {text}

        {/* React Icon Arrow */}
        <MdOutlineArrowForward
          className="
            transition-transform duration-300 ease-out
            group-hover:translate-x-2
          "
          size={16}
        />
      </span>
    </button>
  );
};

export default GlobalButton;
