import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Github, Globe } from "lucide-react";
import { useState, useEffect } from "react";

interface ProjectDetail {
  name: string;
  description: string;
  language: string;
  url: string;
  about?: string;
  website?: string;
  techStack?: string[];
  image?: string;
  features?: string[];
}

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  const [projectData, setProjectData] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setProjectData(project);
      fetchProjectDetails(project.url);
    }
  }, [project]);

  const fetchProjectDetails = async (url: string) => {
    try {
      setLoading(true);
      const repoPath = url.replace("https://github.com/", "");
      const response = await fetch(`https://api.github.com/repos/${repoPath}`);
      const data = await response.json();

      setProjectData((prev) => {
        if (!prev) return prev;
        const updated: ProjectDetail = {
          ...prev,
          about: data.description || prev.description,
          website: data.homepage || undefined,
        };
        return updated;
      });
    } catch (error) {
      console.error("Failed to fetch project details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{projectData?.name}</DialogTitle>
              <p className="text-sm text-slate-600">{projectData?.language}</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {projectData?.image && (
            <div className="rounded-lg overflow-hidden bg-slate-100">
              <img
                src={projectData.image}
                alt={projectData.name}
                className="w-full h-auto max-h-64 object-cover"
              />
            </div>
          )}

          <div>
            <h3 className="font-semibold text-slate-900 mb-2">About</h3>
            <p className="text-slate-700 leading-relaxed">
              {projectData?.about || projectData?.description}
            </p>
          </div>

          {projectData?.techStack && projectData.techStack.length > 0 && (
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {projectData.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {projectData?.features && projectData.features.length > 0 && (
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Features</h3>
              <ul className="space-y-2">
                {projectData.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-700">
                    <span className="text-rose-600 mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <a
              href={projectData?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
            {projectData?.website && (
              <a
                href={projectData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition"
              >
                <Globe className="w-4 h-4" />
                Visit Website
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
