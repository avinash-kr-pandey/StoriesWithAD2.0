import React from "react";
import Image from "next/image";
import images from "@/utils/images";


const Book = () => {
  // Select images for the book page - showing portfolio work
  const portfolioImages = [
    images.portfolio.webDesign[0], // _DEV1422.jpg
    images.portfolio.photography[1], // _DEV1463.jpg
    images.gallery.bespoke[0], // _DEV1042.jpg
    images.gallery.lighting[2], // _DEV0966.jpg
    images.featured.spotlight[0], // _DEV1493.jpg
    images.additional[5], // _DEV1542.jpg
  ];

  return (
    <div className="min-h-screen pt-42 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-light mb-4">Book a Session</h1>
        <p className="text-gray-600 mb-8">
          Ready to start your project? Fill out the form below and I&rsquo;ll
          get back to you within 24 hours.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full border-b py-2 focus:outline-none focus:border-black"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full border-b py-2 focus:outline-none focus:border-black"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full border-b py-2 focus:outline-none focus:border-black"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Service Interested In
                </label>
                <select className="w-full border-b py-2 focus:outline-none focus:border-black">
                  <option>Select a service</option>
                  <option>Consultation</option>
                  <option>Design</option>
                  <option>Photography</option>
                  <option>Installation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full border-b py-2 focus:outline-none focus:border-black"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors"
              >
                Submit Inquiry
              </button>
            </form>
          </div>

          {/* Images Section */}
          <div className="space-y-6">
            {/* Main Portfolio Image */}
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={portfolioImages[0]}
                alt="Portfolio Work Example"
                fill
                className="object-cover"
              />
            </div>

            {/* Small Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              {portfolioImages.slice(1, 3).map((src, index) => (
                <div
                  key={index}
                  className="aspect-square relative overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`Project example ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>

            {/* Additional Images Row */}
            <div className="grid grid-cols-3 gap-4">
              {portfolioImages.slice(3).map((src, index) => (
                <div
                  key={index}
                  className="aspect-square relative overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`Work sample ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>

            {/* Inspiration Text */}
            <div className="p-6 border-t">
              <h3 className="font-medium mb-2">Recent Work</h3>
              <p className="text-sm text-gray-600">
                Browse through recent projects to get inspiration for your own
                vision.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Gallery Section */}
        <div className="mt-16">
          <h3 className="text-xl font-light mb-6">Project Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {images.additional.slice(6, 12).map((src, index) => (
              <div
                key={index}
                className="aspect-square relative overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
