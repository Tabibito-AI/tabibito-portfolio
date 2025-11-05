import { useState } from 'react'

const projects = [
    { name: "AI Paper Navigator", description: "arXivの論文を検索し、Abstractを翻訳して提供するアプリケーション", language: "TypeScript", url: "https://github.com/Tabibito-AI/ai-paper-navigator", updated: "2025-06-06" },
    { name: "AI Whiteboard Manus", description: "AI Whiteboard - Manusサーバー上で動作するAI連携ホワイトボードアプリケーション", language: "TypeScript", url: "https://github.com/Tabibito-AI/ai-whiteboard-manus", updated: "2025-10-23" },
    { name: "Multi-Source Paper Navigator", description: "複数の学術データベース（arXiv、PubMed）から論文を検索し、要約翻訳を提供するWebアプリケーション", language: "TypeScript", url: "https://github.com/Tabibito-AI/Multi-Source-Paper-Navigator", updated: "2025-06-07" },
    { name: "OpenAI ChatBot with Real-time API", description: "OpenAIのリアルタイムAPIを使用した、音声コミュニケーション、カメラ映像認識、スクリーン認識ができるAIチャットボット", language: "Python", url: "https://github.com/Tabibito-AI/OpenAI-ChatBot-with-Real-time-API", updated: "2025-07-29" },
    { name: "Paper Catcher2", description: "学術論文を自動的に収集し、日本語で翻訳・要約して提供するモダンなウェブアプリケーション。GitHub Pagesで自動公開", language: "HTML", url: "https://github.com/Tabibito-AI/paper-catcher2", updated: "2025-10-13" },
    { name: "Talk Screen AI", description: "Voice AI Chatbot with Screen Sharing for Mac OS。音声とスクリーン共有を組み合わせたAIアシスタント", language: "Python", url: "https://github.com/Tabibito-AI/Talk-Screen-AI", updated: "2025-08-29" },
    { name: "Talk Screen Gemini 2.5", description: "最新のGemini 2.5 Flash Native Audio Live APIを使用した、音声チャットとスクリーンシェアを組み合わせたAIアシスタント", language: "Python", url: "https://github.com/Tabibito-AI/Talk-Screen-Gemini-2.5", updated: "2025-05-29" },
    { name: "Word to PDF Converter", description: "大量のWordドキュメントをPDFに一括変換できるPythonツール", language: "Python", url: "https://github.com/Tabibito-AI/Word-to-PDF-Converter", updated: "2025-01-24" },
    { name: "World Bank AI Dashboard", description: "GitHub Actionsを活用したWorld Bank経済指標ダッシュボード。Gemini AIによる分析機能付き", language: "JavaScript", url: "https://github.com/Tabibito-AI/World-Bank-AI-Dashboard", updated: "2025-07-31" }
];

export default function App() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('Thank you for your message! I\'ll get back to you soon.');
        setFormData({ name: "", email: "", message: "" });
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-gray-900">Tabibito</div>
                    <ul className="flex gap-8 list-none">
                        <li><button onClick={() => scrollToSection('home')} className="text-gray-600 hover:text-purple-600 font-medium transition">Home</button></li>
                        <li><button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-purple-600 font-medium transition">About</button></li>
                        <li><button onClick={() => scrollToSection('projects')} className="text-gray-600 hover:text-purple-600 font-medium transition">Projects</button></li>
                        <li><button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-purple-600 font-medium transition">Contact</button></li>
                    </ul>
                </div>
            </nav>

            <section id="home" className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center">
                <div className="max-w-6xl mx-auto px-8 grid grid-cols-2 gap-16 items-center">
                    <div>
                        <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent mb-2">Tabibito</h1>
                        <p className="text-2xl text-purple-600 font-semibold mb-6">AI & Web Developer</p>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-md">AIを活用した研究論文検索アプリケーション、リアルタイムAIチャットボット、Web開発プロジェクトなど、最新技術を駆使したフルスタック開発に注力しています。</p>
                        <div className="flex gap-4 flex-wrap">
                            <button onClick={() => scrollToSection('projects')} className="px-8 py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-lg font-semibold hover:shadow-lg transition">View My Work</button>
                            <button onClick={() => scrollToSection('contact')} className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition">Get In Touch</button>
                        </div>
                    </div>
                    <div>
                        <img src="https://avatars.githubusercontent.com/u/128676749?v=4" alt="Tabibito" className="w-full max-w-md rounded-3xl shadow-2xl" />
                    </div>
                </div>
            </section>

            <section id="about" className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-8">
                    <h2 className="text-5xl font-bold text-center text-gray-900 mb-4">About Me</h2>
                    <div className="grid grid-cols-2 gap-16 items-start mt-12">
                        <div>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">GitHubアカウント「Tabibito-AI」として、主にAIとWeb開発の分野で活動しています。公開されているリポジトリは、最新のAI技術（Google Gemini API, OpenAI API）とモダンなWebスタック（React, TypeScript, Tailwind CSS）を組み合わせたアプリケーション開発への情熱を示しています。</p>
                            <p className="text-lg text-gray-600 leading-relaxed">特に、研究者や開発者の生産性を向上させるためのツール開発に焦点を当てており、arXivやPubMedといった学術リソースへのアクセスを容易にするナビゲーターや、リアルタイムなマルチモーダル対応のAIチャットボットなどを開発してきました。</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-8">Skills & Expertise</h3>
                            <div className="grid grid-cols-2 gap-6">
                                {[{ name: "TypeScript", percent: 90 }, { name: "React", percent: 87 }, { name: "Python", percent: 84 }, { name: "Tailwind CSS", percent: 81 }, { name: "Google Gemini API", percent: 78 }, { name: "OpenAI API", percent: 75 }].map((skill, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between mb-2">
                                            <span className="font-semibold text-gray-900">{skill.name}</span>
                                            <span className="text-gray-500">{skill.percent}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600" style={{ width: `${skill.percent}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="projects" className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-6xl mx-auto px-8">
                    <h2 className="text-5xl font-bold text-center text-gray-900 mb-4">Featured Projects</h2>
                    <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">GitHubで公開されているプロジェクトの一覧です。</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, idx) => (
                            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition flex flex-col">
                                <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-700 text-white">
                                    <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                                    <p className="text-white/90 text-sm mb-4 leading-relaxed">{project.description}</p>
                                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs text-white">{project.language}</span>
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <p className="text-gray-500 text-sm mb-4">Last updated: {formatDate(project.updated)}</p>
                                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-purple-600 font-semibold hover:text-purple-700 transition inline-block mt-auto">View on GitHub →</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="contact" className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-8">
                    <h2 className="text-5xl font-bold text-center text-gray-900 mb-4">Let's Connect</h2>
                    <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">Have a project in mind or just want to say hello? I'd love to hear from you.</p>
                    <div className="grid grid-cols-2 gap-16">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Get In Touch</h3>
                            <p className="text-gray-600 mb-8">Available for new projects and collaborations</p>
                            <div className="flex gap-4">
                                <a href="https://github.com/Tabibito-AI" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition">GitHub</a>
                            </div>
                        </div>
                        <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleFormChange} required className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-600" />
                            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleFormChange} required className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-600" />
                            <textarea name="message" placeholder="Your Message" rows={5} value={formData.message} onChange={handleFormChange} required className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-600" />
                            <button type="submit" className="px-8 py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-lg font-semibold hover:shadow-lg transition">Send Message</button>
                        </form>
                    </div>
                </div>
            </section>

            <footer className="py-8 bg-gray-900 text-white text-center">
                <div className="max-w-6xl mx-auto px-8">
                    <p>&copy; 2025 Tabibito. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
