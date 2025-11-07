import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Heart, Github, Mail, ExternalLink } from "lucide-react";

const projects = [
  {
    name: "AI Paper Navigator",
    description: "arXivの論文を検索し、Abstractを翻訳して提供するアプリケーション",
    language: "TypeScript",
    url: "https://github.com/Tabibito-AI/ai-paper-navigator",
  },
  {
    name: "AI Whiteboard Manus",
    description: "AI Whiteboard - Manusサーバー上で動作するAI連携ホワイトボードアプリケーション",
    language: "TypeScript",
    url: "https://github.com/Tabibito-AI/ai-whiteboard-manus",
  },
  {
    name: "Multi-Source Paper Navigator",
    description: "複数の学術データベース（arXiv、PubMed）から論文を検索し、要約翻訳を提供するWebアプリケーション",
    language: "TypeScript",
    url: "https://github.com/Tabibito-AI/Multi-Source-Paper-Navigator",
  },
  {
    name: "OpenAI ChatBot with Real-time API",
    description: "OpenAIのリアルタイムAPIを使用した、音声コミュニケーション、カメラ映像認識、スクリーン認識ができるAIチャットボット",
    language: "Python",
    url: "https://github.com/Tabibito-AI/OpenAI-ChatBot-with-Real-time-API",
  },
  {
    name: "Paper Catcher2",
    description: "学術論文を自動的に収集し、日本語で翻訳・要約して提供するモダンなウェブアプリケーション",
    language: "HTML",
    url: "https://github.com/Tabibito-AI/paper-catcher2",
  },
  {
    name: "Talk Screen AI",
    description: "Voice AI Chatbot with Screen Sharing for Mac OS。音声とスクリーン共有を組み合わせたAIアシスタント",
    language: "Python",
    url: "https://github.com/Tabibito-AI/Talk-Screen-AI",
  },
  {
    name: "Talk Screen Gemini 2.5",
    description: "最新のGemini 2.5 Flash Native Audio Live APIを使用した、音声チャットとスクリーンシェアを組み合わせたAIアシスタント",
    language: "Python",
    url: "https://github.com/Tabibito-AI/Talk-Screen-Gemini-2.5",
  },
  {
    name: "Word to PDF Converter",
    description: "大量のWordドキュメントをPDFに一括変換できるPythonツール",
    language: "Python",
    url: "https://github.com/Tabibito-AI/Word-to-PDF-Converter",
  },
  {
    name: "World Bank AI Dashboard",
    description: "GitHub Actionsを活用したWorld Bank経済指標ダッシュボード。Gemini AIによる分析機能付き",
    language: "JavaScript",
    url: "https://github.com/Tabibito-AI/World-Bank-AI-Dashboard",
  },
];

export default function Home() {
  const { user } = useAuth();

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
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-white rounded-lg border border-slate-200 hover:border-rose-300 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-slate-900 group-hover:text-rose-600 transition flex-1">{project.name}</h3>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-rose-600 transition flex-shrink-0 ml-2" />
              </div>
              <p className="text-sm text-slate-600 mb-4 line-clamp-2">{project.description}</p>
              <span className="inline-block px-2 py-1 bg-slate-100 text-xs text-slate-600 rounded">{project.language}</span>
            </a>
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
            <a
              href="https://github.com/Tabibito-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
          <div className="bg-white p-8 rounded-lg border border-slate-200">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              />
              <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:shadow-lg">
                Send Message
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
    </div>
  );
}
