"use client";
import Image from "next/image";
import images from "@/utils/images";

const About = () => {
  const aboutImages = [
    images.gallery.seating[0],
    images.gallery.tables[1],
    images.gallery.art[2],
    images.featured.curated,
  ];

  return (
    <div className="min-h-screen pt-32 w-full">
      {/* Introduction Section */}
      <div className="py-12 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* LEFT : TEXT */}
          <div className="md:pl-12 pl-0 ">
            <h2 className="text-2xl lg:text-4xl font-light mb-8 leading-tight !system-ui pb-8 justify-center px-16">
              STORIES WITH AD JONES IS ONE OF AUSTRALIA&lsquo;S LEADING INTERIOR
              STYLISTS.
            </h2>

            <div className="space-y-4 px-16">
              <p className="mt-2 text-md text-gray-700 leading-relaxed font-thin text-justify">
                With a diverse portfolio ranging from residential and commercial
                clients to lifestyle brands and editorial publications, Stories
                With AD work has earned global recognition, gracing the covers
                of local and international magazines.
              </p>
              <p className="text-md text-gray-700 leading-relaxed font-thin text-justify">
                Clients seek the Sydney based stylist and designer for her
                signature curated and soulful approach to creating evocative
                spaces. She effortlessly blends vintage with contemporary
                elements and sculptural forms that are harmonised with a palette
                richly layered with colour and texture.
              </p>
              <p className="text-md text-gray-700 leading-relaxed font-thin text-justify">
                She collaborates with skilled artisans to create bespoke visual
                stories that reflect her client&lsquo;s lives and push the
                boundaries of design. Stories With AD work illustrates the
                beauty of composing meaningful art, objects and furniture to
                create emotive spaces with a timeless sensibility.
              </p>
              <p className="text-md text-gray-700 leading-relaxed font-thin text-justify">
                Stories With AD online gallery offers an edited selection of
                highly coveted European mid-century furniture and contemporary
                art that she has personally sourced and curated for her
                clientele and audience.
              </p>
              <p className="text-md text-gray-700 leading-relaxed font-thin text-justify">
                She engages audiences with her enthusiasm and expert knowledge
                of interiors with a sincere and joyful approach through her
                social media following, digital platform and Interior Styling
                101 course.
              </p>
            </div>
          </div>

          {/* RIGHT : IMAGE */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={aboutImages[1]}
                alt="Studio Space"
                fill
                className="object-cover hover:scale-102 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
