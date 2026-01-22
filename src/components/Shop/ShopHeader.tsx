"use client";
import Image from "next/image";

const Shop = () => {
  const sections = [
    {
      title: "Curated Furniture Collection",
      image: "/PICTURES/_DEV0803.jpg",
      content: `Our shop features a carefully curated selection of premium furniture designed to elevate modern living spaces. Each piece is chosen for its craftsmanship, comfort, and timeless appeal. From statement sofas to elegant dining sets, our collection blends functionality with refined aesthetics. We focus on quality materials and thoughtful design to ensure every item adds lasting value to your home or workspace.`,
    },
    {
      title: "Home Decor & Styling Essentials",
      image: "/PICTURES/_DEV0809.jpg",
      content: `Discover a wide range of home decor essentials that bring character and warmth to your interiors. Our shop offers lighting, wall art, rugs, accessories, and accent pieces that complement diverse design styles. These elements are selected to help you personalize your space effortlessly. Whether subtle or bold, each decor item enhances visual balance and creates a welcoming atmosphere.`,
    },
    {
      title: "Materials, Finishes & Custom Pieces",
      image: "/PICTURES/_DEV0830.jpg",
      content: `We offer exclusive materials and finishes for clients seeking customization and uniqueness. From handcrafted surfaces to tailored furniture elements, our shop allows you to select textures, colors, and finishes that align with your vision. Each custom piece is crafted with attention to detail, ensuring durability, elegance, and a perfect fit for your space.`,
    },
    {
      title: "Delivery, Installation & Aftercare",
      image: "/PICTURES/_DEV1448.jpg",
      content: `Our services extend beyond purchase with seamless delivery and professional installation. We ensure every item is placed with precision and care to maintain design harmony. Post-installation, we provide guidance on maintenance and long-term care so your purchases remain in excellent condition. Our goal is to deliver a smooth, reliable, and satisfying shopping experience from start to finish.`,
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Main title section */}
      <div className="pt-10 px-6 ">
        <h1 className="text-3xl md:text-5xl font-bold uppercase py-8 pt-24 tracking-tight">
          Shop
        </h1>
      </div>

      {/* 4 Full-screen alternating sections */}
      {sections.map((section, index) => (
        <div
          key={index}
          className="min-h-[90vh] flex items-center justify-center py-20"
        >
          <div className="w-full max-w-8xl mx-auto px-6 lg:px-8">
            <div
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-12 lg:gap-20`}
            >
              {/* Image Section - Height increased and responsive */}
              <div className="lg:w-1/2 w-full">
                <div className="h-[60vh] md:h-[60vh] lg:h-[70vh] relative overflow-hidden group">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                    priority={index < 2}
                  />
                </div>
              </div>

              {/* Text Content Section */}
              <div className="lg:w-1/2 w-full">
                <div className="max-w-2xl mx-auto lg:mx-0">
                  <h2 className="text-3xl lg:text-3xl text-gray-700 leading-relaxed font-thin pb-12">
                    {section.title}
                  </h2>
                  <div className="space-y-4 text-md">
                    {section.content
                      .split(".")
                      .filter((sentence) => sentence.trim())
                      .map((sentence, i) => (
                        <p
                          key={i}
                          className=" text-gray-700 leading-relaxed font-thin text-justify"
                        >
                          {sentence.trim() +
                            (i <
                            section.content.split(".").filter((s) => s.trim())
                              .length -
                              1
                              ? "."
                              : "")}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shop;
