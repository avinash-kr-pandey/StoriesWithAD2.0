// app/projects/[id]/page.tsx
import { projects } from "@/utils/projectsData";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    <div className="min-h-screen mt-32 text-[#171717] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
       

        {/* Project Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#171717] font-serif">
            {project.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <span className="bg-white/80 text-[#171717] px-4 py-2 rounded-lg border border-[#d4c9b8] font-simple">
              {project.category}
            </span>
            <span className="text-[#555] font-serif">{project.date}</span>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Image */}
          <div className="space-y-6">
            <div className="bg-white/80 rounded-xl overflow-hidden border border-[#d4c9b8]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* Quick Info */}
            <div className="bg-white/80 rounded-xl p-6 border border-[#d4c9b8]">
              <h3 className="text-xl font-bold mb-4 text-[#171717] font-serif">
                Quick Specifications
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[#555] text-sm mb-1 font-serif">
                    Dimensions
                  </p>
                  <p className="font-medium font-simple">
                    {project.dimensions}
                  </p>
                </div>
                <div>
                  <p className="text-[#555] text-sm mb-1 font-serif">
                    Primary Materials
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.materials.map((material) => (
                      <span
                        key={material}
                        className="px-3 py-1 bg-[#f5f0e6] text-[#555] rounded text-sm border border-[#e0d6c5]"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            {/* Project Description */}
            <div className="bg-white/80 rounded-xl p-6 border border-[#d4c9b8]">
              <h3 className="text-2xl font-bold mb-4 text-[#171717] font-serif">
                Project Overview
              </h3>
              <div className="space-y-4">
                <p className="text-[#555] leading-relaxed font-serif">
                  {project.detailedDescription}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white/80 rounded-xl p-6 border border-[#d4c9b8]">
              <h3 className="text-xl font-bold mb-4 text-[#171717] font-serif">
                Design Features
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-white text-[#171717] border border-[#d4c9b8] rounded-lg hover:bg-[#f5f0e6] transition-colors duration-200 font-simple"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Links */}
            <div className="bg-white/80 rounded-xl p-6 border border-[#d4c9b8]">
              <h3 className="text-xl font-bold mb-4 text-[#171717] font-serif">
                Project Resources
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#f5f0e6] hover:bg-[#e8e0d2] rounded-lg border border-[#d4c9b8] transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-[#d4c9b8]">
                      <span className="text-xl">📄</span>
                    </div>
                    <div>
                      <p className="font-medium text-[#171717] font-simple">
                        Design Documents
                      </p>
                      <p className="text-sm text-[#555] font-serif">
                        View technical specifications
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#171717] hover:bg-[#333] text-[#eae1d1] rounded-lg transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#333] rounded-lg flex items-center justify-center">
                      <span className="text-xl">🔗</span>
                    </div>
                    <div>
                      <p className="font-medium font-simple">Product Page</p>
                      <p className="text-sm text-[#ccc] font-serif">
                        View detailed product information
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              {project.id > 1 && (
                <Link
                  href={`/projects/${project.id - 1}`}
                  className="px-6 py-3 bg-white/80 hover:bg-white text-[#171717] border border-[#d4c9b8] rounded-lg transition-colors duration-200 font-simple"
                >
                  ← Previous Project
                </Link>
              )}
              {project.id < projects.length && (
                <Link
                  href={`/projects/${project.id + 1}`}
                  className="px-6 py-3 bg-[#171717] hover:bg-[#333] text-[#eae1d1] rounded-lg transition-colors duration-200 font-simple ml-auto"
                >
                  Next Project →
                </Link>
              )}
            </div>
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
    title: `${project.title} | Furniture Designs`,
    description: project.description,
  };
}
