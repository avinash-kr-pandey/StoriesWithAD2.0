import Image from "next/image";
import images from "@/utils/images";


const About = () => {
  // Using multiple images from your collection for the about page
  const aboutImages = [
    images.gallery.seating[0], 
    images.gallery.tables[1], 
    images.gallery.art[2], 
    images.featured.curated, 
  ];

  return (
    <div className="min-h-screen pt-42 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-light mb-6">About</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            {/* Main Profile Image */}
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src={aboutImages[0]}
                alt="Profile Image"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Additional Images Grid */}
            <div className="grid grid-cols-3 gap-4">
              {aboutImages.slice(1).map((src, index) => (
                <div
                  key={index}
                  className="aspect-square relative overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`About image ${index + 2}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg mb-6">
              Welcome to my creative space. I&rsquo;m passionate about creating
              meaningful experiences through design and photography.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Background</h3>
                <p className="text-gray-600">
                  With years of experience in visual arts and design, I bring a
                  unique perspective to every project.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Approach</h3>
                <p className="text-gray-600">
                  Focus on minimalism, attention to detail, and creating
                  timeless pieces that tell a story.
                </p>
              </div>
            </div>

            {/* Additional Image at the bottom */}
            <div className="mt-8 aspect-video relative overflow-hidden">
              <Image
                src={images.additional[0]} // _DEV1524.jpg
                alt="Creative workspace"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Full width image section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.additional.slice(1, 5).map((src, index) => (
            <div key={index} className="aspect-square relative overflow-hidden">
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
