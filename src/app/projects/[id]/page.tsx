// app/projects/[id]/page.tsx
import { projects } from "@/utils/projectsData";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Ruler, Palette } from "lucide-react";

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
      {/* Navigation Bar */}

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Project Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#eae1d1] rounded-full mb-6">
            <div className="w-2 h-2 bg-[#d4c9b8] rounded-full" />
            <span className="text-sm font-medium text-[#666]">
              {project.category}
            </span>
          </div>

          <h1 className="text-5xl md:text-4xl font-bold text-[#171717] mb-6 leading-tight">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-[#666]">
            <div
              className="flex items-center gap-2 text-xl"
              style={{
                fontFamily: "system-ui, sans-serif",
              }}
            >
              <Calendar className="w-5 h-5" />
              <span>{project.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5" />
              <span>{project.dimensions}</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Image */}
          <div className="lg:col-span-2">
            <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-to-br from-[#f5f0e6] to-white border border-[#eae1d1]">
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            {/* Image Grid (Optional additional images could be added here) */}
            {/* <div className="grid grid-cols-3 gap-4 mt-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden border border-[#eae1d1]">
                  <div className="w-full h-full bg-gradient-to-br from-[#f5f0e6] to-white" />
                </div>
              ))}
            </div> */}
          </div>

          {/* Sidebar - Quick Info */}
          <div className="space-y-8">
            {/* Materials Card */}
            <div className="bg-white border border-[#eae1d1] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#f5f0e6] to-white rounded-lg flex items-center justify-center border border-[#eae1d1]">
                  <Palette className="w-5 h-5 text-[#666]" />
                </div>
                <h3 className="text-xl font-bold text-[#171717]">
                  Materials & Finish
                </h3>
              </div>

              <div className="space-y-4">
                {project.materials.map((material, index) => (
                  <div key={material} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f5f0e6] to-white border border-[#eae1d1] flex items-center justify-center">
                      <span className="text-sm font-bold text-[#666]">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-[#171717] font-medium">
                      {material}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Design Features */}
            <div className="bg-white border border-[#eae1d1] rounded-2xl p-6">
              <h3 className="text-xl font-bold text-[#171717] mb-6">
                Design Features
              </h3>

              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <div
                    key={tag}
                    className="px-4 py-2 bg-gradient-to-br from-[#f5f0e6] to-white border border-[#eae1d1] rounded-full hover:border-[#d4c9b8] transition-colors cursor-pointer group"
                  >
                    <span className="text-sm font-medium text-[#666] group-hover:text-[#171717]">
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
              <h2 className="text-3xl font-bold text-[#171717] mb-6">
                Design Philosophy
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-[#666] leading-relaxed mb-6">
                  {project.detailedDescription}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-3">
                    <h4 className="font-bold text-[#171717]">Ergonomics</h4>
                    <p className="text-[#666]">
                      Designed for optimal comfort and user experience, ensuring
                      both aesthetic appeal and practical functionality.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-[#171717]">Sustainability</h4>
                    <p className="text-[#666]">
                      Using responsibly sourced materials and environmentally
                      conscious manufacturing processes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#171717] to-[#333] text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Design Impact</h3>

              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-bold mb-2">95%</div>
                  <div className="text-sm text-white/70">
                    Client Satisfaction
                  </div>
                </div>

                <div>
                  <div className="text-4xl font-bold mb-2">18+</div>
                  <div className="text-sm text-white/70">
                    Months of Development
                  </div>
                </div>

                <div>
                  <div className="text-4xl font-bold mb-2">A+</div>
                  <div className="text-sm text-white/70">
                    Material Quality Grade
                  </div>
                </div>
              </div>
            </div>

            {/* View All Projects CTA */}
            <Link
              href="/projects"
              className="block bg-white border border-[#eae1d1] hover:border-[#d4c9b8] rounded-2xl p-6 text-center group transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-2xl mb-2">✨</div>
              <h4 className="font-bold text-[#171717] mb-2">
                Explore More Designs
              </h4>
              <p className="text-sm text-[#666]">
                Discover our complete collection of furniture designs
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate static params for ISG
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

// Optional: Add metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = parseInt(id);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Modern Furniture Design`,
    description: project.description,
  };
}
