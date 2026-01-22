// app/projects/[id]/page.tsx
import { projects } from "@/utils/projectsData";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Ruler, Palette } from "lucide-react";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const projectId = parseInt(id);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32">
      <div className="max-w-8xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Project Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#eae1d1] rounded-full mb-6">
            <div className="w-2 h-2 bg-[#d4c9b8] rounded-full" />
            <span
              className="text-sm text-gray-500 font-thin leading-relaxed"
              style={{
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "",
                lineHeight: "1.6",
                fontWeight: 500,
              }}
            >
              {project.category}
            </span>
          </div>

          {/* HEADING (UNCHANGED) */}
          <h1 className="text-5xl md:text-4xl font-bold text-[#171717] mb-6 leading-tight pb-6">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6">
            <div
              className="flex items-center gap-2 "
              style={{
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "",
                lineHeight: "1.6",
                fontWeight: 500,
              }}
            >
              <Calendar className="w-5 h-5" />
              <div
                className="flex flex-wrap items-center gap-2"
                style={{
                  fontFamily: "system-ui, sans-serif",
                  letterSpacing: "",
                  lineHeight: "1.6",
                  fontWeight: 500,
                }}
              >
                {project.date}
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700 font-thin leading-relaxed">
              <Ruler className="w-5 h-5" />
              <p
                className="flex flex-wrap items-center gap-2"
                style={{
                  fontFamily: "system-ui, sans-serif",
                  letterSpacing: "",
                  lineHeight: "1.6",
                  fontWeight: 500,
                }}
              >
                {project.dimensions}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Image */}
          <div className="lg:col-span-2">
            <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-to-br from-[#f5f0e6] to-white border border-[#eae1d1]">
              <Image
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                width={400}
                height={400}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Materials */}
            <div className="bg-white border border-[#eae1d1] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#f5f0e6] to-white rounded-lg flex items-center justify-center border border-[#eae1d1]">
                  <Palette className="w-5 h-5 text-gray-700" />
                </div>
                {/* HEADING */}
                <h3 className="text-xl font-bold text-[#171717]">
                  Materials & Finish
                </h3>
              </div>

              <div className="space-y-4">
                {project.materials.map((material, index) => (
                  <div key={material} className="flex items-center gap-3">
                    <div
                      className="flex items-center gap-2 "
                      style={{
                        fontFamily: "system-ui, sans-serif",
                        letterSpacing: "",
                        lineHeight: "1.6",
                        fontWeight: 500,
                      }}
                    >
                      <span
                        className="flex items-center gap-2 "
                        style={{
                          fontFamily: "system-ui, sans-serif",
                          letterSpacing: "",
                          lineHeight: "1.6",
                          fontWeight: 400,
                        }}
                      >
                        {index + 1}
                      </span>
                    </div>
                    <span
                      className="flex items-center gap-2 "
                      style={{
                        fontFamily: "system-ui, sans-serif",
                        letterSpacing: "",
                        lineHeight: "1.6",
                        fontWeight: 400,
                      }}
                    >
                      {material}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Design Features */}
            <div className="bg-white border border-[#eae1d1] rounded-2xl p-6">
              {/* HEADING */}
              <h3 className="text-xl font-bold text-[#171717] mb-8 pb-8">
                Design Features
              </h3>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <div
                    key={tag}
                    className="px-4 py-2 bg-gradient-to-br from-[#f5f0e6] to-white border border-[#eae1d1] rounded-full hover:border-[#d4c9b8] transition-colors"
                  >
                    <span
                      className="flex items-center gap-2"
                      style={{
                        fontFamily: "system-ui, sans-serif",
                        letterSpacing: "",
                        lineHeight: "1.6",
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#eae1d1] rounded-2xl p-8">
              {/* HEADING */}
              <h2 className="text-3xl font-bold text-[#171717] mb-6">
                Design Philosophy
              </h2>

              <p
                className="flex items-center gap-2"
                style={{
                  fontFamily: "system-ui, sans-serif",
                  letterSpacing: "",
                  lineHeight: "1.6",
                  fontWeight: 200,
                }}
              >
                {project.detailedDescription}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="space-y-3">
                  <h4 className="font-bold text-[#171717] py-2">Ergonomics</h4>
                  <p
                    style={{
                      fontFamily: "system-ui, sans-serif",
                      letterSpacing: "",
                      lineHeight: "1.6",
                      fontWeight: 200,
                    }}
                  >
                    Designed for optimal comfort and user experience, ensuring
                    both aesthetic appeal and practical functionality.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-[#171717] py-2">
                    Sustainability
                  </h4>
                  <p
                    style={{
                      fontFamily: "system-ui, sans-serif",
                      letterSpacing: "",
                      lineHeight: "1.6",
                      fontWeight: 200,
                    }}
                  >
                    Using responsibly sourced materials and environmentally
                    conscious manufacturing processes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats + CTA */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br bg-gray-400 text-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 pb-6">Design Impact</h3>

              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-bold mb-2 flex justify-center">
                    95%
                  </div>
                  <div className="text-sm flex justify-center">
                    Client Satisfaction
                  </div>
                </div>

                <div>
                  <div className="text-4xl font-bold mb-2 flex justify-center">
                    18+
                  </div>
                  <div className="text-sm flex justify-center">
                    Months of Development
                  </div>
                </div>

                <div>
                  <div className="text-4xl font-bold mb-2 flex justify-center">
                    A+
                  </div>
                  <div className="text-sm flex justify-center">
                    Material Quality Grade
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/projects"
              className="block bg-white border border-[#eae1d1] hover:border-[#d4c9b8] rounded-2xl p-6 text-center transition-all hover:bg-gray-300"
            >
              <h4 className="font-bold text-[#171717] mb-2">
                Explore More Designs
              </h4>
              <p
                style={{
                  fontFamily: "system-ui, sans-serif",
                  letterSpacing: "",
                  lineHeight: "1.6",
                  fontWeight: 200,
                }}
              >
                Discover our complete collection of furniture designs
              </p>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
}

// Static Params
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

// Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = parseInt(id);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Modern Furniture Design`,
    description: project.description,
  };
}
