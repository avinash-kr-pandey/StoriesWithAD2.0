"use client";

import React from "react";

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
        letterSpacing: "0.08em",
        fontWeight: 500,
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

      <h2 className="relative z-10 uppercase text-sm">
        {text}
      </h2>
    </button>
  );
};

export default GlobalButton;
