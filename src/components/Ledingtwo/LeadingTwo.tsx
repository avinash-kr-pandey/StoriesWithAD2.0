import Image from "next/image";
import React from "react";
import GlobalButton from "../utils/GlobalButton";

const LeadingTwo = () => {
  return (
    <div className="bg-[#e8dfd1] py-16 min-h-[60vh] px-8">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">
        {/* Left Side (Content) */}
        <div className="flex flex-col justify-center w-[30vw] mx-auto">
          <p
            className="text-sm uppercase tracking-widest text-gray-700 mb-3"
            style={{ textAlign: "justify" }}
          >
            Welcome to Interior Styling 101
          </p>

          <h2
            className="text-xl md:text-2xl font-serif  mb-6 text-gray-600 uppercase "
            style={{ textAlign: "justify" }}
          >
            An online styling course for beginners where you’ll learn how to
            style a home that reflects you, what you love and how you live.
          </h2>

          <p
            className="text-gray-700 text-base md:text-md leading-relaxed mb-4 font-modern"
            style={{ textAlign: "justify" }}
          >
            Packed full of ideas and inspiration, Kerrie-Ann’s advice will
            ensure you bring your home to life through creativity and styling.
            You’ll discover how to define your personal interior style, and
            tackle any styling project, from hanging art and creating a vignette
            to styling your bedroom and making the most of what you already own
            and love.
          </p>

          <p
            className="text-gray-700 text-base md:text-md leading-relaxed mb-4 font-modern"
            style={{ textAlign: "justify" }}
          >
            Learn how even a few minor changes can transform how a room feels.
            This course will equip you with all the skills to make your home a
            place you love and confidently reflect your interior style.
          </p>

          <p
            className="text-gray-700 text-base md:text-md leading-relaxed mb-6 font-modern"
            style={{ textAlign: "justify" }}
          >
            This program is completely self-paced and you will have full
            lifestyle access.
          </p>

          <GlobalButton
            text="ENROL →"
            className="mt-4 px-6 py-2 h-48px text-white bg-[#a97c50] w-fit"
          />
        </div>

        {/* Right Side (Image) */}
        <div className="w-full h-[650px] overflow-hidden">
          <Image
            src="/PICTURES/_DEV0866.jpg"
            alt="Interior Styling Course"
            className="w-full h-full object-cover"
            width={600}
            height={450}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadingTwo;
