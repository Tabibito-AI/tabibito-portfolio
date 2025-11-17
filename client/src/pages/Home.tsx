import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { Heart, Github, Mail, ExternalLink, Settings } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";
import ProjectDetailModal from "@/components/ProjectDetailModal";

const projects = [
  {
    name: "Tabibito Portfolio",
    description: "Tabibito AI & Web Developer Portfolio - Full-stack web application built with React, TypeScript, and Tailwind CSS",
    language: "TypeScript",
    url: "https://github.com/Tabibito-AI/tabibito-portfolio",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "MySQL"],
    features: ["Responsive design", "Project showcase", "Contact form", "Admin dashboard"],
  },
  {
    name: "DigestPost",
    description: "AI News Curator Bot for X (Twitter) - Automatically curates and posts news from major media outlets",
    language: "TypeScript",
    url: "https://github.com/Tabibito-AI/DigestPost",
    techStack: ["TypeScript", "X API", "AI"],
    features: ["News curation", "Automated posting", "Media integration"],
  },
  {
    name: "AI Transcribe Translate Summarize Manus",
    description: "AI Presentation Notes - Real-time transcription, translation, and summarization powered by Deepgram and Manus LLM",
    language: "TypeScript",
    url: "https://github.com/Tabibito-AI/ai-transcribe-translate-summarize-manus",
    techStack: ["TypeScript", "Deepgram", "Manus LLM", "Real-time API"],
    features: ["Real-time transcription", "Multi-language translation", "AI summarization"],
  },
  {
    name: "IELTS Asteroid Game",
    description: "🚀タイピング力と英単語力を鍛えるIELTS語彙ゲーム🎮 ✔️英単語を素早くタイプして、飛来する小惑星を撃破💥 ✔️タイピングスキルと英単語の語彙力の両方が上達⚡️ ✔️ゲーム感覚で楽しく本格学習🎯",
    language: "JavaScript",
    url: "https://github.com/Tabibito-AI/ielts-asteroid-game",
    techStack: ["JavaScript", "Canvas API", "Game Engine"],
    features: ["Interactive gameplay", "Vocabulary learning", "Typing practice", "Score tracking"],
  },
  {
    name: "AI Whiteboard Manus",
    description: "AI Whiteboard - Manusサーバー上で動作するAI連携ホワイトボードアプリケーション",
    language: "TypeScript",
    url: "https://github.com/Tabibito-AI/ai-whiteboard-manus",
    techStack: ["TypeScript", "Canvas", "AI Integration"],
    features: ["Digital drawing", "AI collaboration", "Real-time sync"],
  },
  {
    name: "Paper Catcher2",
    description: "Paper Catcher2は、学術論文を自動的に収集し、日本語で翻訳・要約して提供するモダンなウェブアプリケーションです。複数の学術データベースから論文を取得し、Google Gemini APIを使用して日本語翻訳を行い、GitHub Pagesで自動的に公開します。",
    language: "HTML",
    url: "https://github.com/Tabibito-AI/paper-catcher2",
    techStack: ["HTML", "JavaScript", "Google Gemini API", "GitHub Pages"],
    features: ["Paper collection", "Japanese translation", "Automatic summarization", "Multi-source support"],
  },
  {
    name: "World Bank AI Dashboard",
    description: "GitHub Actionsを活用したWorld Bank経済指標ダッシュボード。Gemini AIによる分析機能付き。",
    language: "JavaScript",
    url: "https://github.com/Tabibito-AI/world-bank-ai-dashboard",
    techStack: ["JavaScript", "GitHub Actions", "Gemini AI", "Data Visualization"],
    features: ["Economic indicators", "AI analysis", "Automated updates", "Interactive charts"],
  },
  {
    name: "OpenAI ChatBot with Real-time API",
    description: "このPythonコードは、OpenAIのAPIライブラリを使用して、リアルタイムの音声コミュニケーション、カメラ映像認識、スクリーン認識ができるAIチャットボットの基本的な機能を実装したものです。",
    language: "Python",
    url: "https://github.com/Tabibito-AI/OpenAI-ChatBot-with-Real-time-API",
    techStack: ["Python", "OpenAI API", "Voice Processing", "Computer Vision"],
    features: ["Voice communication", "Camera recognition", "Screen recognition", "Real-time processing"],
  },
  {
    name: "Multi-Source Paper Navigator",
    description: "A web application that enables quick keyword search of research papers on multiple academic sources including arXiv and PubMed, and provides abstract translation.",
    language: "TypeScript",
    url: "https://github.com/Tabibito-AI/Multi-Source-Paper-Navigator",
    techStack: ["TypeScript", "React", "arXiv API", "PubMed API"],
    features: ["Multi-source search", "Abstract translation", "Paper metadata", "Export functionality"],
  },
  {
    name: "AI Paper Navigator",
    description: "arXivの論文を検索し、Abstractを翻訳して提供するアプリケーション",
    language: "TypeScript",
    url: "https://github.com/Tabibito-AI/ai-paper-navigator",
    techStack: ["TypeScript", "arXiv API", "Translation API"],
    features: ["Paper search", "Abstract translation", "Metadata display", "Link to original"],
  },
];

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  const { user, loading, error, isAuthenticated, logout } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.message.trim()) {
      toast.error("Please enter a message");
      return false;
    }
    if (formData.message.trim().length < 10) {
      toast.error("Message must be at least 10 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Send message to backend
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent successfully! Thank you for reaching out.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-semibold text-slate-900">Tabibito</span>
          </div>
          <div className="flex gap-6 items-center">
            <a href="#about" className="text-sm text-slate-600 hover:text-rose-600 transition">About</a>
            <a href="#projects" className="text-sm text-slate-600 hover:text-rose-600 transition">Projects</a>
            <a href="#contact" className="text-sm text-slate-600 hover:text-rose-600 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 leading-tight">
              Hello, I'm <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">Tabibito</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              AI & Web Developer passionate about building tools that make research and development more accessible. I love working with cutting-edge AI technologies and modern web frameworks.
            </p>
            <div className="flex gap-4">
              <a href="#projects" className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition">
                View My Work
              </a>
              <a href="#contact" className="px-6 py-3 border-2 border-slate-300 text-slate-900 rounded-lg font-medium hover:border-rose-500 hover:text-rose-600 transition">
                Get in Touch
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-rose-200 shadow-2xl">
              <img src={APP_LOGO} alt="Tabibito" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-20 border-t border-slate-200/50">
        <h2 className="text-4xl font-bold text-slate-900 mb-12">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              I'm a developer who loves combining AI with web technologies. My GitHub projects showcase my passion for creating tools that help researchers and developers work more efficiently.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Whether it's building paper navigators for academic research, real-time AI chatbots, or full-stack web applications, I'm always exploring new ways to leverage technology.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Skills</h3>
            <div className="space-y-4">
              {[
                { name: "TypeScript", level: 90 },
                { name: "React", level: 87 },
                { name: "Python", level: 84 },
                { name: "Tailwind CSS", level: 81 },
              ].map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-slate-900">{skill.name}</span>
                    <span className="text-sm text-slate-500">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rose-400 to-pink-600 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-5xl mx-auto px-6 py-20 border-t border-slate-200/50">
        <h2 className="text-4xl font-bold text-slate-900 mb-12">Featured Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <button
              key={project.name}
              onClick={() => handleProjectClick(project)}
              className="group p-6 bg-white rounded-lg border border-slate-200 hover:border-rose-300 hover:shadow-lg transition text-left cursor-pointer w-full"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-slate-900 group-hover:text-rose-600 transition flex-1">{project.name}</h3>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-rose-600 transition flex-shrink-0 ml-2" />
              </div>
              <p className="text-sm text-slate-600 mb-4 line-clamp-5">{project.description}</p>
              <span className="inline-block px-2 py-1 bg-slate-100 text-xs text-slate-600 rounded">{project.language}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-20 border-t border-slate-200/50">
        <h2 className="text-4xl font-bold text-slate-900 mb-12">Let's Connect</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-slate-600 mb-8">
              I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
            </p>
            <div className="space-y-4">
              <a
                href="https://github.com/Tabibito-AI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              {user && user.role === "admin" && (
                <Link href="/admin/messages">
                  <a className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition ml-4">
                    <Settings className="w-5 h-5" />
                    Admin Messages
                  </a>
                </Link>
              )}
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg border border-slate-200">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 disabled:bg-slate-50 disabled:text-slate-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 disabled:bg-slate-50 disabled:text-slate-500"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 disabled:bg-slate-50 disabled:text-slate-500"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/50 bg-white/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-8 text-center text-sm text-slate-600">
          <p>&copy; 2025 Tabibito. Built with passion and code.</p>
        </div>
      </footer>

      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
