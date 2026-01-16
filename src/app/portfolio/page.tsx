import Image from "next/image";
import Link from "next/link";
import images from "@/utils/images";


const Portfolio = () => {
  const categories = [
    {
      name: "Web Design",
      count: images.portfolio.webDesign.length,
      description: "Digital experiences and interfaces",
      image: images.portfolio.webDesign[0], // _DEV1422.jpg
      path: "/portfolio/web-design",
    },
    {
      name: "Photography",
      count: images.portfolio.photography.length,
      description: "Visual storytelling through lens",
      image: images.portfolio.photography[0], // _DEV1460.jpg
      path: "/portfolio/photography",
    },
  ];

  // Featured portfolio work
  const featuredWork = [
    images.featured.spotlight[0], // _DEV1493.jpg
    images.featured.spotlight[1], // _DEV1505.jpg
    images.featured.spotlight[2], // _DEV1511.jpg
    images.additional[0], // _DEV1524.jpg
    images.additional[1], // _DEV1536.jpg
    images.additional[2], // _DEV1539.jpg
  ];

  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-light mb-4">Portfolio</h1>
        <p className="text-gray-600 mb-12 max-w-2xl">
          A collection of creative projects spanning digital design and
          photography.
        </p>

        {/* Featured Portfolio Banner */}
        <div className="mb-16">
          <div className="aspect-[16/6] relative overflow-hidden mb-6">
            <Image
              src={images.featured.curated} // CURATED.jpg
              alt="Portfolio Showcase"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {categories.map((category, index) => (
            <Link key={index} href={category.path} className="group">
              <div className="aspect-[16/9] relative overflow-hidden mb-6">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
              </div>
              <h3 className="text-2xl font-light mb-2 group-hover:underline">
                {category.name}
              </h3>
              <p className="text-gray-600 mb-3">{category.description}</p>
              <span className="text-sm text-gray-500">
                {category.count} projects
              </span>
            </Link>
          ))}
        </div>

        {/* Featured Work Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">Featured Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredWork.map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-[4/3] relative overflow-hidden mb-3">
                  <Image
                    src={src}
                    alt={`Featured work ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium mb-1">
                  {index === 0 && "Brand Identity"}
                  {index === 1 && "Editorial Design"}
                  {index === 2 && "Digital Platform"}
                  {index === 3 && "Product Launch"}
                  {index === 4 && "Campaign Visuals"}
                  {index === 5 && "Art Direction"}
                </h3>
                <p className="text-sm text-gray-500">
                  {index === 0 && "Visual identity system"}
                  {index === 1 && "Print and digital publication"}
                  {index === 2 && "Web application interface"}
                  {index === 3 && "Marketing campaign"}
                  {index === 4 && "Advertising photography"}
                  {index === 5 && "Creative direction"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Portfolio Items */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">Recent Projects</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {images.additional.slice(3, 9).map((src, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square relative overflow-hidden mb-2">
                  <Image
                    src={src}
                    alt={`Project ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Project {index + 1}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="p-8 border-t">
          <h2 className="text-2xl font-light mb-4">Creative Process</h2>
          <p className="text-gray-600 mb-6 max-w-2xl">
            Each project begins with deep understanding of client needs and ends
            with exceptional visual solutions that communicate effectively.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="aspect-square relative overflow-hidden mb-4 rounded-full mx-auto max-w-[120px]">
                <Image
                  src={images.gallery.art[0]} // _DEV0866.jpg
                  alt="Research phase"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium mb-2">Research & Discovery</h3>
              <p className="text-sm text-gray-600">
                Understanding objectives, audience, and context
              </p>
            </div>
            <div className="text-center">
              <div className="aspect-square relative overflow-hidden mb-4 rounded-full mx-auto max-w-[120px]">
                <Image
                  src={images.gallery.art[1]} // _DEV0884.jpg
                  alt="Design phase"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium mb-2">Design & Development</h3>
              <p className="text-sm text-gray-600">
                Creating visual solutions and technical execution
              </p>
            </div>
            <div className="text-center">
              <div className="aspect-square relative overflow-hidden mb-4 rounded-full mx-auto max-w-[120px]">
                <Image
                  src={images.gallery.art[2]} // _DEV0914.jpg
                  alt="Delivery phase"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium mb-2">Delivery & Refinement</h3>
              <p className="text-sm text-gray-600">
                Final implementation and ongoing optimization
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
