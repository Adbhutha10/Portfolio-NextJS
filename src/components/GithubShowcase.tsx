'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, Book, ExternalLink, Code2 } from 'lucide-react';

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    updated_at: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Rust: '#dea584',
    Go: '#00ADD8',
    PHP: '#4F5D95',
    'C++': '#f34b7d',
};

export default function GithubShowcase() {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTheme, setActiveTheme] = useState('default');
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        // Initial theme check
        if (typeof window !== 'undefined') {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'default';
            setActiveTheme(currentTheme);

            const observer = new MutationObserver(() => {
                setActiveTheme(document.documentElement.getAttribute('data-theme') || 'default');
            });

            observer.observe(document.documentElement, { attributes: true });

            // Fetch Repos
            const fetchRepos = async () => {
                try {
                    const response = await fetch('https://api.github.com/users/Adbhutha10/repos?sort=updated&per_page=3');
                    if (!response.ok) throw new Error('Failed to fetch');
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        setRepos(data);
                    }
                } catch (err) {
                    console.error("Github fetch error:", err);
                } finally {
                    setLoading(false);
                }
            };

            fetchRepos();
            return () => observer.disconnect();
        }
    }, []);

    return (
        <section id="github" className="py-24 px-6 md:px-12 lg:px-24 bg-[var(--bg-primary)] relative overflow-hidden transition-colors duration-500">
            {/* Subtle GitHub Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 text-[var(--accent-primary)] mb-4">
                            <Github className="w-6 h-6" />
                            <span className="text-sm font-mono tracking-widest uppercase">Open Source</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
                            Codebase Activity
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-4"
                    >
                        <div className="px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl backdrop-blur-sm flex items-center gap-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-[var(--text-secondary)] opacity-60 uppercase font-mono tracking-tighter">Profile</span>
                                <span className="text-sm font-medium text-[var(--text-primary)]">@Adbhutha10</span>
                            </div>
                            <div className="w-[1px] h-8 bg-[var(--border-primary)]" />
                            <a 
                                href="https://github.com/Adbhutha10" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-[var(--accent-primary)]/10 rounded-lg transition-colors text-[var(--accent-primary)]"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Github Stats & Contribution Placeholder */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-3xl p-8 flex flex-col lg:flex-row items-center justify-between gap-12 group overflow-hidden relative">
                        {/* Interactive Sparkle Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/5 via-transparent to-[var(--accent-secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        
                        <div className="w-full lg:w-1/2 space-y-6 relative z-10">
                            <h3 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-3">
                                <Code2 className="w-6 h-6 text-[var(--accent-primary)]" />
                                Growth & Contributions
                            </h3>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                Actively building and contributing to open-source ecosystems. 
                                Focused on scalable architectures, AI integrations, and clean code practices.
                            </p>
                            <div className="flex gap-6">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-[var(--text-primary)]">30+</p>
                                    <p className="text-[10px] text-[var(--text-secondary)] opacity-60 uppercase font-mono">Repositories</p>
                                </div>
                                <div className="w-[1px] h-10 bg-[var(--border-primary)]" />
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-[var(--text-primary)]">IEEE</p>
                                    <p className="text-[10px] text-[var(--text-secondary)] opacity-60 uppercase font-mono">Published</p>
                                </div>
                                <div className="w-[1px] h-10 bg-[var(--border-primary)]" />
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-[var(--text-primary)]">GDG</p>
                                    <p className="text-[10px] text-[var(--text-secondary)] opacity-60 uppercase font-mono">Co-Lead</p>
                                </div>
                            </div>
                        </div>

                        {/* GitHub Contribution Graph Embedded */}
                        <div className="w-full lg:w-auto flex flex-col items-center gap-4 relative z-10">
                            {!imageError ? (
                                <img 
                                    src={`https://github-readme-stats.vercel.app/api?username=Adbhutha10&show_icons=true&theme=${activeTheme === 'light' ? 'default' : 'dark'}&hide_border=true&title_color=3b82f6&icon_color=3b82f6&hide_rank=true`} 
                                    alt="GitHub Stats" 
                                    className="max-w-full h-auto rounded-xl transition-opacity duration-300"
                                    key={activeTheme}
                                    loading="lazy"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className="p-8 border border-[var(--border-primary)] rounded-2xl bg-[var(--bg-primary)] flex flex-col items-center gap-4 text-center max-w-sm">
                                    <Github className="w-12 h-12 text-[var(--accent-primary)] opacity-50" />
                                    <div>
                                        <p className="text-[var(--text-primary)] font-bold">GitHub Analytics</p>
                                        <p className="text-[var(--text-secondary)] text-xs mt-1">Direct statistics from @Adbhutha10</p>
                                    </div>
                                    <a 
                                        href="https://github.com/Adbhutha10" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-[var(--accent-primary)] text-xs font-mono hover:underline"
                                    >
                                        Visit GitHub Profile ↗
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Repos Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="h-48 bg-white/5 animate-pulse rounded-2xl border border-white/10" />
                        ))
                    ) : (
                        repos.map((repo, index) => (
                            <motion.a
                                key={repo.id}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-6 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl hover:bg-white/[0.08] hover:border-[var(--accent-primary)]/30 transition-all duration-300 flex flex-col justify-between h-full"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Book className="w-5 h-5 text-gray-500 group-hover:text-[var(--accent-primary)] transition-colors" />
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Star className="w-3 h-3" />
                                                {repo.stargazers_count}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <GitFork className="w-3 h-3" />
                                                {repo.forks_count}
                                            </span>
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors truncate">
                                        {repo.name}
                                    </h4>
                                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed h-10">
                                        {repo.description || "Experimental repository and open-source contribution."}
                                    </p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div 
                                            className="w-3 h-3 rounded-full" 
                                            style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || '#8b949e' }}
                                        />
                                        <span className="text-xs text-gray-500">{repo.language || 'Code'}</span>
                                    </div>
                                    <span className="text-[10px] text-gray-600 font-mono">
                                        {new Date(repo.updated_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </motion.a>
                        ))
                    )}
                </div>

                {/* View All Button */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-16 text-center"
                >
                    <a 
                        href="https://github.com/Adbhutha10"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] font-medium hover:bg-[var(--border-primary)] transition-all group rounded-2xl"
                    >
                        See more on GitHub
                        <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
