import React from "react";

const Portfolio = () => {
  const categories = [
    {
      name: "Web Design",
      count: 8,
      description: "Digital experiences and interfaces",
    },
    {
      name: "Photography",
      count: 12,
      description: "Visual storytelling through lens",
    },
  ];

  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-light mb-4">Portfolio</h1>
        <p className="text-gray-600 mb-12 max-w-2xl">
          A collection of creative projects spanning digital design and
          photography.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {categories.map((category, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-[16/9] bg-gray-100 mb-6 flex items-center justify-center">
                <span className="text-gray-400">{category.name} Projects</span>
              </div>
              <h3 className="text-2xl font-light mb-2">{category.name}</h3>
              <p className="text-gray-600 mb-3">{category.description}</p>
              <span className="text-sm text-gray-500">
                {category.count} projects
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
