"use client";

import React, { useState } from "react";
import Image from "next/image";
import images from "@/utils/images";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    interest: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <section className="min-h-screen pt-44 max-w-6xl mx-auto py-12">
      <div className="grid lg:grid-cols-2 min-h-[90vh]">
        {/* LEFT IMAGE */}
        <div className="relative hidden lg:block">
          <Image
            src={images.portfolio.webDesign[1]}
            alt="Contact"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="flex items-center justify-center px-6 lg:px-24">
          <div className="w-full max-w-md">
            {/* HEADING (UNCHANGED) */}
            <h2 className="text-4xl font-light tracking-wide mb-16 text-black pb-12">
              CONTACT
            </h2>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-14">
              {/* First Name */}
              <input
                type="text"
                name="firstName"
                placeholder="First Name *"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-black/40 py-2 text-sm
                text-gray-700 font-thin leading-relaxed
                placeholder:text-gray-700 placeholder:font-thin
                focus:outline-none focus:border-black"
              />

              {/* Last Name */}
              <input
                type="text"
                name="lastName"
                placeholder="Last Name *"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-black/40 py-2 text-sm
                text-gray-700 font-thin leading-relaxed
                placeholder:text-gray-700 placeholder:font-thin
                focus:outline-none focus:border-black"
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-black/40 py-2 text-sm
                text-gray-700 font-thin leading-relaxed
                placeholder:text-gray-700 placeholder:font-thin
                focus:outline-none focus:border-black"
              />

              {/* Interest */}
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-black/40 py-2 text-sm
                text-gray-700 font-thin leading-relaxed
                focus:outline-none focus:border-black
                appearance-none cursor-pointer"
              >
                <option value="">I&apos;m interested in</option>
                <option value="consultation">Consultation</option>
                <option value="design">Design</option>
                <option value="photography">Photography</option>
                <option value="installation">Installation</option>
              </select>

              {/* Message */}
              <textarea
                name="message"
                rows={3}
                placeholder="How can we help?"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-black/40 py-2 text-sm
                text-gray-700 font-thin leading-relaxed
                placeholder:text-gray-700 placeholder:font-thin
                focus:outline-none focus:border-black resize-none"
              />

              {/* Submit */}
              <div className="pt-10 flex justify-center">
                <button
                  type="submit"
                  className="bg-[#b89b7c] px-12 py-3 text-sm tracking-widest
                  uppercase hover:opacity-90 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
