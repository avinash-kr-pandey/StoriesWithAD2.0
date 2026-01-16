import Image from "next/image";
import React from "react";
import GlobalButton from "../utils/GlobalButton";

const CURATED = () => {
  return (
    <div className="min-h-screen flex items-center justify-start bg-[#ab8665] ">
      <div className="flex flex-col md:flex-row md:items-start items-center md:justify-around w-full max-w-6xl mx-auto">
        {/* Left Side (Book Cover) */}
        <div className="flex-shrink-0  w-full md:w-1/2 ">
          <Image
            src="/PICTURES/CURATED.jpg"
            alt="Curated Style Book"
            width={800}
            height={900}
            className="w-[25vw] h-auto md:h-[450px] object-cover"
          />
        </div>

        {/* Right Side (Text + Buttons) */}
        <div className="flex flex-col justify-center text-center md:text-center space-y-4 md:space-y-6 max-w-full md:py-0 py-10 items-center">
          <p className="text-sm uppercase tracking-wide text-white">
            Introducing
          </p>
          <h1 className="text-3xl md:text-5xl font-serif leading-snug text-white">
            CURATED <br /> STYLE,
          </h1>
          <p className="text-lg text-white font-light font-modern">
            artfully edited homes
          </p>
          <p className="text-sm tracking-wide text-white font-medium font-modern">
            AVAILABLE FOR PRE-ORDER NOW
          </p>

          {/* Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-6">
            <button className="px-6 py-3 border border-white text-white rounded-md font-medium hover:bg-white hover:text-black transition-all cursor-pointer">
              LEARN MORE
            </button>
            <button className="px-6 py-3 border border-white text-white rounded-md font-medium hover:bg-white hover:text-black transition-all cursor-pointer">
              ORDER A COPY
            </button>
          </div> */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-6">
            <GlobalButton
              text="LEARN MORE"
              className="mt-4 px-6 py-2 border border-white text-white h-[48px]"
            />
            <GlobalButton
              text="ORDER A COPY"
              className="mt-4 px-6 py-2 border border-white text-white h-[48px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CURATED;
